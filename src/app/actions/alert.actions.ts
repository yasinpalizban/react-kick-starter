import {IAlert} from "../interfaces/ialert";

export const ALERT_NEW = 'ALERT_NEW';
export const ALERT_REMOVE = 'ALERT_REMOVE';
export const ALERT_EDIT = 'ALERT_EDIT';
export const ALERT_RESET = 'ALERT_RESET';


export function newAlert(alert:IAlert, dispatch:any) {

    dispatch({
        type: ALERT_NEW,
        payload: alert
    });

}

export function removeAlert(alert:IAlert, dispatch:any) {

    dispatch({
        type: ALERT_REMOVE,
        payload: alert
    });

}

export function resetAlert(dispatch:any) {

    dispatch({
        type: ALERT_RESET
    });

}



export function editAlert(alert:IAlert, dispatch:any) {

    dispatch({
        type: ALERT_EDIT,
        payload: alert
    });

}







