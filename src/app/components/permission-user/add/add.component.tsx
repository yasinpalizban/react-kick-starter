import {faAsterisk} from "@fortawesome/free-solid-svg-icons";
import React, {Component} from 'react';
import './add.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import {save} from "../../../actions/permission.user.actions";
import * as  userActions from "../../../actions/user.actions";
import * as permissionActions from "../../../actions/permission.actions";
import {connect} from "react-redux";
import AlertComponent from '../../alert/alert.component';
import withRouter from "../../../utils/with.router";
import { PermissionUser } from "../../../models/permission.user.model";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsCommon} from "../../../interfaces/props.common.interface";
import {IPropsPermissionUser, IStatePermissionUser} from "../../../interfaces/permission.user.interface";
import * as groupActions from "../../../actions/group.actions";
import {ISearch} from "../../../interfaces/search.interface";
import {FunctionSearchType} from "../../../enums/function.search.enum";
import {RoleType} from "../../../enums/role.enum";


class AddComponent extends Component <IPropsPermissionUser, IStatePermissionUser> {

    constructor(props: IPropsPermissionUser | Readonly<IPropsPermissionUser>) {
        super(props);

    }

    async componentDidMount() {

        const search: ISearch = {
            fun: FunctionSearchType.Where,
            sgn: '!=',
            val: RoleType.Member
        };

        const queryParam = new URLSearchParams();
        queryParam.append('name', JSON.stringify(search));
        const params: any = {
            q: queryParam
        };
        await this.props._groupQuery(params);

        await this.props._userQuery(null);
        await this.props._groupQuery(params);
        await this.props._permissionQuery({limit:20});

    }


    handleSubmit = async (values: {  groupId: any;permissionId: any; userId: any; actions: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ groupId: string; permissionId: string; userId: string; actions: never[]; }>> | undefined) => void) => {
        let combineAction = '';
        values.actions.forEach((ctl:string) => combineAction += ctl);
        const permission = {
            permissionId: values.permissionId,
            userId: values.userId,
            actions: combineAction

        };

        const permissionUser = new PermissionUser(permission);

        await this.props._save(permissionUser, this.props);

    }
    onChangeGroup=async (event: any)=>{
        const value = event.currentTarget.value;
        const queryParam = new URLSearchParams();
        const searchRule = {
            fun: FunctionSearchType.Where,
            sgn: '=',
            jin: 'auth_groups',
            val: value
        };
        queryParam.append('name', JSON.stringify(searchRule));
        const query= {
            q: queryParam
        };
        await this.props._userQuery(query);
    }
    render() {
        const {userRows, permissionRows, groupRows} = this.props;

        return (
            <Formik
                initialValues={{
                    permissionId: '',
                    groupId: '',
                    userId: '',
                    actions: []
                }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    permissionId: Yup.string()
                        .required('required'),
                    userId: Yup.string()
                        .required('required'),
                    actions: Yup.array().min(1).required('required')
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
                                    <div className="input-group-addon"><Trans i18nKey="filed.group"></Trans></div>
                                    <select id="groupID" name="groupId" required
                                            className={`form-control ${(errors.groupId && touched.groupId) ? "is-invalid" : ""} `}
                                            onChange={async (event) => {
                                                handleChange(event);
                                                await this.onChangeGroup(event);
                                            }}
                                            onBlur={handleBlur} defaultValue="1">
                                        <option disabled selected
                                        >{this.props.t('common.selectInputMessage')}</option>
                                        {
                                            groupRows?.data?.map((item, i: number) => <option
                                                value={item.name}>{item.name} </option>)
                                        }
                                    </select>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faAsterisk}/>
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
                                    <div className="input-group-addon"><Trans i18nKey="filed.userName"></Trans></div>
                                    <select id="userId" name="userId" required
                                            className={`form-control ${(errors.userId && touched.userId) ? "is-invalid" : ""} `}
                                            onChange={handleChange} onBlur={handleBlur} defaultValue="1">
                                        <option disabled selected
                                                >{this.props.t('common.selectInputMessage')}</option>
                                        {
                                            userRows?.data?.map((item, i:number) => <option
                                                value={item.id}>{item.username + ' (' + item.firstName + '  ' + item.lastName + ')'} </option>)
                                        }
                                    </select>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faAsterisk}/>
                                    </div>

                                    <div className="invalid-feedback ">

                                        {
                                            errors.userId === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }

                                    </div>

                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.permissionId"></Trans>
                                    </div>
                                    <select id="permissionId" name="permissionId" required
                                            className={`form-control ${(errors.permissionId && touched.permissionId) ? "is-invalid" : ""} `}
                                            onChange={handleChange} onBlur={handleBlur} defaultValue="1">
                                        <option disabled selected
                                                >{this.props.t('common.selectInputMessage')}</option>
                                        {
                                            permissionRows?.data?.map((item, i: number) => <option
                                                value={item.id}>{item.name} </option>)
                                        }
                                    </select>
                                    <div className="input-group-addon">
                                        <FontAwesomeIcon icon={faAsterisk}/>
                                    </div>

                                    <div className="invalid-feedback ">

                                        {
                                            errors.permissionId === 'required' ?
                                                <div className="pull-right"><Trans i18nKey="common.required"></Trans>
                                                </div> : ''
                                        }

                                    </div>

                                </div>
                            </div>


                            <div className="form-group">
                                <div className="input-group">
                                    <div className="input-group-addon"><Trans i18nKey="filed.actions"></Trans></div>

                                    <div className="form-control form-check-inline form-check" style={{border: 'none'}}>

                                        <label style={{transform: 'scale(1)'}}
                                               className="switch switch-text switch-primary switch-pill lg m-r-10 m-l-20">
                                            <input name="actions" value="-get" onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
                                                   className="switch-input "/>
                                            <span data-on="Get" data-off="Get" className="switch-label"></span>
                                            <span className="switch-handle"></span>
                                        </label>


                                        <label style={{transform: 'scale(1)'}}
                                               className="switch switch-text switch-success switch-pill m-r-5 m-l-5">
                                            <input name="actions" value="-post" onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
                                                   className="switch-input"/>
                                            <span data-on="Pst" data-off="Pst" className="switch-label"></span>
                                            <span className="switch-handle"></span>
                                        </label>

                                        <label style={{transform: 'scale(1)'}}
                                               className="switch switch-text switch-warning switch-pill m-r-5 m-l-5">
                                            <input name="actions" value="-put" onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
                                                   className="switch-input"/>
                                            <span data-on="Put" data-off="Put" className="switch-label"></span>
                                            <span className="switch-handle"></span>
                                        </label>
                                        <label style={{transform: 'scale(1)'}}
                                               className="switch switch-text switch-danger switch-pill  m-l-5">
                                            <input name="actions" value="-delete" onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
                                                   className="switch-input"/>
                                            <span style={{fontSize: '10px !important'}} data-on="Del" data-off="Del"
                                                  className="switch-label"></span>
                                            <span className="switch-handle"></span>
                                        </label>


                                    </div>
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


const mapStateToProps = (state: IReduxState) => {
    return {
        userRows: state.user,
        permissionRows: state.permission,
        groupRows: state.group,
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _save: (permissionUser: PermissionUser, props: IPropsCommon) => save(permissionUser, props, dispatch),
        _userQuery: (argument: number | string | object|null) => userActions.query(argument, dispatch),
        _permissionQuery: (argument: number | string | object|null) => permissionActions.query(argument, dispatch),
        _groupQuery: (argument: number | string | object|null) => groupActions.query(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(AddComponent)));


