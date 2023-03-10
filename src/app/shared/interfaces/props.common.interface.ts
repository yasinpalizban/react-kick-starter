export interface IPropsCommon {
    t: (name: string) => string;
    navigate: (to: any, option?: any) => any;
    location: any|{ pathname: string; search: string; hash: string; };
    params:  any|string|undefined;
    url: string;
    language: string;
    spinner: boolean;
    queryArgument: any[];
}


