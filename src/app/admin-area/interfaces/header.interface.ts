import {IPropsCommon} from "../../shared/interfaces/props.common.interface";
import {IStateCommon} from "../../shared/interfaces/state.common.interface";
import {IProfile} from "../../common/interfaces/profile.interface";
import {INotification} from "./notification.interface";

export interface IPropsAdminHeader extends IPropsCommon {
  _urlPath: (url:string) => void;
  _language: (lang:string) => void;
  _explodeLink: (url:string[]) =>void;
  _notification: (notify:any) => void;
  _profileQuery: () => void;
  _signOut: () => void;
  notification: Array<INotification>,
  profile: IProfile
}

export interface IStateAdminHeader extends  IStateCommon{
  isLeftArrow: {
    account: boolean;
    news: boolean;
    homePage: boolean;
    communication: boolean;
    dashboard: boolean;
    setting: boolean;
    product: boolean;
    room: true
  },
  isRightSidebar: boolean;
  isLeftSidebar: boolean;
  isSearch: boolean;
  isNotify: boolean;
  userRole: string;
  fullName: string;
  userName: string;
  image: any;
  notify: Array<INotification>
}
