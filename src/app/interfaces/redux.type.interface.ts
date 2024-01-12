import {IUser} from "./user.interface";
import {IGroup} from "./group.interface";
import {IPermissionGroup} from "./permission.group.interface";
import {IPermissionUser} from "./permission.user.interface";
import {IPermission} from "./permission.interface";
import {IGraph} from "./graph.interface";
import {IOverView} from "./over.view.interface";
import {ISetting} from "./setting.interface";
import {IProfile} from "./profile.interface";
import {IAuth} from "./authenticate.interface";
import {Action, AnyAction} from "redux";
import {INotification} from "./notification.interface";
import {IHomeSetting} from "./home.interface";
import {IResponseObject} from "./iresponse.object";

export interface IReduxState {
    urlPath: string;
    spinner: boolean;
    language: string;
    notification: Array<INotification>;
    explodeLink: string[];
    alert: any[];
    toast: any;
    shareId: number;
    queryArgument: any[];
    auth: IResponseObject<IAuth>;
    profile: IResponseObject<IProfile>;
    setting: IResponseObject<ISetting[]>;
    settingSelect: IResponseObject<ISetting>;
    overView: IResponseObject<IOverView>;
    graph: IResponseObject<IGraph[]>;
    group: IResponseObject<IGroup[]>;
    groupSelect: IResponseObject<IGroup>;
    permission: IResponseObject<IPermission>;
    permissionSelect: IResponseObject<IPermission>;
    permissionGroup: IResponseObject<IPermissionGroup[]>;
    permissionGroupSelect: IResponseObject<IPermissionGroup>;
    permissionUser: IResponseObject<IPermissionUser[]>;
    permissionUserSelect: IResponseObject<IPermissionUser>;
    user: IResponseObject<IUser[]>;
    userSelect: IResponseObject<IUser>;
    home:IResponseObject<IHomeSetting>
}

export interface IReduxAction {
    type: string,
    payload: any

}

export interface IReduxDispatch<A extends Action = AnyAction> {
    <T extends A>(action: T): T
}
