export function queryParamType(argument?: number | string | object): { query: string, param: any } {

    let params: any = {};
    let queries = '';
    if (typeof argument === 'number') {
        queries = '/' + argument.toString();
    } else if (typeof argument === 'string') {
        queries = argument.charAt(0) == '?' ? argument?.substring(0, argument.length) : argument;
    } else if (typeof argument === 'object') {
        params = argument;

    }

    return {query: queries, param: params}
}
