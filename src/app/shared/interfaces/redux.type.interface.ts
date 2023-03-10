import {IUser} from "../../common/interfaces/user.interface";
import {IGroup} from "../../authorization/interfaces/group.interface";
import {IPermissionGroup} from "../../authorization/interfaces/permission.group.interface";
import {IPermissionUser} from "../../authorization/interfaces/permission.user.interface";
import {IPermission} from "../../authorization/interfaces/permission.interface";
import {IGraph} from "../../application/interfaces/graph.interface";
import {IOverView} from "../../application/interfaces/over.view.interface";
import {ISetting} from "../../common/interfaces/setting.interface";
import {IProfile} from "../../common/interfaces/profile.interface";
import {IAuth} from "../../authentication/interfaces/authenticate.interface";
import {Action, AnyAction} from "redux";
import {INotification} from "../../admin-area/interfaces/notification.interface";

export interface IReduxState {
    urlPath: string;
    spinner: boolean;
    language: string;
    notification: Array<INotification>;
    explodeLink: string[];
    alert: any[];
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


}
export interface IReduxAction {
    type: string,
    payload: any

}

export interface IReduxDispatch <A extends Action = AnyAction> {
    <T extends A>(action: T): T
}