import {newToast, removeToast} from "../actions/toast.actions";
import {initStore} from "../../index";
import {IReduxDispatch} from "../interfaces/redux.type.interface";
import {ToastModel} from "../models/toast.model";


export class ToastService {
    onDeleteToast(message: string): void {
        // @ts-ignore
        initStore.dispatch((dispatch: IReduxDispatch) => newToast(new ToastModel({ name:'#_#', message:message, time: new Date().toDateString() }), dispatch));
    }
    onToast(toast: ToastModel): void {
        // @ts-ignore
        initStore.dispatch((dispatch: IReduxDispatch) => newToast(toast, dispatch));
    }
// clear alerts
    clear(): void {
        // @ts-ignore
        initStore.dispatch((dispatch: IReduxDispatch) => removeToast(dispatch));
    }
}
