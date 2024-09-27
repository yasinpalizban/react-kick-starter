import {AlertType} from '../enums/alert.enum';
import { newAlert, removeAlert} from "../actions/alert.actions";
import {initStore} from "../../index";
import {IAlert} from "../interfaces/ialert";
import {Alert} from "../models/alert.model";
import {IReduxDispatch} from "../interfaces/redux.type.interface";


export class AlertService {
    private defaultId = 'default-alert';
    alertOptions: IAlert;
    constructor() {
        this.defaultId = 'default-alert';
        this.alertOptions = {
            autoClose: true,
            keepAfterRouteChange: false,
            body: []
        };

    }

    get alertOption() {

        return this.alertOptions;
    }

    // convenience methods
    success(message:string, options:any): void {
        this.clear();
        this.alert({...options, type: AlertType.Success, message});
    }

    error(message:string, options:any): void {
        console.error(message,options);
        this.clear();
        this.alert({...options, type: AlertType.Error, message});
    }

    info(message:string, options:any): void {
        this.clear();
        this.alert({...options, type: AlertType.Info, message});
    }

    warn(message:string, options:any): void {
        this.clear();
        this.alert({...options, type: AlertType.Warning, message});
    }

// main alert method
    alert(alertObj:Alert): void {
        alertObj.id = alertObj.id || this.defaultId;
        // @ts-ignore
        initStore.dispatch((dispatch:IReduxDispatch)=> newAlert(dispatch,alertObj));

    }
    clear(id = this.defaultId): void {
        // @ts-ignore
        initStore.dispatch((dispatch:IReduxDispatch)=> removeAlert( dispatch,{id}));

    }
}
