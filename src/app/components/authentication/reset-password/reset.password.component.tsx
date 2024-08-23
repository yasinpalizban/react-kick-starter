import React, {Component, LegacyRef, useRef} from 'react';
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import './reset.password.component.scss';
import {Trans, withTranslation} from 'react-i18next';
import {connect} from 'react-redux'
import {
    resetPasswordViaEmail, resetPasswordViaSms
} from '../../../actions/auth.actions';
import withRouter from "../../../utils/with.router";
import AlertComponent from "../../../commons/alert/alert.component";
import {resetAlert} from "../../../actions/alert.actions";
import {Auth} from '../../../interfaces/authenticate.model';
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsCommon} from "../../../interfaces/props.common.interface";
import {IPropsAuth} from "../../../interfaces/authenticate.interface";


function ResetPasswordComponent(props: IPropsAuth) {
    const useEmailInput = useRef<HTMLInputElement>(null);
    const usePhoneInput = useRef<HTMLInputElement>(null);

    const handleSubmit = async (values: { email: string; token: string; password: string; passConfirm: string; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ email: string; token: string; password: string; passConfirm: string; }>> | undefined) => void) => {
        const auth = new Auth({
            email: values.email,
            password: values.password,
            passConfirm: values.passConfirm,
            resetToken: values.token,
        });
        await props._resetPasswordViaEmail(auth, props);
    }

    const handleSubmit2 = async (values: { phone: string; code: string; password: string; passConfirm: string; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ phone: string; code: string; password: string; passConfirm: string; }>> | undefined) => void) => {
        const auth = new Auth({
            phone: values.phone,
            password: values.password,
            passConfirm: values.passConfirm,
            resetToken: values.code
        });
        await props._resetPasswordViaSms(auth, props);
    }
    const onClearAlert = () => {
        props._resetAlert();
    }

    return (
        <main>
            <div className="breadcrumbs">
                <div className="page-header d-flex align-items-center x-header">
                    <div className="container position-relative">
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-6 text-center">
                                <h2><Trans i18nKey="auth.resetPassword"></Trans></h2>

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
                                <div>
                                    <div className="content">

                                        <nav>
                                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                                <a className="nav-item nav-link active" id="custom-nav-info-tab"
                                                   data-toggle="tab"
                                                   href="src/app/components/authentication/reset-password/reset.password.component#custom-nav-info"
                                                   role="tab" aria-controls="custom-nav-info"
                                                   aria-selected="true" onClick={onClearAlert}> <Trans
                                                    i18nKey="auth.activateViaEmail"></Trans> </a>
                                                <a className="nav-item nav-link" id="custom-nav-address-tab"
                                                   data-toggle="tab"
                                                   href="src/app/components/authentication/reset-password/reset.password.component#custom-nav-address"
                                                   role="tab"
                                                   aria-controls="custom-nav-address"
                                                   aria-selected="false" onClick={onClearAlert}> <Trans
                                                    i18nKey="auth.activateViaSms"></Trans> </a>

                                            </div>
                                        </nav>
                                        <div className="tab-content pl-3 pt-2" id="nav-tabContent">
                                            <div className="tab-pane fade show active" id="custom-nav-info"
                                                 role="tabpanel"
                                                 aria-labelledby="custom-nav-info-tab">

                                                <Formik
                                                    initialValues={{
                                                        email: '',
                                                        token: '',
                                                        password: '',
                                                        passConfirm: '',
                                                    }}
                                                    validationSchema={Yup.object().shape({
                                                        email: Yup.string()
                                                            .required('required').max(255, 'maxlength'),
                                                        token: Yup.string().max(255, 'maxlength')
                                                            .required('required'),
                                                        password: Yup.string()
                                                            .required('required').max(255, 'maxlength'),
                                                        passConfirm: Yup.string()
                                                            .required('required').max(255, 'maxlength').oneOf([Yup.ref("password"), ""], "equal"),
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

                                                                    <a href="src/app/components/authentication/reset-password/reset.password.component#">

                                                                    </a>
                                                                </div>
                                                                <div className="login-form">
                                                                    <form onSubmit={handleSubmit}>

                                                                        <div className="form-group">
                                                                            <AlertComponent/>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label> <Trans
                                                                                i18nKey="filed.email"></Trans>
                                                                            </label>
                                                                            <input
                                                                                className={`au-input au-input--full   ${(errors.email && touched.email && errors.email) ? "is-invalid" : ""} `}
                                                                                type="email"
                                                                                id="email" name="email"
                                                                                placeholder={props.t('filed.email')}
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                ref={useEmailInput}
                                                                            />

                                                                            <div className="invalid-feedback">
                                                                                {
                                                                                    errors.email === 'required' ?
                                                                                        <div className="pull-right">
                                                                                            <Trans
                                                                                                i18nKey="common.required"></Trans>
                                                                                        </div> : ''
                                                                                }

                                                                                {errors.email === 'maxlength' ?
                                                                                    <div className="pull-right"><Trans
                                                                                        i18nKey="common.canNotBe"></Trans>
                                                                                    </div> : ''
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label> <Trans
                                                                                i18nKey="filed.token"></Trans></label>
                                                                            <input
                                                                                className={`au-input au-input--full   ${(errors.token && touched.token && errors.token) ? "is-invalid" : ""} `}
                                                                                id="token"
                                                                                type="text" name="token"
                                                                                placeholder={props.t('filed.token')}
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}/>
                                                                            <div className="invalid-feedback ">
                                                                                {
                                                                                    errors.token === 'required' ?
                                                                                        <div className="pull-right">
                                                                                            <Trans
                                                                                                i18nKey="common.required"></Trans>
                                                                                        </div> : ''
                                                                                }

                                                                                {errors.token === 'maxlength' ?
                                                                                    <div className="pull-right"><Trans
                                                                                        i18nKey="common.canNotBe"></Trans>
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
                                                                                        <div className="pull-right">
                                                                                            <Trans
                                                                                                i18nKey="common.required"></Trans>
                                                                                        </div> : ''
                                                                                }
                                                                                {errors.password === 'maxlength' ?
                                                                                    <div className="pull-right">
                                                                                        <Trans
                                                                                            i18nKey="common.canNotBe"></Trans>
                                                                                    </div> : ''
                                                                                }
                                                                            </div>
                                                                        </div>


                                                                        <div className="form-group">

                                                                            <label> <Trans
                                                                                i18nKey="filed.passwordConfirm"></Trans></label>

                                                                            <input type="password"
                                                                                   id="passConfirm"
                                                                                   name="passConfirm" required
                                                                                   className={`au-input au-input--full  ${(errors.passConfirm && touched.passConfirm && errors.passConfirm) ? "is-invalid" : ""} `}
                                                                                   onChange={handleChange}
                                                                                   onBlur={handleBlur}/>

                                                                            <div className="invalid-feedback ">
                                                                                {
                                                                                    errors.passConfirm === 'required' ?
                                                                                        <div className="pull-right">
                                                                                            <Trans
                                                                                                i18nKey="common.required"></Trans>
                                                                                        </div> : ''
                                                                                }
                                                                                {errors.passConfirm === 'maxlength' ?
                                                                                    <div className="pull-right">
                                                                                        <Trans
                                                                                            i18nKey="common.canNotBe"></Trans>
                                                                                    </div> : ''
                                                                                }
                                                                                {errors.passConfirm === 'equal' ?
                                                                                    <div className="pull-right">
                                                                                        <Trans
                                                                                            i18nKey="common.notEqual"></Trans>
                                                                                    </div> : ''
                                                                                }

                                                                            </div>
                                                                        </div>
                                                                        <button
                                                                            className="au-btn au-btn--block au-btn--green m-b-20 m-t-20"
                                                                            type="submit">
                                                                            <Trans i18nKey="auth.resetPassword"></Trans>
                                                                        </button>
                                                                    </form>
                                                                    <div className="card"
                                                                         style={{
                                                                             border: 'none',
                                                                             padding: 0,
                                                                             margin: 0
                                                                         }}>

                                                                        <div className="card-body">
                                                                            <button type="button"
                                                                                    onClick={(event) => props.navigate('../sign-in')}
                                                                                    className="btn btn-link btn-sm">
                                                                                <Trans
                                                                                    i18nKey="auth.signIn"></Trans>
                                                                            </button>
                                                                            <button type="button"
                                                                                    onClick={(event) => props.navigate('../sign-up')}
                                                                                    className="btn btn-link btn-sm">
                                                                                <Trans
                                                                                    i18nKey="auth.signUp"></Trans>
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                onClick={(event) => props.navigate('../forgot')}
                                                                                className="btn btn-link btn-sm">
                                                                                <Trans
                                                                                    i18nKey="auth.forgotPassword"></Trans>
                                                                            </button>
                                                                            <button type="button"
                                                                                    onClick={(event) => props.navigate('../tionactiva')}
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
                                            <div className="tab-pane fade" id="custom-nav-address" role="tabpanel"
                                                 aria-labelledby="custom-nav-address-tab">

                                                <Formik
                                                    initialValues={{
                                                        phone: '',
                                                        code: '',
                                                        password: '',
                                                        passConfirm: '',
                                                    }}
                                                    validationSchema={Yup.object().shape({
                                                        phone: Yup.string()
                                                            .required('required').max(255, 'maxlength'),
                                                        code: Yup.string().max(255, 'maxlength')
                                                            .required('required'),
                                                        password: Yup.string()
                                                            .required('required').max(255, 'maxlength'),
                                                        passConfirm: Yup.string()
                                                            .required('required').max(255, 'maxlength').oneOf([Yup.ref("password"), ""], "equal"),
                                                    })}
                                                    onSubmit={(fields, {
                                                        setSubmitting,
                                                        resetForm
                                                    }) => handleSubmit2(fields, setSubmitting, resetForm)}>
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

                                                                    <a href="src/app/components/authentication/reset-password/reset.password.component#">

                                                                    </a>
                                                                </div>
                                                                <div className="login-form">
                                                                    <form onSubmit={handleSubmit}>

                                                                        <div className="form-group">
                                                                            <AlertComponent/>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label> <Trans
                                                                                i18nKey="filed.phone"></Trans>
                                                                            </label>
                                                                            <input
                                                                                className={`au-input au-input--full   ${(errors.phone && touched.phone && errors.phone) ? "is-invalid" : ""} `}
                                                                                type="phone"
                                                                                id="phone" name="phone"
                                                                                placeholder={props.t('filed.phone')}
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}
                                                                                ref={usePhoneInput}
                                                                            />

                                                                            <div className="invalid-feedback">
                                                                                {
                                                                                    errors.phone === 'required' ?
                                                                                        <div className="pull-right">
                                                                                            <Trans
                                                                                                i18nKey="common.required"></Trans>
                                                                                        </div> : ''
                                                                                }

                                                                                {errors.phone === 'maxlength' ?
                                                                                    <div className="pull-right"><Trans
                                                                                        i18nKey="common.canNotBe"></Trans>
                                                                                    </div> : ''
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label> <Trans
                                                                                i18nKey="filed.code"></Trans></label>
                                                                            <input
                                                                                className={`au-input au-input--full   ${(errors.code && touched.code && errors.code) ? "is-invalid" : ""} `}
                                                                                id="code"
                                                                                type="text" name="code"
                                                                                placeholder={props.t('filed.code')}
                                                                                onChange={handleChange}
                                                                                onBlur={handleBlur}/>
                                                                            <div className="invalid-feedback ">
                                                                                {
                                                                                    errors.code === 'required' ?
                                                                                        <div className="pull-right">
                                                                                            <Trans
                                                                                                i18nKey="common.required"></Trans>
                                                                                        </div> : ''
                                                                                }

                                                                                {errors.code === 'maxlength' ?
                                                                                    <div className="pull-right"><Trans
                                                                                        i18nKey="common.canNotBe"></Trans>
                                                                                    </div> : ''
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label>
                                                                                <Trans
                                                                                    i18nKey="filed.password"></Trans>
                                                                            </label>

                                                                            <input type="password" id="password"
                                                                                   name="password" required
                                                                                   className={`au-input au-input--full  ${(errors.password && touched.password && errors.password) ? "is-invalid" : ""} `}
                                                                                   onChange={handleChange}
                                                                                   onBlur={handleBlur}/>


                                                                            <div className="invalid-feedback ">
                                                                                {
                                                                                    errors.password === 'required' ?
                                                                                        <div className="pull-right">
                                                                                            <Trans
                                                                                                i18nKey="common.required"></Trans>
                                                                                        </div> : ''
                                                                                }
                                                                                {errors.password === 'maxlength' ?
                                                                                    <div className="pull-right">
                                                                                        <Trans
                                                                                            i18nKey="common.canNotBe"></Trans>
                                                                                    </div> : ''
                                                                                }

                                                                            </div>
                                                                        </div>


                                                                        <div className="form-group">
                                                                            <label>
                                                                                <Trans
                                                                                    i18nKey="filed.passwordConfirm"></Trans></label>

                                                                            <input type="password"
                                                                                   id="passConfirm"
                                                                                   name="passConfirm" required
                                                                                   className={`au-input au-input--full  ${(errors.passConfirm && touched.passConfirm && errors.passConfirm) ? "is-invalid" : ""} `}
                                                                                   onChange={handleChange}
                                                                                   onBlur={handleBlur}/>

                                                                            <div className="invalid-feedback ">
                                                                                {
                                                                                    errors.passConfirm === 'required' ?
                                                                                        <div className="pull-right">
                                                                                            <Trans
                                                                                                i18nKey="common.required"></Trans>
                                                                                        </div> : ''
                                                                                }
                                                                                {errors.passConfirm === 'maxlength' ?
                                                                                    <div className="pull-right">
                                                                                        <Trans
                                                                                            i18nKey="common.canNotBe"></Trans>
                                                                                    </div> : ''
                                                                                }
                                                                                {errors.passConfirm === 'equal' ?
                                                                                    <div className="pull-right">
                                                                                        <Trans
                                                                                            i18nKey="common.notEqual"></Trans>
                                                                                    </div> : ''
                                                                                }


                                                                            </div>
                                                                        </div>
                                                                        <button
                                                                            className="au-btn au-btn--block au-btn--green m-b-20 m-t-20"
                                                                            type="submit">
                                                                            <Trans i18nKey="auth.resetPassword"></Trans>
                                                                        </button>

                                                                    </form>
                                                                    <div className="card"
                                                                         style={{
                                                                             border: 'none',
                                                                             padding: 0,
                                                                             margin: 0
                                                                         }}>

                                                                        <div className="card-body">
                                                                            <button type="button"
                                                                                    onClick={(event) => props.navigate('../sign-in')}
                                                                                    className="btn btn-link btn-sm">
                                                                                <Trans
                                                                                    i18nKey="auth.signIn"></Trans>
                                                                            </button>
                                                                            <button type="button"
                                                                                    onClick={(event) => props.navigate('../sign-up')}
                                                                                    className="btn btn-link btn-sm">
                                                                                <Trans
                                                                                    i18nKey="auth.signUp"></Trans>
                                                                            </button>
                                                                            <button
                                                                                type="button"
                                                                                onClick={(event) => props.navigate('../forgot')}
                                                                                className="btn btn-link btn-sm">
                                                                                <Trans
                                                                                    i18nKey="auth.forgotPassword"></Trans>
                                                                            </button>
                                                                            <button type="button"
                                                                                    onClick={(event) => props.navigate('../tionactiva')}
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
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );

}

const mapStateToProps = (state: IReduxState) => {
    return {}
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _resetPasswordViaEmail: (auth: Auth, props: IPropsCommon) => resetPasswordViaEmail(auth, props, dispatch),
        _resetPasswordViaSms: (auth: Auth, props: IPropsCommon) => resetPasswordViaSms(auth, props, dispatch),
        _resetAlert: () => resetAlert(dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(ResetPasswordComponent)));

