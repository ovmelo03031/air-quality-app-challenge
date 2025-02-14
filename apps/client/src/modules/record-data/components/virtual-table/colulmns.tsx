import { createColumnHelper } from '@tanstack/react-table';
import type { AirQualityType } from '@/core/types/airQuality.type';
import { formatDate } from '@/core/lib/date.utils';
import Tooltip from '@components/commons/tooltips/Tooltip';
import { Eye } from 'lucide-react';
import { TableMeta } from '@tanstack/react-table';

const columnHelper = createColumnHelper<AirQualityType>();

export const columns = [
  columnHelper.accessor('timestamp', {
    header: 'Timestamp',
    cell: (info) => formatDate(info.getValue()),
    size: 200,
  }),
  columnHelper.accessor('co', {
    header: 'CO',
    cell: (info) => info.getValue().toFixed(2),
    size: 100,
  }),
  columnHelper.accessor('nmhc', {
    header: 'NMHC',
    cell: (info) => info.getValue().toFixed(2),
    size: 100,
  }),
  columnHelper.accessor('benzene', {
    header: 'Benzene',
    cell: (info) => info.getValue().toFixed(2),
    size: 100,
  }),
  columnHelper.accessor('nox', {
    header: 'NOx',
    cell: (info) => info.getValue().toFixed(2),
    size: 100,
  }),
  columnHelper.accessor('no2', {
    header: 'NO₂',
    cell: (info) => info.getValue().toFixed(2),
    size: 100,
  }),
  columnHelper.display({
    id: 'actions',
    header: 'Actions',
    cell: (info) => (
      <Tooltip text={'View Details'}>
        <Eye
          className='size-4 cursor-pointer'
          onClick={(e) => {
            e.stopPropagation();
            (info.table.options.meta as TableMeta<AirQualityType>)?.handleRowClick(
              info.row.original,
            );
          }}
        />
      </Tooltip>
    ),
    size: 100,
  }),
];
