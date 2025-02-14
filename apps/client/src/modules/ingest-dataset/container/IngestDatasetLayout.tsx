import { IngestDatasetProvider } from '../store/hook';
import UploadDataset from '../components/upload-dataset/UploadDataset';

function IngestDatasetLayout() {
  return (
    <IngestDatasetProvider>
      <UploadDataset />
    </IngestDatasetProvider>
  );
}

export default IngestDatasetLayout;
