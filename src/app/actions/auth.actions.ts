import {post,get} from "../services/api.service";
import {RoleType} from "../enums/role.enum";
import {environment} from "../../environments/environment";
import {ALERT_NEW} from "./alert.actions";
import {alertSuccess} from "../utils/alert.functions";
import {Auth} from "../interfaces/authenticate.model";
import {IAuth} from "../interfaces/authenticate.interface";
import {IProps} from "../interfaces/props.common.interface";
import {IReduxDispatch} from "../interfaces/redux.type.interface";
import {isEmpty} from "../utils/is.empty";
import {AUTH_SERVICE} from "../configs/path.constants";

export const AUTH_SIGN_IN = 'AUTH_SIGN_IN';
export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';
export const AUTH_SIGN_UP = 'AUTH_SIGN_UP';
export const AUTH_IS_SIGN_IN = 'AUTH_IS_SIGN_IN';
export const AUTH_FORGOT = 'AUTH_FORGOT';

export const AUTH_ACTIVATE_ACCOUNT_VIA_EMAIL = 'AUTH_ACTIVATE_ACCOUNT_VIA_EMAIL';
export const AUTH_SEND_ACTIVATE_ACCOUNT_VIA_EMAIL = 'AUTH_SEND_ACTIVATE_ACCOUNT_VIA_EMAIL';
export const Auth_RESET_PASSWORD_VIA_EMAIL = 'Auth_RESET_PASSWORD_VIA_EMAIL';
export const Auth_RESET_PASSWORD_VIA_SMS = 'Auth_RESET_PASSWORD_VIA_SMS';

export const AUTH_RESET_PASSWORD_VIA_SMS = 'AUTH_RESET_PASSWORD_VIA_SMS';
export const AUTH_RESET_PASSWORD_ACCOUNT_VIA_SMS = 'AUTH_RESET_PASSWORD_ACCOUNT_VIA_SMS';

export const AUTH_ACTIVATE_ACCOUNT_VIA_SMS = 'AUTH_ACTIVATE_ACCOUNT_VIA_SMS';
export const AUTH_SEND_ACTIVATE_ACCOUNT_VIA_SMS = 'AUTH_SEND_ACTIVATE_ACCOUNT_VIA_SMS';

export async function signIn(dispatch: IReduxDispatch,auth: Auth) {
    const result= await post<IAuth>('auth/signin', auth);

    localStorage.setItem('csrf', result.data?.csrf!);
    localStorage.setItem('user', JSON.stringify(result.data));

    let address = window.location.origin;
    let pathRedirect = '/admin/dashboard/over-view';
    if (result.data?.role?.name === RoleType.Member) {
        pathRedirect = '/admin/profile';
    }
    if (address.search('www') !== -1) {
        window.location.replace(environment.siteAddress.two + pathRedirect);
    } else {
        window.location.replace(environment.siteAddress.one + pathRedirect);
    }

    dispatch({
        type: AUTH_SIGN_IN,
        payload: result
    });

}

export async function signOut(dispatch: IReduxDispatch,flag:boolean) {

    if(flag){
        const result = await post<IAuth>('auth/signout', {none: ''});
        dispatch({
            type: AUTH_SIGN_OUT,
            payload: {}
        });
    }


    localStorage.removeItem('csrf');
    localStorage.removeItem('user');
    localStorage.removeItem('chatRoom');

    let address = window.location.origin;

    if (address.search('www') !== -1) {
        window.location.replace(environment.siteAddress.two + '/home/sign-in');
    } else {
        window.location.replace(environment.siteAddress.one + '/home/sign-in');
    }

}


export async function isSignIn(dispatch: IReduxDispatch) {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (!isEmpty(user) && !(user.jwt.expire < Math.floor(new Date().getTime() / 1000))) {
            let address = window.location.origin;
            let extendPath = '/admin/dashboard/over-view';
            if (user.role?.name === RoleType.Member ||RoleType.Contractor) {
                extendPath = '/admin/profile';
            }
            if (address.search('www') !== -1) {
                window.location.replace(environment.siteAddress.two + extendPath);
            } else {
                window.location.replace(environment.siteAddress.one + extendPath);
            }
    }


    dispatch({
        type: AUTH_IS_SIGN_IN,
        payload: {}
    });

}


export async function activateAccountViaEmail(dispatch: IReduxDispatch,auth: Auth, props: IProps) {

    const result = await post<IAuth>('auth/activate-account-email', auth);

    dispatch({
        type: AUTH_ACTIVATE_ACCOUNT_VIA_EMAIL,
        payload: {}
    });
    dispatch({
        type: ALERT_NEW,
        payload: alertSuccess(props.t('auth.messageActivate'))
    });

    setTimeout(() => {
        props.navigate('../sign-in');
    }, 3000);


}


export async function sendActivateCodeViaEmail(dispatch: IReduxDispatch,auth: Auth, props: IProps) {

    const result = await post<IAuth>('auth/send-activate-email', auth);

    dispatch({
        type: AUTH_SEND_ACTIVATE_ACCOUNT_VIA_EMAIL,
        payload: {}
    });
    dispatch({
        type: ALERT_NEW,
        payload: alertSuccess(props.t('auth.messageSendEmail'))
    });


}


export async function forgot(dispatch: IReduxDispatch,auth: Auth, props: IProps) {

    const result = await post<IAuth>('auth/forgot', auth);

    dispatch({
        type: AUTH_FORGOT,
        payload: {}
    });
    dispatch({
        type: ALERT_NEW,
        payload: alertSuccess(props.t('auth.messageForgot'))
    });


}

export async function signUp(dispatch: IReduxDispatch,auth: Auth, props: IProps) {

    const result = await post<IAuth>('auth/signup', auth);

    dispatch({
        type: AUTH_SIGN_UP,
        payload: {}
    });

    dispatch({
        type: ALERT_NEW,
        payload: alertSuccess(props.t('auth.messageRegister'))
    });

    setTimeout(() => {
        props.navigate('../sign-in');
    }, 3000);


}


export async function resetPasswordViaEmail(dispatch: IReduxDispatch,auth: Auth, props: IProps) {

    const result = await post<IAuth>('auth/reset-password-email', auth);

    dispatch({
        type: AUTH_SIGN_UP,
        payload: {}
    });

    dispatch({
        type: ALERT_NEW,
        payload: alertSuccess(props.t('auth.messageReset'))
    });

    setTimeout(() => {
        props.navigate('../sign-in');
    }, 3000);


}


export async function resetPasswordViaSms(dispatch: IReduxDispatch,auth: Auth, props: IProps) {

    const result = await post<IAuth>('auth/reset-password-sms', auth);

    dispatch({
        type: AUTH_SIGN_UP,
        payload: {}
    });

    dispatch({
        type: ALERT_NEW,
        payload: alertSuccess(props.t('auth.messageReset'))
    });

    setTimeout(() => {
        props.navigate('../sign-in');
    }, 3000);


}

export async function activateAccountViaSms(dispatch: IReduxDispatch,auth: Auth, props: IProps) {

    const result = await post<IAuth>('auth/activate-account-sms', auth);

    dispatch({
        type: AUTH_ACTIVATE_ACCOUNT_VIA_SMS,
        payload: {}
    });
    dispatch({
        type: ALERT_NEW,
        payload: alertSuccess(props.t('auth.messageActivate'))
    });
    setTimeout(() => {
        props.navigate('../sign-in');
    }, 3000);


}


export async function sendActivateCodeViaSms(dispatch: IReduxDispatch,auth: Auth, props: IProps) {

    const result = await post<IAuth>('auth/send-activate-sms', auth);

    dispatch({
        type: AUTH_SEND_ACTIVATE_ACCOUNT_VIA_SMS,
        payload: {}
    });
    dispatch({
        type: ALERT_NEW,
        payload: alertSuccess(props.t('auth.messageSendSms'))
    });


}




