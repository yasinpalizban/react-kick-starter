import {faAsterisk} from '@fortawesome/free-solid-svg-icons';
import React, {Component} from 'react';
import './user.password.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import AlertComponent from '../../../commons/alert/alert.component';
import { save} from "../../../actions/profile.actions";
import {connect} from "react-redux";
import { Profile } from '../../../models/profile.model';
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsProfile} from "../../../interfaces/profile.interface";
import withRouter from "../../../utils/with.router";
import {IPropsCommon} from "../../../interfaces/props.common.interface";

function UserPasswordComponent (props: IPropsProfile ) {



 const   handleSubmit = async (values: { password: string; passConfirm: string; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ password: string; passConfirm: string; }>> | undefined) => void) => {
       const profile = new Profile(values);
        await props._save(profile, props)
    }


        return (
            <Formik
                initialValues={{
                    password: '',
                    passConfirm: '',
                }}
                validationSchema={Yup.object().shape({
                    password: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    passConfirm: Yup.string()
                        .required('required').max(255, 'maxlength').oneOf([Yup.ref("password"), ""], "equal"),
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
                                    <div className="input-group-addon"><Trans i18nKey="filed.password"></Trans></div>
                                    <input type="text" id="password" name="password" required
                                           className={`form-control ${(errors.password && touched.password && errors.password) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faAsterisk}/>
                                    </div>

                                    <div className="invalid-feedback ">
                                        {
                                            errors.password === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }
                                        {errors.password === 'maxlength' ?
                                            <div className="pull-right"><Trans i18nKey="common.canNotBe"></Trans>
                                            </div> : ''
                                        }
                                    </div>

                                </div>
                            </div>


                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.passwordConfirm"></Trans>
                                    </div>
                                    <input type="text"
                                           id="passConfirm" name="passConfirm" required
                                           className={`form-control ${(errors.passConfirm && touched.passConfirm && errors.passConfirm) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faAsterisk}/>

                                    </div>
                                    <div className="invalid-feedback ">
                                        {
                                            errors.passConfirm === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }
                                        {errors.passConfirm === 'maxlength' ?
                                            <div className="pull-right"><Trans i18nKey="common.canNotBe"></Trans>
                                            </div> : ''
                                        }
                                        {errors.passConfirm === 'equal' ?
                                            <div className="pull-right"><Trans i18nKey="common.notEqual"></Trans>
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
const mapStateToProps = (state:  IReduxState) => {
    return {
    }
}

const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _save: (profile: Profile|FormData,props:IPropsCommon) => save(profile, props,dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(UserPasswordComponent)));
