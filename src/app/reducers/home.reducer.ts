import {
    HOME_ADVERTISEMENT_GET,
    HOME_CONTACT_POST,
    HOME_JOB_CATEGORY_GET,
    HOME_JOB_GET,
    HOME_JOB_PRICE_GET,
    HOME_JOB_SHOW_GET,
    HOME_JOB_STATE_GET,
    HOME_JOB_SUB_CATEGORY_GET,
    HOME_NEWS_CATEGORY_GET,
    HOME_NEWS_COMMENT_GET,
    HOME_NEWS_GET,
    HOME_NEWS_SHOW_GET,
    HOME_NEWS_SUB_CATEGORY_GET,
    HOME_SETTING_GET,
    HOME_VIEW_GET,
    HOME_VISITOR_GET
} from "../actions/home.actions";
import {IReduxAction} from "../interfaces/redux.type.interface";
import {IHome} from "../interfaces/home.interface";

const initialize: IHome = {};

export default function homeReducer(state = initialize, action: IReduxAction): IHome {
    switch (action.type) {
        case HOME_SETTING_GET:
            state.settingPost = action.payload;
            return state;

        default:
            return state;
    }
}

