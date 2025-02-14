import { flexRender, Row } from '@tanstack/react-table';
import { AirQualityType } from '@/core/types/airQuality.type';
import { TableCell, TableRow } from '@components-ui/table';
import { useAirQualityDetails } from '@/core/context/air-quality-details-context';

type TableRowsProps = {
  rows: Row<AirQualityType>[];
};
const TableRows = ({ rows }: TableRowsProps) => {
  const { openDetails } = useAirQualityDetails();

  return rows.map((row) => (
    <TableRow
      key={row.id}
      className='hover:bg-muted/50 cursor-pointer transition-transform'
      onDoubleClick={() => openDetails(row.original._id)}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className='max-h-[40px]'>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  ));
};

export default TableRows;
