import React, {Component, createRef} from 'react';
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import './activation.component.scss';
import {Trans, withTranslation} from 'react-i18next';
import {connect} from 'react-redux'
import {
    activateAccountViaEmail,
    activateAccountViaSms,
    sendActivateCodeViaEmail,
    sendActivateCodeViaSms
} from '../../../actions/auth.actions';
import withRouter from "../../../utils/with.router";
import AlertComponent from "../../../commons/alert/alert.component";
import {resetAlert} from "../../../actions/alert.actions";
import {Auth} from '../../../interfaces/authenticate.model';
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsCommon} from "../../../interfaces/props.common.interface";
import {IPropsAuth, IStateAuth} from "../../../interfaces/authenticate.interface";


class ActivationComponent extends Component <IPropsAuth, IStateAuth> {
    private phoneInput: React.RefObject<HTMLInputElement>;
    private emailInput: React.RefObject<HTMLInputElement>;

    constructor(props: IPropsAuth | Readonly<IPropsAuth>) {
        super(props);
        this.phoneInput = createRef<HTMLInputElement>();
        this.emailInput = createRef<HTMLInputElement>();
    }


    handleSubmit = async (values: { email: any; token: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ email: string; token: string; }>> | undefined) => void) => {

        const auth = new Auth({
            activeToken: values.token.replace(/\s/g, ""),
            email: values.email.replace(/\s/g, "")
        });
        await this.props._activateAccountViaEmail(auth, this.props);
    }

    handleSubmit2 = async (values: { phone: any; code: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ phone: string; code: string; }>> | undefined) => void) => {

        const auth = new Auth({
            activeToken: values.code.toString().replace(/\s/g, ""),
            phone: values.phone.replace(/\s/g, "")
        });
        await this.props._activateAccountViaSms(auth, this.props);
    }
    onClearAlert = () => {
        this.props._resetAlert();
    }

    onSendEmail = async () => {


        const auth = new Auth({email: this.emailInput?.current?.value});

         await this.props._sendActivateCodeViaEmail(auth, this.props);
    }
    onSendSms = async () => {

        const auth = new Auth({phone: this.phoneInput?.current?.value});
        await this.props._sendActivateCodeViaSms(auth, this.props)
    }

    render() {
        return (
            <main>

                <div className="breadcrumbs">
                    <div className="page-header d-flex align-items-center x-header">
                        <div className="container position-relative">
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-6 text-center">
                                    <h2><Trans i18nKey="auth.activationAccount"></Trans></h2>

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
                                                       href="src/app/components/authentication/activation/activation.component#custom-nav-info" role="tab" aria-controls="custom-nav-info"
                                                       aria-selected="true" onClick={this.onClearAlert}> <Trans
                                                        i18nKey="auth.activateViaEmail"></Trans> </a>
                                                    <a className="nav-item nav-link" id="custom-nav-address-tab"
                                                       data-toggle="tab"
                                                       href="src/app/components/authentication/activation/activation.component#custom-nav-address" role="tab"
                                                       aria-controls="custom-nav-address"
                                                       aria-selected="false" onClick={this.onClearAlert}> <Trans
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
                                                            token: ''
                                                        }}
                                                        validationSchema={Yup.object().shape({
                                                            email: Yup.string()
                                                                .required('required').max(255, 'maxlength'),
                                                            token: Yup.string().max(255, 'maxlength')
                                                                .required('required'),
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
                                                                                    placeholder={this.props.t('filed.email')}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    ref={this.emailInput}
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
                                                                                    placeholder={this.props.t('filed.token')}
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
                                                                            <div className="register-link ">

                                                                                <button
                                                                                    className="au-btn  au-btn--green   m-r-5 m-t-15"
                                                                                    type="submit"
                                                                                ><Trans i18nKey="common.submit"></Trans>
                                                                                </button>
                                                                                <button
                                                                                    className="au-btn  au-btn--blue m-l-5 m-t-15"
                                                                                    type="button"
                                                                                    onClick={this.onSendEmail}
                                                                                ><Trans
                                                                                    i18nKey="common.sendEmailLink"></Trans>
                                                                                </button>
                                                                            </div>

                                                                        </form>
                                                                        <div className="card"
                                                                             style={{
                                                                                 border: 'none',
                                                                                 padding: 0,
                                                                                 margin: 0
                                                                             }}>

                                                                            <div className="card-body">
                                                                                <button type="button"
                                                                                        onClick={(event) => this.props.navigate('../sign-in')}
                                                                                        className="btn btn-link btn-sm">
                                                                                    <Trans
                                                                                        i18nKey="auth.signIn"></Trans>
                                                                                </button>
                                                                                <button type="button"
                                                                                        onClick={(event) => this.props.navigate('../sign-up')}
                                                                                        className="btn btn-link btn-sm">
                                                                                    <Trans
                                                                                        i18nKey="auth.signUp"></Trans>
                                                                                </button>
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
                                                            code: ''
                                                        }}
                                                        validationSchema={Yup.object().shape({
                                                            phone: Yup.string()
                                                                .required('required').max(255, 'maxlength'),
                                                            code: Yup.string().max(255, 'maxlength')
                                                                .required('required'),
                                                        })}
                                                        onSubmit={(fields, {
                                                            setSubmitting,
                                                            resetForm
                                                        }) => this.handleSubmit2(fields, setSubmitting, resetForm)}>
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
                                                                                    placeholder={this.props.t('filed.phone')}
                                                                                    onChange={handleChange}
                                                                                    onBlur={handleBlur}
                                                                                    ref={this.phoneInput}
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
                                                                                    placeholder={this.props.t('filed.code')}
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
                                                                            <div className="register-link ">

                                                                                <button
                                                                                    className="au-btn  au-btn--green   m-r-5 m-t-15"
                                                                                    type="submit"
                                                                                ><Trans i18nKey="common.submit"></Trans>
                                                                                </button>
                                                                                <button
                                                                                    className="au-btn  au-btn--blue m-l-5 m-t-15"
                                                                                    type="button"
                                                                                    onClick={this.onSendSms}
                                                                                ><Trans
                                                                                    i18nKey="common.sendSmsCode"></Trans>
                                                                                </button>
                                                                            </div>

                                                                        </form>
                                                                        <div className="card"
                                                                             style={{
                                                                                 border: 'none',
                                                                                 padding: 0,
                                                                                 margin: 0
                                                                             }}>

                                                                            <div className="card-body">
                                                                                <button type="button"
                                                                                        onClick={(event) => this.props.navigate('../sign-in')}
                                                                                        className="btn btn-link btn-sm">
                                                                                    <Trans
                                                                                        i18nKey="auth.signIn"></Trans>
                                                                                </button>
                                                                                <button type="button"
                                                                                        onClick={(event) => this.props.navigate('../sign-up')}
                                                                                        className="btn btn-link btn-sm">
                                                                                    <Trans
                                                                                        i18nKey="auth.signUp"></Trans>
                                                                                </button>
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
}

const mapStateToProps = (state: IReduxState) => {
    return {}
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _activateAccountViaEmail: (auth: Auth, props: IPropsCommon) => activateAccountViaEmail(auth, props, dispatch),
        _activateAccountViaSms: (auth: Auth, props: IPropsCommon) => activateAccountViaSms(auth, props, dispatch),
        _sendActivateCodeViaSms: (auth: Auth, props: IPropsCommon) => sendActivateCodeViaSms(auth, props, dispatch),
        _sendActivateCodeViaEmail: (auth: Auth, props: IPropsCommon) => sendActivateCodeViaEmail(auth, props, dispatch),
        _resetAlert: () => resetAlert(dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(ActivationComponent)));

