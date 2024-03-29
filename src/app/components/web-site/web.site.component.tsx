import React, {Component} from 'react';
import './web.site.component.scss';
import {Outlet} from 'react-router-dom' ;
import HeaderComponent from './header/header.component';
import FooterComponent from './fooder/footer.component';
import {connect} from "react-redux";
import { IPropsCommon} from "../../interfaces/props.common.interface";
import {IReduxDispatch, IReduxState} from "../../interfaces/redux.type.interface";
import {IStateCommon} from "../../interfaces/state.common.interface";
import withRouter from "../../utils/with.router";
class WebSiteComponent extends Component <IPropsCommon,IStateCommon> {
    constructor(props: IPropsCommon | Readonly<IPropsCommon>) {
        super(props);

    }
    render() {
        return (
            <>
                <HeaderComponent/>
                <div dir={this.props.language !== 'en' ? 'rtl' : 'ltr'} className="ms_main_wrapper">
                    <Outlet/>
                </div>
                <FooterComponent/>

            </>

        )
            ;
    }
}

const mapStateToProps = (state: IReduxState) => {
    return {language: state.language}
}
const mapDispatchToProps = (dispatch:IReduxDispatch) => {
    return {}

}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WebSiteComponent));
