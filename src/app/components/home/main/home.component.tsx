import React, {Component, useEffect} from 'react';
import './home.component.scss';
import {withTranslation} from "react-i18next";
import withRouter from "../../../hooks/with.router";
import {IProps} from "../../../interfaces/props.common.interface";
function HomeComponent(props:IProps) {

    useEffect(()=>{

    },[])
        return (
            <>

                <main id="main">

                </main>

            </>

        )
            ;

}

export default withTranslation()(withRouter(HomeComponent));
