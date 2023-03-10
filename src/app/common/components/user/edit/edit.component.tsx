import {
    faUser,
    faEnvelope, faPhone, faUsers
} from "@fortawesome/free-solid-svg-icons";
import React, {Component, useEffect} from 'react';
import './edit.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import {query, update} from "../../../actions/user.actions";
import {connect} from "react-redux";

import AlertComponent from '../../../../shared/components/alert/alert.component';
import withRouter from "../../../../shared/utils/with.router";
import * as groupActions from "../../../../authorization/actions/group.actions";
import {User} from "../../../models/user.model";
import {IReduxDispatch, IReduxState} from "../../../../shared/interfaces/redux.type.interface";
import {IPropsCommon} from "../../../../shared/interfaces/props.common.interface";
import {IPropsUser, IStateUser} from "../../../interfaces/user.interface";

class EditComponent extends Component <IPropsUser,IStateUser> {

    constructor(props: IPropsUser | Readonly<IPropsUser>) {
        super(props);

    }

    async componentDidMount() {

        const {id} = this.props.params;
        await this.props._query(+id);
        await this.props._groupQuery(null);

    }


    handleSubmit = async (values: { email?: any; phone?: any; username?: any; firstName?: any; lastName?: any; groupId?: any; status?: any; id?: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ email: any; phone: any; username: any; firstName: any; lastName: any; groupId: any; status: any; }>> | undefined) => void) => {
        const {id} = this.props.params;
        values.id = id;
        const user = new User(values);
        await this.props._update(user, this.props);

    }

    render() {
        const {userDetail, groupRows} = this.props;

        return (
            <Formik
                initialValues={{
                    email: userDetail.data![0].email,
                    phone: userDetail.data![0].phone,
                    username: userDetail.data![0].username,
                    firstName: userDetail.data![0].firstName,
                    lastName: userDetail.data![0].lastName,
                    groupId: userDetail.data![0].groupId,
                    status: userDetail.data![0].groupId
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
                    status:Yup.string()
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
                                    <input value={values.email} type="text" id="email" name="email" required
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
                                    <select id="status" name="status" required
                                            className={`form-control ${(errors.status && touched.status) ? "is-invalid" : ""} `}
                                            onChange={handleChange} onBlur={handleBlur} defaultValue="1">
                                        <option disabled selected>{this.props.t('common.selectInputMessage')}</option>

                                        {
                                            groupRows.data?.map((key:any) => <option value={key.id}>{key.name} </option>)
                                        }
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
}


const mapStateToProps = (state: IReduxState) => {
    return {
        userDetail: state.user,
        groupRows: state.group,
        queryArgument: state.queryArgument
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _update: (user: User, props: IPropsCommon) => update(user, props, dispatch),
        _query: (argument: string | number | object | null) => query(argument, dispatch),
        _groupQuery: (argument: string | number | object | null) => groupActions.query(argument, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(EditComponent)));
