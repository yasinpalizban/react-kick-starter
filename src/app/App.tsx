import React, {Component} from 'react';
import logo from './logo.svg';
import './App.scss';
import {Routes, Route, Link, Outlet, redirect} from 'react-router-dom' ;
import {connect} from "react-redux";
import AuthComponent from "./guards/auth.component";
import {callSelect} from '../assets/js/hook';
import {IPropsCommon} from "./interfaces/props.common.interface";
import {IStateCommon} from "./interfaces/state.common.interface";
import {IReduxDispatch, IReduxState} from "./interfaces/redux.type.interface";
import withRouter from "./utils/with.router";
import {Spinner} from 'spin.js';
import IndexComponent from "./components/home/index/index.component";
import {environment} from "../environments/environment";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";

import {
    WebSiteComponent,
    AdminAreaComponent,

    NotFoundPageComponent,
    ForbiddenPageComponent,

    LoginComponent,
    ForgotComponent,
    LogoutComponent,
    SignUpComponent,
    ActivationComponent,
    ResetPasswordComponent,


    GraphComponent,
    OverViewComponent,
    ProfileComponent,


    SettingListComponent,
    SettingAddComponent,
    SettingDetailComponent,


    UserListComponent,
    UserAddComponent,
    UserDetailComponent,


    GroupListComponent,
    GroupAddComponent,
    GroupDetailComponent,


    PermissionListComponent,
    PermissionAddComponent,
    PermissionDetailComponent,


    PermissionGroupListComponent,
    PermissionGroupAddComponent,
    PermissionGroupDetailComponent,


    PermissionUserListComponent,
    PermissionUserAddComponent,
    PermissionUserDetailComponent,
    HomeMainComponent,

} from './route.index'

function one() {
    return (<h1>ss</h1>);
}

class App extends Component<IPropsCommon, IStateCommon> {

    spinner: any
    target: any;
    SpinOpts = {
        lines: 15, // The number of lines to draw
        length: 0, // The length of each line
        width: 17, // The line thickness
        radius: 45, // The radius of the inner circle
        scale: 1, // Scales overall size of the spinner
        corners: 1, // Corner roundness (0..1)
        speed: 1, // Rounds per second
        rotate: 0, // The rotation offset
        animation: 'spinner-line-shrink', // The CSS animation name for the lines
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#ffffff', // CSS color or array of colors
        fadeColor: 'transparent', // CSS color or array of colors
        top: '50%', // Top position relative to parent
        left: '50%', // Left position relative to parent
        shadow: '0 0 1px transparent', // Box-shadow for the lines
        zIndex: 2000000000, // The z-index (defaults to 2e9)
        className: 'spinner', // The CSS class to assign to the spinner
        position: 'absolute', // Element positioning
    };

    constructor(props: IPropsCommon | Readonly<IPropsCommon>) {
        super(props);

    }

    componentDidMount() {

        this.target = document.getElementById('spinner');
        this.spinner = new Spinner(this.SpinOpts);

    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any) {

        this.props.spinner ? this.spinner.spin(this.target) : this.spinner.stop();
        callSelect();
    }

    render() {
        return (
            <>
                <Routes>
                    <Route path="home" element={<WebSiteComponent/>}>
                        <Route path="sign-in" element={<LoginComponent/>}/>
                        <Route path="forgot" element={
                            <GoogleReCaptchaProvider reCaptchaKey={environment.captcha.siteKey}>
                                <ForgotComponent/>
                            </GoogleReCaptchaProvider>
                        }/>
                        <Route path="sign-out" element={<LogoutComponent/>}/>

                        <Route path="sign-up" element={
                            <GoogleReCaptchaProvider reCaptchaKey={environment.captcha.siteKey}>
                                <SignUpComponent/>
                            </GoogleReCaptchaProvider>
                        }/>

                        <Route path="activation" element={<ActivationComponent/>}/>
                        <Route path="reset-password" element={<ResetPasswordComponent/>}/>

                        <Route path="main" element={<HomeMainComponent/>}/>

                    </Route>

                    <Route path="admin" element={<AdminAreaComponent/>}>
                        <Route element={<AuthComponent/>}>

                            <Route path="dashboard" >
                                <Route path="graph" element={<GraphComponent/>}/>
                                <Route path="over-view" element={<OverViewComponent/>}/>
                            </Route>
                            <Route path="profile" element={<ProfileComponent/>}></Route>
                            <Route path="setting" >
                                <Route path="list" element={<SettingListComponent/>}/>
                                <Route path="add" element={<SettingAddComponent/>}/>
                                <Route path="edit/:id" element={<SettingAddComponent/>}/>
                                <Route path="detail/:id" element={<SettingDetailComponent/>}/>
                            </Route>
                            <Route path="group" >
                                <Route path="list" element={<GroupListComponent/>}/>
                                <Route path="add" element={<GroupAddComponent/>}/>
                                <Route path="edit/:id" element={<GroupAddComponent/>}/>
                                <Route path="detail/:id" element={<GroupDetailComponent/>}/>
                            </Route>
                            <Route path="user" >
                                <Route path="list" element={<UserListComponent/>}/>
                                <Route path="add" element={<UserAddComponent/>}/>
                                <Route path="edit/:id" element={<UserAddComponent/>}/>
                                <Route path="detail/:id" element={<UserDetailComponent/>}/>
                            </Route>

                            <Route path="permission" >
                                <Route path="list" element={<PermissionListComponent/>}/>
                                <Route path="add" element={<PermissionAddComponent/>}/>
                                <Route path="edit/:id" element={<PermissionAddComponent/>}/>
                                <Route path="detail/:id" element={<PermissionDetailComponent/>}/>
                            </Route>

                            <Route path="permission-group" >
                                <Route path="list" element={<PermissionGroupListComponent/>}/>
                                <Route path="add" element={<PermissionGroupAddComponent/>}/>
                                <Route path="edit/:id" element={<PermissionGroupAddComponent/>}/>
                                <Route path="detail/:id" element={<PermissionGroupDetailComponent/>}/>
                            </Route>

                            <Route path="permission-user" >
                                <Route path="list" element={<PermissionUserListComponent/>}/>
                                <Route path="add" element={<PermissionUserAddComponent/>}/>
                                <Route path="edit/:id" element={<PermissionUserAddComponent/>}/>
                                <Route path="detail/:id" element={<PermissionUserDetailComponent/>}/>
                            </Route>

















                        </Route>
                    </Route>

                    <Route path="/" element={<IndexComponent/>}></Route>
                    <Route path="404" element={<NotFoundPageComponent/>}></Route>
                    <Route path="403" element={<ForbiddenPageComponent/>}></Route>
                    <Route path="*" element={<NotFoundPageComponent/>}></Route>
                </Routes>
                <div className={` ${this.props.spinner ? "preloader" : ""} `}>
                    <div id="spinner">
                    </div>
                </div>

                <Outlet/>
            </>

        );
    }
}


const mapStateToProps = (state: IReduxState) => {
    return {spinner: state.spinner}
}
const mapDispatchToProps = (dispatch: IReduxDispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));


