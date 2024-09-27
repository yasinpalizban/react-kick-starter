import {faMapMarker, faAddressBook, faMap} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect} from 'react';
import './user.address.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import {retrieve, save} from "../../../actions/profile.actions";
import AlertComponent from '../../../commons/alert/alert.component';
import {Profile} from "../../../models/profile.model";
import { IReduxState} from "../../../interfaces/redux.type.interface";
import {IProfile} from "../../../interfaces/profile.interface";
import withRouter from "../../../hooks/with.router";
import {IProps} from "../../../interfaces/props.common.interface";
import {useDispatch, useSelector} from "react-redux";
import {IResponseObject} from "../../../interfaces/iresponse.object";
import ErrorHintComponent from "../../../commons/error-hint/error-hint.component";

function UserAddressComponent (props: IProps) {
    const profile:IResponseObject<IProfile> = useSelector((item:IReduxState)=> item.profile);
    const dispatch=useDispatch();
    useEffect(()=>{
        (async ()=>{
            await retrieve(dispatch);
        })();
    },[]);


   const handleSubmit = async (values: { country: any; city: any; address: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ country: any; city: any; address: any; }>> | undefined) => void) => {
        const profile = new Profile(values);
        await save(dispatch,profile, props);

    }



        return (
            <Formik
                initialValues={{
                    country: profile?.data?.country,
                    city: profile?.data?.city,
                    address: profile?.data?.address
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
                onSubmit={(fields, {setSubmitting, resetForm}) => handleSubmit(fields, setSubmitting, resetForm)}>
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

                                    <ErrorHintComponent  name='country' errors={errors}/>

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
                                    <ErrorHintComponent  name='city' errors={errors}/>

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
                                    <ErrorHintComponent  name='address' errors={errors}/>

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

export default withTranslation()(withRouter(UserAddressComponent));
