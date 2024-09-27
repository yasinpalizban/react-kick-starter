export interface IProps {
    t: (name: string) => string;
    navigate: (to: any, option?: any) => any;
    location: any | { pathname: string; search: string; hash: string; };
    params: any | string | undefined;
    queryArgument: any[];
    isValidToRedirect?: boolean;
}


