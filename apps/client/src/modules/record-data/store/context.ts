import { createContext } from 'react';
import { DateRange } from 'react-day-picker';

interface VirtualTableContextType {
  dateRange: DateRange | undefined;
  pageQuery: { pageIndex: number; pageSize: number };
  onChangePage: (newPage: number) => void;
  onChangeDateRange: (newDateRange: DateRange | undefined) => void;
}

const VirtualTableContext = createContext<VirtualTableContextType | undefined>(undefined);

export default VirtualTableContext;
