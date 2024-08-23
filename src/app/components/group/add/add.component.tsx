import {faFileWord, faStickyNote} from "@fortawesome/free-solid-svg-icons";
import React, {Component, useEffect} from 'react';
import './add.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import {detail, save, update} from "../../../actions/group.actions";
import {connect} from "react-redux";
import AlertComponent from '../../../commons/alert/alert.component';
import withRouter from "../../../utils/with.router";
import {Group} from "../../../models/group.model";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsCommon} from "../../../interfaces/props.common.interface";
import {IPropsGroup} from "../../../interfaces/group.interface";

function AddComponent(props: IPropsGroup) {
    useEffect(()=>{
        (async ()=>{
            if(+props.params.id){
                await props._detail(+props.params.id);
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
            await props._update(group, props);
        } else {
            await props._save(group, props);
        }

    }
    const {group} = props;

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

                                <div className="invalid-feedback ">

                                    {
                                        errors.name === 'required' ?
                                            <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                            </div> : ''
                                    }
                                    {errors.name === 'maxlength' ?
                                        <div className="pull-right"><Trans i18nKey="common.canNotBe"></Trans>
                                        </div> : ''
                                    }
                                </div>

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
                                <div className="invalid-feedback ">

                                    {
                                        errors.description === 'required' ?
                                            <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                            </div> : ''
                                    }
                                    {errors.description === 'maxlength' ?
                                        <div className="pull-right"><Trans i18nKey="common.canNotBe"></Trans>
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


const mapStateToProps = (state: IReduxState) => {
    return { group: state.groupSelect,
        queryArgument: state.queryArgument}
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _save: (group: Group, props: IPropsCommon) => save(group, props, dispatch),
        _update: (group: Group, props: IPropsCommon) => update(group, props, dispatch),
        _detail: (argument:  number | null) => detail(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(AddComponent)));


