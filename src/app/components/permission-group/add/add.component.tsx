import {faAsterisk} from "@fortawesome/free-solid-svg-icons";
import React, {Component, useEffect, useRef, useState} from 'react';
import './add.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState,ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {detail, save, update, retrieve} from "../../../actions/permission..group.actions";
import * as groupActions from "../../../actions/group.actions";
import * as permissionActions from "../../../actions/permission.actions";
import {connect, useDispatch, useSelector} from "react-redux";
import AlertComponent from '../../../commons/alert/alert.component';
import withRouter from "../../../hooks/with.router";
import {PermissionGroup} from "../../../models/permission.group.model";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IProps} from "../../../interfaces/props.common.interface";
import {IPermissionGroup} from "../../../interfaces/permission.group.interface";
import {IResponseObject} from "../../../interfaces/iresponse.object";
import {IGroup} from "../../../interfaces/group.interface";
import {IPermission} from "../../../interfaces/permission.interface";
import ErrorHintComponent from "../../../commons/error-hint/error-hint.component";


function AddComponent(props: IProps) {
    const permissionGroup: IResponseObject<IPermissionGroup> = useSelector((item: IReduxState) => item.permissionGroupSelect);
    const groupList: IResponseObject<IGroup[]> = useSelector((item: IReduxState) => item.group);
    const permissionList: IResponseObject<IPermission[]> = useSelector((item: IReduxState) => item.permission);
    const queryArgument = useSelector((item: IReduxState) => item.queryArgument)

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await initData();
        })();
    }, []);

    const initData = async () => {
        await groupActions.retrieve(dispatch);
        await permissionActions.retrieve(dispatch, {limit: 20});
        if (+props.params.id) {
            await retrieve(dispatch, +props.params.id);
        }
    }

    const handleSubmit = async (values: { permissionId: any; groupId: any; actions: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ permissionId: string; groupId: string; actions: never[]; }>> | undefined) => void) => {
        let combineAction = '';
        values.actions.forEach((ctl: string) => combineAction += ctl);
        const permission = {
            id: +props.params.id,
            permissionId: values.permissionId,
            groupId: values.groupId,
            actions: combineAction
        };

        const permissionGroup = new PermissionGroup(permission);
        if (+props.params.id) {
            props = {...props, queryArgument: queryArgument};
            await update(dispatch, permissionGroup, props);

        } else {
            await save(dispatch, permissionGroup, props);
        }

    }


    return (
        <Formik
            initialValues={{
                permissionId: permissionGroup?.data?.permissionId || '',
                groupId: permissionGroup?.data?.groupId || '',
                actions: permissionGroup?.data?.actions.split("-") || []
            }}
            validationSchema={Yup.object().shape({
                permissionId: Yup.string()
                    .required('required'),
                groupId: Yup.string()
                    .required('required'),

                actions: Yup.array().required('required')
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
                                <div className="input-group-addon"><Trans i18nKey="filed.group"></Trans></div>
                                <select id="groupID" name="groupId" required value={values.groupId}
                                        className={`form-control ${(errors.groupId && touched.groupId) ? "is-invalid" : ""} `}
                                        onChange={handleChange} onBlur={handleBlur}>
                                    <option disabled selected
                                    >{props.t('common.selectInputMessage')}</option>
                                    {
                                        groupList?.data?.map((item, i: number) => <option key={i}
                                                                                          value={item.id}>{item.name} </option>)
                                    }
                                </select>
                                <div className="input-group-addon">
                                    <FontAwesomeIcon icon={faAsterisk}/>
                                </div>
                                <ErrorHintComponent  name='groupId' errors={errors}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-addon"><Trans i18nKey="filed.permissionId"></Trans>
                                </div>
                                <select value={values.permissionId} id="permissionId" name="permissionId" required
                                        className={`form-control ${(errors.permissionId && touched.permissionId) ? "is-invalid" : ""} `}
                                        onChange={handleChange} onBlur={handleBlur}>
                                    <option disabled selected
                                    >{props.t('common.selectInputMessage')}</option>
                                    {
                                        permissionList?.data?.map((item, i: number) => <option key={i}
                                                                                               value={item.id}>{item.name} </option>)
                                    }
                                </select>
                                <div className="input-group-addon">
                                    <FontAwesomeIcon icon={faAsterisk}/>
                                </div>

                                <ErrorHintComponent  name='permissionId' errors={errors}/>

                            </div>
                        </div>


                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-addon"><Trans i18nKey="filed.actions"></Trans></div>

                                <div className="form-control form-check-inline form-check" style={{border: 'none'}}>

                                    <label style={{transform: 'scale(1)'}}
                                           className="switch switch-text switch-primary switch-pill lg m-r-10 m-l-20">
                                        <input name="actions" value="-get" onChange={handleChange}
                                               onBlur={handleBlur}
                                               type="checkbox"
                                               className="switch-input "/>
                                        <span data-on="Get" data-off="Get" className="switch-label"></span>
                                        <span  className="switch-handle"></span>
                                    </label>

                                    <label style={{transform: 'scale(1)'}}
                                           className="switch switch-text switch-success switch-pill m-r-5 m-l-5">
                                        <input name="actions" value="-post" onChange={handleChange}
                                               onBlur={handleBlur}
                                               type="checkbox"
                                               className="switch-input"/>
                                        <span data-on="Pst" data-off="Pst" className="switch-label"></span>
                                        <span className="switch-handle"></span>
                                    </label>

                                    <label style={{transform: 'scale(1)'}}
                                           className="switch switch-text switch-warning switch-pill m-r-5 m-l-5">
                                        <input name="actions" value="-put" onChange={handleChange}
                                               onBlur={handleBlur}
                                               type="checkbox"
                                               className="switch-input"/>
                                        <span data-on="Put" data-off="Put" className="switch-label"></span>
                                        <span className="switch-handle"></span>
                                    </label>
                                    <label style={{transform: 'scale(1)'}}
                                           className="switch switch-text switch-danger switch-pill  m-l-5">
                                        <input name="actions" value="-delete" onChange={handleChange}
                                               onBlur={handleBlur}
                                               type="checkbox"
                                               className="switch-input"/>
                                        <span style={{fontSize: '10px !important'}} data-on="Del" data-off="Del"
                                              className="switch-label"></span>
                                        <span className="switch-handle"></span>
                                    </label>
                                </div>
                                <div className="input-group-addon">
                                    <FontAwesomeIcon icon={faAsterisk}/>
                                </div>
                                <ErrorHintComponent  name='actions' errors={errors}/>
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


