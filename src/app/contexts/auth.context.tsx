import React from 'react';
import {IAuth} from "../interfaces/authenticate.interface";
const initAuth: IAuth={};
const AuthContext =  React.createContext(initAuth);

class AuthContextProvider extends  React.Component<any,any> {
    constructor(props:any) {
        super(props);
        this.state= JSON.parse(localStorage.getItem('user')!) ?? {};
    }

    render() {
        return (
            <AuthContext.Provider value={{...this.state}}>
                {this.props.children}
            </AuthContext.Provider>
        );
    }

}

export {AuthContext, AuthContextProvider};
