import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { useAirQuality } from '../../store';
import { PARAMETER_ICONS } from '@/core/constants/parameters.constant';
import { useMemo } from 'react';
import StatsCard from './stats-card/StatsCard';
import StatsCardLoading from '@/modules/dashboard/components/stats-cards/stats-card-loading/StatsCardLoading';

function StatsCards() {
  const { data, parameter, isLoading } = useAirQuality();

  const { change, lastValue } = useMemo(() => {
    const lastValue = data.at(-1)?.value;
    const previousValue = data.at(-2)?.value;
    if (!data?.length || !lastValue || !previousValue)
      return { change: 0, lastValue: 0, previousValue: 0 };

    const change =
      lastValue && previousValue
        ? ((lastValue - previousValue) / previousValue) * 100
        : 0;

    return { change, lastValue, previousValue };
  }, [data]);

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      {isLoading ? (
        <>
          <StatsCardLoading />
          <StatsCardLoading />
        </>
      ) : (
        <>
          <StatsCard
            title='Last Level Reading'
            headerChildren={PARAMETER_ICONS[parameter]}
            value={lastValue?.toFixed(2)}
          />

          <StatsCard
            title='Change'
            headerChildren={
              change > 0 ? (
                <ArrowUpIcon className='size-4 text-red-500' />
              ) : (
                <ArrowDownIcon className='size-4 text-green-500' />
              )
            }
            value={`${Math.abs(change).toFixed(2)}%`}
            subDescription='From previous reading'
          />
        </>
      )}
    </div>
  );
}

export default StatsCards;
