import { useContext } from 'react';
import AirQualityContext from './context';

function useAirQuality() {
  const context = useContext(AirQualityContext);
  if (!context) {
    throw new Error('useAirQuality must be used within an AirQualityProvider');
  }
  return context;
}

export default useAirQuality;
