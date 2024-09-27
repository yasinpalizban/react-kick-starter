import {INotification} from "../interfaces/notification.interface";
import {IReduxDispatch} from "../interfaces/redux.type.interface";

export const URL_PATH = 'URL_PATH';
export const EXPLODE_LINK = 'EXPLODE_LINK';
export const LANGUAGE = 'LANGUAGE';
export const NOTIFICATION= 'NEW_NOTIFICATION';


export function urlPath(dispatch: IReduxDispatch,url:string) {

    dispatch({
        type: URL_PATH,
        payload: url
    });

}


export function explodeLink(dispatch: IReduxDispatch,link:string[]) {

    dispatch({
        type: EXPLODE_LINK,
        payload: link
    });

}

export function language(dispatch: IReduxDispatch,lang:string) {
    dispatch({
        type: LANGUAGE,
        payload: lang
    });

}


export function notification(dispatch: IReduxDispatch,notify:INotification) {

    dispatch({
        type: NOTIFICATION,
        payload: notify
    });

}




