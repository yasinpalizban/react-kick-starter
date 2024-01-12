import {get, post, put, _delete, show} from "../services/api.service";
import {ALERT_NEW} from "./alert.actions";
import {alertSuccess} from "../utils/alert.functions";
import {createSearchParams} from "react-router-dom";
import {Setting} from "../models/setting.model";
import {IReduxDispatch} from "../interfaces/redux.type.interface";
import {ISetting} from "../interfaces/setting.interface";
import {IPropsCommon} from "../interfaces/props.common.interface";
import {SETTING_SERVICE} from "../configs/path.constants";
import {TOAST_NEW} from "./toast.actions";
import {ToastModel} from "../models/toast.model";

export const SETTING_GET = 'SETTING_GET';
export const SETTING_POST = 'SETTING_POST';
export const SETTING_PUT = 'SETTING_PUT';
export const SETTING_DELETE = 'SETTING_DELETE';
export const SETTING_SHOW = 'SETTING_SHOW';

export async function retrieve(argument: number | string | object | null, dispatch: IReduxDispatch): Promise<void> {
    const result = await get<ISetting>(SETTING_SERVICE.base, argument);

    dispatch({
        type: SETTING_GET,
        payload: result
    });


}

export async function detail(argument: number | null, dispatch: IReduxDispatch): Promise<void> {
    const result = await show<ISetting>(SETTING_SERVICE.base, argument);
    dispatch({
        type: SETTING_SHOW,
        payload: result
    });


}

export async function save(setting: Setting, props: IPropsCommon, dispatch: IReduxDispatch): Promise<void> {

    const result = await post<ISetting>(SETTING_SERVICE.base, setting);

    dispatch({
        type: SETTING_POST,
        payload: setting
    });
    dispatch({
        type: ALERT_NEW,
        payload: alertSuccess(props.t('common.messageCreate'))
    });


    setTimeout(() => {
        props.navigate('../list');
    }, 3000);


}

export async function update(setting: Setting, props: IPropsCommon, dispatch: IReduxDispatch): Promise<void> {

    const result = await put<ISetting>(SETTING_SERVICE.base, setting);

    dispatch({
        type: SETTING_PUT,
        payload: setting
    });

    dispatch({
        type: ALERT_NEW,
        payload: alertSuccess(props.t('common.messageUpdate'))
    });

    const createSearchParam = createSearchParams(props.queryArgument[props.queryArgument.length - 1]);

    setTimeout(() => {
        props.navigate(
            {
                pathname: "../list",
                search: `?${createSearchParam}`,
            },
        );
    }, 3000);


}

export async function remove(id: number, index: number, dispatch: IReduxDispatch): Promise<void> {

     const result = await _delete(SETTING_SERVICE.base, id);
    dispatch({
        type: SETTING_DELETE,
        payload: index
    });
    dispatch({
        type: TOAST_NEW,
        payload: new ToastModel({name: '#_#', message: 'delete it item', time: new Date().toDateString()})
    });

}

