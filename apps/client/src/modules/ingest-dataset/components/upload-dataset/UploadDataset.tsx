import { useCallback, useState } from 'react';
import { useUploadData } from '@/modules/ingest-dataset/hooks/useUploadData';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components-ui/card';
import DropzoneArea from '@/modules/ingest-dataset/components/drop-zone-area/DropZoneArea';
import FileInfo from '@/modules/ingest-dataset/components/file-info/FileInfo';
import CSVFormatInfo from '@/modules/ingest-dataset/components/csv-format-info/CSVFormatInfo';
import IngestProgressBar from '@/modules/ingest-dataset/components/ingest-progress-bar/IngestProgressBar';
import { Button } from '@components-ui/button';
import ButtonLoading from '@components/commons/buttons/ButtonLoading';

const UploadDataset = () => {
  const [files, setFiles] = useState<File[]>([]);

  const clearFiles = () => setFiles([]);
  const { uploadData, isPending, abortUpload } = useUploadData(clearFiles);

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', files[0]);
    uploadData(formData);
  };

  const handleCancel = () => {
    abortUpload();
  };

  return (
    <div className='container mx-auto max-w-2xl'>
      <Card>
        <CardHeader>
          <CardTitle>Upload Dataset</CardTitle>
          <CardDescription>
            Upload your air quality dataset in CSV format. The file should include columns
            for Date, Time, CO(GT), NMHC(GT), C6H6(GT), NOx(GT), and NO2(GT).
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <DropzoneArea onDrop={handleDrop} />
          <FileInfo file={files[0]} />
          <CSVFormatInfo />
          <IngestProgressBar />
          <div className='flex justify-end space-x-2'>
            <Button variant='outline' onClick={handleCancel}>
              Cancel
            </Button>
            <ButtonLoading
              disabled={files.length === 0}
              onClick={handleUpload}
              loading={isPending}
            >
              Upload
            </ButtonLoading>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadDataset;
