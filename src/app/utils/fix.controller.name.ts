export function fixControllerName(name: string): string {
  if (!name) {
    return '';
  }
  const index = name.indexOf('-');
  if (index != -1) {
    name = name.substring(0, index ) + name.charAt(index + 1).toUpperCase() + name.substring(index + 2, name.length);
  }
  return name;
}
