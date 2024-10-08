import {get,post} from "../services/api.service";
import {Profile} from "../models/profile.model";
import {IProfile} from "../interfaces/profile.interface";
import {IReduxDispatch} from "../interfaces/redux.type.interface";
import {ALERT_NEW} from "./alert.actions";
import {alertSuccess} from "../utils/alert.functions";
import {IProps} from "../interfaces/props.common.interface";
import {PROFILE_SERVICE} from "../configs/path.constants";

export const PROFILE_GET = 'PROFILE_GET';
export const PROFILE_POST = 'PROFILE_POST';

export async function retrieve(dispatch: IReduxDispatch,argument?: string | number ):Promise<void> {
     const result =  await get<IProfile>(PROFILE_SERVICE.base,argument!);
     dispatch({
        type: PROFILE_GET,
        payload: result
    });

}
export async function save(dispatch: IReduxDispatch,profile: Profile|FormData, props: IProps):Promise<void> {

    const result =  await post<IProfile>(PROFILE_SERVICE.base,profile);
    dispatch({
        type: PROFILE_POST,
        payload: result
    });
    dispatch({
        type: ALERT_NEW,
        payload: alertSuccess(props.t('common.messageCreate'))
    });
}




