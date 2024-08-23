import {faAsterisk} from "@fortawesome/free-solid-svg-icons";
import React, {Component, useEffect, useState} from 'react';
import './add.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import {save} from "../../../actions/permission.user.actions";
import * as  userActions from "../../../actions/user.actions";
import * as permissionActions from "../../../actions/permission.actions";
import {connect} from "react-redux";
import AlertComponent from '../../../commons/alert/alert.component';
import withRouter from "../../../utils/with.router";
import { PermissionUser } from "../../../models/permission.user.model";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsCommon} from "../../../interfaces/props.common.interface";
import {IPropsPermissionUser} from "../../../interfaces/permission.user.interface";
import * as groupActions from "../../../actions/group.actions";

function AddComponent (props: IPropsPermissionUser) {
    const  [isDelete,setDelete]= useState(false);
    const [ isGet, setGet]= useState(false);
    const [isPost, setPost]= useState(false);
    const [isPut, setPut]= useState(false);

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

    useEffect(()=>{
        (async ()=>{
            await props._groupRetrieve({limit:100});
            await props._userRetrieve({limit:200});
            await props._permissionRetrieve({limit:20});
             if(+props.params.id){
                await props._retrieve(+props.params.id);
             }
            props.permissionUser.data?.actions.split("-").forEach((value: string) => {

                if (value === "get")
                    setGet( true);
                else if (value === "post")
                    setPost( true);
                else if (value === "put")
                    setPut( true);
                else if (value === "delete")
                    setDelete( true);

            });

        })();
    },[])

   const handleSubmit = async (values: {  groupId: any;permissionId: any; userId: any; actions: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ groupId: string; permissionId: string; userId: string; actions: never[]; }>> | undefined) => void) => {
        let combineAction = '';
       values.actions.forEach((ctl:string) => combineAction += ctl);

       if (true) {
           combineAction = (isGet ? '-get' : '') + (isPost ? '-post' : '') + (isPut ? '-put' : '') + (isDelete ? '-delete' : '');
       } else {
           combineAction = props.permissionUser.data?.actions!;
       }
       const permissionUser = {
           id: +props.params.id,
           permissionId: values.permissionId,
           userId: values.userId,
           actions: combineAction
       };
       if(+props.params.id){
           await props._update(permissionUser, props);
       }else{
           await props._save(permissionUser, props);
       }

    }
   const onChangeGroup=async (event: any)=>{
        const value = event.currentTarget.value;
        const queryParam = `name[eq]=${value}`;
        await props._userRetrieve(queryParam);
    }

    const {permissionUser, userList, permissionList, groupList} = props;

        return (
            <Formik
                initialValues={{
                    permissionId: permissionUser?.data?.permissionId||'',
                    userId: permissionUser?.data?.userId||'',
                    actions: [],
                    groupId: '',
                }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    permissionId: Yup.string()
                        .required('required'),
                    userId: Yup.string()
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
                                            onChange={async (event) => {
                                                handleChange(event);
                                                await onChangeGroup(event);
                                            }}
                                            onBlur={handleBlur} defaultValue="1">
                                        <option disabled selected
                                        >{props.t('common.selectInputMessage')}</option>
                                        {
                                            groupList?.data?.map((item:any, i: number) => <option
                                                value={item.name}>{item.name} </option>)
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
                                    <div className="input-group-addon"><Trans i18nKey="filed.userName"></Trans></div>
                                    <select id="userId" name="userId" required
                                            className={`form-control ${(errors.userId && touched.userId) ? "is-invalid" : ""} `}
                                            onChange={handleChange} onBlur={handleBlur} defaultValue="1">
                                        <option disabled selected
                                                >{props.t('common.selectInputMessage')}</option>
                                        {
                                            userList?.data?.map((item:any, i:number) => <option
                                                value={item.id}>{item.username + ' (' + item.firstName + '  ' + item.lastName + ')'} </option>)
                                        }
                                    </select>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faAsterisk}/>
                                    </div>

                                    <div className="invalid-feedback ">

                                        {
                                            errors.userId === 'required' ?
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
                                            permissionList?.data?.map((item:any, i: number) => <option
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
                                            <input name="actions" value="-get" onChange={onCheckboxChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
                                                   className="switch-input "/>
                                            <span data-on="Get" data-off="Get" className="switch-label"></span>
                                            <span className="switch-handle"></span>
                                        </label>


                                        <label style={{transform: 'scale(1)'}}
                                               className="switch switch-text switch-success switch-pill m-r-5 m-l-5">
                                            <input name="actions" value="-post" onChange={onCheckboxChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
                                                   className="switch-input"/>
                                            <span data-on="Pst" data-off="Pst" className="switch-label"></span>
                                            <span className="switch-handle"></span>
                                        </label>

                                        <label style={{transform: 'scale(1)'}}
                                               className="switch switch-text switch-warning switch-pill m-r-5 m-l-5">
                                            <input name="actions" value="-put" onChange={onCheckboxChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
                                                   className="switch-input"/>
                                            <span data-on="Put" data-off="Put" className="switch-label"></span>
                                            <span className="switch-handle"></span>
                                        </label>
                                        <label style={{transform: 'scale(1)'}}
                                               className="switch switch-text switch-danger switch-pill  m-l-5">
                                            <input name="actions" value="-delete" onChange={onCheckboxChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
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
        userList: state.user,
        permissionList: state.permission,
        groupList: state.group,
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _save: (permissionUser: PermissionUser, props: IPropsCommon) => save(permissionUser, props, dispatch),
        _userRetrieve: (argument: number | string | object|null) => userActions.retrieve(argument, dispatch),
        _permissionRetrieve: (argument: number | string | object|null) => permissionActions.retrieve(argument, dispatch),
        _groupRetrieve: (argument: number | string | object|null) => groupActions.retrieve(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(AddComponent)));


