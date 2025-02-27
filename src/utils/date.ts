import { format as dateFnsFormat, isWithinInterval, subHours } from 'date-fns';

export function format(date: Date, formatStr: string): string {
  return dateFnsFormat(date, formatStr);
}

export function isWithinLast24Hours(date: Date): boolean {
  const now = new Date();
  return isWithinInterval(date, {
    start: subHours(now, 24),
    end: now
  });
}