import DateRangePicker from '@components/commons/date-range-picker/DateRangePicker';
import useVirtualTable from '@/modules/record-data/store/hook';
import ModuleHeader from '@components/commons/module-header/ModuleHeader';

const RecordDataHeader = () => {
  const { dateRange, onChangeDateRange: onDateChange } = useVirtualTable();

  return (
    <ModuleHeader title={'Air Quality Readings'}>
      <DateRangePicker {...{ onDateChange, dateRange }} />
    </ModuleHeader>
  );
};

export default RecordDataHeader;
