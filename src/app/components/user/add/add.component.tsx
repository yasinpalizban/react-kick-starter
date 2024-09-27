import {faPhone, faUser, faEnvelope, faUsers, faAsterisk} from "@fortawesome/free-solid-svg-icons";
import React, {Component, useEffect} from 'react';
import './add.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState, FormikValues} from 'formik';
import * as Yup from 'yup';
import {retrieve, save, update} from "../../../actions/user.actions";
import * as groupActions from "../../../actions/group.actions";
import {connect, useDispatch, useSelector} from "react-redux";
import AlertComponent from '../../../commons/alert/alert.component';
import withRouter from "../../../hooks/with.router";
import { User } from "../../../models/user.model";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IProps} from "../../../interfaces/props.common.interface";
import {IResponseObject} from "../../../interfaces/iresponse.object";
import {IUser} from "../../../interfaces/user.interface";
import {IGroup} from "../../../interfaces/group.interface";
import {detail} from "../../../actions/group.actions";
import ErrorHintComponent from "../../../commons/error-hint/error-hint.component";

function AddComponent(props: IProps) {
   const defaultPassword: string ='abc123456';
    const  user :IResponseObject<IUser> = useSelector((item:IReduxState)=>item.userSelect);
    const  groupList :IResponseObject<IGroup[]> = useSelector((item:IReduxState)=>item.group);
    const dispatch=useDispatch();
    const queryArgument  = useSelector((item: IReduxState) => item.queryArgument)
    useEffect(()=>{
        (async ()=>{
            if(+props.params.id){
                await detail(dispatch,+props.params.id);
                props={...props,queryArgument:queryArgument};
            }
        })();
    },[])

   const handleSubmit = async (values: any, setSubmitting: any, resetForm:any) => {
       const user = new User(values);
       if(+props.params.id){
           props={...props,queryArgument:queryArgument};
           await update(dispatch,user, props);
       }else{
           await save(dispatch,user, props);

       }

    }


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

                                    <ErrorHintComponent  name='username' errors={errors}/>

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

                                    <ErrorHintComponent  name='email' errors={errors}/>

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
                                    <ErrorHintComponent  name='phone' errors={errors}/>
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

                                    <ErrorHintComponent  name='firstName' errors={errors}/>

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

                                    <ErrorHintComponent  name='lastName' errors={errors}/>

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

                                    <ErrorHintComponent  name='groupId' errors={errors}/>

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

                                    <ErrorHintComponent  name='status' errors={errors}/>

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




export default withTranslation()(withRouter(AddComponent));


