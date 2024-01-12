import axios from '../interceptors/error.interceptor';
import {logger} from "./logger.service";
import {queryParamType} from '../utils/query.param.type-path';
import {isEmpty} from "../utils/is.empty";
import {IResponseObject} from "../interfaces/iresponse.object";


export async function show<T>(path: string, argument: number| null ): Promise<IResponseObject<T>> {
    return axios.get<IResponseObject<T>>(argument ? (path +'/' +argument) : path, )
        .then((result) => result.data);
}

export async function get<T>(path: string, argument: number | string | object | null): Promise<IResponseObject<T[]>> {

    const {param, query} = queryParamType(argument!);
    return axios.get<IResponseObject<T[]>>(query?.length ? (path + query) : path, {
        params: !isEmpty(param) ? param : null,

    }).then((result) => result.data);
}


export async function post<T>(path: string, data: any): Promise<IResponseObject<T>> {
    return axios.post<IResponseObject<T>>(path, data).then((result) => result.data);
}


export async function put<T>(path: string, data: any): Promise<IResponseObject<T>> {
    if (data instanceof FormData) {
        return axios.post<IResponseObject<T>>(path + '/' + data.get('id'), data).then((result) => result.data);
    } else {
        return axios.put<IResponseObject<T>>(path + '/' + data.id, data).then((result) => result.data);
    }

}

export async function _delete(path: string, id: number, foreignKey?: number): Promise<void> {

    let param: any;
    if (foreignKey !== undefined || foreignKey !== 0) {
        param = {foreignKey: foreignKey};
    }
    return axios.delete(path + '/' + id, {params: !isEmpty(param) ? param : null}).then((result) => result.data);
}


