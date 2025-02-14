import { Card, CardContent, CardHeader, CardTitle } from '@components-ui/card';
import { Info } from 'lucide-react';

const InfoCardEmpty = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>Status Overview</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='flex items-center space-x-2'>
          <Info className='h-5 w-5 text-muted-foreground' />
          <div>
            <p className='font-medium'>No Data Available</p>
            <p className='text-sm text-muted-foreground'>Upload data to see statistics</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfoCardEmpty;
