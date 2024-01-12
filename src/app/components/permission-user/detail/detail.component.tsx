import React, {Component} from 'react';
import './detail.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {detail} from "../../../actions/permission.user.actions";
import {connect} from "react-redux";
import withRouter from '../../../utils/with.router';
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsPermissionUser, IStatePermissionUser} from "../../../interfaces/permission.user.interface";

class DetailComponent extends Component <IPropsPermissionUser, IStatePermissionUser> {
    constructor(props: IPropsPermissionUser | Readonly<IPropsPermissionUser>) {
        super(props);
    }

    async componentDidMount() {
        await this.props._detail(+this.props.params.id);
    }


    render() {
        const {permissionUser} = this.props;
        return (

            <div className="table-responsive">
                <table className="table table-top-campaign">
                    <tbody>
                    <tr>
                        <td>
                            <Trans i18nKey="filed.permissionId"></Trans>
                        </td>
                        <td>{permissionUser.data?.permission}</td>
                    </tr>
                    <tr>
                        <td><Trans i18nKey="filed.userName"></Trans></td>
                        <td>{permissionUser.data?.username}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.firstName"></Trans></td>
                        <td>{permissionUser.data?.firstName}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.lastName"></Trans></td>
                        <td>{permissionUser.data?.lastName}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.actions"></Trans></td>
                        <td>{permissionUser.data?.actions}</td>
                    </tr>

                    </tbody>
                </table>
            </div>


        );
    }
}


const mapStateToProps = (state: IReduxState) => {
    return {
        permissionUser: state.permissionUserSelect
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _query: (argument:  number | null) => detail(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(DetailComponent)));
