import { ReactNode, useState } from 'react';
import {
  AirQualityDataByParameter,
  AirQualityParameter,
  PARAMETER,
} from '@/core/types/airQuality.type';
import { DateRange } from 'react-day-picker';
import { useQuery } from '@tanstack/react-query';
import airQualityService from '@/core/lib/services/airQuality.service';
import { PaginationState } from '@/core/types/pages.type';
import AirQualityContext from './context';
import { chartDataAdapter } from '@/core/lib/adapters/chartData.adapter';

function AirQualityProvider({ children }: { children: ReactNode }) {
  const [parameter, setParameter] = useState<AirQualityParameter>(PARAMETER.CO);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2004, 0, 20),
    to: new Date(2004, 6, 20),
  });

  const {
    data,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['airQuality', parameter, dateRange],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 500,
    queryFn: () =>
      airQualityService.getAllByParameter({
        parameter,
        startDate: dateRange?.from?.toISOString(),
        endDate: dateRange?.to?.toISOString(),
      }),
    select: (response: PaginationState<AirQualityDataByParameter>) =>
      chartDataAdapter(response, parameter),
  });

  const value = {
    data: data?.data || [],
    interval: data?.interval ?? 1,
    isLoading,
    error,
    parameter,
    dateRange,
    setParameter,
    setDateRange,
  };

  return <AirQualityContext value={value}>{children}</AirQualityContext>;
}

export default AirQualityProvider;
