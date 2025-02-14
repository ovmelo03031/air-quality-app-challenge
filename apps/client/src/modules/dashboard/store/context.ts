import {
  AirQualityChartElementData,
  AirQualityParameter,
} from '@/core/types/airQuality.type';
import { DateRange } from 'react-day-picker';
import { createContext } from 'react';

interface AirQualityContextType {
  data: AirQualityChartElementData[];
  interval: number;
  isLoading: boolean;
  error: Error | null;
  parameter: AirQualityParameter;
  dateRange: DateRange | undefined;
  setParameter: (parameter: AirQualityParameter) => void;
  setDateRange: (dateRange: DateRange | undefined) => void;
}

const AirQualityContext = createContext<AirQualityContextType | undefined>(undefined);

export default AirQualityContext;
