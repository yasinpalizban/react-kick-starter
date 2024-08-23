import {IPropsCommon} from "./props.common.interface";
import {Group} from "../models/group.model";
import {IResponseObject} from "./iresponse.object";
import {IBasic} from "./ibasic";

export interface IGroup extends  IBasic{
        name: string,
        description: string,
}

export interface IPropsGroup extends IPropsCommon {
    _retrieve: (argument: string | number | object | null) => Promise<void>;
    _detail: (argument: string | number | object | null) => Promise<void>;
    _save: (group: Group, props: IPropsCommon) => Promise<void>;
    _update: (group: Group, props: IPropsCommon) => Promise<void>;
    _remove: (id: number, index: number) => Promise<void>;
    _newQueryArgument: (queryArgument: any) => void;
    group: IResponseObject<IGroup>;
    groupList: IResponseObject<IGroup[]>;
}

