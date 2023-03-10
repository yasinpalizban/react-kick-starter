import {URL_PATH, LANGUAGE, EXPLODE_LINK, NOTIFICATION} from "../actions/header.actions";
import {IReduxAction} from "../../shared/interfaces/redux.type.interface";
import {INotification} from "../interfaces/notification.interface";

const initializeUrlPath:string = '';
const initializeLanguage: string = 'en';
const initializeExplodeLink:string[] = [];
const initializeNewNotification:Array<INotification> = [];

export function urlPathReducer(state = initializeUrlPath, action:IReduxAction) :string{

    switch (action.type) {
        case URL_PATH:{
            state= action.payload
            return state;
        }

        default:
            return state;
    }
}


export function languageReducer(state = initializeLanguage, action:IReduxAction):string {
    switch (action.type) {
        case LANGUAGE:
            state= action.payload
            return state;
        default:
            return state;
    }
}

export function explodeLinkReducer(state = initializeExplodeLink, action:IReduxAction):string[] {
    switch (action.type) {
        case EXPLODE_LINK: {
            state= action.payload
            return state;
        }
        default:
            return state;
    }
}


export function notificationReducer(state = initializeNewNotification, action:IReduxAction):Array<INotification> {
    switch (action.type) {
        case NOTIFICATION:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}
