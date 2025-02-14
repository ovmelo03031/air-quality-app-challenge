import { LucideProps } from 'lucide-react';
import Tooltip from '@components/commons/tooltips/Tooltip';
import * as react from 'react';

interface DetailsFooterItemProps {
  tooltipText: string;
  value: number;
  unit: string;
  icon: react.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & react.RefAttributes<SVGSVGElement>
  >;
}
const DetailsFooterItem = ({
  tooltipText,
  value,
  unit,
  icon: Icon,
}: DetailsFooterItemProps) => {
  return (
    <Tooltip text={tooltipText}>
      <div className='flex items-center gap-2 w-fit'>
        <Icon className='size-4' />
        <span className='text-sm'>
          {value}&nbsp;{unit}
        </span>
      </div>
    </Tooltip>
  );
};

export default DetailsFooterItem;
