import { AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { StatusConfig, Thresholds } from '@/core/types/thresholds.type';

export const thresholds: Thresholds = {
  co: { warning: 5, critical: 8, unit: 'mg/m³' },
  nmhc: { warning: 10, critical: 15, unit: 'µg/m³' },
  benzene: { warning: 2.5, critical: 4, unit: 'µg/m³' },
  nox: { warning: 7.5, critical: 12, unit: 'ppb' },
  no2: { warning: 4, critical: 6, unit: 'µg/m³' },
  pt08S1: { warning: 1500, critical: 2000, unit: 'sensor units' },
  pt08S2: { warning: 1200, critical: 1800, unit: 'sensor units' },
  pt08S3: { warning: 1500, critical: 2200, unit: 'sensor units' },
  pt08S4: { warning: 1200, critical: 1800, unit: 'sensor units' },
  pt08S5: { warning: 1200, critical: 1800, unit: 'sensor units' },

  temperature: { warning: 28, critical: 32, unit: '°C' },
  relative_humidity: { warning: 80, critical: 90, unit: '%' }, //
} as const;

export const statusConfig: StatusConfig = {
  normal: {
    icon: <CheckCircle className='h-5 w-5 text-green-500' />,
    text: 'Normal',
    description: 'All readings within acceptable range',
  },
  warning: {
    icon: <Info className='h-5 w-5 text-yellow-500' />,
    text: 'Warning',
    description: 'Elevated levels detected',
  },
  critical: {
    icon: <AlertTriangle className='h-5 w-5 text-red-500' />,
    text: 'Critical',
    description: 'Immediate attention required',
  },
};
