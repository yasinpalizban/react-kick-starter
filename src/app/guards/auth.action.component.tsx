import React, {Component, useContext} from 'react';
import {AuthContext} from "../contexts/auth.context";
import {isValidToPassAuth} from "../utils/is.valid.to.pass.auth";
import {IAuth} from "../interfaces/authenticate.interface";

interface IAuthAction {
    children?: any;
    permissionType: string;
    permissionName: string;
}

function AuthActionComponent(props: IAuthAction) {
    const contextType:IAuth =  useContext(AuthContext);
    if (isValidToPassAuth(props.permissionName!, props.permissionType!,contextType!)) {
            return (props.children);
        } else {
            return (<> </>);
        }

}

export default AuthActionComponent;

