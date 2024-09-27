import React, {Component, useContext, useEffect} from 'react';
import withRouter from "../hooks/with.router";
import {Outlet} from "react-router-dom";
import {AuthContext} from "../contexts/auth.context";
import {isEmpty} from "../utils/is.empty";
import {IProps} from "../interfaces/props.common.interface";
import {isValidToPassAuth} from "../utils/is.valid.to.pass.auth";
import getPermission from "../utils/get.permissionType";
import {IAuth} from "../interfaces/authenticate.interface";


function AuthComponent ( props:IProps) {
    const contextType:IAuth = useContext(AuthContext);
    useEffect(()=>{
        checkAuth();
    },[]);


  const  checkAuth = () => {

        if (isEmpty(contextType)) {
            props.navigate('/home/sign-in', {replace: true});
        } else {
            const explodeLink = window.location.pathname.replace('/admin/', '').
            replace('dashboard/', '').replaceAll(/[0-9]/g, '')
                .split('/').filter(item => item != '');
            let controller = explodeLink[0].replaceAll('-', '').toLowerCase();
            const permissionType = (explodeLink.length > 1) ? getPermission(explodeLink[explodeLink.length-1]) : explodeLink[0];
            const permissionName = controller.replaceAll('-', '').toLowerCase();

            if (!isValidToPassAuth(permissionName, permissionType, contextType!)) {
                props.navigate('/403', {replace: true});
            }
        }
    }
        return (<> <Outlet/> </>);
}

export default withRouter(AuthComponent);

