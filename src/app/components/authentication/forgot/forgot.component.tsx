import React, {Component} from 'react';
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import './forgot.component.scss';
import {Trans, withTranslation} from 'react-i18next';
import {connect, useDispatch} from 'react-redux'
import {forgot} from '../../../actions/auth.actions';
import withRouter from "../../../hooks/with.router";
import AlertComponent from "../../../commons/alert/alert.component";
import {GoogleReCaptchaProvider, IWithGoogleReCaptchaProps, withGoogleReCaptcha} from 'react-google-recaptcha-v3';
import { Auth } from '../../../interfaces/authenticate.model';
import {IProps} from "../../../interfaces/props.common.interface";
function ForgotComponent (props: IProps){
  const dispatch= useDispatch()
   const handleSubmit = async (values: { login?: string; token?: any; action?: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ login: string; }>> | undefined) => void) => {
      //  const {executeRecaptcha}:any = this.props.googleReCaptchaProps;

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
            login: values.login,
            token: token,
            action: action
        });
        await forgot(dispatch,auth,props);

    }


        return (
            <main>


                <div className="breadcrumbs">
                    <div className="page-header d-flex align-items-center x-header">
                        <div className="container position-relative">
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-6 text-center">
                                    <h2><Trans i18nKey="auth.forgotPassword"></Trans></h2>

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
                                            }}
                                            validationSchema={Yup.object().shape({
                                                login: Yup.string()
                                                    .required('required'),

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
                                                            <a href="src/app/components/authentication/forgot/forgot.component#">

                                                            </a>
                                                        </div>
                                                        <div className="login-form">
                                                            <form onSubmit={handleSubmit}>

                                                                <div className="form-group">
                                                                    <AlertComponent/>
                                                                </div>

                                                                <div className="form-group">
                                                                    <label> <Trans
                                                                        i18nKey="filed.emailPhoneUsername"></Trans>
                                                                    </label>
                                                                    <input
                                                                        className={`au-input au-input--full   ${(errors.login && touched.login && errors.login) ? "is-invalid" : ""} `}
                                                                        type="text"
                                                                        id="login" name="login"
                                                                        placeholder={props.t('filed.emailPhoneUsername')}
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

                                                                <button
                                                                    className="au-btn au-btn--block au-btn--green m-b-20 m-t-20"
                                                                    type="submit">
                                                                    <Trans i18nKey="common.submit"></Trans>
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
                                                                        onClick={(event) => props.navigate('../sign-up')}
                                                                        className="btn btn-link btn-sm">
                                                                        <Trans
                                                                            i18nKey="auth.signUp"></Trans>
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


export default withTranslation()(withRouter(withGoogleReCaptcha(ForgotComponent)));

