import React, {Component} from 'react';
import './logout.component.scss';
import {connect} from 'react-redux'
import {signOut} from '../../../actions/auth.actions';
import {IReduxDispatch, IReduxState} from "../../../interfaces/redux.type.interface";
import {IPropsAuth, IStateAuth} from "../../../interfaces/authenticate.interface";
import withRouter from "../../../utils/with.router";


class LogoutComponent extends Component  <IPropsAuth,IStateAuth>{

    constructor(props:any) {
        super(props);
    }


   async componentDidMount() {
       await this.props._signOut();
   }

    render() {
        return (<></>);
   }
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
