import { Card, CardContent } from '@components-ui/card';
import VirtualTable from '../virtual-table/VirtualTable';
import RecordDataHeader from '@/modules/record-data/components/record-data-header/RecordDataHeader';

function RecordDataMain() {
  return (
    <div className='space-y-4'>
      <RecordDataHeader />

      <Card className={'pt-6'}>
        <CardContent>
          <VirtualTable />
        </CardContent>
      </Card>
    </div>
  );
}

export default RecordDataMain;
