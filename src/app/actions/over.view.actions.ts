import {get} from "../services/api.service";
import {IOverView} from "../interfaces/over.view.interface";

export const OVERVIEW_GET = 'OVERVIEW_GET';

export async function query(argument: string | number | object | null,dispatch:any) {
    const result = await get<IOverView>('overView',argument);

    dispatch({
        type: OVERVIEW_GET,
        payload: result
    });

}


