import InfoCard from '@/modules/dashboard/components/info-card/InfoCard';
import DashboardChart from '@/modules/dashboard/components/dashboard-chart/DashboardChart';
import { DetailsDialog } from '@components/commons/details-dialog/DetailsDialog';

const DashboardBody = () => {
  return (
    <>
      <div className='grid gap-4 grid-cols-1 lg:grid-cols-4 2xl:grid-cols-6'>
        <div className='lg:col-span-3 2xl:col-span-5'>
          <DashboardChart />
        </div>
        <div className='lg:col-span-1 2xl:col-span-1'>
          <InfoCard />
        </div>
      </div>
      <DetailsDialog />
    </>
  );
};

export default DashboardBody;
