import React, {Component} from 'react';
import {AuthContext} from "../contexts/auth.context";
import {isValidToPassAuth} from "../utils/is.valid.to.pass.auth";
import {PermissionType} from "../enums/permission.enum";
import {GlobalConstants} from "../configs/global-constants";
import {IAuth} from "../interfaces/authenticate.interface";
interface IAuthMenu {
    children?: any;
    category: string;
}
class AuthMenuComponent extends Component<IAuthMenu, any> {
    static contextType = AuthContext;
    limitUserMenu = GlobalConstants.limitUserMenu;

    constructor(props: IAuthMenu) {
        super(props);
    }

    render() {
        const user: IAuth = this.context!;
        const permissionList: string[] = this.limitUserMenu[this.props.category];
        for (let i = 0; i < permissionList.length; i++) {
            if (isValidToPassAuth(permissionList[i], PermissionType.Get, user)) {
                return (this.props.children)
            }
        }
        return (<> </>);
    }
}

export default AuthMenuComponent;

