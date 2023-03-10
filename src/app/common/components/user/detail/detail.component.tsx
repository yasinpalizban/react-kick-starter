
import React, {Component, createRef} from 'react';
import './detail.component.scss';
import {Trans, withTranslation} from "react-i18next";
import moment from "moment";
import {query} from "../../../actions/user.actions";
import {connect} from "react-redux";
import withRouter from '../../../../shared/utils/with.router';
import {IReduxDispatch, IReduxState} from "../../../../shared/interfaces/redux.type.interface";
import {IPropsUser, IStateUser} from "../../../interfaces/user.interface";

class DetailComponent extends Component <IPropsUser,IStateUser> {

    constructor(props: IPropsUser | Readonly<IPropsUser>) {
        super(props);

    }

    async componentDidMount() {
        const {id} = this.props.params;
        await this.props._query(+id);
    }


    render() {
        const {userDetail} = this.props;
        return (

            <div className="table-responsive">
                <table className="table table-top-campaign">
                    <tbody>
                    <tr>
                        <td>
                            <Trans i18nKey="filed.userName"></Trans>
                        </td>
                        <td>{userDetail.data![0].username}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.email"></Trans></td>
                        <td>{userDetail.data![0].email}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.phone"></Trans></td>
                        <td>{userDetail.data![0].phone}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.firstName"></Trans></td>
                        <td>{userDetail.data![0].firstName}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.lastName"></Trans></td>
                        <td>{userDetail.data![0].lastName}</td>
                    </tr>
                    <tr>
                        <td><Trans i18nKey="filed.group"></Trans></td>
                        <td>{userDetail.data![0].group}</td>
                    </tr>
                    <tr>
                        <td><Trans i18nKey="filed.gender"></Trans></td>
                        <td>{userDetail.data![0].gender}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.country"></Trans></td>
                        <td>{userDetail.data![0].country}</td>
                    </tr>

                    <tr>
                        <td><Trans i18nKey="filed.city"></Trans></td>
                        <td>{userDetail.data![0].city}</td>
                    </tr>
                    <tr>
                        <td><Trans i18nKey="filed.address"></Trans></td>
                        <td>{userDetail.data![0].address}</td>
                    </tr>

                    <tr>
                        <td>
                            <Trans i18nKey="filed.activate"></Trans>
                        </td>
                        <td>
                            {

                                userDetail.data![0].active === true ?
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

                                userDetail.data![0].status === true ?
                                    <span className="status--process"><Trans
                                        i18nKey="filed.activate"></Trans>  </span> :
                                    <span className="status--denied"> <Trans i18nKey="filed.deActivate"></Trans> </span>
                            }

                        </td>
                    </tr>



                    <tr>
                        <td><Trans i18nKey="filed.create"></Trans>
                        </td>
                        <td>{moment(userDetail.data![0].createdAt).format('YYYY-MM-DD')}</td>
                    </tr>

                    <tr>
                        <td>
                            <Trans i18nKey="filed.update"></Trans>
                        </td>
                        <td>{moment(userDetail.data![0]?.updatedAt).format('YYYY-MM-DD')}</td>
                    </tr>
                    </tbody>
                </table>
            </div>


        );
    }
}


const mapStateToProps = (state:IReduxState) => {
    return {
        userDetail: state.user
    }
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _query: (argument: string | number | object | null) => query(argument, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(DetailComponent)));
