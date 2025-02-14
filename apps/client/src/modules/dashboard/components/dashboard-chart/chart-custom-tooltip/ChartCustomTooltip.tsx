import type { ContentType } from 'recharts/types/component/Tooltip';
import { formatDate } from '@/core/lib/date.utils';
import { AirQualityChartElementData } from '@/core/types/airQuality.type';
import { statusConfig } from '@/core/constants/thresholds.constant';
import CurrentStatus from '@/modules/dashboard/components/info-card/current-status/CurrentStatus';

const CustomTooltip: ContentType<number, string> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const reading = payload[0]?.payload as AirQualityChartElementData;
  const unit = reading.threshold?.unit;
  const status = statusConfig[reading.status];

  return (
    <div className='flex flex-col p-2 px-3 bg-background border border-border rounded-md'>
      {status ? <CurrentStatus currentStatus={status} className={'mb-1'} /> : null}
      <p className='label'>
        <strong>Date:</strong>&nbsp;
        {formatDate(label, 'DD MMM YYYY - hha')}
      </p>
      <p className='label'>
        <strong>Value:</strong>&nbsp;
        {reading.value}({unit})
      </p>
    </div>
  );
};

export default CustomTooltip;
