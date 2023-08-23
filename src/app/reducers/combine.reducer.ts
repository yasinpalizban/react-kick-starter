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
import settingReducer from "./setting.reducer";
import overViewReducer from "./over.view.reducer";
import graphReducer from "./graph.reducer";
import groupReducer from "./group.reducer";
import permissionReducer from "./permission.reducer";
import permissionGroupReducer from "./permission.group.reducer";
import permissionUserReducer from "./permission.user.reducer";
import userReducer from "./user.reducer";
import shareIdReducer from "./share.id.reducer";
import homeReducer from "./home.reducer";


export default createStore(
    combineReducers({
        urlPath: urlPathReducer,
        language: languageReducer,
        notification: notificationReducer,
        explodeLink: explodeLinkReducer,
        alert: alertReducer,
        spinner: spinnerReducer,
        shareId: shareIdReducer,
        queryArgument: queryArgumentReducer,
        auth: authReducer,
        profile: profileReducer,
        setting: settingReducer,
        overView: overViewReducer,
        graph: graphReducer,
        group: groupReducer,
        permission: permissionReducer,
        permissionGroup: permissionGroupReducer,
        permissionUser: permissionUserReducer,
        user: userReducer,
        home: homeReducer
    }), applyMiddleware(thunk, reduxMiddleware)
);