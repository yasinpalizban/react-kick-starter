import React, { useEffect} from 'react';
import './detail.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {detail} from "../../../actions/permission.actions";
import { useDispatch, useSelector} from "react-redux";
import withRouter from '../../../hooks/with.router';
import { IReduxState} from "../../../interfaces/redux.type.interface";
import {IPermission} from "../../../interfaces/permission.interface";
import {IResponseObject} from "../../../interfaces/iresponse.object";
import {IProps} from "../../../interfaces/props.common.interface";

function DetailComponent (props: IProps)  {
   const  permission:IResponseObject<IPermission> = useSelector((item:IReduxState)=> item.permissionSelect);
    const dispatch=useDispatch();
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
                            <Trans i18nKey="filed.name"></Trans>
                        </td>
                        <td>{permission.data?.name}</td>
                    </tr>

                    <tr>
                        <td>
                            <Trans i18nKey="filed.activate"></Trans>
                        </td>
                        <td>
                            {

                                permission.data?.active === true ?
                                    <span className="status--process"><Trans
                                        i18nKey="filed.activate"></Trans>  </span> :
                                    <span className="status--denied"> <Trans i18nKey="filed.deActivate"></Trans> </span>
                            }

                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Trans i18nKey="filed.description"></Trans>
                        </td>
                        <td>{permission.data?.description}</td>
                    </tr>

                    </tbody>
                </table>
            </div>


        );

}

export default withTranslation()(withRouter(DetailComponent));
