import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { DateRange } from 'react-day-picker';
import { getByAllData } from '@/core/lib/services/getAllAirQuality';
import useVirtualTable from '@/modules/record-data/store/hook';

export function useGetDataTable() {
  const { dateRange, pageQuery } = useVirtualTable();

  const {
    data,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ['air-quality-table', pageQuery, { ...(dateRange as DateRange) }],
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: 500,
    placeholderData: keepPreviousData,
    queryFn: getByAllData,
    enabled: !!(dateRange?.from && dateRange?.to),
  });

  return {
    data: data?.data ?? [],
    isLoading,
    error,
    pagination: {
      page: data?.metadata.currentPage ?? 0,
      totalPages: data?.metadata.totalPages ?? 1,
      totalItems: data?.metadata.totalItems ?? 0,
    },
  };
}
