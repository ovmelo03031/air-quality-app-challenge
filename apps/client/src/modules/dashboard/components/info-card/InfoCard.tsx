import { Card, CardHeader, CardTitle } from '@components-ui/card';
import { useAirQuality } from '../../store';
import InfoCardEmpty from './info-card-empty/InfoCardEmpty';
import InfoCardContent from '@/modules/dashboard/components/info-card/info-card-content/InfoCardContent';

function InfoCard() {
  const { data } = useAirQuality();

  if (data.length === 0) {
    return <InfoCardEmpty />;
  }

  return (
    <Card className='max-w-fit'>
      <CardHeader>
        <CardTitle className='text-lg'>Status Overview</CardTitle>
      </CardHeader>
      <InfoCardContent />
    </Card>
  );
}

export default InfoCard;
