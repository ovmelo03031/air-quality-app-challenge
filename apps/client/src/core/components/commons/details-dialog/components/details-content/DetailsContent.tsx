import { useReadingDetails } from '@/core/hooks/useReadingDetails';
import { Loader2 } from 'lucide-react';
import DetailsBody from '@components/commons/details-dialog/components/details-body/DetailsBody';
import { Separator } from '@components-ui/separator';
import DetailsFooter from '@components/commons/details-dialog/components/details-footer/DetailsFooter';

interface DetailsContentProps {
  detailsId: string;
}
const DetailsContent = ({ detailsId }: DetailsContentProps) => {
  const { details, loading } = useReadingDetails(detailsId);

  if (loading) {
    return (
      <div className='flex items-center justify-center p-8'>
        <Loader2 className='h-8 w-8 animate-spin' />
      </div>
    );
  }

  return (
    <>
      {details ? (
        <div className='space-y-6 relative'>
          <DetailsBody {...{ details }} />
          <Separator />
          <DetailsFooter {...{ details }} />
        </div>
      ) : (
        <div className='p-4 text-center text-muted-foreground'>
          Failed to load details. Please try again.
        </div>
      )}
    </>
  );
};

export default DetailsContent;
