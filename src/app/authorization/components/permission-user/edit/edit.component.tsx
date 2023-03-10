import {faAsterisk} from "@fortawesome/free-solid-svg-icons";
import React, {Component} from 'react';
import './edit.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import {query, update} from "../../../actions/permission.user.actions";
import {connect} from "react-redux";
import AlertComponent from '../../../../shared/components/alert/alert.component';
import withRouter from "../../../../shared/utils/with.router";
import * as  userActions from "../../../../common/actions/user.actions";
import * as permissionActions from "../../../actions/permission.actions";
import { PermissionUser } from "../../../models/permission.user.model";
import {IReduxDispatch, IReduxState} from "../../../../shared/interfaces/redux.type.interface";
import {IPropsCommon} from "../../../../shared/interfaces/props.common.interface";
import {IPropsPermissionUser, IStatePermissionUser} from "../../../interfaces/permission.user.interface";

class EditComponent extends Component <IPropsPermissionUser, IStatePermissionUser> {

    constructor(props: IPropsPermissionUser | Readonly<IPropsPermissionUser>) {
        super(props);
        this.state = {
            isDelete: false,
            isGet: false,
            isPost: false,
            isPut: false,
            isCheck: false
        }

    }

    async componentDidMount() {

        const {id} = this.props.params;
        await this.props._query(+id);
        await this.props._userQuery(null);
        await this.props._permissionQuery(null);

        this.props.permissionUserDetail.data![0].actions.split("-").forEach((value:string) => {

            if (value === "get")
                this.setState({isGet: true});

            else if (value === "post")
                this.setState({isPost: true});

            else if (value === "put")
                this.setState({isPut: true});

            else if (value === "delete")
                this.setState({isDelete: true});

        });


    }

    onCheckboxChange = (event: any) => {
        this.setState({isCheck: true});

        switch (event.target.value) {
            case "-get":
                this.setState({isGet: !this.state.isGet});
                break;
            case "-post":
                this.setState({isPost: !this.state.isPost});
                break;

            case "-put":
                this.setState({isPut: !this.state.isPut});
                break;

            case "-delete":
                this.setState({isDelete: !this.state.isDelete});
                break;
        }

    }


    handleSubmit = async (values: { permissionId: any; userId?: any; actions?: never[]; groupId?: any; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ permissionId: any; userId: any; actions: never[]; }>> | undefined) => void) => {
        const {id} = this.props.params;

        let combineAction = '';

        if (this.state.isCheck) {
            combineAction = (this.state.isGet ? '-get' : '') + (this.state.isPost ? '-post' : '') + (this.state.isPut ? '-put' : '') + (this.state.isDelete ? '-delete' : '');
        } else {
            combineAction = this.props.permissionUserDetail.data![0]?.actions;
        }

        const permission = {
            id: id,
            permissionId: values.permissionId,
            groupId: values.groupId,
            actions: combineAction
        };


        const permissionUser = new PermissionUser(permission);
        await this.props._update(permissionUser, this.props);

    }

    render() {
        const {permissionUserDetail, userRows, permissionRows} = this.props;

        return (
            <Formik
                initialValues={{
                    permissionId: permissionUserDetail.data![0].permissionId,
                    userId: permissionUserDetail.data![0].userId,
                    actions: [],

                }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    permissionId: Yup.string()
                        .required('required'),
                    userId: Yup.string()
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
                                    <div className="input-group-addon"><Trans i18nKey="filed.group"></Trans></div>
                                    <select id="userId" name="userId" required
                                            className={`form-control ${(errors.userId && touched.userId) ? "is-invalid" : ""} `}
                                            onChange={handleChange} onBlur={handleBlur} defaultValue="1">
                                        <option disabled selected
                                                >{this.props.t('common.selectInputMessage')}</option>
                                        {
                                            userRows?.data?.map((item, i: number) => <option
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
                                            <input name="actions" value="-get" onChange={this.onCheckboxChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
                                                   checked={this.state.isGet}
                                                   className="switch-input "/>
                                            <span data-on="Get" data-off="Get" className="switch-label"></span>
                                            <span className="switch-handle"></span>
                                        </label>


                                        <label style={{transform: 'scale(1)'}}
                                               className="switch switch-text switch-success switch-pill m-r-5 m-l-5">
                                            <input name="actions" value="-post" onChange={this.onCheckboxChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
                                                   checked={this.state.isPost}
                                                   className="switch-input"/>
                                            <span data-on="Pst" data-off="Pst" className="switch-label"></span>
                                            <span className="switch-handle"></span>
                                        </label>

                                        <label style={{transform: 'scale(1)'}}
                                               className="switch switch-text switch-warning switch-pill m-r-5 m-l-5">
                                            <input name="actions" value="-put" onChange={this.onCheckboxChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
                                                   checked={this.state.isPut}
                                                   className="switch-input"/>
                                            <span data-on="Put" data-off="Put" className="switch-label"></span>
                                            <span className="switch-handle"></span>
                                        </label>
                                        <label style={{transform: 'scale(1)'}}
                                               className="switch switch-text switch-danger switch-pill  m-l-5">
                                            <input name="actions" value="-delete" onChange={this.onCheckboxChange}
                                                   onBlur={handleBlur}
                                                   type="checkbox"
                                                   checked={this.state.isDelete}
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
        permissionUserDetail: state.permissionUser,
        userRows: state.user,
        permissionRows: state.permission,
        queryArgument: state.queryArgument
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _update: (permissionUser: PermissionUser, props: IPropsCommon) => update(permissionUser, props, dispatch),
        _query: (argument: string | number | object | null) => query(argument, dispatch),
        _userQuery: () => userActions.query(null, dispatch),
        _permissionQuery: () => permissionActions.query(null, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(EditComponent)));
