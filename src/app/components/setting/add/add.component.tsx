import {faEye, faFileWord, faAddressBook} from "@fortawesome/free-solid-svg-icons";
import React, {Component, useEffect} from 'react';
import './add.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState, FormikValues} from 'formik';
import * as Yup from 'yup';
import {detail, save, update} from "../../../actions/setting.actions";
import {connect, useDispatch, useSelector} from "react-redux";
import AlertComponent from '../../../commons/alert/alert.component';
import withRouter from "../../../hooks/with.router";
import {Setting} from "../../../models/setting.model";
import {IReduxState} from "../../../interfaces/redux.type.interface";
import {IProps} from "../../../interfaces/props.common.interface";
import { ISetting} from "../../../interfaces/setting.interface";
import {IResponseObject} from "../../../interfaces/iresponse.object";
import ErrorHintComponent from "../../../commons/error-hint/error-hint.component";


function AddComponent (props: IProps ) {
    const setting:IResponseObject<ISetting>= useSelector((item:IReduxState)=> item.settingSelect);
    const dispatch=useDispatch();
    const queryArgument  = useSelector((item: IReduxState) => item.queryArgument)
    useEffect(()=>{
        (async ()=>{
            if(+props.params.id){
                await detail(dispatch,+props.params.id);
                props={...props,queryArgument:queryArgument};
            }
        })();
    },[])
 const   handleSubmit = async (values: FormikValues, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: (Partial<FormikState<{ key: string; value: string; description: string; status: string }>> | undefined)) => void) => {
     const setting = new Setting({
         id: +props.params.id,
         value:values.value.toUpperCase(),
         description: values.description,
         status: values.status=='1',
     });
     if(+props.params.id){
         props={...props,queryArgument:queryArgument};
         await update(dispatch,setting, props);
     }else{
         await save(dispatch,setting, props);
     }
    }

        return (
            <Formik
                initialValues={{
                    key: setting.data?.key||'',
                    value: setting.data?.value||'',
                    description: setting.data?.description||'',
                    status: setting.data?.status||''
                }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    key: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    value: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    description: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    status: Yup.string()
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
                                    <div className="input-group-addon"><Trans i18nKey="filed.key"></Trans></div>
                                    <input value={values.key} type="text" id="key" name="key" required
                                           className={`form-control ${(errors.key && touched.key) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faFileWord}/>
                                    </div>

                                    <ErrorHintComponent  name='key' errors={errors}/>

                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.value"></Trans></div>
                                    <input value={values.value} type="text" id="value" name="value" required
                                           className={`form-control ${(touched.value && errors.value) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faFileWord}/>

                                    </div>
                                    <ErrorHintComponent  name='value' errors={errors}/>

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
                                        <FontAwesomeIcon icon={faAddressBook}/>

                                    </div>
                                    <ErrorHintComponent  name='description' errors={errors}/>

                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.status"></Trans></div>
                                    <select id="status" name="status" required
                                            className={`form-control ${(errors.status && touched.status) ? "is-invalid" : ""} `}
                                            onChange={handleChange} onBlur={handleBlur} defaultValue="1">
                                        <option disabled selected>{props.t('common.selectInputMessage')}</option>
                                        <option  value="1">{props.t('filed.activate')} </option>
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


