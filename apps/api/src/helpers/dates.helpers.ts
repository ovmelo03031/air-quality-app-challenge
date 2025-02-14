import * as dayjs from 'dayjs';

export function formatToDate(date: string, time: string): Date {
  const dateTimeStr = `${date} ${time}`;
  const formattedDateTimeStr = dateTimeStr.replace(/\./g, ':');
  const dateTime = dayjs(formattedDateTimeStr, 'DD/MM/YYYY HH:mm:ss');
  if (!dateTime.isValid()) {
    throw new Error('Invalid date or time format');
  }

  return dateTime.toDate();
}

/*
        In our allowed intervals we have:
          - 1   hour   (for very short ranges where hourly data is acceptable)
          - 4   hours
          - 6   hours
          - 24  hours  (i.e. daily, which for a ~10-day range gives ~11 points)
          - 72  hours  (every 3 days)
          - 288 hours  (every 12 days)
          - 360 hours  (every 15 days)
          - 720 hours  (approximately every 1 month)
      */
export function determinateInterval(totalDays: number) {
  if (totalDays <= 4) {
    return 1; // Use hourly data if the range is within a day
  }
  if (totalDays <= 16) {
    return 4; // Every 4 hours
  }
  if (totalDays <= 25) {
    return 6; // Every 6 hours
  }
  if (totalDays <= 100) {
    return 24; // Daily
  }
  if (totalDays <= 300) {
    return 72; // Every 3 days
  }
  if (totalDays <= 1000) {
    return 288; // Every 12 days
  }

  return 360; // every 15 days
}

export function getCorrectedDateRange(
  startDate: Date | string,
  endDate: Date | string,
): { startDate: Date; endDate: Date } {
  return {
    startDate: dayjs(startDate).startOf('day').toDate(),
    endDate: dayjs(endDate).endOf('day').toDate(),
  };
}
