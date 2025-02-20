import { QueryFunctionContext } from '@tanstack/react-query';
import { DateRange } from 'react-day-picker';
import { PaginationState } from '@/core/types/pages.type';
import { AirQualityType } from '@/core/types/airQuality.type';
import airQualityService from '@/core/lib/services/airQuality.service';
import * as dayjs from "dayjs";

export async function getByAllData({
  queryKey,
}: QueryFunctionContext<
  [string, { pageIndex: number; pageSize: number }, DateRange | undefined]
>): Promise<PaginationState<AirQualityType>> {
  const [_, pageQuery, dateRange] = queryKey;
  if (!dateRange?.from || !dateRange?.to) return {} as PaginationState<AirQualityType>;

  return airQualityService.getAll({
    startDate: dayjs(dateRange.from).endOf('day').toISOString(),
    endDate: dayjs(dateRange.to).endOf('day').toISOString(),
    page: pageQuery.pageIndex,
    limit: pageQuery.pageSize,
  });
}
