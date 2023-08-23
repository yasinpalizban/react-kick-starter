import {faMapMarker, faAddressBook, faMap} from "@fortawesome/free-solid-svg-icons";
import React, {Component} from 'react';
import './user.address.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import {query, save} from "../../../actions/profile.actions";
import {connect} from "react-redux";

import AlertComponent from '../../alert/alert.component';
import {Profile} from "../../../models/profile.model";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsProfile, IStateProfile} from "../../../interfaces/profile.interface";
import withRouter from "../../../utils/with.router";
import {IPropsCommon} from "../../../interfaces/props.common.interface";

class UserAddressComponent extends Component <IPropsProfile, IStateProfile> {

    constructor(props: IPropsProfile | Readonly<IPropsProfile>) {
        super(props);


    }

    async componentDidMount() {
        await this.props._query(null);

    }

    componentWillUnmount() {

    }


    handleSubmit = async (values: { country: any; city: any; address: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ country: any; city: any; address: any; }>> | undefined) => void) => {
        const profile = new Profile(values);
        await this.props._save(profile, this.props);

    }

    render() {
        const {profileDetail} = this.props;
        return (
            <Formik
                initialValues={{
                    country: profileDetail?.data?.country,
                    city: profileDetail?.data?.city,
                    address: profileDetail?.data?.address
                }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    country: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    city: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    address: Yup.string()
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
                                    <div className="input-group-addon"><Trans i18nKey="filed.country"></Trans></div>
                                    <input value={values.country ?? ""} type="text" id="country" name="country" required
                                           className={`form-control ${(errors.country && touched.country) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faMap}/>
                                    </div>

                                    <div className="invalid-feedback ">

                                        {
                                            errors.country === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }
                                        {errors.country === 'maxlength' ?
                                            <div className="pull-right"><Trans i18nKey="common.canNotBe"></Trans>
                                            </div> : ''
                                        }
                                    </div>

                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.city"></Trans></div>
                                    <input value={values.city ?? ""} type="text" id="city" name="city" required
                                           className={`form-control ${(touched.city && errors.city) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faMapMarker}/>

                                    </div>
                                    <div className="invalid-feedback ">

                                        {
                                            errors.city === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }
                                        {errors.city === 'maxlength' ?
                                            <div className="pull-right"><Trans i18nKey="common.canNotBe"></Trans>
                                            </div> : ''
                                        }

                                    </div>

                                </div>
                            </div>


                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.address"></Trans></div>
                                    <input value={values.address ?? ""} type="text" id="address" name="address" required
                                           className={`form-control ${(errors.address && touched.address) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faAddressBook}/>

                                    </div>
                                    <div className="invalid-feedback ">

                                        {
                                            errors.address === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }
                                        {errors.address === 'maxlength' ?
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
        profileDetail: state.profile
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _save: (profile: Profile|FormData,props:IPropsCommon) => save(profile, props,dispatch),
        _query: (argument: string | number | object | null) => query(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(UserAddressComponent)));
