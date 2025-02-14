import { TableCell, TableRow } from '@components-ui/table';
import { Grid2X2 } from 'lucide-react';

const EmptyTable = () => {
  return (
    <TableRow>
      <TableCell colSpan={7} className='h-[450px] text-center align-middle'>
        <div className='flex flex-col items-center justify-center gap-2 text-muted-foreground'>
          <Grid2X2 className='h-10 w-10' />
          <p>No data available</p>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmptyTable;
