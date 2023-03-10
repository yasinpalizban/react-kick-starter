export function parseString(str:string):string {
    // %
    while (true) {
        str = decodeURIComponent(str);
        if (str.indexOf('%') == -1) {
            break;
        }
    }

    return str;
}