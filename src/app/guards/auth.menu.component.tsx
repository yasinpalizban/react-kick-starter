import React, {Component, useContext} from 'react';
import {AuthContext} from "../contexts/auth.context";
import {isValidToPassAuth} from "../utils/is.valid.to.pass.auth";
import {PermissionType} from "../enums/permission.enum";
import {GlobalConstants} from "../configs/global-constants";
import {IAuth} from "../interfaces/authenticate.interface";
interface IAuthMenu {
    children?: any;
    category: string;
}
function AuthMenuComponent (props:IAuthMenu) {
     const contextType:IAuth = useContext(AuthContext);
    const limitUserMenu = GlobalConstants.limitUserMenu;
        const permissionList: string[] = limitUserMenu[props.category];
        for (let i = 0; i < permissionList.length; i++) {
            if (isValidToPassAuth(permissionList[i], PermissionType.Get, contextType)) {
                return (props.children)
            }
        }
        return (<> </>);


}

export default AuthMenuComponent;

