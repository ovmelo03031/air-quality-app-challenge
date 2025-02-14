import { AirQualityParameter, AirQualityType } from '@/core/types/airQuality.type';
import Tooltip from '@components/commons/tooltips/Tooltip';
import { Clock3 } from 'lucide-react';
import { formatDate } from '@/core/lib/date.utils';
import { PARAMETER_KEYS_WITHOUT_TH } from '@repo/shared-constants/src';
import { useMemo } from 'react';
import { thresholds } from '@/core/constants/thresholds.constant';
import DetailsBodyItem from '@components/commons/details-dialog/components/details-body-item/DetailsBodyItem';

interface DetailsBodyProps {
  details: AirQualityType;
}
const DetailsBody = ({ details }: DetailsBodyProps) => {
  const detailsWithoutTime = useMemo(() => {
    if (!details) return [];
    const { timestamp, _id, ...rest } = details;

    return Object.entries(rest)
      .filter(([key]) => PARAMETER_KEYS_WITHOUT_TH.includes(key))
      .map(([key, value]) => ({
        key,
        value: {
          value: value.toFixed(2),
          unit: thresholds[key].unit !== 'sensor units' ? thresholds[key].unit : null,
        },
      })) as {
      key: AirQualityParameter;
      value: {
        value: string;
        unit?: string;
      };
    }[];
  }, [details]);

  return (
    <div className='flex justify-between items-start'>
      <div>
        <h4 className='text-sm font-semibold mb-2'>Air Quality Parameters</h4>
        <Tooltip text={'Timestamp'}>
          <div className='flex items-center gap-2 absolute top-0 right-0 font-bold'>
            <Clock3 className='size-3 ' />
            <span className='text-xs'>{formatDate(details.timestamp)}</span>
          </div>
        </Tooltip>

        <div className='grid grid-rows-3 grid-cols-4 gap-4'>
          {detailsWithoutTime.map(({ key, value }) => (
            <DetailsBodyItem key={key} paramKey={key} value={value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsBody;
