import React, {createContext, useEffect, useState} from 'react';
import {IAuth} from "../interfaces/authenticate.interface";
const initAuth: IAuth={};
const AuthContext =  createContext(initAuth);

function AuthContextProvider (props:any) {
    const  [state,setState] = useState<IAuth>(JSON.parse(localStorage.getItem('user')!));
        return (
            <AuthContext.Provider value={state}>
                {props.children}
            </AuthContext.Provider>
        );

}

export {AuthContext, AuthContextProvider};
