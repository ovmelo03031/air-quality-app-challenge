import dayjs from 'dayjs';

export function formatDate(date: string | Date, format = 'DD-MM-YYYY , HH:mm'): string {
  return dayjs(date).locale('ar').format(format);
}
