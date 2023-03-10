import React, {Component} from 'react';
import './admin.area.component.scss';
import {Outlet} from 'react-router-dom' ;

import HeaderComponent from './components/header/header.component';
import FooterComponent from './components/fooder/footer.component';
import {connect} from "react-redux";
import {IReduxDispatch, IReduxState} from "../shared/interfaces/redux.type.interface";
import {IStateCommon} from "../shared/interfaces/state.common.interface";
import {IPropsCommon} from "../shared/interfaces/props.common.interface";
import withRouter from "../shared/utils/with.router";


class AdminAreaComponent extends Component<IPropsCommon,IStateCommon> {

    constructor(props: IPropsCommon | Readonly<IPropsCommon>) {
        super(props);
    }



    render() {
        return (
            <>
                <div className="page-wrapper">
                    <div className="page-container2">
                        <HeaderComponent/>
                        <div dir={this.props.language === 'en' ? 'ltr' : 'rtl'}>
                            <Outlet/>
                        </div>
                        <FooterComponent/>
                    </div>

                </div>


            </>

        )
            ;
    }
}

const mapStateToProps = (state:IReduxState) => {
    return {language: state.language}
}
const mapDispatchToProps = (dispatch:IReduxDispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AdminAreaComponent));
