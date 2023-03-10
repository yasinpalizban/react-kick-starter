import {combineReducers} from "redux";
import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import authReducer from "../../authentication/reducers/auth.reducer";
import reduxMiddleware from "../middlewares/redux.middleware";
import alertReducer from "./alert.reducer";
import spinnerReducer from "./spinner.reducer";
import queryArgumentReducer from "./query.argument.reducer";
import {
    urlPathReducer,
    languageReducer,
    notificationReducer,
    explodeLinkReducer
} from "../../admin-area/reducers/header.reducer";
import profileReducer from "../../common/reducers/profile.reducer";
import settingReducer from "../../common/reducers/setting.reducer";
import overViewReducer from "../../application/reducers/over.view.reducer";
import graphReducer from "../../application/reducers/graph.reducer";
import groupReducer from "../../authorization/reducers/group.reducer";
import permissionReducer from "../../authorization/reducers/permission.reducer";
import permissionGroupReducer from "../../authorization/reducers/permission.group.reducer";
import permissionUserReducer from "../../authorization/reducers/permission.user.reducer";
import userReducer from "../../common/reducers/user.reducer";

export default createStore(
    combineReducers({
        urlPath: urlPathReducer,
        language: languageReducer,
        notification: notificationReducer,
        explodeLink: explodeLinkReducer,
        alert: alertReducer,
        spinner: spinnerReducer,
        queryArgument: queryArgumentReducer,
        auth: authReducer,
        profile: profileReducer,
        setting: settingReducer,
        overView: overViewReducer,
        graph: graphReducer,
        group:groupReducer,
        permission:permissionReducer,
        permissionGroup:permissionGroupReducer,
        permissionUser:permissionUserReducer,
        user:userReducer

    }), applyMiddleware(thunk, reduxMiddleware)
);