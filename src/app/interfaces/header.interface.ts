import {IPropsCommon} from "./props.common.interface";
import {IStateCommon} from "./state.common.interface";
import {IProfile} from "./profile.interface";
import {INotification} from "./notification.interface";
import {IResponseObject} from "./iresponse.object";

export interface IPropsAdminHeader extends IPropsCommon {
  _urlPath: (url:string) => void;
  _language: (lang:string) => void;
  _explodeLink: (url:string[]) =>void;
  _notification: (notify:any) => void;
  _profileRetrieve: () => void;
  _signOut: () => void;
  notification: Array<INotification>,
  profile: IResponseObject<IProfile>
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
    room: boolean,
    job: boolean
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
