import {get, post, put, _delete, show} from "../services/api.service";
import {ALERT_NEW} from "./alert.actions";
import {alertSuccess} from "../utils/alert.functions";
import {createSearchParams} from "react-router-dom";
import {PermissionUser} from "../models/permission.user.model";
import {IPermissionUser} from "../interfaces/permission.user.interface";
import {IReduxDispatch} from "../interfaces/redux.type.interface";
import {IProps} from "../interfaces/props.common.interface";
import {IGroup} from "../interfaces/group.interface";
import {PERMISSION_USER_SERVICE} from "../configs/path.constants";
import {TOAST_NEW} from "./toast.actions";
import {ToastModel} from "../models/toast.model";

export const USER_PERMISSION_GET = 'USER_PERMISSION_GET';
export const  USER_PERMISSION_POST = 'USER_PERMISSION_POST';
export const  USER_PERMISSION_PUT = 'USER_PERMISSION_PUT';
export const  USER_PERMISSION_DELETE = 'USER_PERMISSION_DELETE';
export const  USER_PERMISSION_SHOW = 'USER_PERMISSION_SHOW';

export async function retrieve(dispatch: IReduxDispatch,argument?: number | string | object):Promise<void> {
    const result = await get<IPermissionUser>(PERMISSION_USER_SERVICE.base, argument!);

    dispatch({
        type: USER_PERMISSION_GET,
        payload: result
    });

}
export async function detail(dispatch: IReduxDispatch,argument: number ):Promise<void> {
    const result = await show<IPermissionUser>(PERMISSION_USER_SERVICE.base, argument);

    dispatch({
        type: USER_PERMISSION_SHOW,
        payload: result
    });

}
export async function save(dispatch: IReduxDispatch,permissionUser:PermissionUser, props:IProps) :Promise<void>{

    const result = await post<IGroup>(PERMISSION_USER_SERVICE.base, permissionUser);

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

export async function update(dispatch: IReduxDispatch,permissionUser:PermissionUser, props:IProps):Promise<void> {

    const result = await put<IPermissionUser>(PERMISSION_USER_SERVICE.base, permissionUser);

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

export async function remove(dispatch: IReduxDispatch,id:number, index:number):Promise<void> {

    const result = await _delete(PERMISSION_USER_SERVICE.base, id);
    dispatch({
        type:USER_PERMISSION_DELETE,
        payload: index
    });

    dispatch({
        type: TOAST_NEW,
        payload: new ToastModel({name: '#_#', message: 'delete it item', time: new Date().toDateString()})
    });
}

