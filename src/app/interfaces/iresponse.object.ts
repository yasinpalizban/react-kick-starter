import {IPagination} from "./pagination.interface";

export interface IResponseObject<T> {
    pager?: IPagination;
    data?: T;
    insertId?: number;
    success?: boolean;
    statusMessage?: string
}
