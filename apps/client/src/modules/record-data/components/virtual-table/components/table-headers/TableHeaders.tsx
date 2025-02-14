import { TableHead } from '@components-ui/table';
import { flexRender, Header } from '@tanstack/react-table';
import { AirQualityType } from '@/core/types/airQuality.type';

interface TableHeaderProps {
  headers: Header<AirQualityType, unknown>[];
}
const TableHeaders = ({ headers }: TableHeaderProps) => {
  return headers.map((header) => (
    <TableHead
      key={header.id}
      style={{ width: header.getSize() }}
      colSpan={header.colSpan}
    >
      {flexRender(header.column.columnDef.header, header.getContext())}
    </TableHead>
  ));
};

export default TableHeaders;
