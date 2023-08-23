import {faPhone, faUser, faEnvelope, faUsers, faAsterisk} from "@fortawesome/free-solid-svg-icons";
import React, {Component} from 'react';
import './add.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import {save} from "../../../actions/user.actions";
import * as groupActions from "../../../actions/group.actions";
import {connect} from "react-redux";
import AlertComponent from '../../alert/alert.component';
import withRouter from "../../../utils/with.router";
import { User } from "../../../models/user.model";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsCommon} from "../../../interfaces/props.common.interface";
import {IPropsUser, IStateUser} from "../../../interfaces/user.interface";

class AddComponent extends Component <IPropsUser,IStateUser> {
    defaultPassword: string;
    constructor(props: IPropsUser | Readonly<IPropsUser>) {
        super(props);
        this.defaultPassword = 'abc123456';;
    }

    async componentDidMount() {
        await this.props._groupQuery(null);
    }

    handleSubmit = async (values: { email: string; phone: string; username: string; firstName: string; lastName: string; groupId: string; password:string;  }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ email: string; phone: string; username: string; firstName: string; lastName: string; groupId: string;password:string;  }>> | undefined) => void) => {
       const user = new User(values);
        await this.props._save(user, this.props);

    }

    render() {
        const {groupRows} = this.props;
        return (
            <Formik
                initialValues={{
                    email: '',
                    phone: '',
                    username: '',
                    firstName: '',
                    lastName: '',
                    groupId: '',
                    password: this.defaultPassword
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
                                        >{this.props.t('common.selectInputMessage')}</option>

                                        {
                                            groupRows.data?.map((key:any) => <option value={key.id}>{key.name} </option>)
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
                                    <div className="input-group-addon">{this.props.t('filed.password')}</div>
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
        groupRows: state.group
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _save: (user: User, props: IPropsCommon) => save(user, props, dispatch),
        _groupQuery: (argument: string | number | object | null) => groupActions.query(argument, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(AddComponent)));


