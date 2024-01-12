import {get, post, put, _delete,show} from "../services/api.service";
import {ALERT_NEW} from "./alert.actions";
import {alertSuccess} from "../utils/alert.functions";
import {createSearchParams} from "react-router-dom";
import {User} from "../models/user.model";
import {IUser} from "../interfaces/user.interface";
import {IReduxDispatch} from "../interfaces/redux.type.interface";
import {IPropsCommon} from "../interfaces/props.common.interface";
import {USER_SERVICE} from "../configs/path.constants";
import {TOAST_NEW} from "./toast.actions";
import {ToastModel} from "../models/toast.model";

export const USER_GET = 'USER_GET';
export const USER_POST = 'USER_POST';
export const USER_PUT = 'USER_PUT';
export const USER_DELETE = 'USER_DELETE';
export const USER_SHOW = 'USER_SHOW';

export async function retrieve(argument: number | string | object | null, dispatch: IReduxDispatch):Promise<void> {
    const result = await get<IUser>(USER_SERVICE.base, argument);
    dispatch({
        type: USER_GET,
        payload: result
    });
}

export async function detail(argument: number | null, dispatch: IReduxDispatch):Promise<void> {
    const result = await show<IUser>(USER_SERVICE.base, argument);
    dispatch({
        type: USER_SHOW,
        payload: result
    });
}

export async function save(user: User, props: IPropsCommon, dispatch: IReduxDispatch):Promise<void> {

    const result = await post<IUser>(USER_SERVICE.base, user);

    dispatch({
        type: USER_POST,
        payload: user
    });
    dispatch({
        type: ALERT_NEW,
        payload: alertSuccess(props.t('common.messageCreate'))
    });


    setTimeout(() => {
        props.navigate('../list');
    }, 3000);


}

export async function update(user: User, props: IPropsCommon, dispatch: IReduxDispatch):Promise<void> {
    const result = await put<IUser>(USER_SERVICE.base, user);
    dispatch({
        type: USER_PUT,
        payload: user
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

export async function remove(id: number, index: number, dispatch: IReduxDispatch):Promise<void> {
    const result = await _delete(USER_SERVICE.base, id);
    dispatch({
        type: USER_DELETE,
        payload: index
    });
    dispatch({
        type: TOAST_NEW,
        payload: new ToastModel({name: '#_#', message: 'delete it item', time: new Date().toDateString()})
    });
}

