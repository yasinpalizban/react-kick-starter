
export function getDateByName(name: string): string {

  let today: Date;
  if (name == 'today') {
    today = new Date();
  } else if (name == 'lastWeek') {
    today = new Date(new Date().setDate(new Date().getDate() - 7));
  } else {
    today = new Date(new Date().setDate(new Date().getDate() - 30));
  }
  let day = String(today.getDate()).padStart(2, '0');
  let month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let year = today.getFullYear();
  return year + '-' + month + '-' + day;
}

