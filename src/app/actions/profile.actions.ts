import {get,post} from "../services/api.service";
import {Profile} from "../models/profile.model";
import {IProfile} from "../interfaces/profile.interface";
import {IReduxDispatch} from "../interfaces/redux.type.interface";
import {ALERT_NEW} from "./alert.actions";
import {alertSuccess} from "../utils/alert.functions";
import {IPropsCommon} from "../interfaces/props.common.interface";

export const PROFILE_GET = 'PROFILE_GET';
export const PROFILE_POST = 'PROFILE_POST';

export async function query(argument: string | number | object | null,dispatch:IReduxDispatch):Promise<void> {

     const result =  await get<IProfile>('profile',argument);

     dispatch({
        type: PROFILE_GET,
        payload: result
    });

}
export async function save(profile: Profile|FormData,props: IPropsCommon,dispatch:IReduxDispatch):Promise<void> {

    const result =  await post<IProfile>('profile',profile);
    dispatch({
        type: PROFILE_POST,
        payload: result
    });
    dispatch({
        type: ALERT_NEW,
        payload: alertSuccess(props.t('common.messageCreate'))
    });
}




