import { StatusType, ThresholdItem } from '@/core/types/thresholds.type';

export interface AirQualityType {
  _id: string;
  timestamp: string;
  co: number;
  pt08S1: number;

  nmhc: number;
  benzene: number;
  pt08S2: number;

  nox: number;
  pt08S3: number;

  no2: number;
  pt08S4: number;
  pt08S5: number;
  temperature: number;
  relative_humidity: number;
  absolute_humidity: number;
}

export const PARAMETER: {
  [key in
    | 'CO'
    | 'PT08S1'
    | 'NMHC'
    | 'C6H6'
    | 'PT08S2'
    | 'NOx'
    | 'PT08S3'
    | 'NO2'
    | 'PT08S4'
    | 'PT08S5'
    | 'T'
    | 'RH'
    | 'AH']: AirQualityParameter;
} = {
  CO: 'co',
  PT08S1: 'pt08S1',
  NMHC: 'nmhc',
  C6H6: 'benzene',
  PT08S2: 'pt08S2',
  NOx: 'nox',
  PT08S3: 'pt08S3',
  NO2: 'no2',
  PT08S4: 'pt08S4',
  PT08S5: 'pt08S5',
  T: 'temperature',
  RH: 'relative_humidity',
  AH: 'absolute_humidity',
} as const;

export type AirQualityKeyParameter = keyof Omit<
  AirQualityDataByParameter,
  'timestamp' | '_id'
>;
export type AirQualityParameter = keyof Omit<AirQualityType, '_id' | 'timestamp'>;

export type AirQualityDataByParameter = {
  [K in AirQualityParameter]: { timestamp: Date; _id: string } & {
    [P in K]: AirQualityType[K];
  };
}[AirQualityParameter];

export type AirQualityChartElementData = {
  status: StatusType;
  threshold: ThresholdItem;
  value: number;
  timestamp: Date;
  _id: string;
};

export type AirQualityChartData = {
  data: AirQualityChartElementData[];
  interval: number;
};
