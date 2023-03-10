import React, {Component, createRef} from 'react';
import './detail.component.scss';
import {Trans, withTranslation} from "react-i18next";
import moment from "moment";
import {query} from "../../../actions/permission..group.actions";
import {connect} from "react-redux";
import withRouter from '../../../../shared/utils/with.router';
import {IReduxDispatch, IReduxState} from "../../../../shared/interfaces/redux.type.interface";
import {IPropsPermissionGroup, IStatePermissionGroup} from "../../../interfaces/permission.group.interface";

class DetailComponent extends Component <IPropsPermissionGroup,IStatePermissionGroup> {

    constructor(props: IPropsPermissionGroup | Readonly<IPropsPermissionGroup>) {
        super(props);

    }

    async componentDidMount() {
        const {id} = this.props.params;
        await this.props._query(+id);
    }


    render() {
        const {permissionGroupDetail} = this.props;
        return (

            <div className="table-responsive">
                <table className="table table-top-campaign">
                    <tbody>
                    <tr>
                        <td>
                            <Trans i18nKey="filed.permissionId"></Trans>
                        </td>
                        <td>{permissionGroupDetail.data![0].permission}</td>
                    </tr>
                    <tr>
                        <td><Trans i18nKey="filed.group"></Trans></td>
                        <td>{permissionGroupDetail.data![0].group}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.actions"></Trans></td>
                        <td>{permissionGroupDetail.data![0].actions}</td>
                    </tr>

                    </tbody>
                </table>
            </div>


        );
    }
}


const mapStateToProps = (state: IReduxState) => {
    return {
        permissionGroupDetail: state.permissionGroup
    }
}
const mapDispatchToProps = (dispatch:IReduxDispatch) => {
    return {
        _query: (argument:any) => query(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(DetailComponent)));
