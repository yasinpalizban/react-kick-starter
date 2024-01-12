import React, {Component} from 'react';
import {AuthContext} from "../contexts/auth.context";
import {isValidToPassAuth} from "../utils/is.valid.to.pass.auth";

interface IAuthAction {
    children?: any;
    permissionType: string;
    permissionName: string;
}

class AuthActionComponent extends Component<IAuthAction, any> {
    static contextType = AuthContext;


    constructor(props: IAuthAction) {
        super(props);
    }

    render() {

        if (isValidToPassAuth(this.props.permissionName!, this.props.permissionType!, this.context!)) {
            return (this.props.children);
        } else {
            return (<> </>);
        }

    }
}

export default AuthActionComponent;

