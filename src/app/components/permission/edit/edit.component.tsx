import {faFileWord, faStickyNote,faEye} from "@fortawesome/free-solid-svg-icons";
import React, {Component} from 'react';
import './edit.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import {query, update} from "../../../actions/permission.actions";
import {connect} from "react-redux";

import AlertComponent from '../../alert/alert.component';
import withRouter from "../../../utils/with.router";
import { Permission } from "../../../models/permission.model";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsCommon} from "../../../interfaces/props.common.interface";
import {IPropsPermission, IStatePermission} from "../../../interfaces/permission.interface";

class EditComponent extends Component <IPropsPermission, IStatePermission> {
  editId:number;
    constructor(props: IPropsPermission | Readonly<IPropsPermission>) {
        super(props);
this.editId=0;
    }

    async componentDidMount() {

        this.editId = +this.props.params.id;
        await this.props._query(this.editId);

    }


    handleSubmit = async (values: { name?: any; description?: any; active?: any;  }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ name: any; description: any; active: any; }>> | undefined) => void) => {

        const permission = new Permission({
            id: this.editId,
            name: values.name.toLowerCase(),
            description: values.description,
            active: values.active==1,

        });
        await this.props._update(permission, this.props);

    }

    render() {
        const {permissionDetail} = this.props;
        return (
            <Formik
                initialValues={{

                    name: permissionDetail.data![0].name,
                    description: permissionDetail.data![0].description,
                    active: permissionDetail.data![0].active
                }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    description: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    active: Yup.string()
                        .required('required'),
                })}
                onSubmit={(fields, {setSubmitting, resetForm}) => this.handleSubmit(fields, setSubmitting, resetForm)}>
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

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.active"></Trans></div>
                                    <select id="active" name="active" required
                                            className={`form-control ${(errors.active && touched.active) ? "is-invalid" : ""} `}
                                            onChange={handleChange} onBlur={handleBlur} defaultValue={1}>

                                        <option value="1">{this.props.t('filed.activate')} </option>
                                        <option value="0">{this.props.t('filed.deActivate')} </option>
                                    </select>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faEye}/>
                                    </div>

                                    <div className="invalid-feedback ">

                                        {
                                            errors.active === 'required' ?
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
}


const mapStateToProps = (state: IReduxState) => {
    return {
        permissionDetail: state.permission,
        queryArgument: state.queryArgument
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _update: (permission: Permission, props: IPropsCommon) => update(permission, props, dispatch),
        _query: (argument: string | number | object | null) => query(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(EditComponent)));
