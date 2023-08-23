import React, {Component} from 'react';
import './footer.component.scss';
import {faFacebookF, faInstagram, faGooglePlus, faTwitter} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withTranslation} from "react-i18next";
import withRouter from "../../../utils/with.router";
import {connect} from "react-redux";
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsHome, IStateHome} from "../../../interfaces/home.interface";
import i18n from "i18next";
import {language} from "../../../actions/header.actions";
import {
    settingList,

} from "../../../actions/home.actions";

class FooterComponent extends Component <IPropsHome, IStateHome> {
    constructor(props: IPropsHome | Readonly<IPropsHome>) {
        super(props);


    }

    onChangeLanguage = async (event: any) => {


        if (localStorage.getItem('lang') == 'en') {
            localStorage.setItem('lang', 'fa');
            await i18n.changeLanguage('fa');
            this.props._language('fa');
        } else if (localStorage.getItem('lang') == 'fa') {
            localStorage.setItem('lang', 'en');
            await i18n.changeLanguage('en');
            this.props._language('en');
        }

        const url = this.props.location.search.indexOf('?') !== -1 ?
            this.props.location.pathname.split('?')[0] : this.props.location.pathname;

        switch (url) {
            case  "/home/main":

                await this.props._settingList();
                await this.props._settingList();
                break;





        }


    }

    render() {

        return (
            <>
                <footer id="footer" className="footer">
                    <div className="container">
                        <div className="row gy-4">
                            <div className="col-lg-5 col-md-12 footer-info">
                                <a className="logo d-flex align-items-center">
                                    <span>{this.props.t('website.other.findYourDream')}</span>
                                </a>
                                <p>{this.props.t('website.other.message')}</p>
                                <div className="social-links d-flex mt-4">
                                    <a href={this.props.home?.settingPost?.twitter?.value} className="twitter">
                                        <FontAwesomeIcon icon={faTwitter}/></a>
                                    <a href={this.props.home?.settingPost?.facebook?.value} className="facebook">
                                        <FontAwesomeIcon icon={faFacebookF}/></a>
                                    <a href={this.props.home?.settingPost?.instagram?.value} className="instagram">
                                        <FontAwesomeIcon icon={faInstagram}/></a>
                                    <a href={this.props.home?.settingPost?.googlePlus?.value}
                                       className="linkedin"><FontAwesomeIcon icon={faGooglePlus}/></a>
                                </div>
                            </div>

                            <div className="col-lg-2 col-6 footer-links">
                                <h4>{this.props.t('website.other.siteMap')}</h4>
                                <ul>
                                    <li><a href="src/app/components/web-site/fooder/footer.component#" onClick={(event) => {
                                        this.props.navigate('/home/main')
                                    }} className="active">{this.props.t('website.link.home')}</a></li>
                                    <li><a href="src/app/components/web-site/fooder/footer.component#" onClick={(event) => {
                                        this.props.navigate('/home/recruitment')
                                    }}>{this.props.t('website.link.job')}</a></li>
                                    <li><a href="src/app/components/web-site/fooder/footer.component#" onClick={(event) => {
                                        this.props.navigate('/home/blog')
                                    }}>{this.props.t('website.link.blog')}</a></li>
                                    <li><a href="src/app/components/web-site/fooder/footer.component#" onClick={(event) => {
                                        this.props.navigate('/home/contact-us')
                                    }}>{this.props.t('website.link.contact')}</a></li>


                                </ul>
                            </div>

                            <div className="col-lg-2 col-6 footer-links">
                                <h4></h4>
                                <ul>
                                    <li></li>
                                    <li><a href="src/app/components/web-site/fooder/footer.component#" onClick={(event) => {
                                        this.props.navigate('/home/sign-in')
                                    }}>{this.props.t('website.link.signIn')}</a></li>
                                    <li><a style={{cursor: "pointer"}}
                                           onClick={this.onChangeLanguage}>{this.props.t('website.other.changeLanguage')}</a>
                                    </li>

                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                                <h4>{this.props.t('website.other.contact')}</h4>
                                <p>
                                    {this.props.home?.settingPost?.address?.value}
                                    <br/><br/>
                                    <strong>{this.props.t('filed.phone')}</strong> {this.props.home?.settingPost?.phone?.value}<br/>
                                    <strong>{this.props.t('filed.email')}</strong> {this.props.home?.settingPost?.email?.value}<br/>
                                </p>

                            </div>

                        </div>
                    </div>
                </footer>

                <a href="src/app/components/web-site/fooder/footer.component#" className="scroll-top d-flex align-items-center justify-content-center"><i
                    className="bi bi-arrow-up-short"></i></a>
            </>
        );
    }
}

const mapStateToProps = (state: IReduxState) => {
    return {home: state.home}
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {
        _language: (lang: string) => language(lang, dispatch),
        _settingList: (argument: string | number | object | null) => settingList(argument, dispatch),

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(FooterComponent)));
