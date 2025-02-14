import { ReactNode, useCallback, useMemo } from 'react';
import { DateRange } from 'react-day-picker';
import VirtualTableContext from './context';
import { useSearchParams } from 'react-router-dom';
import { setDateParam } from '@/core/lib/url-params.utils';

function VirtualTableProvider({ children }: { children: ReactNode }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    page: pageParam,
    startDate: startDateParam,
    endDate: endDateParam,
  } = useMemo(() => {
    return {
      page: searchParams.get('page'),
      startDate: searchParams.get('startDate'),
      endDate: searchParams.get('endDate'),
    };
  }, [searchParams]);

  const pageQuery = useMemo(
    () => ({
      pageIndex: pageParam ? parseInt(pageParam) - 1 : 0,
      pageSize: 25,
    }),
    [pageParam],
  );

  const dateRange: DateRange = useMemo(() => {
    if (startDateParam && endDateParam) {
      return {
        from: new Date(startDateParam),
        to: new Date(endDateParam),
      };
    }
    return {
      from: new Date(2004, 0, 20),
      to: new Date(2004, 6, 20),
    };
  }, [startDateParam, endDateParam]);

  const onChangeDateRange = useCallback(
    (newDateRange: DateRange | undefined) => {
      const params = new URLSearchParams(searchParams);
      setDateParam(params, 'startDate', newDateRange?.from);
      setDateParam(params, 'endDate', newDateRange?.to);

      params.set('page', '1');
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const onChangePage = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', (newPage + 1).toString());
      setSearchParams(params);
    },
    [searchParams, setSearchParams],
  );

  const value = {
    pageQuery,
    dateRange,
    onChangePage,
    onChangeDateRange,
  };

  return <VirtualTableContext value={value}>{children}</VirtualTableContext>;
}

export default VirtualTableProvider;
