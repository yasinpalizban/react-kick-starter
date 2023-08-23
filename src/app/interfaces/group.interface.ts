import {IPagination} from "./pagination.interface";
import {IPropsCommon} from "./props.common.interface";
import {Group} from "../models/group.model";
import {IStateCommon} from "./state.common.interface";

export interface IGroup {


    pager?: IPagination;
    data?: [{
        id: number,
        name: string,
        description: string,
    }];

}

export interface IPropsGroup extends IPropsCommon {
    _query: (argument: string | number | object | null) => Promise<void>;
    _save: (group: Group, props: IPropsCommon) => Promise<void>;
    _update: (group: Group, props: IPropsCommon) => Promise<void>;
    _remove: (id: number, index: number) => Promise<void>;
    _newQueryArgument: (queryArgument: any) => void;
    groupDetail: IGroup;
    groupRows: IGroup;
}

export interface IStateGroup extends  IStateCommon{
}