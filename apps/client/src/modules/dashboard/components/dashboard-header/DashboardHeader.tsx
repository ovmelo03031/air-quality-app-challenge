import { DateRange } from 'react-day-picker';
import { useAirQuality } from '../../store';
import { AirQualityParameter } from '@/core/types/airQuality.type';
import ParameterSelect from '@components/commons/parameter-select/ParameterSelect';
import DateRangePicker from '@components/commons/date-range-picker/DateRangePicker';
import ModuleHeader from '@components/commons/module-header/ModuleHeader';

const DashboardHeader = () => {
  const { parameter, dateRange, setParameter, setDateRange } = useAirQuality();

  const onParameterChange = (value: AirQualityParameter) => {
    setParameter(value);
  };

  const onDateChange = (date: DateRange | undefined) => {
    setDateRange(date);
  };
  return (
    <ModuleHeader title={'Dashboard'}>
      <div className='flex items-center space-x-2 flex-wrap gap-2'>
        <ParameterSelect {...{ parameter }} onChange={onParameterChange} />
        <DateRangePicker {...{ dateRange, onDateChange }} />
      </div>
    </ModuleHeader>
  );
};

export default DashboardHeader;
