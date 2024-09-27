
import {IBasic} from "./ibasic";

export interface IPermissionGroup  extends  IBasic {
    permissionId: number,
    groupId: number,
    actions: string,
    permission: string,
    group: string,
}


