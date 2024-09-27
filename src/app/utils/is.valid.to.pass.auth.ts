import {IAuth} from "../interfaces/authenticate.interface";

export function isValidToPassAuth(permissionName: string, permissionType: string, user: IAuth): boolean {

    let isAllowed: boolean = false;
    for (const permission of user.permissions!) {
        if (permissionName.toLowerCase() === permission.name.toLowerCase()) {
            if (!permission.active) {
                user.permissionGroup?.forEach(groupPermission => {
                    if (groupPermission.permissionId === permission.id && groupPermission.groupId == user.role?.id) {
                        isAllowed = true;
                        return;
                    }
                });
            } else {
                user.permissionGroup?.forEach(groupPermission => {
                    if (groupPermission.permissionId === permission.id) {
                        groupPermission.actions.split("-")
                            .forEach(value => {
                                if (value.toLowerCase() === permissionType.toLowerCase()) {
                                    isAllowed = true;
                                }
                            });
                        return;
                    }
                });
                user.permissionUser?.forEach(userPermission => {
                    if (userPermission.permissionId === permission.id) {
                        userPermission.actions.split("-")
                            .forEach(value => {
                                if (value.toLowerCase() === permissionType.toLowerCase())
                                    isAllowed = true;
                            });
                        return;
                    }

                });
            }
        }
    }
    return isAllowed;
}
