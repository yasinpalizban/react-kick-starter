import {get, post, put, _delete, show} from "../services/api.service";
import {ALERT_NEW} from "./alert.actions";
import {alertSuccess} from "../utils/alert.functions";
import {createSearchParams} from "react-router-dom";
import {Group} from "../models/group.model";
import {IGroup} from "../interfaces/group.interface";
import {IReduxDispatch} from "../interfaces/redux.type.interface";
import {IPropsCommon} from "../interfaces/props.common.interface";
import {GROUP_SERVICE} from "../configs/path.constants";
import {TOAST_NEW} from "./toast.actions";
import {ToastModel} from "../models/toast.model";

export const GROUP_GET = 'GROUP_GET';
export const GROUP_POST = 'GROUP_POST';
export const GROUP_PUT = 'GROUP_PUT';
export const GROUP_DELETE = 'GROUP_DELETE';
export const GROUP_SHOW = 'GROUP_SHOW';

export async function retrieve(argument: number | string | object|null, dispatch:IReduxDispatch) :Promise<void>{
    const result = await get<IGroup>(GROUP_SERVICE.base, argument);
    dispatch({
        type: GROUP_GET,
        payload: result
    });

}

export async function detail(argument: number |null, dispatch:IReduxDispatch) :Promise<void>{
    const result = await show<IGroup>(GROUP_SERVICE.base, argument);
    dispatch({
        type: GROUP_SHOW,
        payload: result
    });

}

export async function save(group:Group,props:IPropsCommon, dispatch:IReduxDispatch):Promise<void> {

    const result = await post<IGroup>(GROUP_SERVICE.base, group);
    dispatch({
        type: GROUP_POST,
        payload: group
    });
    dispatch({
        type: ALERT_NEW,
        payload: alertSuccess(props.t('common.messageCreate'))
    });


    setTimeout(() => {
        props.navigate('../list');
    }, 3000);


}

export async function update(group:Group, props:IPropsCommon, dispatch:IReduxDispatch):Promise<void> {

    const result = await put<IGroup>(GROUP_SERVICE.base, group);

    dispatch({
        type: GROUP_PUT,
        payload: group
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

export async function remove(id:number, index: number, dispatch:IReduxDispatch):Promise<void> {

    const result = await _delete(GROUP_SERVICE.base, id);
    dispatch({
        type: GROUP_DELETE,
        payload: index
    });
    dispatch({
        type: TOAST_NEW,
        payload: new ToastModel({name: '#_#', message: 'delete it item', time: new Date().toDateString()})
    });

}

