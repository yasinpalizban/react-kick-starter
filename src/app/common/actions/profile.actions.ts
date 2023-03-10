import {get,post} from "../../shared/services/api.service";
import {Profile} from "../models/profile.model";
import {IProfile} from "../interfaces/profile.interface";
import {IReduxDispatch} from "../../shared/interfaces/redux.type.interface";

export const PROFILE_GET = 'PROFILE_GET';
export const PROFILE_POST = 'PROFILE_POST';

export async function query(argument: string | number | object | null,dispatch:IReduxDispatch) {

     const result =  await get<IProfile>('profile',argument);

     dispatch({
        type: PROFILE_GET,
        payload: result
    });

}
export async function save(profile: Profile|FormData,dispatch:IReduxDispatch) {

    const result =  await post<IProfile>('profile',profile);
    dispatch({
        type: PROFILE_POST,
        payload: result
    });

}




