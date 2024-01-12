import React, {Component} from 'react';
import './detail.component.scss';
import {Trans, withTranslation} from "react-i18next";
import moment from "moment";
import {detail} from "../../../actions/user.actions";
import {connect} from "react-redux";
import withRouter from '../../../utils/with.router';
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsUser, IStateUser} from "../../../interfaces/user.interface";

class DetailComponent extends Component <IPropsUser, IStateUser> {


    constructor(props: IPropsUser | Readonly<IPropsUser>) {
        super(props);
    }

    async componentDidMount() {
        await this.props._detail(this.props.params.id);
    }


    render() {
        const { user } = this.props;

        return (

            <div className="table-responsive">
                <table className="table table-top-campaign">
                    <tbody>
                    <tr>
                        <td>
                            <Trans i18nKey="filed.userName"></Trans>
                        </td>
                        <td>{user.data?.username}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.email"></Trans></td>
                        <td>{user.data?.email}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.phone"></Trans></td>
                        <td>{user.data?.phone}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.firstName"></Trans></td>
                        <td>{user.data?.firstName}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.lastName"></Trans></td>
                        <td>{user.data?.lastName}</td>
                    </tr>
                    <tr>
                        <td><Trans i18nKey="filed.group"></Trans></td>
                        <td>{user.data?.group}</td>
                    </tr>
                    <tr>
                        <td><Trans i18nKey="filed.gender"></Trans></td>
                        <td>{user.data?.gender}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.country"></Trans></td>
                        <td>{user.data?.country}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.city"></Trans></td>
                        <td>{user.data?.city}</td>
                    </tr>
                    <tr>
                        <td><Trans i18nKey="filed.address"></Trans></td>
                        <td>{user.data?.address}</td>
                    </tr>

                    <tr>
                        <td>
                            <Trans i18nKey="filed.activate"></Trans>
                        </td>
                        <td>
                            {

                                user.data?.active ?
                                    <span className="status--process"><Trans
                                        i18nKey="filed.activate"></Trans>  </span> :
                                    <span className="status--denied"> <Trans i18nKey="filed.deActivate"></Trans> </span>
                            }

                        </td>
                    </tr>

                    <tr>
                        <td>
                            <Trans i18nKey="filed.status"></Trans>
                        </td>
                        <td>
                            {

                                user.data?.status ?
                                    <span className="status--process"><Trans
                                        i18nKey="filed.activate"></Trans>  </span> :
                                    <span className="status--denied"> <Trans i18nKey="filed.deActivate"></Trans> </span>
                            }

                        </td>
                    </tr>


                    <tr>
                        <td><Trans i18nKey="filed.create"></Trans>
                        </td>
                        <td>{moment(user.data?.createdAt).format('YYYY-MM-DD')}</td>
                    </tr>

                    <tr>
                        <td>
                            <Trans i18nKey="filed.update"></Trans>
                        </td>
                        <td>{moment(user.data?.updatedAt).format('YYYY-MM-DD')}</td>
                    </tr>
                    </tbody>
                </table>
            </div>


        );
    }
}


const mapStateToProps = (state: IReduxState) => {
    return {
        user: state.userSelect
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _detail: (argument: number ) => detail(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(DetailComponent)));
