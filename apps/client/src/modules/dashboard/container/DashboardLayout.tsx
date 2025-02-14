import { AirQualityProvider } from '../store';
import DashboardMain from '@/modules/dashboard/components/dashboard-main/DashboardMain';
import { AirQualityDetailsProvider } from '@/core/context/air-quality-details-context';

const DashboardLayout = () => {
  return (
    <AirQualityProvider>
      <AirQualityDetailsProvider>
        <DashboardMain />
      </AirQualityDetailsProvider>
    </AirQualityProvider>
  );
};

export default DashboardLayout;
