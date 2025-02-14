import { useContext } from 'react';
import AirQualityDetailsContext from './context';

function useAirQualityDetails() {
  const context = useContext(AirQualityDetailsContext);
  if (!context) {
    throw new Error(
      'useAirQualityDetails must be used within an AirQualityDetailsProvider',
    );
  }
  return context;
}

export default useAirQualityDetails;
