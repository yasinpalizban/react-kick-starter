import {get, post, put, _delete} from "../../shared/services/api.service";
import {IHome} from "../interfaces/home.interface";

export const HOME_GET = 'USER_GET';

export async function query(argument:any, dispatch:any) {
    const result = await get<IHome>('home/index', argument);

    dispatch({
        type: HOME_GET,
        payload: result
    });


}


