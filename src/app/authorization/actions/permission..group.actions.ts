import {get, post, put, _delete} from "../../shared/services/api.service";
import {ALERT_NEW} from "../../shared/actions/alert.actions";
import {alertSuccess} from "../../shared/utils/alert.functions";
import {createSearchParams} from "react-router-dom";
import {PermissionGroup} from "../models/permission.group.model";
import {IPermissionGroup} from "../interfaces/permission.group.interface";
import {IReduxDispatch} from "../../shared/interfaces/redux.type.interface";
import {IPropsCommon} from "../../shared/interfaces/props.common.interface";

export const GROUP_PERMISSION_GET = 'GROUP_PERMISSION_GET';
export const GROUP_PERMISSION_POST = 'GROUP_PERMISSION_POST';
export const GROUP_PERMISSION_PUT = 'GROUP_PERMISSION_PUT';
export const GROUP_PERMISSION_DELETE = 'GROUP_PERMISSION_DELETE';

export async function query(argument: number | string | object|null, dispatch:IReduxDispatch) {
    const result = await get<IPermissionGroup>('permissionGroup', argument);
    dispatch({
        type: GROUP_PERMISSION_GET,
        payload: result
    });


}

export async function save(permissionGroup:PermissionGroup, props:IPropsCommon, dispatch:IReduxDispatch) {

    const result = await post<IPermissionGroup>('permissionGroup', permissionGroup);

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

export async function update(permissionGroup:PermissionGroup, props:IPropsCommon, dispatch:IReduxDispatch) {

    const result = await put<IPermissionGroup>('permissionGroup', permissionGroup);

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

export async function remove(id:number, index:number, dispatch:IReduxDispatch) {

    const result = await _delete('permissionGroup', id);
    dispatch({
        type: GROUP_PERMISSION_DELETE,
        payload: index
    });


}

