import {faAsterisk} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './user.password.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import AlertComponent from '../../../commons/alert/alert.component';
import {save} from "../../../actions/profile.actions";
import {useDispatch} from "react-redux";
import {Profile} from '../../../models/profile.model';
import withRouter from "../../../hooks/with.router";
import {IProps} from "../../../interfaces/props.common.interface";
import ErrorHintComponent from "../../../commons/error-hint/error-hint.component";

function UserPasswordComponent(props: IProps) {
    const dispatch = useDispatch();
    const handleSubmit = async (values: { password: string; passConfirm: string; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ password: string; passConfirm: string; }>> | undefined) => void) => {
        const profile = new Profile(values);
        await save(dispatch, profile, props)
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

                                <ErrorHintComponent  name='password' errors={errors}/>

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
                                <ErrorHintComponent  name='passConfirm' errors={errors}/>

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

export default withTranslation()(withRouter(UserPasswordComponent));
