import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@components-ui/select';
import { AirQualityParameter } from '@/core/types/airQuality.type';
import { PARAMETER_LABELS } from '@repo/shared-constants/src';

interface ParameterSelectProps {
  parameter: string;
  onChange: (value: AirQualityParameter) => void;
}

function ParameterSelect({
  parameter: value,
  onChange: onValueChange,
}: ParameterSelectProps) {
  return (
    <Select {...{ value, onValueChange }}>
      <SelectTrigger className='min-w-[200px] w-fit'>
        <SelectValue placeholder='Select parameter' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.entries(PARAMETER_LABELS).map(([key, label]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default ParameterSelect;
