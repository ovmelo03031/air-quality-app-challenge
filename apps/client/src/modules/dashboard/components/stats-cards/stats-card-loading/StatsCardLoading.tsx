import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@components-ui/card';

function StatsCardLoading() {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>
          <Skeleton className='h-5 w-[200px]' />
        </CardTitle>
        <Skeleton className='h-5 w-[250px]' />
      </CardHeader>
      <CardContent className='space-y-0'>
        <div className='text-2xl font-bold h-8 py-1'>
          <Skeleton className='h-4 w-[100px]' />
        </div>
        <Skeleton className='h-4 w-[200px]' />
      </CardContent>
    </Card>
  );
}

export default StatsCardLoading;
