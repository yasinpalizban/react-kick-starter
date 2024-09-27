
import {IBasic} from "./ibasic";

export interface IUser extends  IBasic {

    email: string,
    username: string,
    status_message: string,
    status: boolean,
    active: boolean,
    createdAt:  Date,
    updatedAt:  Date,
    deletedAt:  Date,
    firstName: string,
    lastName: string,
    image: string,
    gender: number,
    birthday: string,
    country: string,
    city: string,
    address: string,
    phone: string,
    group: string,
    groupId?: number,
}

