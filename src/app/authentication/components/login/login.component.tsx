import React, {Component} from 'react';
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import './login.component.scss';
import {Trans, withTranslation} from 'react-i18next';
import {connect} from 'react-redux'
import {signIn} from '../../actions/auth.actions';
import withRouter from "../../../shared/utils/with.router";
import AlertComponent from "../../../shared/components/alert/alert.component";
import {IReduxDispatch, IReduxState} from "../../../shared/interfaces/redux.type.interface";
import {Auth} from "../../models/authenticate.model";
import {IPropsAuth, IStateAuth} from "../../interfaces/authenticate.interface";


class LoginComponent extends Component <IPropsAuth,IStateAuth> {

    constructor(props: IPropsAuth | Readonly<IPropsAuth>) {
        super(props);
    }


    handleSubmit = async (values: { login: string; password: string; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ login: string; password: string; }>> | undefined) => void) => {
        const auth = new Auth(values);
        await this.props._signIn(auth);

    }

    render() {
        return (
            <main>
                <section className="p-t-120 p-b-80 ">
                    <div className="container">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-lg-12">
                                <div className="wrapper">
                                    <div className="content">
                                        <Formik
                                            initialValues={{
                                                login: '',
                                                password: ''
                                            }}
                                            validationSchema={Yup.object().shape({
                                                login: Yup.string()
                                                    .required('required'),
                                                password: Yup.string()
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
                                                            <a href="#">
                                                                <Trans i18nKey="auth.signIn"></Trans>
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
                                                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
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
                                                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                                                </div> : ''
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <div className="login-checkbox">
                                                                    <label>
                                                                        <input type="checkbox" name="remember"/> <Trans
                                                                        i18nKey="auth.rememberMe"></Trans>
                                                                    </label>
                                                                    <label>
                                                                        <a href="#"> <Trans
                                                                            i18nKey="auth.rememberMe"></Trans></a>
                                                                    </label>
                                                                </div>
                                                                <button
                                                                    className="au-btn au-btn--block au-btn--green m-b-20"
                                                                    type="submit">
                                                                    <Trans i18nKey="auth.signIn"></Trans>
                                                                </button>
                                                            </form>
                                                            <div className="card"
                                                                 style={{border: 'none', padding: 0, margin: 0}}>

                                                                <div className="card-body">

                                                                    <button type="button"
                                                                            onClick={(event)=>this.props.navigate('../sign-up')}
                                                                            className="btn btn-link btn-sm">
                                                                        <Trans
                                                                            i18nKey="auth.signUp"></Trans></button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={(event)=>this.props.navigate('../forgot')}
                                                                        className="btn btn-link btn-sm">
                                                                        <Trans
                                                                            i18nKey="auth.forgotPassword"></Trans>
                                                                    </button>
                                                                    <button type="button"
                                                                            onClick={(event)=>this.props.navigate('../reset-password')}
                                                                            className="btn btn-link btn-sm">
                                                                        <Trans
                                                                            i18nKey="auth.resetPassword"></Trans>
                                                                    </button>
                                                                    <button type="button"
                                                                            onClick={(event)=>this.props.navigate('../activation')}
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
}

const mapStateToProps = (state:IReduxState) => {
    return {}
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _signIn: (auth:Auth) => signIn(auth, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(LoginComponent)));

