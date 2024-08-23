import React, {Component, useEffect} from 'react';
import './detail.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {detail} from "../../../actions/permission.actions";
import {connect} from "react-redux";
import withRouter from '../../../utils/with.router';
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsPermission} from "../../../interfaces/permission.interface";

function DetailComponent (props: IPropsPermission)  {

    useEffect(()=>{
        (async ()=>{
            await props._detail(+props.params.id);
        })();
    },[]);


        const {permission} = props;
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


const mapStateToProps = (state: IReduxState) => {
    return {
        permission: state.permissionSelect
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _detail: (argument: number | null) => detail(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(DetailComponent)));
