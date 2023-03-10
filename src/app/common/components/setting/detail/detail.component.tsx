import {faMapMarker, faAddressBook, faMap} from "@fortawesome/free-solid-svg-icons";
import React, {Component, createRef} from 'react';
import './detail.component.scss';
import {Trans, withTranslation} from "react-i18next";
import moment from "moment";
import {query} from "../../../actions/setting.actions";
import {connect} from "react-redux";
import withRouter from '../../../../shared/utils/with.router';
import {IReduxDispatch, IReduxState} from "../../../../shared/interfaces/redux.type.interface";
import {IPropsSetting, IStateSetting} from "../../../interfaces/setting.interface";

class DetailComponent extends Component <IPropsSetting, IStateSetting>{

    constructor(props: IPropsSetting | Readonly<IPropsSetting>) {
        super(props);

    }

    async componentDidMount() {
        const {id} = this.props.params;
        await this.props._query(+id);
    }


    render() {
        const {settingDetail} = this.props;
        return (

            <div className="table-responsive">
                <table className="table table-top-campaign">
                    <tbody>
                    <tr>
                        <td>
                            <Trans i18nKey="filed.key"></Trans>
                        </td>
                        <td>{settingDetail.data![0].key}</td>
                    </tr>
                    <tr>
                        <td><Trans i18nKey="filed.value"></Trans></td>
                        <td>{settingDetail.data![0].value}</td>
                    </tr>
                    <tr>
                        <td>
                            <Trans i18nKey="filed.status"></Trans>
                        </td>
                        <td>
                            {

                                settingDetail.data![0].status === true ?
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
                        <td>{settingDetail.data![0].description}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.create"></Trans>
                        </td>
                        <td>{moment(settingDetail.data![0].createdAt).format('YYYY-MM-DD')}</td>
                    </tr>

                    <tr>
                        <td>
                            <Trans i18nKey="filed.update"></Trans>
                        </td>
                        <td>{moment(settingDetail.data![0].updatedAt).format('YYYY-MM-DD')}</td>
                    </tr>
                    </tbody>
                </table>
            </div>


        );
    }
}


const mapStateToProps = (state:IReduxState) => {
    return {
        settingDetail: state.setting
    }
}
const mapDispatchToProps = (dispatch:IReduxDispatch) => {
    return {
        _query: (argument: string | number | object | null) => query(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(DetailComponent)));
