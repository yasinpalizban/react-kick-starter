import {get} from "../services/api.service";
import {IHomeSetting} from "../interfaces/home.interface";
import {IReduxDispatch} from "../interfaces/redux.type.interface";
export const HOME_SETTING_GET = 'HOME_SETTING_GET';
export async function settingList(dispatch: IReduxDispatch,argument?: number | string | object): Promise<void> {
    const result = await get<IHomeSetting>('home/setting-list', argument!);

    dispatch({
        type: HOME_SETTING_GET,
        payload: result
    });


}



























