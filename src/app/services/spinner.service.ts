
import { hideSpinner, showSpinner} from "../actions/spinner.actions";
import {initStore} from "../../index";
import {IReduxDispatch} from "../interfaces/redux.type.interface";

export class SpinnerService {
    constructor() {

    }

    show():void {

        // @ts-ignore
        initStore.dispatch((dispatch:IReduxDispatch)=> showSpinner(dispatch));

    }

    hide(): void {
        // @ts-ignore
        initStore.dispatch((dispatch:IReduxDispatch)=> hideSpinner(dispatch));

    }
}
