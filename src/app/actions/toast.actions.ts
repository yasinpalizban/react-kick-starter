import {IToast} from "../interfaces/itoast";
import {IReduxDispatch} from "../interfaces/redux.type.interface";


export const TOAST_NEW = 'TOAST_NEW';
export const TOAST_REMOVE = 'TOAST_REMOVE';

export function newToast(dispatch: IReduxDispatch,toast:IToast) {

    dispatch({
        type: TOAST_NEW,
        payload: toast
    });

}

export function removeToast(dispatch: IReduxDispatch) {

    dispatch({
        type: TOAST_REMOVE,
    });

}









