import {get, post, put, _delete} from "../../shared/services/api.service";
import {ALERT_NEW} from "../../shared/actions/alert.actions";
import {alertSuccess} from "../../shared/utils/alert.functions";
import {createSearchParams} from "react-router-dom";
import {User} from "../models/user.model";
import {IUser} from "../interfaces/user.interface";
import {IReduxDispatch} from "../../shared/interfaces/redux.type.interface";
import {IPropsCommon} from "../../shared/interfaces/props.common.interface";

export const USER_GET = 'USER_GET';
export const USER_POST = 'USER_POST';
export const USER_PUT = 'USER_PUT';
export const USER_DELETE = 'USER_DELETE';

export async function query(argument: number | string | object | null, dispatch: IReduxDispatch) {
    const result = await get<IUser>('user', argument);

    dispatch({
        type: USER_GET,
        payload: result
    });


}

export async function save(user: User, props: IPropsCommon, dispatch: IReduxDispatch) {

    const result = await post<IUser>('user', user);

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

export async function update(user: User, props: IPropsCommon, dispatch: IReduxDispatch) {

    const result = await put<IUser>('user', user);

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

export async function remove(id: number, index: number, dispatch: IReduxDispatch) {

    const result = await _delete('user', id);
    dispatch({
        type: USER_DELETE,
        payload: index
    });


}

