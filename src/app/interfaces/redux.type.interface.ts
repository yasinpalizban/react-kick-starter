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
import {IHome} from "./home.interface";

export interface IReduxState {
    urlPath: string;
    spinner: boolean;
    language: string;
    notification: Array<INotification>;
    explodeLink: string[];
    alert: any[];
    shareId: number;
    queryArgument: any[];
    auth: IAuth;
    profile: IProfile;
    setting: ISetting;
    overView: IOverView;
    graph: IGraph;
    group: IGroup;
    permission: IPermission;
    permissionGroup: IPermissionGroup;
    permissionUser: IPermissionUser;
    user: IUser;
    home:IHome
}

export interface IReduxAction {
    type: string,
    payload: any

}

export interface IReduxDispatch<A extends Action = AnyAction> {
    <T extends A>(action: T): T
}