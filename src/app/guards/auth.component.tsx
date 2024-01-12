import React, {Component} from 'react';
import withRouter from "../utils/with.router";
import {Outlet} from "react-router-dom";
import {AuthContext} from "../contexts/auth.context";
import {isEmpty} from "../utils/is.empty";
import {IPropsCommon} from "../interfaces/props.common.interface";
import {IStateCommon} from "../interfaces/state.common.interface";
import {isValidToPassAuth} from "../utils/is.valid.to.pass.auth";
import getPermission from "../utils/get.permissionType";


class AuthComponent extends Component<IPropsCommon, IStateCommon> {
    static contextType = AuthContext;

    constructor(props: IPropsCommon | Readonly<IPropsCommon>) {
        super(props);

    }

    componentDidMount() {
        this.checkAuth();
    }


    componentWillUpdate(nextProps: Readonly<{}>, nextState: Readonly<{}>, nextContext: any) {
        this.checkAuth();
    }

    checkAuth = () => {
        // @ts-ignore
        if (isEmpty(this.context)) {
            this.props.navigate('/home/sign-in', {replace: true});
        } else {
            const explodeLink = window.location.pathname.replace('/admin/', '').
            replace('dashboard/', '').replaceAll(/[0-9]/g, '')
                .split('/').filter(item => item != '');
            let controller = explodeLink[0].replaceAll('-', '').toLowerCase();
            const permissionType = (explodeLink.length > 1) ? getPermission(explodeLink[explodeLink.length-1]) : explodeLink[0];
            const permissionName = controller.replaceAll('-', '').toLowerCase();
            if (!isValidToPassAuth(permissionName, permissionType, this.context!)) {
                this.props.navigate('/403', {replace: true});
            }
        }
    }

    render() {

        return (<> <Outlet/> </>);
    }

}

export default withRouter(AuthComponent);

