import {get, post, put, _delete} from "../../shared/services/api.service";
import {ALERT_NEW} from "../../shared/actions/alert.actions";
import {alertSuccess} from "../../shared/utils/alert.functions";
import {createSearchParams} from "react-router-dom";
import {Permission} from "../models/permission.model";
import {IPermission} from "../interfaces/permission.interface";
import {IReduxDispatch} from "../../shared/interfaces/redux.type.interface";
import {IPropsCommon} from "../../shared/interfaces/props.common.interface";
import {IGroup} from "../interfaces/group.interface";

export const PERMISSION_GET = 'PERMISSION_GET';
export const PERMISSION_POST = 'PERMISSION_POST';
export const PERMISSION_PUT = 'PERMISSION_PUT';
export const PERMISSION_DELETE = 'PERMISSION_DELETE';

export async function query(argument: number | string | object|null, dispatch:IReduxDispatch) {
    const result = await get<IPermission>('permission', argument);

    dispatch({
        type: PERMISSION_GET,
        payload: result
    });


}

export async function save(permission: Permission, props:IPropsCommon, dispatch:IReduxDispatch) {

    const result = await post<IPermission>('permission', permission);

    dispatch({
        type: PERMISSION_POST,
        payload: permission
    });
    dispatch({
        type: ALERT_NEW,
        payload: alertSuccess(props.t('common.messageCreate'))
    });


    setTimeout(() => {
        props.navigate('../list');
    }, 3000);


}

export async function update(permission: Permission, props:IPropsCommon, dispatch:IReduxDispatch) {

    const result = await put<IPermission>('permission', permission);

    dispatch({
        type: PERMISSION_PUT,
        payload: permission
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

export async function remove(id: number, index:number, dispatch:IReduxDispatch) {

    const result = await _delete('permission', id);
    dispatch({
        type: PERMISSION_DELETE,
        payload: index
    });


}

