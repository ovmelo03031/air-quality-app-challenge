import CurrentStatus from '@/modules/dashboard/components/info-card/current-status/CurrentStatus';
import InfoReadingLabel from '@/modules/dashboard/components/info-card/info-reading-label/InfoReadingLabel';
import { CardContent } from '@components-ui/card';
import { useAirQuality } from '@/modules/dashboard/store';
import { useMemo } from 'react';
import { statusConfig, thresholds } from '@/core/constants/thresholds.constant';

const InfoCardContent = () => {
  const { data, parameter } = useAirQuality();

  const average = useMemo(() => {
    if (!data.length) return 0;

    const recentReadings = data.slice(0, Math.min(24, data.length));
    return recentReadings.length > 0
      ? recentReadings.reduce((acc, reading) => acc + reading.value, 0) /
          recentReadings.length
      : 0;
  }, [data]);

  const { currentStatus, currentThresholds } = useMemo(() => {
    const lastReading = data.at(-1);

    if (!lastReading) {
      return {
        currentStatus: statusConfig['normal'],
        currentThresholds: thresholds[parameter],
      };
    }

    return {
      currentStatus: statusConfig[lastReading.status],
      currentThresholds: lastReading.threshold,
    };
  }, [data, parameter]);

  const readingInfo = useMemo(
    () => [
      {
        label: 'First Reading',
        value: data[0]?.value,
      },
      {
        label: 'Last Reading',
        value: data.at(-1)?.value ?? 0,
      },
      {
        label: '24h Average',
        value: average,
        valueClassName: 'text-lg',
      },
    ],
    [data],
  );
  return (
    <CardContent className='space-y-4'>
      <CurrentStatus {...{ currentStatus }} />

      <div className='space-y-2'>
        {readingInfo.map(({ value, label, valueClassName }) => (
          <InfoReadingLabel
            {...{ value, label, valueClassName }}
            key={label}
            unit={currentThresholds.unit}
          />
        ))}
      </div>

      <div className='pt-2'>
        <p className='text-sm text-muted-foreground'>
          Thresholds: Warning at {currentThresholds.warning}, Critical at&nbsp;
          {currentThresholds.critical}
        </p>
      </div>
    </CardContent>
  );
};

export default InfoCardContent;
