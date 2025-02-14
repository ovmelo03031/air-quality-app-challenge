import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@components-ui/dialog';
import { useAirQualityDetails } from '@/core/context/air-quality-details-context';
import DetailsContent from './components/details-content/DetailsContent';

export function DetailsDialog() {
  const { closeDetails, detailsId } = useAirQualityDetails();

  const onOpenChange = (open: boolean) => {
    if (!open) {
      closeDetails();
    }
  };

  if (!detailsId) return null;

  return (
    <Dialog {...{ onOpenChange }} open>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>Reading Details</DialogTitle>
        </DialogHeader>
        <DetailsContent {...{ detailsId }} />
      </DialogContent>
    </Dialog>
  );
}
