import {faAsterisk} from "@fortawesome/free-solid-svg-icons";
import React, {Component} from 'react';
import './edit.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {Formik, FormikState} from 'formik';
import * as Yup from 'yup';
import {query, update} from "../../../actions/permission..group.actions";
import {connect} from "react-redux";

import AlertComponent from '../../alert/alert.component';
import withRouter from "../../../utils/with.router";
import * as groupActions from "../../../actions/group.actions";
import * as permissionActions from "../../../actions/permission.actions";
import {PermissionGroup} from "../../../models/permission.group.model";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsCommon} from "../../../interfaces/props.common.interface";
import {IPropsPermissionGroup, IStatePermissionGroup} from "../../../interfaces/permission.group.interface";

class EditComponent extends Component <IPropsPermissionGroup, IStatePermissionGroup> {
    editId: number;

    constructor(props: IPropsPermissionGroup | Readonly<IPropsPermissionGroup>) {
        super(props);
        this.state = {
            isDelete: false,
            isGet: false,
            isPost: false,
            isPut: false,
            isCheck: false
        }
        this.editId = 0;

    }

    async componentDidMount() {

        this.editId = +this.props.params.id;
        await this.props._query(this.editId);
        await this.props._groupQuery(null);
        await this.props._permissionQuery({limit: 20});

        this.props.permissionGroupDetail.data![0].actions.split("-").forEach((value: string) => {

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


    handleSubmit = async (values: { permissionId: any; groupId?: any; actions?: never[]; }, setSubmitting: (isSubmitting: boolean) => void, resetForm: (nextState?: Partial<FormikState<{ permissionId: any; groupId: any; actions: never[]; }>> | undefined) => void) => {


        let combineAction = '';

        if (this.state.isCheck) {
            combineAction = (this.state.isGet ? '-get' : '') + (this.state.isPost ? '-post' : '') + (this.state.isPut ? '-put' : '') + (this.state.isDelete ? '-delete' : '');
        } else {
            combineAction = this.props.permissionGroupDetail.data![0]?.actions;
        }

        const permission = {
            id: this.editId,
            permissionId: values.permissionId,
            groupId: values.groupId,
            actions: combineAction
        };


        const permissionGroup = new PermissionGroup(permission);
        await this.props._update(permissionGroup, this.props);

    }

    render() {
        const {permissionGroupDetail, groupRows, permissionRows} = this.props;

        return (
            <Formik
                initialValues={{
                    permissionId: permissionGroupDetail.data![0].permissionId,
                    groupId: permissionGroupDetail.data![0].groupId,
                    actions: [],

                }}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    permissionId: Yup.string()
                        .required('required'),
                    groupId: Yup.string()
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
                                    <select id="groupId" name="groupId" required
                                            className={`form-control ${(errors.groupId && touched.groupId) ? "is-invalid" : ""} `}
                                            onChange={handleChange} onBlur={handleBlur} defaultValue="1">
                                        <option disabled selected
                                        >{this.props.t('common.selectInputMessage')}</option>
                                        {
                                            groupRows?.data?.map((item, i: number) => <option
                                                value={item.id}>{item.name} </option>)
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
        permissionGroupDetail: state.permissionGroup,
        groupRows: state.group,
        permissionRows: state.permission,
        queryArgument: state.queryArgument
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _update: (permissionGroup: PermissionGroup, props: IPropsCommon) => update(permissionGroup, props, dispatch),
        _query: (argument: string | number | object | null) => query(argument, dispatch),
        _groupQuery: (argument: number | string | object | null) => groupActions.query(argument, dispatch),
        _permissionQuery: (argument: number | string | object | null) => permissionActions.query(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(EditComponent)));
