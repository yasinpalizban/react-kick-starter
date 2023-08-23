import {get, post, put, _delete} from "../services/api.service";
import {ALERT_NEW} from "./alert.actions";
import {alertSuccess} from "../utils/alert.functions";
import {createSearchParams} from "react-router-dom";
import {PermissionUser} from "../models/permission.user.model";
import {IPermissionUser} from "../interfaces/permission.user.interface";
import {IReduxDispatch} from "../interfaces/redux.type.interface";
import {IPropsCommon} from "../interfaces/props.common.interface";
import {IGroup} from "../interfaces/group.interface";

export const USER_PERMISSION_GET = 'USER_PERMISSION_GET';
export const  USER_PERMISSION_POST = 'USER_PERMISSION_POST';
export const  USER_PERMISSION_PUT = 'USER_PERMISSION_PUT';
export const  USER_PERMISSION_DELETE = 'USER_PERMISSION_DELETE';

export async function query(argument: number | string | object|null, dispatch: IReduxDispatch):Promise<void> {
    const result = await get<IPermissionUser>('permissionUser', argument);

    dispatch({
        type: USER_PERMISSION_GET,
        payload: result
    });


}

export async function save(permissionUser:PermissionUser, props:IPropsCommon, dispatch:IReduxDispatch) :Promise<void>{

    const result = await post<IGroup>('permissionUser', permissionUser);

    dispatch({
        type: USER_PERMISSION_POST,
        payload: permissionUser
    });
    dispatch({
        type: ALERT_NEW,
        payload: alertSuccess(props.t('common.messageCreate'))
    });


    setTimeout(() => {
        props.navigate('../list');
    }, 3000);


}

export async function update(permissionUser:PermissionUser, props:IPropsCommon, dispatch:IReduxDispatch):Promise<void> {

    const result = await put<IPermissionUser>('permissionUser', permissionUser);

    dispatch({
        type: USER_PERMISSION_PUT,
        payload: permissionUser
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

    const result = await _delete('permissionUser', id);
    dispatch({
        type:USER_PERMISSION_DELETE,
        payload: index
    });


}

