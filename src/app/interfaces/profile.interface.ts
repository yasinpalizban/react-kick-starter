
import {IBasic} from "./ibasic";

export interface IProfile  extends  IBasic{
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    phone: string,
    image: string,
    address: string;
    country: string,
    city: string,
    gender: string,
    title: string,
    bio: string,
    createdAt:Date
    updatedAt: Date,
    deletedAt:  Date,

}
