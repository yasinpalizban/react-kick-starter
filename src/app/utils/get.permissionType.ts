import {PermissionType} from "../enums/permission.enum";

export default function getPermission(name:string):string {

    switch (name) {
        case "list":
            return PermissionType.Get;
        case "add":
            return PermissionType.Post;
        case "edit":
            return PermissionType.Put;
        case "delete":
            return PermissionType.Delete;
        default:
            return PermissionType.Get;
    }
}
