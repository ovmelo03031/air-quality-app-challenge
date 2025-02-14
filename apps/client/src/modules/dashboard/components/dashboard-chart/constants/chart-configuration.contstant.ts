import { ScaleType } from 'recharts/types/util/types';
import { formatDate } from '@/core/lib/date.utils';

export const xAxisProps = {
  dataKey: 'timestamp',
  tick: { fontSize: 12 },
  angle: -45,
  textAnchor: 'end',
  height: 35,
  scale: 'band' as ScaleType,
  tickFormatter: (value: Date) => formatDate(value, 'hha'),
};

export const yAxisProps = {
  width: 60,
  tickFormatter: (value: number) => value.toFixed(1),
};
