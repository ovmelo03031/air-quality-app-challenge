import { Card, CardContent, CardHeader, CardTitle } from '@components-ui/card';

interface IStatsCard {
  title: string;
  value: string | number;
  subDescription?: string;
  headerChildren?: React.ReactNode;
}

const StatsCard = ({ subDescription, value, title, headerChildren }: IStatsCard) => {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        {headerChildren}
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{value}</div>
        {subDescription?.length ? (
          <p className='text-xs text-muted-foreground'>{subDescription}</p>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
