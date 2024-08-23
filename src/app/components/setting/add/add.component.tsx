import {faEye, faFileWord, faAddressBook} from "@fortawesome/free-solid-svg-icons";
import React, {Component, useEffect} from 'react';
import './add.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState, FormikValues} from 'formik';
import * as Yup from 'yup';
import {detail, save, update} from "../../../actions/setting.actions";
import {connect} from "react-redux";
import AlertComponent from '../../../commons/alert/alert.component';
import withRouter from "../../../utils/with.router";
import {Setting} from "../../../models/setting.model";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsCommon} from "../../../interfaces/props.common.interface";
import {IPropsSetting} from "../../../interfaces/setting.interface";


function AddComponent (props: IPropsSetting ) {
    useEffect(() => {
        (async ()=>{
            if(+props.params.id)
            {
                await props._detail(+props.params.id);
            }
        })();
    },[]);
 const   handleSubmit = async (values: FormikValues, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: (Partial<FormikState<{ key: string; value: string; description: string; status: string }>> | undefined)) => void) => {


     const setting = new Setting({
         id: +props.params.id,
         value:values.value.toUpperCase(),
         description: values.description,
         status: values.status=='1',
     });
     if(+props.params.id){
         await props._update(setting, props);
     }else{
         await props._save(setting, props);
     }



    }

    const {setting} = props;
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

                                    <div className="invalid-feedback ">

                                        {
                                            errors.key === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }
                                        {errors.key === 'maxlength' ?
                                            <div className="pull-right"><Trans i18nKey="common.canNotBe"></Trans>
                                            </div> : ''
                                        }
                                    </div>

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
                                    <div className="invalid-feedback ">

                                        {
                                            errors.value === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }
                                        {errors.value === 'maxlength' ?
                                            <div className="pull-right"><Trans i18nKey="common.canNotBe"></Trans>
                                            </div> : ''
                                        }

                                    </div>

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
                                    <div className="invalid-feedback ">

                                        {
                                            errors.description === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }
                                        {errors.description === 'maxlength' ?
                                            <div className="pull-right"><Trans i18nKey="common.canNotBe"></Trans>
                                            </div> : ''
                                        }
                                    </div>

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

                                    <div className="invalid-feedback ">

                                        {
                                            errors.status === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }

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


const mapStateToProps = (state:IReduxState) => {
    return {
        setting: state.settingSelect,
        queryArgument: state.queryArgument
    }
}
const mapDispatchToProps = (dispatch:IReduxDispatch) => {
    return {
        _save: (setting: Setting, props: IPropsCommon) => save(setting,props, dispatch),
        _update: (setting: Setting, props: IPropsCommon) => update(setting, props, dispatch),
        _detail: (argument:  number | null) => detail(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(AddComponent)));


