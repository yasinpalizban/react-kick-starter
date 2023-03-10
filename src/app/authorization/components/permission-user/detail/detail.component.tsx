import React, {Component} from 'react';
import './detail.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {query} from "../../../actions/permission.user.actions";
import {connect} from "react-redux";
import withRouter from '../../../../shared/utils/with.router';
import {IReduxDispatch, IReduxState} from "../../../../shared/interfaces/redux.type.interface";
import {IPropsPermissionUser, IStatePermissionUser} from "../../../interfaces/permission.user.interface";

class DetailComponent extends Component <IPropsPermissionUser, IStatePermissionUser> {

    constructor(props: IPropsPermissionUser | Readonly<IPropsPermissionUser>) {
        super(props);

    }

    async componentDidMount() {
        const {id} = this.props.params;
        await this.props._query(+id);
    }


    render() {
        const {permissionUserDetail} = this.props;
        return (

            <div className="table-responsive">
                <table className="table table-top-campaign">
                    <tbody>
                    <tr>
                        <td>
                            <Trans i18nKey="filed.permissionId"></Trans>
                        </td>
                        <td>{permissionUserDetail.data![0].permission}</td>
                    </tr>
                    <tr>
                        <td><Trans i18nKey="filed.userName"></Trans></td>
                        <td>{permissionUserDetail.data![0].username}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.firstName"></Trans></td>
                        <td>{permissionUserDetail.data![0].firstName}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.lastName"></Trans></td>
                        <td>{permissionUserDetail.data![0].lastName}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.actions"></Trans></td>
                        <td>{permissionUserDetail.data![0].actions}</td>
                    </tr>

                    </tbody>
                </table>
            </div>


        );
    }
}


const mapStateToProps = (state: IReduxState) => {
    return {
        permissionUserDetail: state.permissionUser
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _query: (argument: string | number | object | null) => query(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(DetailComponent)));
