import React, {Component} from 'react';
import './detail.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {query} from "../../../actions/permission.actions";
import {connect} from "react-redux";
import withRouter from '../../../utils/with.router';
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsPermission, IStatePermission} from "../../../interfaces/permission.interface";

class DetailComponent extends Component <IPropsPermission, IStatePermission> {
    id: number;

    constructor(props: IPropsPermission | Readonly<IPropsPermission>) {
        super(props);
        this.id = 0;
    }

    async componentDidMount() {
        this.id = +this.props.params.id;
        await this.props._query(this.id);
    }


    render() {
        const {permissionDetail} = this.props;
        return (

            <div className="table-responsive">
                <table className="table table-top-campaign">
                    <tbody>
                    <tr>
                        <td>
                            <Trans i18nKey="filed.name"></Trans>
                        </td>
                        <td>{permissionDetail.data![0].name}</td>
                    </tr>

                    <tr>
                        <td>
                            <Trans i18nKey="filed.activate"></Trans>
                        </td>
                        <td>
                            {

                                permissionDetail.data![0].active === true ?
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
                        <td>{permissionDetail.data![0].description}</td>
                    </tr>

                    </tbody>
                </table>
            </div>


        );
    }
}


const mapStateToProps = (state: IReduxState) => {
    return {
        permissionDetail: state.permission
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _query: (argument: string | number | object | null) => query(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(DetailComponent)));
