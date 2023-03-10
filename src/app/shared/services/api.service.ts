import axios from '../interceptors/error.interceptor';
import {logger} from "./logger.service";
import {queryParamType} from '../utils/query.param.type-path';
import {isEmpty} from "../utils/is.empty";


export async function get<T>(path:string, argument: number | string | object|null) : Promise<T> {

    const {param, query} = queryParamType(argument!);
    return axios.get(query?.length ? (path + query) : path, {
        params: !isEmpty(param) ? param : null,

    }).then((result)=>result.data);
}


export async function post<T>(path:string, data: any): Promise<T>  {

    return axios.post(path, data).then((result)=>result.data);

}


export async function put<T>(path:string, data:any): Promise<T>  {
    return axios.put(path + '/' + data.id, data).then((result)=>result.data);
}

export async function _delete(path:string, id:number, foreignKey?:number): Promise<void> {

    let param:any;
    if (foreignKey !== undefined) {
        param = {foreignKey: foreignKey};
    }
    return axios.delete(path + '/' + id, {params: !isEmpty(param) ? param : null}).then((result)=>result.data);
}


