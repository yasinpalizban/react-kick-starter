
export function changeKeyObject(obj:any, oldKey:string, newKey:string) {
  return JSON.parse(JSON.stringify(obj).split(oldKey).join(newKey));
}





