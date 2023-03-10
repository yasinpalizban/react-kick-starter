import {faMapMarker, faAddressBook, faMap, faFileWord, faEye} from "@fortawesome/free-solid-svg-icons";
import React, {Component, useEffect} from 'react';
import './edit.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import {query, update} from "../../../actions/setting.actions";
import {connect} from "react-redux";

import AlertComponent from '../../../../shared/components/alert/alert.component';
import withRouter from "../../../../shared/utils/with.router";
import { Setting } from "../../../models/setting.model";
import {IReduxDispatch, IReduxState} from "../../../../shared/interfaces/redux.type.interface";
import {IPropsCommon} from "../../../../shared/interfaces/props.common.interface";
import {IPropsSetting, IStateSetting} from "../../../interfaces/setting.interface";

class EditComponent extends Component <IPropsSetting, IStateSetting> {

    constructor(props: IPropsSetting | Readonly<IPropsSetting>) {
        super(props);

    }

    async componentDidMount() {

        const {id} = this.props.params;
        await this.props._query(+id);

    }


    handleSubmit = async (values: { key?: any; value?: any; description?: any; status?: any; id?: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ key: any; value: any; description: any; status: any; }>> | undefined) => void) => {
        const {id} = this.props.params;
        values.id = id;
        const setting = new Setting(values);
        await this.props._update(setting, this.props);

    }

    render() {
        const {settingDetail} = this.props;
        return (
            <Formik
                initialValues={{

                    key: settingDetail.data![0].key,
                    value: settingDetail.data![0].value,
                    description: settingDetail.data![0].description,
                    status: settingDetail.data![0].status
                }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    key: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    value: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    description: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    status: Yup.string()
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
                                    <div className="input-group-addon"><Trans i18nKey="filed.key"></Trans></div>
                                    <input value={values.key} type="text" id="key" name="key" required
                                           className={`form-control ${(errors.key && touched.key) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faFileWord}/>
                                    </div>

                                    <div className="invalid-feedback ">

                                        {
                                            errors.key === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }
                                        {errors.key === 'maxlength' ?
                                            <div className="pull-right"><Trans i18nKey="common.canNotBe"></Trans>
                                            </div> : ''
                                        }
                                    </div>

                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.value"></Trans></div>
                                    <input value={values.value} type="text" id="value" name="value" required
                                           className={`form-control ${(touched.value && errors.value) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faFileWord}/>

                                    </div>
                                    <div className="invalid-feedback ">

                                        {
                                            errors.value === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }
                                        {errors.value === 'maxlength' ?
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
                                        <FontAwesomeIcon icon={faAddressBook}/>

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
                                    <div className="input-group-addon"><Trans i18nKey="filed.status"></Trans></div>
                                    <select id="status" name="status" required
                                            className={`form-control ${(errors.status && touched.status) ? "is-invalid" : ""} `}
                                            onChange={handleChange} onBlur={handleBlur} defaultValue={1}>

                                        <option value="1">{this.props.t('filed.activate')} </option>
                                        <option value="0">{this.props.t('filed.deActivate')} </option>
                                    </select>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faEye}/>
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
}


const mapStateToProps = (state:IReduxState) => {
    return {
        settingDetail: state.setting,
        queryArgument: state.queryArgument
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {

    return {
        _update: (setting: Setting, props: IPropsCommon) => update(setting, props, dispatch),
        _query: (argument: string | number | object | null) => query(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(EditComponent)));
