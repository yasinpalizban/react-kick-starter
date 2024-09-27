export function urlPath(url: string): string {


  if (url.search('add') !== -1) {
    return 'new';
  } else if (url.search('list') !== -1) {
    return 'table';
  } else if (url.search('detail') !== -1) {
    return 'detail';
  } else if (url.search('edit') !== -1) {
    return 'edit';
  } else if (url.search('activity') !== -1) {
    return 'activity';
  }else if (url.search('file') !== -1) {
    return 'file';
  }else if (url.search('plan') !== -1) {
    return 'plan';
  }else if (url.search('food') !== -1) {
    return 'food';
  }
  return '';
}
