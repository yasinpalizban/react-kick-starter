import React, { useRef, useState} from 'react';
import './user.info.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import {
    faUser,
    faVenusMars,
    faStickyNote
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AlertComponent from '../../../commons/alert/alert.component';
import { save} from "../../../actions/profile.actions";
import { useDispatch, useSelector} from "react-redux";
import avatar from '../../../../assets/images/icon/default-avatar.jpg';
import {Profile} from "../../../models/profile.model";
import { IReduxState} from "../../../interfaces/redux.type.interface";
import {IProfile} from "../../../interfaces/profile.interface";
import withRouter from "../../../hooks/with.router";
import {IResponseObject} from "../../../interfaces/iresponse.object";
import {IProps} from "../../../interfaces/props.common.interface";
import ErrorHintComponent from "../../../commons/error-hint/error-hint.component";

function UserInfoComponent (props:IProps) {
    const selectImage =  useRef<HTMLInputElement>(null);
    const [isNewImage, setNewImage] = useState(false);
    const [image,setImage] = useState(avatar)
    const formData: FormData =  new FormData();
    const profile:IResponseObject<IProfile> = useSelector((item:IReduxState)=> item.profile);
    const dispatch=useDispatch();


   const handleSubmit = async (values: { username: any; phone: any; email: any; firstName: any; lastName: any; gender: any; title: any; bio: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ username: any; phone: any; email: any; firstName: any; lastName: any; gender: any; title: any; bio: any; }>> | undefined) => void) => {
        const profile = new Profile({
            firstName: values.firstName,
            lastName: values.lastName,
            gender: values.gender,
            phone: values.phone,
            bio: values.bio,
            title:values.title
        });
       await save(dispatch,profile, props)
        if (isNewImage) {
            await save(dispatch,formData, props)
        }

    }

   const updateImage = (event: any) => {

        const file = event.target.files[0];
        // File Preview
        const reader = new FileReader();
        reader.onload = () => {
            const image = reader.result;
            formData.append('image', file, file.name);
            setNewImage(true)
            // @ts-ignore
            setImage(image)
        };
        reader.readAsDataURL(file);
    }



        return (
            <Formik
                initialValues={{
                    username: profile?.data?.username,
                    phone: profile?.data?.phone,
                    email: profile?.data?.email,
                    firstName: profile?.data?.firstName,
                    lastName: profile?.data?.lastName,
                    gender: profile?.data?.gender,
                    title: profile?.data?.title,
                    bio: profile?.data?.bio,

                }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    lastName: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    title: Yup.string()
                        .required('required').max(255, 'maxlength'),
                    bio: Yup.string()
                        .required('required').max(499, 'maxlength'),
                    gender: Yup.string()
                        .required('required'),
                })}
                onSubmit={(fields, {setSubmitting, resetForm}) => handleSubmit(fields, setSubmitting, resetForm)}>
                {
                    ({values, errors, touched, status, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
                        <form onSubmit={handleSubmit}>


                            <div className="form-group">
                                <AlertComponent/>
                            </div>
                            <div className="form-group">
                                <div className="profile">
                                    <div className="mx-auto d-block">
                                        <input
                                            ref={selectImage}
                                            accept="image/*"
                                            name="image" type="file"
                                            onChange={updateImage}
                                            id="selectImage"/>
                                        <img src={image} onClick={() => {
                                            selectImage?.current?.click()
                                        }}
                                             className="rounded-circle mx-auto d-block " alt="Card image cap"/>
                                        <div className="location text-sm-center">
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.userName"></Trans></div>
                                    <input  id="username" value={values.username ?? ""} readOnly
                                           name="username" className="form-control" required/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faUser}/>
                                    </div>

                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.email"></Trans></div>
                                    <input readOnly value={values.email ?? ""} type="email" id="email" name="email" required
                                           className={`form-control ${(errors.email && touched.email) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faUser}/>
                                    </div>

                                    <ErrorHintComponent  name='email' errors={errors}/>

                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.phone"></Trans></div>
                                    <input readOnly value={values.phone ?? ""} type="number" maxLength={10} id="phone"
                                           name="phone"
                                           required
                                           className={`form-control ${(errors.phone && touched.phone) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faUser}/>
                                    </div>

                                    <ErrorHintComponent  name='phone' errors={errors}/>

                                </div>
                            </div>


                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.firstName"></Trans></div>
                                    <input value={values.firstName ?? ""} type="text" id="firstName" name="firstName"
                                           required
                                           className={`form-control ${(errors.firstName && touched.firstName) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faUser}/>
                                    </div>

                                    <ErrorHintComponent  name='firstName' errors={errors}/>

                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.lastName"></Trans></div>
                                    <input value={values.lastName ?? ""} type="text" id="lastName" name="lastName"
                                           required
                                           className={`form-control ${(errors.lastName && touched.lastName) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faUser}/>
                                    </div>

                                    <ErrorHintComponent  name='lastName' errors={errors}/>

                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.gender"></Trans></div>
                                    <select id="gender" name="gender" required
                                            className={`form-control ${(errors.gender && touched.gender) ? "is-invalid" : ""} `}
                                            onChange={handleChange} onBlur={handleBlur} value={values.gender?? ""}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faVenusMars}/>
                                    </div>

                                    <ErrorHintComponent  name='gender' errors={errors}/>

                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.title"></Trans></div>
                                    <input value={values.title ?? ""} type="text" id="title" name="title" required
                                           className={`form-control ${(errors.title && touched.title) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faUser}/>
                                    </div>

                                    <ErrorHintComponent  name='title' errors={errors}/>

                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.bio"></Trans></div>
                                    <textarea rows={8} required id="bio" name="bio"
                                              defaultValue={values.bio ?? ""}
                                              className={`form-control ${(errors.bio && touched.bio) ? "is-invalid" : ""} `}
                                              onChange={handleChange} onBlur={handleBlur}>


                                    </textarea>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faStickyNote}/>
                                    </div>

                                    <ErrorHintComponent  name='bio' errors={errors}/>

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




export default withTranslation()(withRouter(UserInfoComponent));
