import React, {useEffect} from 'react';
import './detail.component.scss';
import {Trans, withTranslation} from "react-i18next";
import moment from "moment";
import {detail} from "../../../actions/setting.actions";
import {useDispatch, useSelector} from "react-redux";
import withRouter from '../../../hooks/with.router';
import {IReduxState} from "../../../interfaces/redux.type.interface";
import { ISetting} from "../../../interfaces/setting.interface";
import {IResponseObject} from "../../../interfaces/iresponse.object";
import {IProps} from "../../../interfaces/props.common.interface";

function DetailComponent (props: IProps ) {
const setting:IResponseObject<ISetting>= useSelector((item:IReduxState)=> item.settingSelect);
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
                            <Trans i18nKey="filed.key"></Trans>
                        </td>
                        <td>{setting.data?.key}</td>
                    </tr>
                    <tr>
                        <td><Trans i18nKey="filed.value"></Trans></td>
                        <td>{setting.data?.value}</td>
                    </tr>
                    <tr>
                        <td>
                            <Trans i18nKey="filed.status"></Trans>
                        </td>
                        <td>
                            {

                                setting.data?.status ?
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
                        <td>{setting.data?.description}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.create"></Trans>
                        </td>
                        <td>{moment(setting.data?.createdAt).format('YYYY-MM-DD')}</td>
                    </tr>

                    <tr>
                        <td>
                            <Trans i18nKey="filed.update"></Trans>
                        </td>
                        <td>{moment(setting.data?.updatedAt).format('YYYY-MM-DD')}</td>
                    </tr>
                    </tbody>
                </table>
            </div>


        );

}




export default withTranslation()(withRouter(DetailComponent));
