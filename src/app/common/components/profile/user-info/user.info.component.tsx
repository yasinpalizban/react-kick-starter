import {faMapMarker, faAddressBook, faMap} from "@fortawesome/free-solid-svg-icons";
import React, {Component, createRef} from 'react';
import './user.info.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import {
    faEnvelope,
    faPhone,
    faUser,
    faVenusMars,
    faStickyNote
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AlertComponent from '../../../../shared/components/alert/alert.component';
import {query, save} from "../../../actions/profile.actions";
import {connect} from "react-redux";
import avatar from '../../../../../assets/images/icon/default-avatar.jpg';
import {Profile} from "../../../models/profile.model";
import {IReduxDispatch, IReduxState} from "../../../../shared/interfaces/redux.type.interface";
import {IPropsProfile, IStateProfile} from "../../../interfaces/profile.interface";
import withRouter from "../../../../shared/utils/with.router";

class UserInfoComponent extends Component <IPropsProfile, IStateProfile> {
    private selectImage: React.RefObject<HTMLInputElement>;
    private isNewImage: boolean;
    private formData: FormData;

    constructor(props: IPropsProfile | Readonly<IPropsProfile>) {
        super(props);
        this.selectImage = createRef<HTMLInputElement>();
        this.isNewImage = false;
        this.state = {image: avatar}
        this.formData = new FormData();
    }


    handleSubmit = async (values: { username: any; phone: any; email: any; firstName: any; lastName: any; gender: any; title: any; bio: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ username: any; phone: any; email: any; firstName: any; lastName: any; gender: any; title: any; bio: any; }>> | undefined) => void) => {
        const profile = new Profile(values);

        await this.props._save(profile);

        if (this.isNewImage) {
            await this.props._save(this.formData);
        }


    }

    updateImage = (event: any) => {

        const file = event.target.files[0];
        // File Preview
        const reader = new FileReader();
        reader.onload = () => {
            const image = reader.result;
            this.formData.append('image', file, file.name);
            //  this.formData.append('"_method', "PUT");
            this.isNewImage = true;
            this.setState({image: image})
        };
        reader.readAsDataURL(file);
    }

    render() {
        const {profileDetail} = this.props;
        return (
            <Formik
                initialValues={{
                    username: profileDetail?.data?.username,
                    phone: profileDetail?.data?.phone,
                    email: profileDetail?.data?.email,
                    firstName: profileDetail?.data?.firstName,
                    lastName: profileDetail?.data?.lastName,
                    gender: profileDetail?.data?.gender,
                    title: profileDetail?.data?.title,
                    bio: profileDetail?.data?.bio,

                }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    password: Yup.string()
                        .required(),
                    repeatPassword: Yup.string()
                        .required(),
                })}
                onSubmit={(fields, {setSubmitting, resetForm}) => this.handleSubmit(fields, setSubmitting, resetForm)}>
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
                                            ref={this.selectImage}
                                            accept="image/*"
                                            name="image" type="file"
                                            onChange={this.updateImage}
                                            id="selectImage"/>
                                        <img src={this.state.image} onClick={() => {
                                            this.selectImage?.current?.click()
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
                                    <input id="username" value={values.username ?? ""} readOnly
                                           name="username" className="form-control" required/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faUser}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group">
                                        <div className="input-group-addon"><Trans i18nKey="filed.email"></Trans></div>
                                        <input value={values.email ?? ""} type="email" id="email" name="email" required
                                               className={`form-control ${(errors.email && touched.email) ? "is-invalid" : ""} `}
                                               onChange={handleChange} onBlur={handleBlur}/>
                                        <div className="input-group-addon">
                                            <FontAwesomeIcon icon={faUser}/>
                                        </div>

                                        <div className="invalid-feedback ">

                                            {
                                                errors.email === 'required' ?
                                                    <div className="pull-right"><Trans
                                                        i18nKey="common.required"></Trans>
                                                    </div> : ''
                                            }
                                            {errors.email === 'maxlength' ?
                                                <div className="pull-right"><Trans i18nKey="common.canNotBe"></Trans>
                                                </div> : ''
                                            }
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.phone"></Trans></div>
                                    <input value={values.phone ?? ""} type="number" maxLength={10} id="phone"
                                           name="phone"
                                           required
                                           className={`form-control ${(errors.phone && touched.phone) ? "is-invalid" : ""} `}
                                           onChange={handleChange} onBlur={handleBlur}/>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faUser}/>
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
                                    <input value={values.firstName ?? ""} type="text" id="firstName" name="firstName"
                                           required
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
                                    <input value={values.lastName ?? ""} type="text" id="lastName" name="lastName"
                                           required
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
                                    <div className="input-group-addon"><Trans i18nKey="filed.gender"></Trans></div>
                                    <select id="gender" name="gender" required
                                            className={`form-control ${(errors.gender && touched.gender) ? "is-invalid" : ""} `}
                                            onChange={handleChange} onBlur={handleBlur}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faVenusMars}/>
                                    </div>

                                    <div className="invalid-feedback ">

                                        {
                                            errors.gender === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }

                                    </div>

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

                                    <div className="invalid-feedback ">

                                        {
                                            errors.title === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }
                                        {errors.title === 'maxlength' ?
                                            <div className="pull-right"><Trans i18nKey="common.canNotBe"></Trans>
                                            </div> : ''
                                        }
                                    </div>

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

                                    <div className="invalid-feedback ">

                                        {
                                            errors.bio === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }
                                        {errors.bio === 'maxlength' ?
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
        _save: (profile: Profile | FormData) => save(profile, dispatch),
        _query: (argument: string | number | object | null) => query(argument, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserInfoComponent));
