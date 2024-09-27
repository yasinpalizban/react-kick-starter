import React, {Component, useEffect} from 'react';
import './logout.component.scss';
import {connect, useDispatch} from 'react-redux'
import {signOut} from '../../../actions/auth.actions';
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import withRouter from "../../../hooks/with.router";


function  LogoutComponent (props:any){
    const dispatch=useDispatch();
    useEffect(()=>{
        (async()=>{
            await signOut(dispatch,false);
        })();
    },[]);
    return (<></>);

}

export default withRouter(LogoutComponent);
