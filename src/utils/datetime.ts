const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function formatDateMonthYYYY(dateString: string): string {
  const date: Date = new Date(dateString);
  const year: string = date.getFullYear().toString();
  const month: string = months[date.getMonth()];

  return `${month} ${year}`;
}

export function formatDateToYYYYMMDD(dateString: string): string {
  const date: Date = new Date(dateString);
  const year: string = date.getFullYear().toString();
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
  const day: string = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
