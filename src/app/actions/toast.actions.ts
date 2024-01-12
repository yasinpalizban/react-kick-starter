import {IToast} from "../interfaces/itoast";


export const TOAST_NEW = 'TOAST_NEW';
export const TOAST_REMOVE = 'TOAST_REMOVE';

export function newToast(toast:IToast, dispatch:any) {

    dispatch({
        type: TOAST_NEW,
        payload: toast
    });

}

export function removeToast(dispatch:any) {

    dispatch({
        type: TOAST_REMOVE,
    });

}









