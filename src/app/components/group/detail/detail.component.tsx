import React, { useEffect} from 'react';
import './detail.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {detail} from "../../../actions/group.actions";
import { useDispatch, useSelector} from "react-redux";
import withRouter from '../../../hooks/with.router';
import { IReduxState} from "../../../interfaces/redux.type.interface";
import {IGroup} from "../../../interfaces/group.interface";
import {IResponseObject} from "../../../interfaces/iresponse.object";
import {IProps} from "../../../interfaces/props.common.interface";

function DetailComponent (props: IProps ) {
   const group:IResponseObject<IGroup> =  useSelector((item:IReduxState)=> item.groupSelect);
    const dispatch= useDispatch();
    useEffect(()=>{
        (async ()=>{
            await detail( dispatch,+props.params.id);
        })();
    },[])

        return (

            <div className="table-responsive">
                <table className="table table-top-campaign">
                    <tbody>
                    <tr>
                        <td>
                            <Trans i18nKey="filed.name"></Trans>
                        </td>
                        <td>{group.data?.name}</td>
                    </tr>


                    <tr>
                        <td>
                            <Trans i18nKey="filed.description"></Trans>
                        </td>
                        <td>{group.data?.description}</td>
                    </tr>

                    </tbody>
                </table>
            </div>


        );

}

export default withTranslation()(withRouter(DetailComponent));
