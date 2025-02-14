import { PARAMETER_DESCRIPTION, PARAMETER_LABEL_KEY } from '@repo/shared-constants/src';
import Tooltip from '@components/commons/tooltips/Tooltip';
import { AirQualityParameter } from '@/core/types/airQuality.type';

interface DetailsBodyItemProps {
  paramKey: AirQualityParameter;
  value: {
    value: string;
    unit?: string;
  };
}

const DetailsBodyItem = ({ paramKey, value }: DetailsBodyItemProps) => {
  return (
    <Tooltip text={PARAMETER_DESCRIPTION[paramKey]}>
      <div className='space-y-1'>
        <p className='text-sm text-muted-foreground'>{PARAMETER_LABEL_KEY[paramKey]}</p>
        <p className='font-medium text-sm'>
          {value.value}&nbsp;{value.unit}
        </p>
      </div>
    </Tooltip>
  );
};

export default DetailsBodyItem;
