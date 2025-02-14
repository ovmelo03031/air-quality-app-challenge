import { createContext } from 'react';

interface AirQualityDetailsContextType {
  detailsId: string | null;
  openDetails: (id: string) => void;
  closeDetails: () => void;
}

const AirQualityDetailsContext = createContext<AirQualityDetailsContextType | undefined>(
  undefined,
);

export default AirQualityDetailsContext;
