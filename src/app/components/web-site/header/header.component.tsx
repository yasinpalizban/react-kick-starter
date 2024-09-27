import React from 'react';
import './header.component.scss';
import {withTranslation} from "react-i18next";
import withRouter from "../../../hooks/with.router";
import {IProps} from "../../../interfaces/props.common.interface";
function headerComponent (props: IProps ) {
        return (

                <header id="header" className="header d-flex align-items-center fixed-top">
                    <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                        <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>

                        <a  className="logo d-flex align-items-center">

                                <h1>{props.t('website.other.findYourDream')}</h1>
                        </a>


                        <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
                        <nav id="navbar" className="navbar">
                            <ul>
                                <li><a href="#" onClick={(event)=>{
                                    props.navigate('/home/main')
                                }} className="active">{props.t('website.link.home')}</a></li>
                                <li><a href="#" onClick={(event)=>{
                                    props.navigate('/home/recruitment')
                                }}>{props.t('website.link.job')}</a></li>
                                <li><a href="#" onClick={(event)=>{
                                    props.navigate('/home/blog')
                                }}>{props.t('website.link.blog')}</a></li>
                                <li><a href="#" onClick={(event)=>{
                                    props.navigate('/home/contact-us')
                                }}>{props.t('website.link.contact')}</a></li>
                                <li><a href="#" onClick={(event)=>{
                                    props.navigate('/home/sign-in')
                                }}>{props.t('website.link.signIn')}</a></li>
                            </ul>
                        </nav>

                    </div>
                </header>


        );
}

export default  withTranslation()(withRouter(headerComponent));
