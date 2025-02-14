import { ReactNode, useState } from 'react';
import AirQualityDetailsContext from '@/core/context/air-quality-details-context/context';

function AirQualityDetailsProvider({ children }: { children: ReactNode }) {
  const [detailsId, setDetailsId] = useState<string | null>(null);

  const openDetails = (id: string) => {
    setDetailsId(id);
  };

  const closeDetails = () => setDetailsId(null);

  const value = {
    detailsId,
    closeDetails,
    openDetails,
  };

  return <AirQualityDetailsContext value={value}>{children}</AirQualityDetailsContext>;
}

export default AirQualityDetailsProvider;
