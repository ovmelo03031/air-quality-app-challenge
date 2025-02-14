import airQualityService from '@/core/lib/services/airQuality.service';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { AirQualityType } from '@/core/types/airQuality.type';

const getById = async ({
  queryKey,
}: QueryFunctionContext<[string, string | null]>): Promise<AirQualityType> => {
  const [_, id] = queryKey;
  if (!id) return {} as AirQualityType;
  return airQualityService.getById<AirQualityType>(id);
};

export function useReadingDetails(id: string | null) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['air-quality-details', id],
    queryFn: getById,
    enabled: !!id,
  });

  return {
    details: data,
    loading: isLoading,
    error,
  };
}
