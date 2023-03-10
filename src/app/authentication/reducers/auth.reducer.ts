import {
    AUTH_SIGN_IN,
    AUTH_SIGN_OUT,
    AUTH_RESET_PASSWORD_ACCOUNT_VIA_SMS
    ,AUTH_RESET_PASSWORD_VIA_SMS,
    AUTH_ACTIVATE_ACCOUNT_VIA_EMAIL,AUTH_FORGOT
    ,AUTH_SEND_ACTIVATE_ACCOUNT_VIA_EMAIL
    ,AUTH_IS_SIGN_IN,
AUTH_ACTIVATE_ACCOUNT_VIA_SMS,AUTH_SIGN_UP
    ,Auth_RESET_PASSWORD_VIA_SMS,
    AUTH_SEND_ACTIVATE_ACCOUNT_VIA_SMS,
    Auth_RESET_PASSWORD_VIA_EMAIL,
} from "../actions/auth.actions";
import {IReduxAction} from "../../shared/interfaces/redux.type.interface";
import {IAuth} from "../interfaces/authenticate.interface";

const initialize:IAuth = {};
export default function authReducer(state = initialize, action:IReduxAction):IAuth {
    switch (action.type) {
        case AUTH_SIGN_IN:
            return {
                ...state,
                 ...action.payload
            }
        case AUTH_SIGN_OUT:
            return {
                ...state,
                 ...action.payload
            }

        case AUTH_SIGN_UP:
            return {
                ...state,
                ...action.payload
            }

        case AUTH_IS_SIGN_IN:
            return {
                ...state,
                ...action.payload
            }
        case AUTH_FORGOT:
            return {
                ...state,
                ...action.payload
            }

        case AUTH_ACTIVATE_ACCOUNT_VIA_SMS:
            return {
                ...state,
                ...action.payload
            }
        case AUTH_ACTIVATE_ACCOUNT_VIA_EMAIL:
            return {
                ...state,
                ...action.payload
            }
        case AUTH_RESET_PASSWORD_ACCOUNT_VIA_SMS:
            return {
                ...state,
                ...action.payload
            }
        case AUTH_RESET_PASSWORD_VIA_SMS:
            return {
                ...state,
                ...action.payload
            }


        case AUTH_SEND_ACTIVATE_ACCOUNT_VIA_EMAIL:
            return {
                ...state,
                ...action.payload
            }
            case Auth_RESET_PASSWORD_VIA_SMS:
            return {
                ...state,
                ...action.payload
            }
            case AUTH_SEND_ACTIVATE_ACCOUNT_VIA_SMS:
            return {
                ...state,
                ...action.payload
            }
            case Auth_RESET_PASSWORD_VIA_EMAIL:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}