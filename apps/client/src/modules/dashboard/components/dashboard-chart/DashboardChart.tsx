import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@components-ui/card';
import { useAirQuality } from '../../store';
import { thresholds } from '@/core/constants/thresholds.constant';
import { CategoricalChartFunc } from 'recharts/types/chart/generateCategoricalChart';
import { useAirQualityDetails } from '@/core/context/air-quality-details-context';
import { AirQualityChartElementData } from '@/core/types/airQuality.type';
import CustomTooltip from '@/modules/dashboard/components/dashboard-chart/chart-custom-tooltip/ChartCustomTooltip';
import {
  xAxisProps,
  yAxisProps,
} from '@/modules/dashboard/components/dashboard-chart/constants/chart-configuration.contstant';
import { PARAMETER_LABELS } from '@repo/shared-constants/src';
import { formatDate } from '@/core/lib/date.utils';
import { useMemo } from 'react';
import { INTERVALS } from '@/core/constants/intervals.constant';
import { Badge } from '@components-ui/badge';
import { Loader2 } from 'lucide-react';

function DashboardChart() {
  const { openDetails } = useAirQualityDetails();
  const { data, interval, parameter, isLoading } = useAirQuality();

  const handleChartClick: CategoricalChartFunc = (nextState) => {
    const index = nextState.activeTooltipIndex;
    if (index === undefined || !data[index]) return;

    openDetails((data[index] as AirQualityChartElementData)?._id);
  };

  const xAxisPropsMemoized = useMemo(
    () => ({
      ...xAxisProps,
      tickFormatter: (value: Date) => formatDate(value, interval >= 24 ? 'DD/MM' : 'hha'),
    }),
    [interval],
  );

  return (
    <Card className='relative'>
      {isLoading && (
        <div className='flex items-center justify-center p-8 absolute w-full h-full bg-accent bg-opacity-90'>
          <Loader2 className='h-8 w-8 animate-spin' />
        </div>
      )}
      <CardHeader>
        <CardTitle className='flex justify-between items-center gap-5'>
          {PARAMETER_LABELS[parameter]}({thresholds[parameter].unit}) Levels Over Time
          <Badge>{INTERVALS[interval as keyof typeof INTERVALS]}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='pl-2'>
        <div className='h-[540px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart
              {...{ data }}
              style={{ cursor: 'pointer' }}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              onClick={handleChartClick}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis {...xAxisPropsMemoized} />
              <YAxis {...yAxisProps} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                content={CustomTooltip}
              />
              <Line
                type='monotone'
                dataKey='value'
                stroke='hsl(var(--primary))'
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 5, fill: 'hsl(var(--primary))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default DashboardChart;
