import {faFileWord} from "@fortawesome/free-solid-svg-icons";
import React, {Component} from 'react';
import './edit.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import {query, update} from "../../../actions/group.actions";
import {connect} from "react-redux";

import AlertComponent from '../../alert/alert.component';
import withRouter from "../../../utils/with.router";
import {Group} from "../../../models/group.model";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsCommon} from "../../../interfaces/props.common.interface";
import {IPropsGroup, IStateGroup} from "../../../interfaces/group.interface";

class EditComponent extends Component <IPropsGroup, IStateGroup> {
    editId: number;

    constructor(props: IPropsGroup | Readonly<IPropsGroup>) {
        super(props);
        this.editId = 0;
    }

    async componentDidMount() {

        this.editId = +this.props.params.id;
        await this.props._query(this.editId);

    }


    handleSubmit = async (values: { name?: any; description?: any;  }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ name: any; description: any; }>> | undefined) => void) => {

        const group = new Group({
            id: this.editId,
            name: values.name.toLowerCase(),
            description: values.description,

        });
        await this.props._update(group, this.props);

    }

    render() {
        const {groupDetail} = this.props;
        return (
            <Formik
                initialValues={{

                    name: groupDetail.data![0].name,
                    description: groupDetail.data![0].description,

                }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    name: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    description: Yup.string()
                        .required('required').max(255, 'maxlength'),

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
                                        <FontAwesomeIcon icon={faFileWord}/>
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
}


const mapStateToProps = (state: IReduxState) => {
    return {
        groupDetail: state.group,
        queryArgument: state.queryArgument
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _update: (group: Group, props: IPropsCommon) => update(group, props, dispatch),
        _query: (argument: string | number | object | null) => query(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(EditComponent)));
