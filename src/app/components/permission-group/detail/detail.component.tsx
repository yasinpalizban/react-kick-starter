import React, {Component, useEffect} from 'react';
import './detail.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {retrieve} from "../../../actions/permission..group.actions";
import { useDispatch, useSelector} from "react-redux";
import withRouter from '../../../hooks/with.router';
import {IPermissionGroup} from "../../../interfaces/permission.group.interface";
import {IResponseObject} from "../../../interfaces/iresponse.object";
import {IReduxState} from "../../../interfaces/redux.type.interface";
import {IProps} from "../../../interfaces/props.common.interface";

function DetailComponent (props: IProps) {
   const permissionGroup:IResponseObject<IPermissionGroup> =  useSelector((item:IReduxState)=> item.permissionGroupSelect);
    const dispatch= useDispatch();
    useEffect(()=>{
        (async ()=>{
            await retrieve(dispatch,+props.params.id);
        })();
    },[])

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

export default withTranslation()(withRouter(DetailComponent));
