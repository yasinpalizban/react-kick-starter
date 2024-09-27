import {faAsterisk} from "@fortawesome/free-solid-svg-icons";
import React, {Component, useEffect, useState} from 'react';
import './add.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import {save,detail, update} from "../../../actions/permission.user.actions";
import * as  userActions from "../../../actions/user.actions";
import * as permissionActions from "../../../actions/permission.actions";
import {connect, useDispatch, useSelector} from "react-redux";
import AlertComponent from '../../../commons/alert/alert.component';
import withRouter from "../../../hooks/with.router";
import { PermissionUser } from "../../../models/permission.user.model";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IProps} from "../../../interfaces/props.common.interface";
import {IPermissionUser} from "../../../interfaces/permission.user.interface";
import * as groupActions from "../../../actions/group.actions";
import {IResponseObject} from "../../../interfaces/iresponse.object";
import {IPermission} from "../../../interfaces/permission.interface";
import {IGroup} from "../../../interfaces/group.interface";
import {IUser} from "../../../interfaces/user.interface";
import ErrorHintComponent from "../../../commons/error-hint/error-hint.component";

function AddComponent (props: IProps) {
    const permissionUser:IResponseObject<IPermissionUser> =  useSelector((item:IReduxState)=> item.permissionUserSelect);;
      const userList:IResponseObject<IUser[]> =  useSelector((item:IReduxState)=> item.user);
      const  permissionList:IResponseObject<IPermission[]> =  useSelector((item:IReduxState)=> item.permission);
      const  groupList:IResponseObject<IGroup[]> =  useSelector((item:IReduxState)=> item.group);
    const dispatch= useDispatch();
    const queryArgument  = useSelector((item: IReduxState) => item.queryArgument)

    useEffect(()=>{
        (async ()=>{
            await groupActions.retrieve(dispatch,{limit:100});
            await permissionActions.retrieve(dispatch,{limit:200});
            await userActions.retrieve(dispatch,{limit:20});
             if(+props.params.id){
                await detail(dispatch,+props.params.id);
                 props={...props,queryArgument:queryArgument};
             }

        })();
    },[]);


   const handleSubmit = async (values: {  groupId: any;permissionId: any; userId: any; actions: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ groupId: string; permissionId: string; userId: string; actions: never[]; }>> | undefined) => void) => {
        let combineAction = '';
       values.actions.forEach((ctl:string) => combineAction += ctl);

       const model = new PermissionUser({
           id: +props.params.id,
           permissionId: values.permissionId,
           userId: values.userId,
           actions: combineAction
       }) ;
       if(+props.params.id){
           props={...props,queryArgument:queryArgument};
           await update(dispatch,model, props);
       }else{
           await save(dispatch,model, props);
       }

    }
   const onChangeGroup=async (event: any)=>{
        const value = event.currentTarget.value;
        const queryParam = `name[eq]=${value}`;
        await userActions.retrieve(dispatch,queryParam);
    }



        return (
            <Formik
                initialValues={{
                    permissionId: permissionUser?.data?.permissionId||'',
                    userId: permissionUser?.data?.userId||'',
                    actions: permissionUser?.data?.actions.split('-')||[],
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

                                    <ErrorHintComponent  name='groupId' errors={errors}/>

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

                                    <ErrorHintComponent  name='userId' errors={errors}/>

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

                                    <ErrorHintComponent  name='permissionId' errors={errors}/>

                                </div>
                            </div>


                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.actions"></Trans></div>

                                    <div className="form-control form-check-inline form-check" style={{border: 'none'}}>

                                        <label style={{transform: 'scale(1)'}}
                                               className="switch switch-text switch-primary switch-pill lg m-r-10 m-l-20">
                                            <input name="actions" value="-get" onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
                                                   className="switch-input "/>
                                            <span data-on="Get" data-off="Get" className="switch-label"></span>
                                            <span className="switch-handle"></span>
                                        </label>


                                        <label style={{transform: 'scale(1)'}}
                                               className="switch switch-text switch-success switch-pill m-r-5 m-l-5">
                                            <input name="actions" value="-post" onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
                                                   className="switch-input"/>
                                            <span data-on="Pst" data-off="Pst" className="switch-label"></span>
                                            <span className="switch-handle"></span>
                                        </label>

                                        <label style={{transform: 'scale(1)'}}
                                               className="switch switch-text switch-warning switch-pill m-r-5 m-l-5">
                                            <input name="actions" value="-put" onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
                                                   className="switch-input"/>
                                            <span data-on="Put" data-off="Put" className="switch-label"></span>
                                            <span className="switch-handle"></span>
                                        </label>
                                        <label style={{transform: 'scale(1)'}}
                                               className="switch switch-text switch-danger switch-pill  m-l-5">
                                            <input name="actions" value="-delete" onChange={handleChange}
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
                                    <ErrorHintComponent  name='actions' errors={errors}/>
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


export default withTranslation()(withRouter(AddComponent));


