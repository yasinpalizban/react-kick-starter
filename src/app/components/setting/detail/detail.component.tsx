import React, {useEffect} from 'react';
import './detail.component.scss';
import {Trans, withTranslation} from "react-i18next";
import moment from "moment";
import {detail} from "../../../actions/setting.actions";
import {connect} from "react-redux";
import withRouter from '../../../utils/with.router';
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsSetting} from "../../../interfaces/setting.interface";

function DetailComponent (props: IPropsSetting ) {
    useEffect(()=>{
        (async ()=>{
            if(+props.params.id){
                await props._detail(+props.params.id);
            }
        })();
    },[])


    const {setting} = props;
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


const mapStateToProps = (state: IReduxState) => {
    return {
        setting: state.settingSelect
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _detail: (argument: number | null) => detail(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(DetailComponent)));
