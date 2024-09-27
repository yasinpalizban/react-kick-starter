import {IBasic} from "./ibasic";
export interface ISetting  extends  IBasic{
    key: string,
    value: string,
    description: string,
    status: boolean,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date,
}



