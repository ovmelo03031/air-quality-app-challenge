import { AirQualityType } from '@/core/types/airQuality.type';
import DetailsFooterItem from '@components/commons/details-dialog/components/details-footer-item/DetailsFooterItem';
import { Droplet, Droplets, Thermometer } from 'lucide-react';

interface DetailsFooterProps {
  details: AirQualityType;
}

const DetailsFooter = ({ details }: DetailsFooterProps) => {
  return (
    <div className='grid grid-cols-2 gap-6'>
      <div className='space-y-4'>
        <h4 className='text-sm font-semibold'>Weather Conditions</h4>
        <div className='space-y-2'>
          <DetailsFooterItem
            tooltipText={'Temperature in °C'}
            value={details.temperature}
            unit='°C'
            icon={Thermometer}
          />
          <DetailsFooterItem
            tooltipText={'Relative Humidity (%)'}
            value={details.relative_humidity}
            unit='%'
            icon={Droplet}
          />
          <DetailsFooterItem
            tooltipText={'Absolute Humidity'}
            value={details.absolute_humidity}
            unit='%'
            icon={Droplets}
          />
        </div>
      </div>
    </div>
  );
};

export default DetailsFooter;
