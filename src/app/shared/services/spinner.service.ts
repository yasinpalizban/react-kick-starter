
import { hideSpinner, showSpinner} from "../actions/spinner.actions";
import {initStore} from "../../../index";

export class SpinnerService {
    constructor() {

    }

    show():void {

        // @ts-ignore
        initStore.dispatch((dispatch:any)=> showSpinner(dispatch));

    }

    hide(): void {
        // @ts-ignore
        initStore.dispatch((dispatch:any)=> hideSpinner(dispatch));

    }
}
