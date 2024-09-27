import {faEye, faFileWord, faStickyNote} from "@fortawesome/free-solid-svg-icons";
import React, {Component, useEffect} from 'react';
import './add.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState, FormikValues} from 'formik';
import * as Yup from 'yup';
import {detail, save, update} from "../../../actions/permission.actions";
import {connect, useDispatch, useSelector} from "react-redux";

import AlertComponent from '../../../commons/alert/alert.component';
import withRouter from "../../../hooks/with.router";
import { Permission } from "../../../models/permission.model";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IProps} from "../../../interfaces/props.common.interface";
import {IResponseObject} from "../../../interfaces/iresponse.object";
import {IPermission} from "../../../interfaces/permission.interface";
import ErrorHintComponent from "../../../commons/error-hint/error-hint.component";


function AddComponent (props: IProps) {
   const permission:IResponseObject<IPermission>   = useSelector((item:IReduxState)=> item.permissionSelect);
    const dispatch=useDispatch();
    const queryArgument  = useSelector((item: IReduxState) => item.queryArgument)
    useEffect(()=>{
        (async ()=>{
            if(+props.params.id){
                await detail(dispatch,+props.params.id);
            }
        })();
    },[]);



   const  handleSubmit = async (values: FormikValues, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: (Partial<FormikState<{ name: string; description: string; active: string }>> | undefined)) => void) => {
       const permission = new Permission({
           id: +props.params.id,
           name: values.name.toLowerCase(),
           description: values.description,
           active: values.active=='1',
       });

       if(+props.params.id){
           props={...props,queryArgument:queryArgument};
           await update(dispatch,permission, props);
       }else {
           await save(dispatch,permission, props);
       }
       }

        return (
            <Formik
                initialValues={{
                    name: permission?.data?.name||'',
                    description: permission?.data?.description||'',
                    active: permission?.data?.active||''
                }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    description: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    active: Yup.string()
                        .required('required'),
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
                                    <div className="input-group-addon"><Trans i18nKey="filed.name"></Trans></div>
                                    <input value={values.name} type="text" id="name" name="name" required
                                           className={`form-control ${(errors.name && touched.name) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faStickyNote}/>
                                    </div>

                                    <ErrorHintComponent  name='name' errors={errors}/>

                                </div>
                            </div>


                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.description"></Trans></div>
                                    <input value={values.description} type="text" id="description" name="description"
                                           required
                                           className={`form-control ${(errors.description && touched.description) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faFileWord}/>

                                    </div>
                                    <ErrorHintComponent  name='description' errors={errors}/>

                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.active"></Trans></div>
                                    <select id="active" name="active" required
                                            className={`form-control ${(errors.active && touched.active) ? "is-invalid" : ""} `}
                                            onChange={handleChange} onBlur={handleBlur} defaultValue="1">
                                        <option disabled selected
                                        >{props.t('common.selectInputMessage')}</option>
                                        <option value="1">{props.t('filed.activate')} </option>
                                        <option value="0">{props.t('filed.deActivate')} </option>
                                    </select>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faEye}/>
                                    </div>

                                    <ErrorHintComponent  name='active' errors={errors}/>

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


