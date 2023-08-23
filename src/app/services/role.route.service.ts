import {RoleType} from "../enums/role.enum";
import {PermissionType} from "../enums/permission.enum";
import {IAuth} from "../interfaces/authenticate.interface";

export class RoleRouteService {
    getRoleAccess(name:string):string[]|null {
        const listOfRule:any = {
            profile: null,
            graph: [RoleType.Admin, RoleType.Coworker, RoleType.Blogger],
            overView: [RoleType.Admin, RoleType.Coworker, RoleType.Blogger],

            user: [RoleType.Admin],
            group: [RoleType.Admin],
            permission: [RoleType.Admin],
            permissionUser: [RoleType.Admin],
            permissionGroup: [RoleType.Admin],

            setting: [RoleType.Admin],
            visitor: [RoleType.Admin, RoleType.Coworker],

            chatContact: [RoleType.Admin, RoleType.Coworker, RoleType.Blogger],
            chatRoom: [RoleType.Admin, RoleType.Coworker, RoleType.Blogger],
            chatRoomMedia: [RoleType.Admin, RoleType.Coworker, RoleType.Blogger],
            chatPrivate: [RoleType.Admin, RoleType.Coworker, RoleType.Blogger],
            chatPrivateMedia: [RoleType.Admin, RoleType.Coworker, RoleType.Blogger],

            advertisement: [RoleType.Admin, RoleType.Coworker],
            advertisementMedia: [RoleType.Admin, RoleType.Coworker],

            contact: [RoleType.Admin, RoleType.Coworker],
            contactMedia: [RoleType.Admin, RoleType.Coworker],

            newsCategory: [RoleType.Admin, RoleType.Blogger],
            newsPost: [RoleType.Admin, RoleType.Blogger],
            newsMedia: [RoleType.Admin, RoleType.Blogger],
            newsComment: [RoleType.Admin, RoleType.Blogger],
            newsSubCategory: [RoleType.Admin, RoleType.Blogger],

            viewOption: [RoleType.Admin, RoleType.Coworker],
            viewMedia: [RoleType.Admin, RoleType.Coworker],

            requestCategory: [RoleType.Admin, RoleType.Coworker,RoleType.Member,RoleType.Contractor],
            requestPost: [RoleType.Admin, RoleType.Coworker,RoleType.Member,RoleType.Contractor],
            requestReply:[RoleType.Admin, RoleType.Coworker,RoleType.Member,RoleType.Contractor],


            jobActivity: [RoleType.Member, RoleType.Contractor],

            jobCategory: [RoleType.Admin, RoleType.Coworker],
            jobSubCategory: [RoleType.Admin, RoleType.Coworker],
            jobSubState: [RoleType.Admin, RoleType.Coworker],
            jobPost: [RoleType.Admin, RoleType.Coworker, RoleType.Contractor],
            jobApply: [RoleType.Admin, RoleType.Coworker, RoleType.Contractor],
            jobTag: [RoleType.Admin, RoleType.Coworker],
            jobBalance: [RoleType.Admin, RoleType.Coworker],
            jobTransaction: [RoleType.Admin, RoleType.Coworker],
            jobPrice: [RoleType.Admin, RoleType.Coworker],


        };

        for (const key in listOfRule) {
            if (key.toLowerCase() == name.toLocaleLowerCase()) {

                return listOfRule[key];
            }
        }
        return null;

    }

    getPermission(name:string):string {

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

    isValid(user:IAuth, roles:any, permissionName:string[] , permission:string) {


        let isAllowed = false;
        const permissions = user.permissions!;
        let permissionId = 0;

        for (const permission of permissions) {
            for (let i = 0; i < permissionName?.length!; i++){


                if (permissionName[i].toLowerCase() == permission.name.toLowerCase()) {
                    permissionId = permission.id;
                    break;
                }
            }

        }

        if (permissionId > 0) {

            if (user.permissionGroup) {
                user.permissionGroup.forEach(groupPermission => {
                    if (groupPermission.permissionId == permissionId) {

                        groupPermission.actions.split("-")
                            .forEach(value => {

                                if (value == permission) {

                                    isAllowed = true;
                                }
                            });


                    }
                });
            }


            if (user.permissionUser) {
                user.permissionUser.forEach(userPermission => {

                    if (userPermission.permissionId == permissionId) {
                        userPermission.actions.split("-")
                            .forEach(value => {
                                if (value.toLowerCase() == permission.toLowerCase())
                                    isAllowed = true;
                            });
                    }


                });
            }


        }


        if (roles && permissionId == 0) {
            roles.forEach((role:string) => {
                if (user.role?.name == role)
                    isAllowed = true;
            });

        }

        if (!roles && permissionId == 0) {
            isAllowed = true;
        }

        return isAllowed;

    }

    getPermissionName(name:string):string[]| null {
        const listOfRule:any = {

            profile: null,
            overView: ["overView"],
            graph: ["graph"],
            user: ["user"],
            permission: ["permission"],
            permissionUser: ["permissionUser"],
            permissionGroup: ["permissionGroup"],
            group: ["group"],
            setting: ["setting"],
            visitor: ["visitor"],

            chatContact: ['chatContact', 'chatRoom', 'chatPrivate'],
            chatRoom: ['chatContact', 'chatRoom', 'chatPrivate'],
            chatPrivate: ['chatContact', 'chatRoom', 'chatPrivate'],

            advertisement: ["advertisement"],
            contact: ["contact"],

            newsCategory: ["newsCategory"],
            newsPost: ["newsPost"],
            newsMedia: ["newsMedia"],
            newsComment: ["newsComment"],
            newsSubCategory: ["newsSubCategory"],
            viewOption: ["viewOption"],
            viewMedia: ["viewMedia"],

            requestCategory: ["requestCategory"],
            requestPost: ["requestPost"],
            requestReply: ["requestReply"],

            jobCategory: ["jobCategory"],
            jobSubCategory: ["jobSubCategory"],
            jobSubState: ["jobSubState"],
            jobPost: ["jobPost"],
            jobApply: ["jobApply"],
            jobTag: ["jobTag"],
            jobBalance: ["jobBalance"],
            jobTransaction: ["jobTransaction"],
            jobPrice: ["jobPrice"],

        };

        for (const key in listOfRule) {
            if (key.toLowerCase() == name.toLocaleLowerCase()) {
                return listOfRule[key];
            }
        }
        return null;
    }
}