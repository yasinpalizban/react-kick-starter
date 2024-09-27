import React from 'react';
import './footer.component.scss';
import {faFacebookF, faInstagram, faGooglePlus, faTwitter} from '@fortawesome/free-brands-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {withTranslation} from "react-i18next";
import withRouter from "../../../hooks/with.router";
import { useDispatch, useSelector} from "react-redux";
import { IReduxState} from "../../../interfaces/redux.type.interface";
import i18n from "i18next";
import {language} from "../../../actions/header.actions";
import {settingList,} from "../../../actions/home.actions";
import {IProps} from "../../../interfaces/props.common.interface";
import {IResponseObject} from "../../../interfaces/iresponse.object";
import {IHomeSetting} from "../../../interfaces/home.interface";

function FooterComponent(props: IProps) {
   const homeSetting:IResponseObject<IHomeSetting> = useSelector( (item:IReduxState)=> item.homeSetting);
   const dispatch = useDispatch();
    const onChangeLanguage = async (event: any) => {
        if (localStorage.getItem('lang') == 'en') {
            localStorage.setItem('lang', 'fa');
            await i18n.changeLanguage('fa');
            language(dispatch,'fa');
        } else if (localStorage.getItem('lang') == 'fa') {
            localStorage.setItem('lang', 'en');
            await i18n.changeLanguage('en');
            language(dispatch,'en');
        }
        const url = props.location.search.indexOf('?') !== -1 ?
            props.location.pathname.split('?')[0] : props.location.pathname;
        switch (url) {
            case  "/home/main":
                await settingList(dispatch);
                break;
        }
    }
    const home= homeSetting?.data;
    return (
        <>
            <footer id="footer" className="footer">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-lg-5 col-md-12 footer-info">
                            <a className="logo d-flex align-items-center">
                                <span>{props.t('website.other.findYourDream')}</span>
                            </a>
                            <p>{props.t('website.other.message')}</p>
                            <div className="social-links d-flex mt-4">
                                <a href={home?.twitter?.value} className="twitter">
                                    <FontAwesomeIcon icon={faTwitter}/></a>
                                <a href={home?.facebook?.value} className="facebook">
                                    <FontAwesomeIcon icon={faFacebookF}/></a>
                                <a href={home?.instagram?.value} className="instagram">
                                    <FontAwesomeIcon icon={faInstagram}/></a>
                                <a href={home?.googlePlus?.value}
                                   className="linkedin"><FontAwesomeIcon icon={faGooglePlus}/></a>
                            </div>
                        </div>

                        <div className="col-lg-2 col-6 footer-links">
                            <h4>{props.t('website.other.siteMap')}</h4>
                            <ul>
                                <li><a href="#" onClick={(event) => {
                                    props.navigate('/home/main')
                                }} className="active">{props.t('website.link.home')}</a></li>
                                <li><a href="#" onClick={(event) => {
                                    props.navigate('/home/recruitment')
                                }}>{props.t('website.link.job')}</a></li>
                                <li><a href="#" onClick={(event) => {
                                    props.navigate('/home/blog')
                                }}>{props.t('website.link.blog')}</a></li>
                                <li><a href="#" onClick={(event) => {
                                    props.navigate('/home/contact-us')
                                }}>{props.t('website.link.contact')}</a></li>


                            </ul>
                        </div>

                        <div className="col-lg-2 col-6 footer-links">
                            <h4></h4>
                            <ul>
                                <li></li>
                                <li><a href="#" onClick={(event) => {
                                    props.navigate('/home/sign-in')
                                }}>{props.t('website.link.signIn')}</a></li>
                                <li><a style={{cursor: "pointer"}}
                                       onClick={onChangeLanguage}>{props.t('website.other.changeLanguage')}</a>
                                </li>

                            </ul>
                        </div>

                        <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                            <h4>{props.t('website.other.contact')}</h4>
                            <p>
                                {home?.address?.value}
                                <br/><br/>
                                <strong>{props.t('filed.phone')}</strong> {home?.phone?.value}<br/>
                                <strong>{props.t('filed.email')}</strong> {home?.email?.value}<br/>
                            </p>

                        </div>

                    </div>
                </div>
            </footer>

            <a href="#" className="scroll-top d-flex align-items-center justify-content-center"><i
                className="bi bi-arrow-up-short"></i></a>
        </>
    );

}
export default withTranslation()(withRouter(FooterComponent));
