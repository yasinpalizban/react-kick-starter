import {faFileWord, faStickyNote} from "@fortawesome/free-solid-svg-icons";
import React, {Component, useEffect} from 'react';
import './add.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import {detail, save, update} from "../../../actions/group.actions";
import {connect, useDispatch, useSelector} from "react-redux";
import AlertComponent from '../../../commons/alert/alert.component';
import withRouter from "../../../hooks/with.router";
import {Group} from "../../../models/group.model";
import { IReduxState} from "../../../interfaces/redux.type.interface";
import {IProps} from "../../../interfaces/props.common.interface";
import {IResponseObject} from "../../../interfaces/iresponse.object";
import {IGroup} from "../../../interfaces/group.interface";
import ErrorHintComponent from "../../../commons/error-hint/error-hint.component";

function AddComponent(props: IProps) {
    const group:IResponseObject<IGroup> =  useSelector((item:IReduxState)=> item.groupSelect);
    const dispatch= useDispatch();
    const queryArgument  = useSelector((item: IReduxState) => item.queryArgument)
    useEffect(()=>{
        (async ()=>{
            if(+props.params.id){
                await detail(dispatch,+props.params.id);;
            }
        })();
    },[])

    const handleSubmit = async (values: { name: string; description: string; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ name: string; description: string; }>> | undefined) => void) => {

        const group = new Group({
            id: +props.params.id,
            name: values.name.toLowerCase(),
            description: values.description,
        });
        if (+props.params.id) {
            props={...props,queryArgument:queryArgument};
            await update(dispatch,group, props);
        } else {
            await save(dispatch,group, props);
        }

    }

    return (
        <Formik
            initialValues={{
                name: group.data?.name||'',
                description: group.data?.description||'',
            }}
            enableReinitialize={true}
            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .required('required').max(255, 'maxlength'),
                description: Yup.string()
                    .required('required').max(255, 'maxlength'),

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
                                <div className="input-group-addon"><Trans i18nKey="filed.name"></Trans></div>
                                <input value={values.name} type="text" id="name" name="name" required
                                       className={`form-control ${(errors.name && touched.name) ? "is-invalid" : ""} `}
                                       onChange={handleChange} onBlur={handleBlur}/>
                                <div className="input-group-addon">
                                    <FontAwesomeIcon icon={faStickyNote}/>
                                </div>
                                <ErrorHintComponent  name='name' errors={errors}/>


                            </div>
                        </div>

                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-addon"><Trans i18nKey="filed.description"></Trans></div>
                                <input value={values.description} type="text" id="description" name="description"
                                       required
                                       className={`form-control ${(errors.description && touched.description) ? "is-invalid" : ""} `}
                                       onChange={handleChange} onBlur={handleBlur}/>
                                <div className="input-group-addon">
                                    <FontAwesomeIcon icon={faFileWord}/>

                                </div>
                                <ErrorHintComponent  name='description' errors={errors}/>
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


