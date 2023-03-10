import React, {Component} from 'react';
import withRouter from "../utils/with.router";
import {Outlet} from "react-router-dom";
import {AuthContext} from "../../authentication/contexts/auth.context";
import {isEmpty} from "../utils/is.empty";
import {RoleRouteService} from "../services/role.route.service";
import {IPropsCommon} from "../interfaces/props.common.interface";
import {IStateCommon} from "../interfaces/state.common.interface";


class AuthComponent extends Component<IPropsCommon,IStateCommon> {
    static contextType = AuthContext;

    constructor(props: any) {
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
            this.props.navigate('/home/sign-in',{replace: true});
        } else {

            const roleRouteService = new RoleRouteService();
            const explodeLink = window.location.pathname.split('/');
            const length = explodeLink.length;
            let controller = ''
            let view = ''
            const regularExpression = new RegExp(/^\d+$/);

            if (regularExpression.exec(explodeLink[length - 1])) {
                controller = explodeLink[length - 3];
                view = explodeLink[length - 2];
            } else if (explodeLink[length - 1].toLowerCase() === 'add') {
                controller = explodeLink[length - 2];
                view = explodeLink[length - 1];
            } else if (
                explodeLink[length - 1].toLowerCase() === 'over-view' ||
                explodeLink[length - 1].toLowerCase() === 'graph' ||
                explodeLink[length - 1].toLowerCase() === 'profile'
            ) {
                controller = explodeLink[length - 1];
                view = explodeLink[length - 1];

            } else if (explodeLink[length - 1].toLowerCase() === 'private' || explodeLink[length - 1].toLowerCase() === 'room' || explodeLink[length - 1].toLowerCase() === 'contact'
                && explodeLink[length - 2].toLowerCase() === 'chat') {
                controller = explodeLink[length - 2] + explodeLink[length - 1];
                view = explodeLink[length - 1];
            } else {
                controller = explodeLink[length - 2];
                view = explodeLink[length - 1];
            }

            if (controller.includes('-')) {
                controller = controller.split('-').join('').toLowerCase();
            }
            const roles = roleRouteService.getRoleAccess(controller);
            const permission = roleRouteService.getPermission(view);
            const permissionName = roleRouteService.getPermissionName(controller);
            console.log({c: controller, v: view});
            console.log({p: permission, r: roles, pn: permissionName,v:roleRouteService.isValid(this.context!, roles, permissionName!, permission)});
            if (!roleRouteService.isValid(this.context!, roles, permissionName!, permission)) {
                this.props.navigate('/403',{replace: true});

            }
        }
    }

    render() {

        return (<> <Outlet/> </>);
    }

}

export default withRouter(AuthComponent);

