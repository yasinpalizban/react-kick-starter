import React, {Component, useEffect} from 'react';
import './detail.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {retrieve} from "../../../actions/permission..group.actions";
import {connect} from "react-redux";
import withRouter from '../../../utils/with.router';
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsPermissionGroup} from "../../../interfaces/permission.group.interface";

function DetailComponent (props: IPropsPermissionGroup) {

    useEffect(()=>{
        (async ()=>{
            await props._retrieve(+props.params.id);
        })();
    },[])


        const {permissionGroup} = props;
        return (

            <div className="table-responsive">
                <table className="table table-top-campaign">
                    <tbody>
                    <tr>
                        <td>
                            <Trans i18nKey="filed.permissionId"></Trans>
                        </td>
                        <td>{permissionGroup.data?.permission}</td>
                    </tr>
                    <tr>
                        <td><Trans i18nKey="filed.group"></Trans></td>
                        <td>{permissionGroup.data?.group}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.actions"></Trans></td>
                        <td>{permissionGroup.data?.actions}</td>
                    </tr>

                    </tbody>
                </table>
            </div>


        );

}


const mapStateToProps = (state: IReduxState) => {
    return {
        permissionGroupList: state.permissionGroupSelect
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _query: (argument: any) => retrieve(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(DetailComponent)));
