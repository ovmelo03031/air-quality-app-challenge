import {
  AirQualityChartData,
  AirQualityChartElementData,
  AirQualityDataByParameter,
  AirQualityKeyParameter,
  AirQualityParameter,
} from '@/core/types/airQuality.type';
import { IntervalByParameters } from '@/core/types/pages.type';
import dayjs from 'dayjs';
import { thresholds } from '@/core/constants/thresholds.constant';
import { getReadingStatus } from '@/core/lib/readingStatus.utils';

export function chartDataAdapter(
  response: IntervalByParameters<AirQualityDataByParameter>,
  parameter: AirQualityParameter,
): AirQualityChartData {
  if (!response.data?.length) return { data: [], interval: 1 };

  const key = parameter as AirQualityKeyParameter;
  const dataFiltered = response.data
    .map((item) => {
      if (key in item) {
        const value = item[key] as number;
        return {
          status: getReadingStatus(value, thresholds[key]),
          threshold: thresholds[key],
          timestamp: dayjs(item.timestamp).locale('ar').toDate(),
          value: value,
          _id: item._id,
        };
      }

      return null;
    })
    .filter((item) => item !== null) as AirQualityChartElementData[];

  const data = dataFiltered.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  return { data, interval: response.interval ?? 1 };
}
