import React, {Component} from 'react';
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import './register.component.scss';
import {Trans, withTranslation} from 'react-i18next';
import {connect, useDispatch} from 'react-redux'
import {signUp} from '../../../actions/auth.actions';
import withRouter from "../../../hooks/with.router";
import AlertComponent from "../../../commons/alert/alert.component";
import {GoogleReCaptchaProvider, IWithGoogleReCaptchaProps, withGoogleReCaptcha} from 'react-google-recaptcha-v3';
import {Auth} from "../../../interfaces/authenticate.model";
import {IProps} from "../../../interfaces/props.common.interface";
function RegisterComponent (props: IProps) {

 const  dispatch= useDispatch();
   const handleSubmit = async (values: { login?: string; username?: string; password?: string; passConfirm?: string; token?: any; action?: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ login: string; username: string; password: string; passConfirm: string; }>> | undefined) => void) => {

        // @ts-ignore
       const { executeRecaptcha } = (props as IWithGoogleReCaptchaProps)
            .googleReCaptchaProps;
        if (!executeRecaptcha) {
            console.log('Recaptcha has not been loaded');
            return;
        }
        const token = await executeRecaptcha('importantAction');
        const action = 'importantAction';
        const auth = new Auth({
            username: values.username,
            login: values.login,
            password: values.password,
            passConfirm: values.passConfirm,
            socialLogin: "false",
            action:action ,
            token: token
        });
        await signUp(dispatch,auth, props);
    }


        return (
            <main>


                <div className="breadcrumbs">
                    <div className="page-header d-flex align-items-center x-header">
                        <div className="container position-relative">
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-6 text-center">
                                    <h2><Trans i18nKey="auth.signUp"></Trans></h2>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                    <section className="p-t-120 p-b-80 ">
                        <div className="container">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-lg-12">
                                    <div className="wrapper">
                                        <div className="content">
                                            <Formik
                                                initialValues={{
                                                    login: '',
                                                    username: '',
                                                    password: '',
                                                    passConfirm: ''
                                                }}
                                                validationSchema={Yup.object().shape({
                                                    login: Yup.string()
                                                        .required('required').max(255,'maxlength'),
                                                    username: Yup.string()
                                                        .required('required').max(255,'maxlength'),
                                                    password: Yup.string()
                                                        .required('required').max(255,'maxlength'),
                                                    passConfirm: Yup.string().required('required').oneOf([Yup.ref("password"), ""], "equal"),

                                                })}
                                                onSubmit={(fields, {
                                                    setSubmitting,
                                                    resetForm
                                                }) => handleSubmit(fields, setSubmitting, resetForm)}>
                                                {
                                                    ({
                                                         values,
                                                         errors,
                                                         touched,
                                                         status,
                                                         handleChange,
                                                         handleBlur,
                                                         handleSubmit,
                                                         isSubmitting
                                                     }) => (


                                                        <div className="login-content">
                                                            <div className="login-logo">
                                                                <a href="src/app/components/authentication/register/register.component#">

                                                                </a>
                                                            </div>
                                                            <div className="login-form">
                                                                <form onSubmit={handleSubmit}>

                                                                    <div className="form-group">
                                                                        <AlertComponent/>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label> <Trans
                                                                            i18nKey="filed.emailPhone"></Trans>
                                                                        </label>
                                                                        <input
                                                                            className={`au-input au-input--full   ${(errors.login && touched.login && errors.login) ? "is-invalid" : ""} `}
                                                                            type="text"
                                                                            id="login" name="login"
                                                                            placeholder={props.t('filed.emailPhone')}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}/>

                                                                        <div className="invalid-feedback">
                                                                            {
                                                                                errors.login === 'required' ?
                                                                                    <div className="pull-right"><Trans
                                                                                        i18nKey="common.required"></Trans>
                                                                                    </div> : ''
                                                                            }
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <label> <Trans
                                                                            i18nKey="filed.userName"></Trans>
                                                                        </label>
                                                                        <input
                                                                            className={`au-input au-input--full   ${(errors.username && touched.username && errors.username) ? "is-invalid" : ""} `}
                                                                            type="text"
                                                                            id="username" name="username"
                                                                            placeholder={props.t('filed.userName')}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}/>

                                                                        <div className="invalid-feedback">
                                                                            {
                                                                                errors.username === 'required' ?
                                                                                    <div className="pull-right"><Trans
                                                                                        i18nKey="common.required"></Trans>
                                                                                    </div> : ''
                                                                            }
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <label> <Trans
                                                                            i18nKey="filed.password"></Trans></label>
                                                                        <input
                                                                            className={`au-input au-input--full   ${(errors.password && touched.password && errors.password) ? "is-invalid" : ""} `}
                                                                            id="password"
                                                                            type="password" name="password"
                                                                            placeholder={props.t('filed.password')}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}/>
                                                                        <div className="invalid-feedback ">
                                                                            {
                                                                                errors.password === 'required' ?
                                                                                    <div className="pull-right"><Trans
                                                                                        i18nKey="common.required"></Trans>
                                                                                    </div> : ''
                                                                            }
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <label> <Trans
                                                                            i18nKey="filed.passwordConfirm"></Trans></label>
                                                                        <input
                                                                            className={`au-input au-input--full   ${(errors.password && touched.password && errors.password) ? "is-invalid" : ""} `}
                                                                            id="passConfirm"
                                                                            type="password" name="passConfirm"
                                                                            placeholder={props.t('filed.passwordConfirm')}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}/>
                                                                        <div className="invalid-feedback ">
                                                                            {
                                                                                errors.passConfirm === 'required' ?
                                                                                    <div className="pull-right"><Trans
                                                                                        i18nKey="common.required"></Trans>
                                                                                    </div> : ''
                                                                            }

                                                                            {errors.passConfirm === 'equal' ?
                                                                                <div className="pull-right"><Trans
                                                                                    i18nKey="common.notEqual"></Trans>
                                                                                </div> : ''
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                    <div className="login-checkbox">
                                                                        <label className="m-t-10">
                                                                            <input type="checkbox"
                                                                                   name="agree"/>
                                                                            <Trans i18nKey="auth.agreeWith"></Trans>
                                                                        </label>
                                                                    </div>
                                                                    <button
                                                                        className="au-btn au-btn--block au-btn--green m-b-20"
                                                                        type="submit">
                                                                        <Trans i18nKey="auth.register"></Trans>
                                                                    </button>
                                                                </form>
                                                                <div className="card"
                                                                     style={{border: 'none', padding: 0, margin: 0}}>

                                                                    <div className="card-body">

                                                                        <button type="button"
                                                                                onClick={(event) => props.navigate('../sign-in')}
                                                                                className="btn btn-link btn-sm">
                                                                            <Trans
                                                                                i18nKey="auth.signIn"></Trans></button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={(event) => props.navigate('../forgot')}
                                                                            className="btn btn-link btn-sm">
                                                                            <Trans
                                                                                i18nKey="auth.forgotPassword"></Trans>
                                                                        </button>
                                                                        <button type="button"
                                                                                onClick={(event) => props.navigate('../reset-password')}
                                                                                className="btn btn-link btn-sm">
                                                                            <Trans
                                                                                i18nKey="auth.resetPassword"></Trans>
                                                                        </button>
                                                                        <button type="button"
                                                                                onClick={(event) => props.navigate('../activation')}
                                                                                className="btn btn-link btn-sm">
                                                                            <Trans
                                                                                i18nKey="auth.activationAccount"></Trans>
                                                                        </button>

                                                                    </div>


                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }


                                            </Formik>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


            </main>
        );

}


export default withTranslation()(withRouter(withGoogleReCaptcha(RegisterComponent)));

