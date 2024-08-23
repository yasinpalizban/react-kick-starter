import {faAsterisk} from "@fortawesome/free-solid-svg-icons";
import React, {Component, useEffect, useState} from 'react';
import './add.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import {detail, save, update, retrieve} from "../../../actions/permission..group.actions";
import * as groupActions from "../../../actions/group.actions";
import * as permissionActions from "../../../actions/permission.actions";
import {connect} from "react-redux";
import AlertComponent from '../../../commons/alert/alert.component';
import withRouter from "../../../utils/with.router";
import {PermissionGroup} from "../../../models/permission.group.model";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsCommon} from "../../../interfaces/props.common.interface";
import {IPropsPermissionGroup} from "../../../interfaces/permission.group.interface";


function AddComponent (props: IPropsPermissionGroup ) {
    const  [isDelete,setDelete]= useState(false);
    const [ isGet, setGet]= useState(false);
    const [isPost, setPost]= useState(false);
    const [isPut, setPut]= useState(false);
    useEffect(()=>{
        (async ()=>{
            await initData();
        })();
    },[])
   const initData= async ()=> {
        await props._groupRetrieve(null);
        await props._permissionRetrieve({limit:20});
         if(+props.params.id){
             await props._retrieve(+props.params.id);
             props?.permissionGroup?.data?.actions.split("-").forEach((value: string) => {
                 if (value === "get")
                     setGet( true);
                 else if (value === "post")
                     setPost( true);
                 else if (value === "put")
                     setPut( true);
                 else if (value === "delete")
                     setDelete( true);
             });
         }
    }


   const handleSubmit = async (values: { permissionId: any; groupId: any; actions: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ permissionId: string; groupId: string; actions: never[]; }>> | undefined) => void) => {
        let combineAction = '';
        values.actions.forEach((ctl: string) => combineAction += ctl);

        if (true) {
           combineAction = (isGet ? '-get' : '') + (isPost ? '-post' : '') + (isPut ? '-put' : '') + (isDelete ? '-delete' : '');
       } else {
           combineAction = props.permissionGroup.data?.actions!;
       }

       const permission = {
           id: +props.params.id,
           permissionId: values.permissionId,
           groupId: values.groupId,
           actions: combineAction
       };

       const permissionGroup = new PermissionGroup(permission);
       if(+props.params.id){
           await props._update(permissionGroup, props);

       }else{
           await props._save(permissionGroup,props);
       }


    }

    const   onCheckboxChange = (event: any) => {
        switch (event.target.value) {
            case "-get":
                setGet( !isGet);
                break;
            case "-post":
                setPost( !isPost);
                break;
            case "-put":
                setPut( !isPut);
                break;
            case "-delete":
                setDelete( !isDelete);
                break;
        }

    }
        const {groupList, permissionList,permissionGroup} = props;
        return (
            <Formik
                initialValues={{
                    permissionId:  permissionGroup?.data?.permissionId||'',
                    groupId: permissionGroup?.data?.groupId||'',
                    actions: []
                }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    permissionId: Yup.string()
                        .required('required'),
                    groupId: Yup.string()
                        .required('required'),
                    actions: Yup.array().min(1).required('required')
                })}
                onSubmit={(fields, {setSubmitting, resetForm}) => handleSubmit(fields, setSubmitting, resetForm)}>
                {
                    ({values, errors, touched, status, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                        <form onSubmit={handleSubmit}>

                            <div className="form-group">
                                <AlertComponent/>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.group"></Trans></div>
                                    <select id="groupID" name="groupId" required
                                            className={`form-control ${(errors.groupId && touched.groupId) ? "is-invalid" : ""} `}
                                            onChange={handleChange} onBlur={handleBlur} defaultValue="1">
                                        <option disabled selected
                                        >{props.t('common.selectInputMessage')}</option>
                                        {
                                            groupList?.data?.map((item, i: number) => <option
                                                value={item.id}>{item.name} </option>)
                                        }
                                    </select>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faAsterisk}/>
                                    </div>

                                    <div className="invalid-feedback ">

                                        {
                                            errors.groupId === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }

                                    </div>

                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.permissionId"></Trans>
                                    </div>
                                    <select id="permissionId" name="permissionId" required
                                            className={`form-control ${(errors.permissionId && touched.permissionId) ? "is-invalid" : ""} `}
                                            onChange={handleChange} onBlur={handleBlur} defaultValue="1">
                                        <option disabled selected
                                        >{props.t('common.selectInputMessage')}</option>
                                        {
                                            permissionList?.data?.map((item, i: number) => <option
                                                value={item.id}>{item.name} </option>)
                                        }
                                    </select>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faAsterisk}/>
                                    </div>

                                    <div className="invalid-feedback ">

                                        {
                                            errors.permissionId === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }

                                    </div>

                                </div>
                            </div>


                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.actions"></Trans></div>

                                    <div className="form-control form-check-inline form-check" style={{border: 'none'}}>

                                        <label style={{transform: 'scale(1)'}}
                                               className="switch switch-text switch-primary switch-pill lg m-r-10 m-l-20">
                                            <input name="actions" value="-get" onChange={ onCheckboxChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
                                                   checked={isGet}
                                                   className="switch-input "/>
                                            <span data-on="Get" data-off="Get" className="switch-label"></span>
                                            <span className="switch-handle"></span>
                                        </label>


                                        <label style={{transform: 'scale(1)'}}
                                               className="switch switch-text switch-success switch-pill m-r-5 m-l-5">
                                            <input name="actions" value="-post" onChange={ onCheckboxChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
                                                   checked={isPost}
                                                   className="switch-input"/>
                                            <span data-on="Pst" data-off="Pst" className="switch-label"></span>
                                            <span className="switch-handle"></span>
                                        </label>

                                        <label style={{transform: 'scale(1)'}}
                                               className="switch switch-text switch-warning switch-pill m-r-5 m-l-5">
                                            <input name="actions" value="-put" onChange={ onCheckboxChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
                                                   checked={isPut}

                                                   className="switch-input"/>
                                            <span data-on="Put" data-off="Put" className="switch-label"></span>
                                            <span className="switch-handle"></span>
                                        </label>
                                        <label style={{transform: 'scale(1)'}}
                                               className="switch switch-text switch-danger switch-pill  m-l-5">
                                            <input name="actions" value="-delete" onChange={onCheckboxChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
                                                   checked={isDelete}
                                                   className="switch-input"/>
                                            <span style={{fontSize: '10px !important'}} data-on="Del" data-off="Del"
                                                  className="switch-label"></span>
                                            <span className="switch-handle"></span>
                                        </label>


                                    </div>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faAsterisk}/>
                                    </div>

                                </div>
                            </div>

                            <div className="form-actions form-group ">
                                <button type="submit" className="btn btn-primary btn-sm">
                                    <Trans i18nKey="common.submit"></Trans>
                                </button>
                            </div>
                        </form>
                    )
                }


            </Formik>
        );

}


const mapStateToProps = (state: IReduxState) => {
    return {
        groupList: state.group,
        permissionList: state.permission,
        permissionGroupDetail: state.permissionGroupSelect,
        queryArgument: state.queryArgument
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {

        _save: (permissionGroup: PermissionGroup, props: IPropsCommon) => save(permissionGroup, props, dispatch),
        _groupRetrieve: (argument: number | string | object|null) => groupActions.retrieve(argument, dispatch),
        _permissionRetrieve: (argument: number | string | object|null) => permissionActions.retrieve(argument, dispatch),
        _update: (permissionGroup: PermissionGroup, props: IPropsCommon) => update(permissionGroup, props, dispatch),
        _detail: (argument:  number |  null) => detail(argument, dispatch),
        _retrieve:(id: number | string | object|null)=> retrieve(id,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(AddComponent)));


