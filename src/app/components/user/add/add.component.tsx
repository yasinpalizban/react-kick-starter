import {faPhone, faUser, faEnvelope, faUsers, faAsterisk} from "@fortawesome/free-solid-svg-icons";
import React, {Component, useEffect} from 'react';
import './add.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState, FormikValues} from 'formik';
import * as Yup from 'yup';
import {retrieve, save, update} from "../../../actions/user.actions";
import * as groupActions from "../../../actions/group.actions";
import {connect} from "react-redux";
import AlertComponent from '../../../commons/alert/alert.component';
import withRouter from "../../../utils/with.router";
import { User } from "../../../models/user.model";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsCommon} from "../../../interfaces/props.common.interface";
import {IPropsUser} from "../../../interfaces/user.interface";

function AddComponent(props: IPropsUser) {
   const defaultPassword: string ='abc123456';

    useEffect(()=>{
        (async ()=>{
            if(+props.params.id){
                await props._retrieve(+props.params.id);
            }
            await props._groupRetrieve({limit:100});
        })();
    },[]);

   const handleSubmit = async (values: any, setSubmitting: any, resetForm:any) => {
       const user = new User(values);

       // const user = new User({
       //     id: +props.params.id,
       //     firstName: values.firstName,
       //     lastName: values.lastName,
       //     status: values.status=="1",
       //     groupId: values.groupId,
       // });
       if(+props.params.id){
           await props._update(user, props);
       }else{
           await props._save(user, props);

       }

    }


        const {groupList,user} = props;
        return (
            <Formik
                initialValues={{
                    password: defaultPassword||'',
                    email: user.data?.email||'',
                    phone: user.data?.phone||'',
                    username: user.data?.username||'',
                    firstName: user.data?.firstName||'',
                    lastName: user.data?.lastName||'',
                    groupId: user.data?.groupId||'',
                    status: user.data?.status||''
                }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .required('required').email().max(255, 'maxlength'),
                    username: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    phone: Yup.string()
                        .required('required').max(11, 'maxlength'),
                    lastName: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    firstName: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    groupId: Yup.string()
                        .required('required'),
                    password: Yup.string()
                        .required('required'),
                    status:Yup.string()
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
                                    <div className="input-group-addon"><Trans i18nKey="filed.userName"></Trans></div>
                                    <input value={values.username} type="text" id="username" name="username" required
                                           className={`form-control ${(errors.username && touched.username) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faUser}/>
                                    </div>

                                    <div className="invalid-feedback ">

                                        {
                                            errors.username === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }
                                        {errors.username === 'maxlength' ?
                                            <div className="pull-right"><Trans i18nKey="common.canNotBe"></Trans>
                                            </div> : ''
                                        }
                                    </div>

                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.email"></Trans></div>
                                    <input value={values.email} type="email" id="email" name="email" required
                                           className={`form-control ${(errors.email && touched.email) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faEnvelope}/>
                                    </div>

                                    <div className="invalid-feedback ">

                                        {
                                            errors.email === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }
                                        {errors.email === 'maxlength' ?
                                            <div className="pull-right"><Trans i18nKey="common.canNotBe"></Trans>
                                            </div> : ''
                                        }
                                    </div>

                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.phone"></Trans></div>
                                    <input value={values.phone} type="text" id="phone" name="phone" required
                                           className={`form-control ${(touched.phone && errors.phone) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faPhone}/>

                                    </div>
                                    <div className="invalid-feedback ">

                                        {
                                            errors.phone === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }
                                        {errors.phone === 'maxlength' ?
                                            <div className="pull-right"><Trans i18nKey="common.canNotBe"></Trans>
                                            </div> : ''
                                        }

                                    </div>

                                </div>
                            </div>


                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.firstName"></Trans></div>
                                    <input value={values.firstName} type="text" id="firstName" name="firstName" required
                                           className={`form-control ${(errors.firstName && touched.firstName) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faUser}/>
                                    </div>

                                    <div className="invalid-feedback ">

                                        {
                                            errors.firstName === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }
                                        {errors.firstName === 'maxlength' ?
                                            <div className="pull-right"><Trans i18nKey="common.canNotBe"></Trans>
                                            </div> : ''
                                        }
                                    </div>

                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.lastName"></Trans></div>
                                    <input value={values.lastName} type="text" id="lastName" name="lastName" required
                                           className={`form-control ${(errors.lastName && touched.lastName) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faUser}/>
                                    </div>

                                    <div className="invalid-feedback ">

                                        {
                                            errors.lastName === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }
                                        {errors.lastName === 'maxlength' ?
                                            <div className="pull-right"><Trans i18nKey="common.canNotBe"></Trans>
                                            </div> : ''
                                        }
                                    </div>

                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.status"></Trans></div>
                                    <select id="groupId" name="groupId" required
                                            className={`form-control ${(errors.groupId && touched.groupId) ? "is-invalid" : ""} `}
                                            onChange={handleChange} onBlur={handleBlur} defaultValue="1">
                                        <option disabled selected
                                        >{props.t('common.selectInputMessage')}</option>

                                        {
                                            groupList.data?.map((key:any) => <option value={key.id}>{key.name} </option>)
                                        }
                                    </select>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faUsers}/>
                                    </div>

                                    <div className="invalid-feedback ">

                                        {
                                            errors.groupId === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }

                                    </div>

                                </div>
                            </div>


                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon">{props.t('filed.password')}</div>
                                    <input type="text"
                                           id="password"
                                           name="password"
                                           value={values.password}
                                           onChange={handleChange} onBlur={handleBlur}
                                           className="form-control"
                                           readOnly={true}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faAsterisk}/>
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
                                        <option selected={values.status == true} value="1">{props.t('filed.activate')} </option>
                                        <option  value="0">{props.t('filed.deActivate')} </option>
                                    </select>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faUsers}/>
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
        user: state.userSelect,
        groupList: state.group,
        queryArgument: state.queryArgument
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _save: (user: User, props: IPropsCommon) => save(user, props, dispatch),
        _groupQuery: (argument: string | number | object | null) => groupActions.retrieve(argument, dispatch),
        _update: (user: User, props: IPropsCommon) => update(user, props, dispatch),
        _query: (argument: string | number | object | null) => retrieve(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(AddComponent)));


