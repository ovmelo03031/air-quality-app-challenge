import RecordDataMain from '@/modules/record-data/components/record-data-main/RecordDataMain';
import AirQualityDetailsProvider from '@/core/context/air-quality-details-context/provider';
import VirtualTableProvider from '@/modules/record-data/store/provider';

function RecordDataLayout() {
  return (
    <VirtualTableProvider>
      <AirQualityDetailsProvider>
        <RecordDataMain />
      </AirQualityDetailsProvider>
    </VirtualTableProvider>
  );
}

export default RecordDataLayout;
