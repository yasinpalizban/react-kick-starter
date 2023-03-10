import {AlertType} from "../enums/alert.enum";

export function alertSuccess(message:string,id:string='default-alert') {
    return {
        type: AlertType.Success,
        message: message,
        id: id,
        autoClose: true,
        keepAfterRouteChange: false,
        body: []
    }
}

export function alertError(message:string,id:string='default-alert') {
    return {
        type: AlertType.Error,
        message: message,
        id: id,
        autoClose: true,
        keepAfterRouteChange: false,
        body: []
    }
}

export function alertWarning(message:string,id:string='default-alert') {
    return {
        type: AlertType.Warning,
        message: message,
        id: id,
        autoClose: true,
        keepAfterRouteChange: false,
        body: []
    }
}

export function alertInfo(message:string,id:string='default-alert') {
    return {
        type: AlertType.Warning,
        message: message,
        id: id,
        autoClose: true,
        keepAfterRouteChange: false,
        body: []
    }
}