import {get} from "../services/api.service";
import {IOverView} from "../interfaces/over.view.interface";
import {OVERVIEW_SERVICE} from "../configs/path.constants";

export const OVERVIEW_GET = 'OVERVIEW_GET';

export async function retrieve(argument: string | number | object | null, dispatch:any) {
    const result = await get<IOverView>(OVERVIEW_SERVICE.base,argument);

    dispatch({
        type: OVERVIEW_GET,
        payload: result
    });

}


