import {INotification} from "../interfaces/notification.interface";

export const URL_PATH = 'URL_PATH';
export const EXPLODE_LINK = 'EXPLODE_LINK';
export const LANGUAGE = 'LANGUAGE';
export const NOTIFICATION= 'NEW_NOTIFICATION';


export function urlPath(url:string, dispatch:any) {

    dispatch({
        type: URL_PATH,
        payload: url
    });

}


export function explodeLink(link:string[], dispatch:any) {

    dispatch({
        type: EXPLODE_LINK,
        payload: link
    });

}

export function language(lang:string, dispatch:any) {
    dispatch({
        type: LANGUAGE,
        payload: lang
    });

}


export function notification(notify:INotification, dispatch:any) {

    dispatch({
        type: NOTIFICATION,
        payload: notify
    });

}




