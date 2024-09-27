import React from 'react';
import './web.site.component.scss';
import {Outlet} from 'react-router-dom' ;
import HeaderComponent from './header/header.component';
import FooterComponent from './fooder/footer.component';
import { useSelector} from "react-redux";
import { IProps} from "../../interfaces/props.common.interface";
import {IReduxState} from "../../interfaces/redux.type.interface";
import withRouter from "../../hooks/with.router";
function WebSiteComponent (props: IProps) {
    const language = useSelector((item:IReduxState)=> item.language);
        return (
            <>
                <HeaderComponent/>
                <div dir={language !== 'en' ? 'rtl' : 'ltr'} className="ms_main_wrapper">
                    <Outlet/>
                </div>
                <FooterComponent/>
            </>
        );
}

export default withRouter(WebSiteComponent);
