import React, {Component} from 'react';
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import './register.component.scss';
import {Trans, withTranslation} from 'react-i18next';
import {connect} from 'react-redux'
import {signUp} from '../../actions/auth.actions';
import withRouter from "../../../shared/utils/with.router";
import AlertComponent from "../../../shared/components/alert/alert.component";
import {GoogleReCaptchaProvider, withGoogleReCaptcha} from 'react-google-recaptcha-v3';
import {environment} from "../../../../environments/environment";
import {Auth} from "../../models/authenticate.model";
import {IReduxDispatch, IReduxState} from "../../../shared/interfaces/redux.type.interface";
import {IPropsCommon} from "../../../shared/interfaces/props.common.interface";
import {IPropsAuth, IStateAuth} from "../../interfaces/authenticate.interface";

class RegisterComponent extends Component  <IPropsAuth,IStateAuth> {

    constructor(props: IPropsAuth | Readonly<IPropsAuth>) {
        super(props);
    }


    handleSubmit = async (values: { login?: string; username?: string; password?: string; passConfirm?: string; token?: any; action?: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ login: string; username: string; password: string; passConfirm: string; }>> | undefined) => void) => {

        const {executeRecaptcha}:any = this.props.googleReCaptchaProps;
        if (!executeRecaptcha) {
            console.log('Recaptcha has not been loaded');
            return;
        }
        values.token = await executeRecaptcha('importantAction');
        values.action = 'importantAction';
        const auth = new Auth(values);
        await this.props._signUp(auth,this.props);
    }

    render() {
        return (
            <main>
                <GoogleReCaptchaProvider reCaptchaKey={environment.captcha.siteKey}>
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
                                                        .required('required'),
                                                    username: Yup.string()
                                                        .required('required'),
                                                    password: Yup.string()
                                                        .required('required'),
                                                    passConfirm: Yup.string().required('required').oneOf([Yup.ref("password"), ""], "equal"),

                                                })}
                                                onSubmit={(fields, {
                                                    setSubmitting,
                                                    resetForm
                                                }) => this.handleSubmit(fields, setSubmitting, resetForm)}>
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
                                                                <a href="#">
                                                                    <Trans i18nKey="auth.signUp"></Trans>
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
                                                                            placeholder={this.props.t('filed.emailPhoneUsername')}
                                                                            onChange={handleChange} onBlur={handleBlur}/>

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
                                                                            id="login" name="login"
                                                                            placeholder={this.props.t('filed.userName')}
                                                                            onChange={handleChange} onBlur={handleBlur}/>

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
                                                                            placeholder={this.props.t('filed.password')}
                                                                            onChange={handleChange} onBlur={handleBlur}/>
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
                                                                            placeholder={this.props.t('filed.passwordConfirm')}
                                                                            onChange={handleChange} onBlur={handleBlur}/>
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
                                                                                onClick={(event) => this.props.navigate('../sign-in')}
                                                                                className="btn btn-link btn-sm">
                                                                            <Trans
                                                                                i18nKey="auth.signIn"></Trans></button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={(event) => this.props.navigate('../forgot')}
                                                                            className="btn btn-link btn-sm">
                                                                            <Trans
                                                                                i18nKey="auth.forgotPassword"></Trans>
                                                                        </button>
                                                                        <button type="button"
                                                                                onClick={(event) => this.props.navigate('../reset-password')}
                                                                                className="btn btn-link btn-sm">
                                                                            <Trans
                                                                                i18nKey="auth.resetPassword"></Trans>
                                                                        </button>
                                                                        <button type="button"
                                                                                onClick={(event) => this.props.navigate('../activation')}
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
                </GoogleReCaptchaProvider>


            </main>
        );
    }
}

const mapStateToProps = (state:IReduxState) => {
    return {}
}
const mapDispatchToProps = (dispatch:IReduxDispatch) => {
    return {
        _signUp: (auth:Auth,props:IPropsCommon) => signUp(auth,props, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(withGoogleReCaptcha(RegisterComponent))));

