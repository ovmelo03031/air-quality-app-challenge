import { Activity, Droplet, Droplets, Thermometer, Wind } from 'lucide-react';

export const PARAMETER_ICONS: Record<string, React.ReactNode> = {
  co: <Wind className='size-4' />,
  pt08S1: <Activity className='size-4' />,
  nmhc: <Activity className='size-4' />,
  benzene: <Activity className='size-4' />,
  pt08S2: <Activity className='size-4' />,
  nox: <Wind className='size-4' />,
  pt08S3: <Wind className='size-4' />,
  no2: <Wind className='size-4' />,
  pt08S4: <Wind className='size-4' />,
  pt08S5: <Activity className='size-4' />,
  temperature: <Thermometer className='size-4' />,
  relative_humidity: <Droplet className='size-4' />,
  absolute_humidity: <Droplets className='size-4' />,
};
