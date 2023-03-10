import React, {Component} from 'react';
import './home.component.scss';
import {Trans, withTranslation} from "react-i18next";
import {connect} from "react-redux";
import withRouter from "../../../shared/utils/with.router";
import {IReduxDispatch, IReduxState} from "../../../shared/interfaces/redux.type.interface";
import {IPropsHome, IStateHome} from "../../interfaces/home.interface";

class HomeComponent extends Component <IPropsHome,IStateHome> {

    constructor(props: IPropsHome | Readonly<IPropsHome>) {
        super(props);

    }
    render() {
        return (
            <>
                <h1>home page</h1>
            </>

        )
            ;
    }
}

const mapStateToProps = (state:IReduxState) => {
    return {}
}
const mapDispatchToProps = (dispatch:IReduxDispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HomeComponent)));
