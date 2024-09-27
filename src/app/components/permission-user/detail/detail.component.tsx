import React, {Component, useEffect} from 'react';
import './detail.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {detail} from "../../../actions/permission.user.actions";
import {connect, useDispatch, useSelector} from "react-redux";
import withRouter from '../../../hooks/with.router';
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPermissionUser} from "../../../interfaces/permission.user.interface";
import {IProps} from "../../../interfaces/props.common.interface";
import {IResponseObject} from "../../../interfaces/iresponse.object";

function DetailComponent (props: IProps)  {
    const permissionUser:IResponseObject<IPermissionUser> =  useSelector((item:IReduxState)=> item.permissionUserSelect);;
    const dispatch= useDispatch();
    useEffect(()=>{
      (async ()=>{
          await detail(dispatch,+props.params.id);
      })();
  },[]);


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

export default withTranslation()(withRouter(DetailComponent));
