import {get, post, put, _delete,show} from "../services/api.service";
import {ALERT_NEW} from "./alert.actions";
import {alertSuccess} from "../utils/alert.functions";
import {createSearchParams} from "react-router-dom";
import {Permission} from "../models/permission.model";
import {IPermission} from "../interfaces/permission.interface";
import {IReduxDispatch} from "../interfaces/redux.type.interface";
import {IProps} from "../interfaces/props.common.interface";
import {PERMISSION_SERVICE} from "../configs/path.constants";
import {TOAST_NEW} from "./toast.actions";
import {ToastModel} from "../models/toast.model";

export const PERMISSION_GET = 'PERMISSION_GET';
export const PERMISSION_POST = 'PERMISSION_POST';
export const PERMISSION_PUT = 'PERMISSION_PUT';
export const PERMISSION_DELETE = 'PERMISSION_DELETE';
export const PERMISSION_SHOW = 'PERMISSION_SHOW';

export async function retrieve(dispatch: IReduxDispatch,argument?: number | string | object):Promise<void> {
    const result = await get<IPermission>(PERMISSION_SERVICE.base, argument!);

    dispatch({
        type: PERMISSION_GET,
        payload: result
    });

}
export async function detail(dispatch: IReduxDispatch,argument: number |null):Promise<void> {
    const result = await show<IPermission>(PERMISSION_SERVICE.base, argument);
    dispatch({
        type: PERMISSION_SHOW,
        payload: result
    });

}

export async function save(dispatch: IReduxDispatch,permission: Permission, props:IProps) :Promise<void>{

    const result = await post<IPermission>(PERMISSION_SERVICE.base, permission);

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

export async function update(dispatch: IReduxDispatch,permission: Permission, props:IProps) :Promise<void>{

    const result = await put<IPermission>(PERMISSION_SERVICE.base, permission);

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

export async function remove(dispatch: IReduxDispatch,id: number, index:number) :Promise<void>{

    const result = await _delete(PERMISSION_SERVICE.base, id);
    dispatch({
        type: PERMISSION_DELETE,
        payload: index
    });
    dispatch({
        type: TOAST_NEW,
        payload: new ToastModel({name: '#_#', message: 'delete it item', time: new Date().toDateString()})
    });

}

