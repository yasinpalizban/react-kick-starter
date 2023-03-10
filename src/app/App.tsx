import React, {Component} from 'react';
import logo from './logo.svg';
import './App.scss';
import {Routes, Route, Link, Outlet} from 'react-router-dom' ;
import {connect} from "react-redux";
import FadeLoader from "react-spinners/FadeLoader";
 import AuthComponent from "./shared/guards/auth.component";
import {callSelect} from '../assets/js/hook';
import {IPropsCommon} from "./shared/interfaces/props.common.interface";
import {IStateCommon} from "./shared/interfaces/state.common.interface";
import {IReduxDispatch, IReduxState} from "./shared/interfaces/redux.type.interface";
import withRouter from "./shared/utils/with.router";

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
    DashboardComponent,
    GraphComponent,
    OverViewComponent,
    ProfileComponent,
    SettingComponent,
    SettingListComponent,
    SettingAddComponent,
    SettingEditComponent,
    SettingDetailComponent,
    UserComponent,
    UserListComponent,
    UserAddComponent,
    UserEditComponent,
    UserDetailComponent,
    GroupComponent,
    GroupListComponent,
    GroupAddComponent,
    GroupEditComponent,
    GroupDetailComponent,
    PermissionComponent,
    PermissionListComponent,
    PermissionAddComponent,
    PermissionEditComponent,
    PermissionDetailComponent,
   PermissionGroupComponent,
    PermissionGroupListComponent,
    PermissionGroupAddComponent,
    PermissionGroupEditComponent,
    PermissionGroupDetailComponent,
    PermissionUserComponent,
    PermissionUserListComponent,
    PermissionUserAddComponent,
    PermissionUserEditComponent,
    PermissionUserDetailComponent,
} from './route.index'

class App extends Component<IPropsCommon, IStateCommon> {

    constructor(props: IPropsCommon | Readonly<IPropsCommon> ) {
        super(props);

    }

    componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, snapshot?: any) {
            callSelect();

    }


    render() {
        return (
            <>
                <Routes>
                    <Route path="home" element={<WebSiteComponent/>}>
                        <Route path="sign-in" element={<LoginComponent/>}/>
                        <Route path="forgot" element={<ForgotComponent/>}/>
                        <Route path="sign-out" element={<LogoutComponent/>}/>
                        <Route path="sign-up" element={<SignUpComponent/>}/>
                        <Route path="activation" element={<ActivationComponent/>}/>
                        <Route path="reset-password" element={<ResetPasswordComponent/>}/>
                    </Route>

                    <Route path="admin" element={<AdminAreaComponent/>}>
                        <Route element={<AuthComponent/>}>

                            <Route path="dashboard" element={<DashboardComponent/>}>
                                <Route path="graph" element={<GraphComponent/>}/>
                                <Route path="over-view" element={<OverViewComponent/>}/>
                            </Route>
                            <Route path="profile" element={<ProfileComponent/>}></Route>
                            <Route path="setting" element={<SettingComponent/>}>
                                <Route path="list" element={<SettingListComponent/>}/>
                                <Route path="add" element={<SettingAddComponent/>}/>
                                <Route path="edit/:id" element={<SettingEditComponent/>}/>
                                <Route path="detail/:id" element={<SettingDetailComponent/>}/>
                            </Route>
                            <Route path="group" element={<GroupComponent/>}>
                                <Route path="list" element={<GroupListComponent/>}/>
                                <Route path="add" element={<GroupAddComponent/>}/>
                                <Route path="edit/:id" element={<GroupEditComponent/>}/>
                                <Route path="detail/:id" element={<GroupDetailComponent/>}/>
                            </Route>
                            <Route path="user" element={<UserComponent/>}>
                                <Route path="list" element={<UserListComponent/>}/>
                                <Route path="add" element={<UserAddComponent/>}/>
                                <Route path="edit/:id" element={<UserEditComponent/>}/>
                                <Route path="detail/:id" element={<UserDetailComponent/>}/>
                            </Route>

                            <Route path="permission" element={<PermissionComponent/>}>
                                <Route path="list" element={<PermissionListComponent/>}/>
                                <Route path="add" element={<PermissionAddComponent/>}/>
                                <Route path="edit/:id" element={<PermissionEditComponent/>}/>
                                <Route path="detail/:id" element={<PermissionDetailComponent/>}/>
                            </Route>

                            <Route path="permission-group" element={<PermissionGroupComponent/>}>
                                <Route path="list" element={<PermissionGroupListComponent/>}/>
                                <Route path="add" element={<PermissionGroupAddComponent/>}/>
                                <Route path="edit/:id" element={<PermissionGroupEditComponent/>}/>
                                <Route path="detail/:id" element={<PermissionGroupDetailComponent/>}/>
                            </Route>

                            <Route path="permission-user" element={<PermissionUserComponent/>}>
                                <Route path="list" element={<PermissionUserListComponent/>}/>
                                <Route path="add" element={<PermissionUserAddComponent/>}/>
                                <Route path="edit/:id" element={<PermissionUserEditComponent/>}/>
                                <Route path="detail/:id" element={<PermissionUserDetailComponent/>}/>
                            </Route>
                        </Route>
                    </Route>

                    <Route path="404" element={<NotFoundPageComponent/>}></Route>
                    <Route path="403" element={<ForbiddenPageComponent/>}></Route>
                    <Route path="*"    element={<NotFoundPageComponent/>}></Route>
                </Routes>

                <div className='fixedButton'>
                    <FadeLoader height={25} width={3}  speedMultiplier={4} loading={this.props.spinner} cssOverride={{display: "block"}}/>
                </div>

                <Outlet/>
            </>

        );
    }
}

const mapStateToProps = (state:  IReduxState) => {
    return {spinner: state.spinner}
}
const mapDispatchToProps = (dispatch:IReduxDispatch) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
