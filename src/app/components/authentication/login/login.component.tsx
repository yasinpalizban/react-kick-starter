import React, {Component, useEffect} from 'react';
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import './login.component.scss';
import {Trans, withTranslation} from 'react-i18next';
import {connect, useDispatch} from 'react-redux'
import {signIn,isSignIn} from '../../../actions/auth.actions';
import withRouter from "../../../hooks/with.router";
import AlertComponent from "../../../commons/alert/alert.component";
import {Auth} from "../../../interfaces/authenticate.model";
import {IProps} from "../../../interfaces/props.common.interface";


function LoginComponent (props: IProps) {
    const dispatch =useDispatch();
    useEffect(() => {
        (async ()=>{
            await isSignIn(dispatch);
        })();
    },[]);

   const handleSubmit = async (values: { login: string; password: string;  remember:boolean}, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ login: string; password: string;remember:boolean }>> | undefined) => void) => {
         const auth = new Auth(values);
        await signIn(dispatch,auth);
    }


        return (
            <main>

                <div className="breadcrumbs">
                    <div className="page-header d-flex align-items-center x-header">
                        <div className="container position-relative">
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-6 text-center">
                                    <h2><Trans i18nKey="auth.signIn"></Trans></h2>

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
                                    <div className="content" >
                                        <Formik
                                            initialValues={{
                                                login: '',
                                                password: '',
                                                remember:false
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


                                                    <div className="login-content" >
                                                        <div className="login-logo">

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
                                                                        placeholder={props.t('filed.password')}
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

                                                                    <label style={{color:'red', padding: '10px'}} >
                                                                         <Trans
                                                                        i18nKey="auth.rememberMe"></Trans>
                                                                        <input  style={{marginLeft: '5px', padding: '5px'}}  onChange={handleChange} onBlur={handleBlur} id="remember"  type="checkbox" name="remember"/>
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
                                                                            onClick={(event)=>props.navigate('../sign-up')}
                                                                            className="btn btn-link btn-sm">
                                                                        <Trans
                                                                            i18nKey="auth.signUp"></Trans></button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={(event)=>props.navigate('../forgot')}
                                                                        className="btn btn-link btn-sm">
                                                                        <Trans
                                                                            i18nKey="auth.forgotPassword"></Trans>
                                                                    </button>
                                                                    <button type="button"
                                                                            onClick={(event)=>props.navigate('../reset-password')}
                                                                            className="btn btn-link btn-sm">
                                                                        <Trans
                                                                            i18nKey="auth.resetPassword"></Trans>
                                                                    </button>
                                                                    <button type="button"
                                                                            onClick={(event)=>props.navigate('../activation')}
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


export default withTranslation()(withRouter(LoginComponent));

