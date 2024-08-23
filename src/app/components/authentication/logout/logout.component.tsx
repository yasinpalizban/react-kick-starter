import React, {Component, useEffect} from 'react';
import './logout.component.scss';
import {connect} from 'react-redux'
import {signOut} from '../../../actions/auth.actions';
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import withRouter from "../../../utils/with.router";


function  LogoutComponent (props:any){
    useEffect(()=>{
        (async()=>{
            await props._signOut();
        })();
    },[]);
        return (<></>);

}

const mapStateToProps = (state:IReduxState) => {
    return {}
}
const mapDispatchToProps =(dispatch:IReduxDispatch) => {
    return {
        _signOut:  () =>  signOut(false,dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LogoutComponent));
