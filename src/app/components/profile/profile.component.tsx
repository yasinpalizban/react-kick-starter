import React, {Component} from 'react';
import './profile.component.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Trans, withTranslation} from "react-i18next";
import {faList} from "@fortawesome/free-solid-svg-icons";
import UserAddressComponent from "./user-address/user.address.component";
import UserPasswordComponent from "./user-password/user.password.component";
import UserInfoComponent from "./user-info/user.info.component";
import {connect} from "react-redux";
import {resetAlert} from "../../actions/alert.actions";
import {IReduxDispatch, IReduxState} from "../../interfaces/redux.type.interface";
import {IPropsProfile, IStateProfile} from "../../interfaces/profile.interface";
import withRouter from "../../utils/with.router";

class ProfileComponent extends Component <IPropsProfile,IStateProfile> {

    constructor(props: IPropsProfile | Readonly<IPropsProfile>) {
        super(props);
    }

    onClearAlert = () => {
        this.props._resetAlert();
    }

    render() {
        return (
            <>
                <div className="custom-tab">

                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <a className="nav-item nav-link active" id="custom-nav-info-tab"
                               data-toggle="tab"
                               href="src/app/components/profile/profile.component#custom-nav-info" role="tab"
                               aria-controls="custom-nav-info"
                               aria-selected="true" onClick={this.onClearAlert}> <Trans
                                i18nKey="profile.title"></Trans></a>
                            <a className="nav-item nav-link" id="custom-nav-address-tab"
                               data-toggle="tab"
                               href="src/app/components/profile/profile.component#custom-nav-address" role="tab"
                               aria-controls="custom-nav-address"
                               aria-selected="false" onClick={this.onClearAlert}> <Trans
                                i18nKey="profile.location"></Trans></a>

                            <a className="nav-item nav-link" id="custom-nav-password-tab"
                               data-toggle="tab"
                               href="src/app/components/profile/profile.component#custom-nav-password" role="tab"
                               aria-controls="custom-nav-password"
                               aria-selected="false" onClick={this.onClearAlert}><Trans
                                i18nKey="profile.change"></Trans></a>

                        </div>
                    </nav>
                    <div className="tab-content pl-3 pt-2" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="custom-nav-info"
                             role="tabpanel"
                             aria-labelledby="custom-nav-info-tab">
                            <UserInfoComponent />
                        </div>
                        <div className="tab-pane fade" id="custom-nav-address"
                             role="tabpanel"
                             aria-labelledby="custom-nav-address-tab">
                            <UserAddressComponent />

                        </div>
                        <div className="tab-pane fade" id="custom-nav-password"
                             role="tabpanel"
                             aria-labelledby="custom-nav-password-tab">
                            <UserPasswordComponent />
                        </div>

                    </div>

                </div>


            </>

        )
            ;
    }
}

const mapStateToProps = (state: IReduxState) => {
    return {}
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _resetAlert: () => resetAlert(dispatch),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(ProfileComponent)));
