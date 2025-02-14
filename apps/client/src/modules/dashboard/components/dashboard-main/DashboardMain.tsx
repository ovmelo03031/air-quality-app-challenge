import React from 'react';
import DashboardHeader from '../dashboard-header/DashboardHeader';
import DashboardBody from '@/modules/dashboard/components/dashboard-body/DashboardBody';
import StatsCards from '@/modules/dashboard/components/stats-cards/StatsCards';

const DashboardMain: React.FC = () => {
  return (
    <div className='space-y-4'>
      <DashboardHeader />
      <StatsCards />
      <DashboardBody />
    </div>
  );
};

export default DashboardMain;
