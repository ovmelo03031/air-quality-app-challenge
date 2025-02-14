import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useRef } from 'react';
import { TableBody, TableHeader, TableRow } from '@components-ui/table';
import type { AirQualityType } from '@/core/types/airQuality.type';
import { DetailsDialog } from '@components/commons/details-dialog/DetailsDialog';
import { useAirQualityDetails } from '@/core/context/air-quality-details-context';
import { columns } from '@/modules/record-data/components/virtual-table/colulmns';
import { useGetDataTable } from '@/modules/record-data/hooks/useGetDataTable';
import { EmptyTable, TableHeaders, TablePagination, TableRows } from './components';
import useVirtualTable from '@/modules/record-data/store/hook';
import { Loader2 } from 'lucide-react';

function VirtualTable() {
  const { pageQuery } = useVirtualTable();
  const { data, pagination, isLoading } = useGetDataTable();

  const { openDetails } = useAirQualityDetails();
  const parentRef = useRef<HTMLDivElement>(null);
  const table = useReactTable<AirQualityType>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    rowCount: pagination.totalItems,
    state: { pagination: pageQuery },
    manualPagination: true,
    meta: {
      handleRowClick: (row: AirQualityType) => openDetails(row._id),
    },
  });

  const { rows } = table.getRowModel();

  return (
    <div className='flex flex-col gap-4'>
      <div
        ref={parentRef}
        className='overflow-auto relative w-full
        min-h-[600px] h-[calc(100dvh-275px)]
        border rounded-md'
      >
        <div className='h-full relative'>
          {isLoading && (
            <div className='flex z-1 items-center justify-center p-8 absolute w-full h-full bg-accent bg-opacity-90'>
              <Loader2 className='h-8 w-8 animate-spin' />
            </div>
          )}

          <table
            className='w-full h-full caption-bottom text-sm relative border-collapse'
            data-slot='table'
          >
            <TableHeader className='sticky top-0 bg-background z-10'>
              <TableRow>
                <TableHeaders headers={table.getFlatHeaders()} />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <EmptyTable />
              ) : (
                <TableRows rows={table.getRowModel().rows} />
              )}
            </TableBody>
          </table>
        </div>
      </div>
      <div className='flex justify-center'>
        <TablePagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
        />
      </div>
      <DetailsDialog />
    </div>
  );
}
export default VirtualTable;
