import {combineReducers} from "redux";
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import authReducer from "./auth.reducer";
import reduxMiddleware from "../middlewares/redux.middleware";
import alertReducer from "./alert.reducer";
import spinnerReducer from "./spinner.reducer";
import queryArgumentReducer from "./query.argument.reducer";
import {
    urlPathReducer,
    languageReducer,
    notificationReducer,
    explodeLinkReducer
} from "./header.reducer";
import profileReducer from "./profile.reducer";
import {settingReducer, settingSelectReducer} from "./setting.reducer";
import overViewReducer from "./over.view.reducer";
import graphReducer from "./graph.reducer";
import {groupReducer, groupSelectReducer} from "./group.reducer";
import {permissionReducer, permissionSelectReducer} from "./permission.reducer";
import {permissionGroupReducer, permissionGroupSelectReducer} from "./permission.group.reducer";
import {permissionUserReducer, permissionUserSelectReducer} from "./permission.user.reducer";
import {userReducer, userSelectReducer} from "./user.reducer";
import shareIdReducer from "./share.id.reducer";
import homeReducer from "./home.reducer";
import toastReducer from "./toast.reducer";


export default createStore(
    combineReducers({
        urlPath: urlPathReducer,
        language: languageReducer,
        notification: notificationReducer,
        explodeLink: explodeLinkReducer,
        alert: alertReducer,
        toast: toastReducer,
        spinner: spinnerReducer,
        shareId: shareIdReducer,
        queryArgument: queryArgumentReducer,
        auth: authReducer,
        profile: profileReducer,
        setting: settingReducer,
        settingSelect: settingSelectReducer,
        overView: overViewReducer,
        graph: graphReducer,
        group: groupReducer,
        groupSelect: groupSelectReducer,
        permission: permissionReducer,
        permissionSelect: permissionSelectReducer,
        permissionGroup: permissionGroupReducer,
        permissionGroupSelect: permissionGroupSelectReducer,
        permissionUser: permissionUserReducer,
        permissionUserSelect: permissionUserSelectReducer,
        user: userReducer,
        userSelect: userSelectReducer,
        home: homeReducer
    }), applyMiddleware(thunk, reduxMiddleware)
);
