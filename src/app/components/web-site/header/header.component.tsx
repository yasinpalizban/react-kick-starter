import React, {Component} from 'react';
import './header.component.scss';
import {withTranslation} from "react-i18next";
import withRouter from "../../../utils/with.router";
import {IPropsHome, IStateHome} from "../../../interfaces/home.interface";

class HeaderComponent extends  Component <IPropsHome,IStateHome> {

    constructor(props: IPropsHome | Readonly<IPropsHome>) {
        super(props);

    }
        render() {
        return (



                <header id="header" className="header d-flex align-items-center fixed-top">
                    <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                        <i className="mobile-nav-toggle mobile-nav-show bi bi-list"></i>

                        <a  className="logo d-flex align-items-center">

                                <h1>{this.props.t('website.other.findYourDream')}</h1>
                        </a>


                        <i className="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
                        <nav id="navbar" className="navbar">
                            <ul>
                                <li><a href="#" onClick={(event)=>{
                                    this.props.navigate('/home/main')
                                }} className="active">{this.props.t('website.link.home')}</a></li>
                                <li><a href="#" onClick={(event)=>{
                                    this.props.navigate('/home/recruitment')
                                }}>{this.props.t('website.link.job')}</a></li>
                                <li><a href="#" onClick={(event)=>{
                                    this.props.navigate('/home/blog')
                                }}>{this.props.t('website.link.blog')}</a></li>
                                <li><a href="#" onClick={(event)=>{
                                    this.props.navigate('/home/contact-us')
                                }}>{this.props.t('website.link.contact')}</a></li>
                                <li><a href="#" onClick={(event)=>{
                                    this.props.navigate('/home/sign-in')
                                }}>{this.props.t('website.link.signIn')}</a></li>

                            </ul>
                        </nav>

                    </div>
                </header>


        );
    }
}

export default  withTranslation()(withRouter( HeaderComponent));
