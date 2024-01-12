import {get, post} from "../services/api.service";
import {IHomeSetting} from "../interfaces/home.interface";
import {IReduxDispatch} from "../interfaces/redux.type.interface";
import {IPropsCommon} from "../interfaces/props.common.interface";
import {ALERT_NEW} from "./alert.actions";
import {alertSuccess} from "../utils/alert.functions";

export const HOME_SETTING_GET = 'HOME_SETTING_GET';
export const HOME_VIEW_GET = 'HOME_VIEW_GET';
export const HOME_NEWS_GET = 'HOME_NEWS_GET';
export const HOME_NEWS_CATEGORY_GET = 'HOME_NEWS_CATEGORY_GET';
export const HOME_NEWS_SUB_CATEGORY_GET = 'HOME_NEWS_SUB_CATEGORY_GET';
export const HOME_NEWS_COMMENT_GET = 'HOME_NEWS_COMMENT_GET';
export const HOME_NEWS_SHOW_GET = 'HOME_NEWS_SHOW_GET';
export const HOME_ADVERTISEMENT_GET = 'HOME_ADVERTISEMENT_GET';
export const HOME_VISITOR_GET = 'HOME_VISITOR_GET';
export const HOME_CONTACT_POST = 'HOME_CONTACT_POST';


export const HOME_JOB_GET = 'HOME_JOB_GET';
export const HOME_JOB_CATEGORY_GET = 'HOME_JOB_CATEGORY_GET';
export const HOME_JOB_SUB_CATEGORY_GET = 'HOME_JOB_SUB_CATEGORY_GET';
export const HOME_JOB_STATE_GET = 'HOME_JOB_STATE_GET';
export const HOME_JOB_SHOW_GET = 'HOME_JOB_SHOW_GET';
export const HOME_JOB_PRICE_GET = 'HOME_JOB_PRICE_GET';

export async function settingList(argument: number | string | object|null, dispatch:IReduxDispatch): Promise<void> {
    const result = await get<IHomeSetting>('home/setting-list', argument);

    dispatch({
        type: HOME_SETTING_GET,
        payload: result
    });


}



























