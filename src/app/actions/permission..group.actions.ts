import {get, post, put, _delete,show} from "../services/api.service";
import {ALERT_NEW} from "./alert.actions";
import {alertSuccess} from "../utils/alert.functions";
import {createSearchParams} from "react-router-dom";
import {PermissionGroup} from "../models/permission.group.model";
import {IPermissionGroup} from "../interfaces/permission.group.interface";
import {IReduxDispatch} from "../interfaces/redux.type.interface";
import {IPropsCommon} from "../interfaces/props.common.interface";
import {PERMISSION_GROUP_SERVICE} from "../configs/path.constants";
import {TOAST_NEW} from "./toast.actions";
import {ToastModel} from "../models/toast.model";

export const GROUP_PERMISSION_GET = 'GROUP_PERMISSION_GET';
export const GROUP_PERMISSION_POST = 'GROUP_PERMISSION_POST';
export const GROUP_PERMISSION_PUT = 'GROUP_PERMISSION_PUT';
export const GROUP_PERMISSION_DELETE = 'GROUP_PERMISSION_DELETE';
export const GROUP_PERMISSION_SHOW = 'GROUP_PERMISSION_SHOW';

export async function retrieve(argument: number | string | object|null, dispatch:IReduxDispatch):Promise<void> {
    const result = await get<IPermissionGroup>(PERMISSION_GROUP_SERVICE.base, argument);

    dispatch({
        type: GROUP_PERMISSION_GET,
        payload: result
    });
}

export async function detail(argument: number |null, dispatch:IReduxDispatch):Promise<void> {
    const result = await show<IPermissionGroup>(PERMISSION_GROUP_SERVICE.base, argument);
    dispatch({
        type: GROUP_PERMISSION_SHOW,
        payload: result
    });
}

export async function save(permissionGroup:PermissionGroup, props:IPropsCommon, dispatch:IReduxDispatch) :Promise<void>{

    const result = await post<IPermissionGroup>(PERMISSION_GROUP_SERVICE.base, permissionGroup);

    dispatch({
        type: GROUP_PERMISSION_POST,
        payload: permissionGroup
    });
    dispatch({
        type: ALERT_NEW,
        payload: alertSuccess(props.t('common.messageCreate'))
    });


    setTimeout(() => {
        props.navigate('../list');
    }, 3000);


}

export async function update(permissionGroup:PermissionGroup, props:IPropsCommon, dispatch:IReduxDispatch):Promise<void> {

    const result = await put<IPermissionGroup>(PERMISSION_GROUP_SERVICE.base, permissionGroup);

    dispatch({
        type: GROUP_PERMISSION_PUT,
        payload: permissionGroup
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

export async function remove(id:number, index:number, dispatch:IReduxDispatch):Promise<void> {

    const result = await _delete(PERMISSION_GROUP_SERVICE.base, id);
    dispatch({
        type: GROUP_PERMISSION_DELETE,
        payload: index
    });
    dispatch({
        type: TOAST_NEW,
        payload: new ToastModel({name: '#_#', message: 'delete it item', time: new Date().toDateString()})
    });
}

