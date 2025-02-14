import { StatusConfigItem } from '@/core/types/thresholds.type';
import { cn } from '@/core/lib/utils';

interface ICurrentStatus {
  currentStatus: StatusConfigItem;
  className?: string;
}
const CurrentStatus = ({ currentStatus, className }: ICurrentStatus) => {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      {currentStatus.icon}
      <div>
        <p className='font-medium'>{currentStatus.text}</p>
        <p className='text-sm text-muted-foreground'>{currentStatus.description}</p>
      </div>
    </div>
  );
};

export default CurrentStatus;
