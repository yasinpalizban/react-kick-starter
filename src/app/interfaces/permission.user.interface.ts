
import {IBasic} from "./ibasic";

export interface IPermissionUser extends  IBasic {

    permissionId: number,
    userId: number,
    actions: string,
    permission: string,
    username: string,
    firstName: string,
    lastName: string,
}

