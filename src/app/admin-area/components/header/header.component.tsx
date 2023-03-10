import React, {Component} from 'react';
import './header.component.scss';
import i18n from "i18next";
import {NotificationType} from "../../enums/notification.enum";
import {Link} from 'react-router-dom';
import {
    faChartArea, faTachometerAlt, faUsers, faList, faAngleDown,
    faUserFriends, faUserPlus, faBlog, faShoppingCart, faNewspaper, faDesktop, faImage,
    faInbox, faComments, faEnvelope, faBookmark, faBell, faBars, faCog, faTools, faUserCircle,
    faGlobe, faLanguage, faSignOutAlt, faFile, faUserCog, faEye, faRandom, faRetweet, faShoppingBag,
    faShoppingBasket, faListAlt, faTable, faSearch, faFileAudio
} from "@fortawesome/free-solid-svg-icons";
import {Trans, withTranslation} from "react-i18next";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import LogWhite from '../../../../assets/images/icon/logo-white.png';
import AvatarDefault from '../../../../assets/images/icon/default-avatar.jpg';
import {AuthContext} from "../../../authentication/contexts/auth.context";
import {environment} from "../../../../environments/environment";
import {explodeUrl} from "../../utils/explode-url";
import {connect} from 'react-redux';
import {urlPath, notification, language, explodeLink} from '../../actions/header.actions';
import * as profileActions from '../../../common/actions/profile.actions';
import {signOut} from '../../../authentication/actions/auth.actions';
import HeaderService from '../../services/header.service';
import withRouter from "../../../shared/utils/with.router";
import {GlobalConstants} from "../../../shared/configs/global-constants";
import * as urlPathComponent from "../../../shared/utils/url-path";
import {IReduxDispatch, IReduxState} from "../../../shared/interfaces/redux.type.interface";
import {IPropsAdminHeader, IStateAdminHeader} from "../../interfaces/header.interface";
class HeaderComponent extends Component<IPropsAdminHeader,IStateAdminHeader> {
    static contextType = AuthContext;
    private url: any;
    private pathLink: string;
    private explodeLink: string[];
    private links: { request: string; hotelActivity: string; hotelOrder: string; userPermission: string; profile: string; hotelPost: string; permission: string; viewOption: string; graph: string; users: string; setting: string; newsPost: string; overView: string; fastFoodOrder: string; chat: string; contact: string; advertisement: string; hotelTransaction: string; visitor: string; fastFoodPost: string; group: string; groupPermission: string };
    private image: string | undefined;
    private userName: string | undefined;
    private fullName: string | undefined;
    limitUserMenu = GlobalConstants.limitUserMenu;
    constructor(props:any) {
        super(props);
        this.url = urlPathComponent.urlPath(window.location.href);
        this.pathLink = window.location.origin;
        this.explodeLink = explodeUrl(window.location.pathname);
        this.state = {
            isLeftArrow: {
                account: true,
                news: true,
                homePage: true,
                communication: true,
                dashboard: true,
                setting: true,
                product: true,
                room: true
            },
            isRightSidebar: false,
            isLeftSidebar: false,
            isSearch: false,
            isNotify: false,
            userRole: 'notSet',
            fullName: 'NotSet',
            userName: 'NotSet',
            image: AvatarDefault,
            notify: []
        }
        this.links = {
            overView: '/admin/dashboard/over-view',
            graph: '/admin/dashboard/graph',
            profile: '/admin/profile',
            setting: '/admin/setting/list',
            group: '/admin/group/list',
            users: '/admin/user/list',
            newsPost: '/admin/news-post/list',
            advertisement: '/admin/advertisement/list',
            contact: '/admin/contact/list',
            viewOption: '/admin/view-option/list',
            visitor: '/admin/visitor/list',
            chat: '/admin/chat/contact',
            request: '/admin/request-post/list',
            permission: '/admin/permission/list',
            userPermission: '/admin/permission-user/list',
            groupPermission: '/admin/permission-group/list',
            fastFoodPost: '/admin/food-post/list',
            fastFoodOrder: '/admin/food-order/list',
            hotelActivity: '/admin/hotel-order/activity',
            hotelPost: '/admin/hotel-post/list',
            hotelOrder: '/admin/hotel-order/list',
            hotelTransaction: '/admin/hotel-transaction/list',

        };


    }


    componentWillUpdate(nextProps: Readonly<any>, nextState: Readonly<any>, nextContext: any) {
        this.url = urlPathComponent.urlPath(window.location.href);
        this.pathLink = window.location.origin;
        this.explodeLink = explodeUrl(window.location.pathname);
        this.props._urlPath(this.url);
        this.props._explodeLink(this.explodeLink);
    }

    componentDidMount() {


        const newState:any = Object.assign({}, this.state);

        this.props._urlPath(this.url);
        this.props._explodeLink(this.explodeLink);

        if (localStorage.getItem('user')) {
            const profile = JSON.parse(localStorage.getItem('user')!);
            this.image = profile.userInformation.image;
            this.userName = profile.userInformation.userName;
            this.fullName = profile.userInformation.email ? profile.userInformation.firstName + ' ' + profile.userInformation.lastName : profile.userInformation.phone;
            // @ts-ignore
            newState.fullName = this.context.userInformation?.firstName! + ' ' + this.context.userInformation.lastName;
            // @ts-ignore
            newState.userName = this.context.userInformation?.userName!;
            // @ts-ignore
            newState.image = environment.siteUrl + this.context?.userInformation.image;
            // @ts-ignore
            newState.userRole = this.context.role.name;
        } else {
            this.props._profileQuery();

            const {profile} = this.props;

            this.userName = profile.data!.username;
            if (this.fullName) {
                this.fullName = profile.data!.firstName + ' ' + profile.data!.lastName;
            }
            if (profile.data!.image != null) {
                this.image = profile.data!.image;
            }

        }
        const headerService = new HeaderService();
        headerService.checkNotification();
        const {notification} = this.props;
        notification?.map((notify) => {
            const index = this.state.notify.findIndex(no => no.type === notify.type);
            index >= 0 ? this.state.notify[index].counter! += 1 : this.state.notify.push(notify);
            this.state.notify.sort((a, b) => 0 - (a.counter! > b.counter! ? 1 : -1));

        });

        this.setState(newState);

    }


    componentWillUnmount() {


    }

    onMenuDropDown = (event:any) => {

        const name = event.currentTarget.getAttribute('data-value');

        const newState = Object.assign({}, this.state);

        switch (name) {
            case "dashboard":
                newState.isLeftArrow.dashboard = !newState.isLeftArrow.dashboard;
                break;
            case "account":
                newState.isLeftArrow.account = !newState.isLeftArrow.account;
                break;
            case "news":
                newState.isLeftArrow.news = !newState.isLeftArrow.news;
                break;

            case "communication":
                newState.isLeftArrow.communication = !newState.isLeftArrow.communication;
                break;

            case "setting":
                newState.isLeftArrow.setting = !newState.isLeftArrow.setting;
                break;
        }

        this.setState(newState);
    }

    onToggleDropDown = (event:any) => {

        const name = event.currentTarget.getAttribute('data-value');
        const newState:any = Object.assign({}, this.state);

        if (name === 'search') {
            newState.isSearch = !newState.isSearch;
            newState.isNotify = false;
            newState.isRightSidebar = false;
            newState.isLeftSidebar = false;
        } else if (name === 'notify') {
            newState.isNotify = !newState.isNotify;
            newState.isSearch = false;
            newState.isRightSidebar = false;
            newState.isLeftSidebar = false;
        } else if (name === 'rightSideBar') {
            newState.isRightSidebar = !newState.isRightSidebar;
            newState.isSearch = false;
            newState.isNotify = false;
            newState.isLeftSidebar = false;
        } else {
            newState.isRightSidebar = false;
            newState.isSearch = false;
            newState.isNotify = false;
            newState.isLeftSidebar = !newState.isLeftSidebar;
        }

        this.setState(newState);
    }

    onSignOut = async () => {

        await this.props._signOut();

    }


    appendColorIndex = (index:number) => {
        index++;
        if (index <= 6) {
            return 'bg-flat-color-' + index;
        } else if (index % 6 > 0) {
            return 'bg-flat-color-' + index % 6;
        } else {
            return 'bg-flat-color-' + 6;
        }
    }

    appendTypeIcon = (type: string) => {

        switch (type) {
            case NotificationType.newUser:
                return faUserPlus;
            case NotificationType.newChat:
                return faComments;
            case NotificationType.newChatRoom:
                return faComments;
            case NotificationType.newContact:
                return faEnvelope;
            case NotificationType.newOrder:
                return faFile;
            case NotificationType.newRequest:
                return faBookmark;
        }

    }

    onChangeLanguage = async () => {

        if (localStorage.getItem('lang') === 'en') {
            localStorage.setItem('lang', 'fa');
            await i18n.changeLanguage('fa');
            this.props._language('fa');
        } else if (localStorage.getItem('lang') === 'fa') {
            localStorage.setItem('lang', 'en');
            await i18n.changeLanguage('en');
            this.props._language('en');
        }
    }

    limitUserMenuLink = (key:string) => {

        const value = this.limitUserMenu[key];


        for (let i = 0; i < value.length; i++) {
            if (value[i] == this.state.userRole) {
                return true;
            }

        }


        return false;
    }


    render() {
        return (
            <>
                <aside className="menu-sidebar2">
                    <div className="logo">
                        <a href="#">
                            <img src={LogWhite} alt="Cool Admin"/>
                        </a>
                    </div>
                    <div className="menu-sidebar2__content js-scrollbar1 ps">
                        <div className="account2">
                            <div className="image img-cir img-120">
                                <img src={this.state.image} alt={this.state.userName}/>
                            </div>
                            <Link to={this.links.profile} className="name">{this.state.userName}</Link>
                            <Link to={this.links.profile}>{this.state.userRole}</Link>
                        </div>
                        <nav className="navbar-sidebar2">
                            <ul className="list-unstyled navbar__list">
                                {
                                    this.limitUserMenuLink('dashboard') ? <li className="active has-sub">
                                        <a className={`js-arrow ${this.state.isLeftArrow.dashboard ? '' : ' open'} `}
                                           data-value="dashboard"
                                           onClick={this.onMenuDropDown}
                                           aria-expanded={!this.state.isLeftArrow.dashboard}
                                           aria-controls="collapseLeftArrow0"
                                        >
                                            <FontAwesomeIcon icon={faTachometerAlt}/>
                                            <Trans i18nKey="layout.header.dashboard"></Trans>
                                            {this.state.isLeftArrow.dashboard}
                                            <span className={`arrow ${this.state.isLeftArrow.dashboard ? '' : ' up'} `}>
                                            <FontAwesomeIcon icon={faAngleDown}/>
                                        </span>
                                        </a>
                                        <ul id="collapseLeftArrow0"
                                            className="list-unstyled navbar__sub-list js-sub-list "
                                            style={{display: this.state.isLeftArrow.dashboard ? 'none' : 'block'}}
                                        >

                                            <li>
                                                <Link to={this.links.overView}>
                                                    <FontAwesomeIcon icon={faList}/>
                                                    <Trans i18nKey="layout.header.overView"></Trans>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={this.links.graph}>
                                                    <FontAwesomeIcon icon={faChartArea}/>
                                                    <Trans i18nKey="layout.header.graph"></Trans>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li> : ''
                                }
                                {
                                    this.limitUserMenuLink('account') ? <li className=" has-sub">
                                        <a className={`js-arrow  `}
                                           data-value="account"
                                           onClick={this.onMenuDropDown}
                                           aria-expanded={!this.state.isLeftArrow.account}
                                           aria-controls="collapseLeftArrow1"
                                        >
                                            <FontAwesomeIcon icon={faUsers}/>
                                            <Trans i18nKey="layout.header.accounts"></Trans>
                                            {this.state.isLeftArrow.account}
                                            <span className={`arrow ${this.state.isLeftArrow.account ? '' : ' up'} `}>
                                            <FontAwesomeIcon icon={faAngleDown}/>
                                        </span>
                                        </a>
                                        <ul id="collapseLeftArrow1"
                                            className="list-unstyled navbar__sub-list js-sub-list "

                                            style={{display: this.state.isLeftArrow.account ? 'none' : 'block'}}
                                        >

                                            <li>
                                                <Link to={this.links.group}>
                                                    <FontAwesomeIcon icon={faUserFriends}/>
                                                    <Trans i18nKey="layout.header.groups"></Trans>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={this.links.users}>
                                                    <FontAwesomeIcon icon={faUserFriends}/>
                                                    <Trans i18nKey="layout.header.users"></Trans>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={this.links.permission}>
                                                    <FontAwesomeIcon icon={faEye}/>
                                                    <Trans i18nKey="layout.header.permissions"></Trans>
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to={this.links.groupPermission}>
                                                    <FontAwesomeIcon icon={faRandom}/>
                                                    <Trans i18nKey="layout.header.permissionGroups"></Trans>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={this.links.userPermission}>
                                                    <FontAwesomeIcon icon={faRetweet}/>
                                                    <Trans i18nKey="layout.header.permissionUsers"></Trans>
                                                </Link>
                                            </li>

                                        </ul>
                                    </li> : ''
                                }
                                {this.limitUserMenuLink('blog') ? <li className=" has-sub">
                                    <a className={`js-arrow  `}
                                       data-value="news"
                                       onClick={this.onMenuDropDown}
                                       aria-expanded={!this.state.isLeftArrow.news} aria-controls="collapseLeftArrow2"
                                    >
                                        <FontAwesomeIcon icon={faBlog}/>
                                        <Trans i18nKey="layout.header.news"></Trans>
                                        {this.state.isLeftArrow.news}
                                        <span className={`arrow ${this.state.isLeftArrow.news ? '' : ' up'} `}>
                                            <FontAwesomeIcon icon={faAngleDown}/>
                                        </span>
                                    </a>
                                    <ul id="collapseLeftArrow1" className="list-unstyled navbar__sub-list js-sub-list "

                                        style={{display: this.state.isLeftArrow.news ? 'none' : 'block'}}
                                    >

                                        <li>
                                            <Link to={this.links.newsPost}>
                                                <FontAwesomeIcon icon={faNewspaper}/>
                                                <Trans i18nKey="layout.header.news"></Trans>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={this.links.advertisement}>
                                                <FontAwesomeIcon icon={faShoppingCart}/>
                                                <Trans i18nKey="layout.header.advertisement"></Trans>
                                            </Link>
                                        </li>


                                    </ul>
                                </li> : ''}

                                {this.limitUserMenuLink('firstPage') ? <li>
                                    <Link to={this.links.viewOption}>
                                        <FontAwesomeIcon icon={faDesktop}/>
                                        <Trans i18nKey="layout.header.firstPage"></Trans>
                                    </Link>
                                </li> : ''}
                                {
                                    this.limitUserMenuLink('communicate') ? <li className=" has-sub">
                                        <a className={`js-arrow  `}
                                           data-value="communication"
                                           onClick={this.onMenuDropDown}
                                           aria-expanded={!this.state.isLeftArrow.communication}
                                           aria-controls="collapseLeftArrow3"
                                        >
                                            <FontAwesomeIcon icon={faInbox}/>
                                            <Trans i18nKey="layout.header.communication"></Trans>
                                            {this.state.isLeftArrow.communication}
                                            <span
                                                className={`arrow ${this.state.isLeftArrow.communication ? '' : ' up'} `}>
                                            <FontAwesomeIcon icon={faAngleDown}/>
                                        </span>
                                        </a>
                                        <ul id="collapseLeftArrow3"
                                            className="list-unstyled navbar__sub-list js-sub-list "

                                            style={{display: this.state.isLeftArrow.communication ? 'none' : 'block'}}
                                        >
                                            <li>
                                                <Link to={this.links.chat}>
                                                    <FontAwesomeIcon icon={faComments}/>
                                                    <Trans i18nKey="layout.header.chat"></Trans>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={this.links.contact}>
                                                    <FontAwesomeIcon icon={faEnvelope}/>
                                                    <Trans i18nKey="layout.header.contact"></Trans>
                                                </Link>
                                            </li>

                                        </ul>
                                    </li> : ''
                                }

                                {this.limitUserMenuLink('request') ? <li>
                                    <Link to={this.links.request}>
                                        <FontAwesomeIcon icon={faBookmark}/>
                                        <Trans i18nKey="layout.header.request"></Trans>
                                    </Link>
                                </li> : ''}

                            </ul>
                        </nav>
                    </div>
                </aside>

                <header className="header-desktop2">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="header-wrap2">
                                <div className="logo d-block d-lg-none">
                                    <a>
                                        <img src={LogWhite} alt="CoolAdmin"/>
                                    </a>
                                </div>
                                <div className="header-button2">
                                    <div
                                        className="header-button-item has-noti  d-sm-none d-none d-md-block d-xl-block ">
                                        <form className="form-header" style={{marginTop: '4px'}}>
                                            <input style={{borderBottomLeftRadius: '20px', borderTopLeftRadius: '20px'}}
                                                   className=" au-input au-input--xl"
                                                   type="text" name="search" placeholder="Search for..."/>
                                            <button className="au-btn--submit " style={{
                                                color: 'white',
                                                borderBottomRightRadius: '20px',
                                                borderTopRightRadius: '20px'
                                            }} type="submit">
                                                <FontAwesomeIcon icon={faSearch}/></button>
                                        </form>

                                    </div>

                                    <div
                                        className={` header-button-item has-noti js-item-menu ${this.state.isNotify ? ' show-dropdown' : ''} `}
                                        data-value="notify" onClick={this.onToggleDropDown}>
                                        <FontAwesomeIcon icon={faBell}/>
                                        <div className="notifi-dropdown js-dropdown">
                                            <div className="notifi__title">
                                                <p># {this.state.notify.length}
                                                    <Trans i18nKey="layout.header.notifications"></Trans>
                                                </p>
                                            </div>
                                            {this.state.notify.map((noty, i:number) => {
                                                return(  <div className="notifi__item" key={i}>
                                                    <div className={`img-cir img-40 ${this.appendColorIndex(i)}`}>
                                                    </div>
                                                    <div className="content">
                                                        <p>{noty.message}({noty.counter})</p>
                                                        <span className="date">{noty.date}</span>
                                                    </div>
                                                </div>)
                                            })

                                            }

                                            <div className="notifi__footer">
                                                <a>
                                                    <Trans i18nKey="layout.header.allNotifications"></Trans>

                                                </a>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="header-button-item js-item-menu d-lg-none"
                                         data-value="leftSideBar"
                                         onClick={this.onToggleDropDown}>
                                        <FontAwesomeIcon icon={faBars}/>
                                    </div>

                                    <div className="header-button-item mr-0 js-sidebar-btn  d-none d-lg-block "
                                         data-value="rightSideBar" onClick={this.onToggleDropDown}>
                                        <FontAwesomeIcon icon={faCog}/>
                                    </div>
                                    <div id="collapseRightIdeBar"
                                         className={`setting-menu js-right-sidebar  d-lg-block ${this.state.isRightSidebar ? ' show-sidebar' : ''} `}>
                                        <div className="account-dropdown__body">
                                            <div className="account-dropdown__item">
                                                <Link to={this.links.profile}>
                                                    <FontAwesomeIcon icon={faUserCircle}/>
                                                    <Trans i18nKey="layout.header.profile"></Trans>
                                                </Link>
                                            </div>
                                            {this.limitUserMenuLink('setting') ?
                                                <div className="account-dropdown__item">
                                                    <Link to={this.links.setting}>
                                                        <FontAwesomeIcon icon={faTools}/>
                                                        <Trans i18nKey="layout.header.setting"></Trans>
                                                    </Link>
                                                </div> : ''}


                                            <div className="account-dropdown__item">
                                                <a style={{cursor: 'pointer'}} onClick={this.onSignOut}>
                                                    <FontAwesomeIcon icon={faSignOutAlt}/>
                                                    <Trans i18nKey="layout.header.signOut"></Trans>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="account-dropdown__body">
                                            {this.limitUserMenuLink('setting') ?
                                                <div className="account-dropdown__item">
                                                    <Link to={this.links.visitor}>
                                                        <FontAwesomeIcon icon={faGlobe}/>
                                                        <Trans i18nKey="layout.header.visitor"></Trans>

                                                    </Link>
                                                </div> : ''}


                                            <div className="account-dropdown__item">
                                                <a style={{cursor: 'pointer'}} onClick={this.onChangeLanguage}>
                                                    <FontAwesomeIcon icon={faLanguage}/>
                                                    <Trans i18nKey="layout.header.language"></Trans>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>


                <aside
                    className={` menu-sidebar2   js-right-sidebar  d-block  d-lg-none ${this.state.isLeftSidebar ? ' show-sidebar' : ''} `}>
                    <div className="logo">
                        <a href="#">
                            <img src={LogWhite} alt="Cool Admin"/>
                        </a>
                    </div>
                    <div className="menu-sidebar2__content js-scrollbar2 ps">
                        <div className="account2">

                            <div className="image img-cir img-120">
                                <img src={this.state.image} alt={this.state.userName}/>
                            </div>
                            <Link to={this.links.profile} className="name">{this.state.userName}</Link>
                            <Link to={this.links.profile}>{this.state.userRole}</Link>

                        </div>
                        <nav className="navbar-sidebar2">
                            <ul className="list-unstyled navbar__list">

                                <li className="has-sub">
                                    <a
                                        className={`js-arrow  `}
                                        data-value="setting"
                                        onClick={this.onMenuDropDown}
                                        aria-expanded={!this.state.isLeftArrow.setting}
                                        aria-controls="collapseLeftArrow00">

                                        <FontAwesomeIcon icon={faUserCog}/>

                                        <Trans i18nKey="layout.header.setting"></Trans>
                                        <span className={`arrow ${this.state.isLeftArrow.setting ? '' : ' up'} `}>

                                            <FontAwesomeIcon icon={faAngleDown}/>
                                        </span>
                                    </a>
                                    <ul id="collapseLeftArrow00" className="list-unstyled navbar__sub-list js-sub-list"


                                        style={{display: this.state.isLeftArrow.setting ? 'none' : 'block'}}
                                    >
                                        <li>

                                            <Link to={this.links.profile}>
                                                <FontAwesomeIcon icon={faUserCircle}/>
                                                <Trans i18nKey="layout.header.profile"></Trans>
                                            </Link>
                                        </li>
                                        {this.limitUserMenuLink('setting') ? <li>

                                            <Link to={this.links.setting}>
                                                <FontAwesomeIcon icon={faCog}/>
                                                <Trans i18nKey="layout.header.setting"></Trans>
                                            </Link>
                                        </li> : ''}

                                        <li>

                                            <a style={{cursor: 'pointer'}} onClick={this.onSignOut}>
                                                <FontAwesomeIcon icon={faSignOutAlt}/>
                                                <Trans i18nKey="layout.header.signOut"></Trans>
                                            </a>

                                        </li>
                                        {this.limitUserMenuLink('setting') ? <li>

                                            <Link to={this.links.visitor}>
                                                <FontAwesomeIcon icon={faGlobe}/>
                                                <Trans i18nKey="layout.header.visitor"></Trans>
                                            </Link>
                                        </li> : ''}

                                        <li>
                                            <a style={{cursor: 'pointer'}} onClick={this.onChangeLanguage}>
                                                <FontAwesomeIcon icon={faLanguage}/>
                                                <Trans i18nKey="layout.header.language"></Trans>
                                            </a>

                                        </li>
                                    </ul>
                                </li>

                                {this.limitUserMenuLink('dashboard') ? <li className="active has-sub">
                                    <a className={`js-arrow  `}
                                       data-value="dashboard"
                                       onClick={this.onMenuDropDown}
                                       aria-expanded={!this.state.isLeftArrow.dashboard}
                                       aria-controls="collapseLeftArrow0"
                                    >
                                        <FontAwesomeIcon icon={faTachometerAlt}/>
                                        <Trans i18nKey="layout.header.dashboard"></Trans>
                                        {this.state.isLeftArrow.dashboard}
                                        <span className={`arrow ${this.state.isLeftArrow.dashboard ? '' : ' up'} `}>
                                            <FontAwesomeIcon icon={faAngleDown}/>
                                        </span>
                                    </a>
                                    <ul id="collapseLeftArrow0" className="list-unstyled navbar__sub-list js-sub-list "

                                        style={{display: this.state.isLeftArrow.dashboard ? 'none' : 'block'}}
                                    >

                                        <li>
                                            <Link to={this.links.overView}>
                                                <FontAwesomeIcon icon={faList}/>
                                                <Trans i18nKey="layout.header.overView"></Trans>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={this.links.graph}>
                                                <FontAwesomeIcon icon={faChartArea}/>
                                                <Trans i18nKey="layout.header.graph"></Trans>
                                            </Link>
                                        </li>
                                    </ul>
                                </li> : ''}

                                {this.limitUserMenuLink('account') ? <li className=" has-sub">
                                    <a className={`js-arrow  `}
                                       data-value="account"
                                       onClick={this.onMenuDropDown}
                                       aria-expanded={!this.state.isLeftArrow.account}
                                       aria-controls="collapseLeftArrow1"
                                    >
                                        <FontAwesomeIcon icon={faUsers}/>
                                        <Trans i18nKey="layout.header.accounts"></Trans>
                                        {this.state.isLeftArrow.account}
                                        <span className={`arrow ${this.state.isLeftArrow.account ? '' : ' up'} `}>
                                            <FontAwesomeIcon icon={faAngleDown}/>
                                        </span>
                                    </a>
                                    <ul id="collapseLeftArrow1" className="list-unstyled navbar__sub-list js-sub-list "

                                        style={{display: this.state.isLeftArrow.account ? 'none' : 'block'}}
                                    >

                                        <li>
                                            <Link to={this.links.group}>
                                                <FontAwesomeIcon icon={faUserFriends}/>
                                                <Trans i18nKey="layout.header.groups"></Trans>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={this.links.users}>
                                                <FontAwesomeIcon icon={faUserFriends}/>
                                                <Trans i18nKey="layout.header.users"></Trans>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={this.links.permission}>
                                                <FontAwesomeIcon icon={faEye}/>
                                                <Trans i18nKey="layout.header.permissions"></Trans>
                                            </Link>
                                        </li>

                                        <li>
                                            <Link to={this.links.groupPermission}>
                                                <FontAwesomeIcon icon={faRandom}/>
                                                <Trans i18nKey="layout.header.permissionGroups"></Trans>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={this.links.userPermission}>
                                                <FontAwesomeIcon icon={faRetweet}/>
                                                <Trans i18nKey="layout.header.permissionUsers"></Trans>
                                            </Link>
                                        </li>

                                    </ul>
                                </li> : ''}
                                {
                                    this.limitUserMenuLink('blog') ? <li className=" has-sub">
                                        <a className={`js-arrow  `}
                                           data-value="news"
                                           onClick={this.onMenuDropDown}
                                           aria-expanded={!this.state.isLeftArrow.news}
                                           aria-controls="collapseLeftArrow2"
                                        >
                                            <FontAwesomeIcon icon={faBlog}/>
                                            <Trans i18nKey="layout.header.news"></Trans>
                                            {this.state.isLeftArrow.news}
                                            <span className={`arrow ${this.state.isLeftArrow.news ? '' : ' up'} `}>
                                            <FontAwesomeIcon icon={faAngleDown}/>
                                        </span>
                                        </a>
                                        <ul id="collapseLeftArrow1"
                                            className="list-unstyled navbar__sub-list js-sub-list "

                                            style={{display: this.state.isLeftArrow.news ? 'none' : 'block'}}
                                        >

                                            <li>
                                                <Link to={this.links.newsPost}>
                                                    <FontAwesomeIcon icon={faNewspaper}/>
                                                    <Trans i18nKey="layout.header.news"></Trans>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={this.links.advertisement}>
                                                    <FontAwesomeIcon icon={faShoppingCart}/>
                                                    <Trans i18nKey="layout.header.advertisement"></Trans>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={this.links.permission}>
                                                    <FontAwesomeIcon icon={faEye}/>
                                                    <Trans i18nKey="layout.header.permissions"></Trans>
                                                </Link>
                                            </li>

                                            <li>
                                                <Link to={this.links.groupPermission}>
                                                    <FontAwesomeIcon icon={faRandom}/>
                                                    <Trans i18nKey="layout.header.permissionGroup"></Trans>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={this.links.userPermission}>
                                                    <FontAwesomeIcon icon={faRandom}/>
                                                    <Trans i18nKey="layout.header.permissionUser"></Trans>
                                                </Link>
                                            </li>

                                        </ul>
                                    </li> : ''}

                                {
                                    this.limitUserMenuLink('firstPage') ? <li>
                                        <Link to={this.links.viewOption}>
                                            <FontAwesomeIcon icon={faDesktop}/>
                                            <Trans i18nKey="layout.header.firstPage"></Trans>
                                        </Link>
                                    </li> : ''
                                }
                                {
                                    this.limitUserMenuLink('communicate') ? <li className=" has-sub">
                                        <a className={`js-arrow  `}
                                           data-value="communication"
                                           onClick={this.onMenuDropDown}
                                           aria-expanded={!this.state.isLeftArrow.communication}
                                           aria-controls="collapseLeftArrow3"
                                        >
                                            <FontAwesomeIcon icon={faInbox}/>
                                            <Trans i18nKey="layout.header.communication"></Trans>
                                            {this.state.isLeftArrow.communication}
                                            <span
                                                className={`arrow ${this.state.isLeftArrow.communication ? '' : ' up'} `}>
                                            <FontAwesomeIcon icon={faAngleDown}/>
                                        </span>
                                        </a>
                                        <ul id="collapseLeftArrow3"
                                            className="list-unstyled navbar__sub-list js-sub-list "

                                            style={{display: this.state.isLeftArrow.communication ? 'none' : 'block'}}
                                        >
                                            <li>
                                                <Link to={this.links.chat}>
                                                    <FontAwesomeIcon icon={faComments}/>
                                                    <Trans i18nKey="layout.header.chat"></Trans>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={this.links.contact}>
                                                    <FontAwesomeIcon icon={faEnvelope}/>
                                                    <Trans i18nKey="layout.header.contact"></Trans>
                                                </Link>
                                            </li>

                                        </ul>
                                    </li> : ''
                                }
                                {
                                    this.limitUserMenuLink('request') ? <li>
                                        <Link to={this.links.request}>
                                            <FontAwesomeIcon icon={faBookmark}/>
                                            <Trans i18nKey="layout.header.request"></Trans>
                                        </Link>
                                    </li> : ''
                                }

                            </ul>

                        </nav>

                    </div>
                </aside>


                <section className="au-breadcrumb m-t-75">
                    <div className="section__content section__content--p30">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="au-breadcrumb-content">
                                        <div className="au-breadcrumb-left">
                                            <span className="au-breadcrumb-span">
                                                <Trans i18nKey={'layout.header.page'}></Trans>

                                            </span>
                                            <ul className="list-unstyled list-inline au-breadcrumb__list">
                                                {
                                                    this.explodeLink.map((item, postion) => {
                                                        return (
                                                            <li key={postion} className="list-inline-item active">
                                                                <Link to={this.pathLink}>{item}</Link>
                                                            </li>);
                                                    })
                                                }
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </>

        )
            ;
    }
}

const mapStateToProps = (state:IReduxState) => {
    return {
        notification: state.notification,
        profile: state.profile
    }
}

const mapDispatchToProps = (dispatch:IReduxDispatch) => {
    return {
        _urlPath: (url:string) => urlPath(url, dispatch),
        _language: (lang:string) => language(lang, dispatch),
        _explodeLink: (url:string[]) => explodeLink(url, dispatch),
        _notification: (notify:any) => notification(notify, dispatch),
        _profileQuery: () => profileActions.query(null,dispatch),
        _signOut: () => signOut(dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(withRouter(HeaderComponent)));


