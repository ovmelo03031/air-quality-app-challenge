import { useMutation } from '@tanstack/react-query';
import airQualityService from '@/core/lib/services/airQuality.service';
import { useToast } from '@/core/hooks/use-toast';
import { useIngestDatasetState } from '@/modules/ingest-dataset/store/hook';
import { useRef } from 'react';

export const useUploadData = (clearFiles: () => void) => {
  const { toast } = useToast();
  const { updateProgress, clearProgress } = useIngestDatasetState();

  const abortRef = useRef<() => void>(() => {});

  const { mutate: uploadData, isPending } = useMutation({
    mutationFn: (file: FormData) => {
      updateProgress({ loaded: 0, total: 1 } as ProgressEvent);
      const { promise, abort } = airQualityService.uploadFile(file, updateProgress);
      abortRef.current = abort;
      return promise;
    },
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Data uploaded successfully',
        duration: 3000,
      });
      clearFiles();
      clearProgress();
    },
    onError: (error) => {
      console.log('Error uploading file', error);
      toast({
        title: 'Error',
        description: error.message ?? 'Failed to upload file',
        duration: 5000,
      });
      clearProgress();
    },
  });

  const abortUpload = () => {
    abortRef.current?.();
    clearFiles();
    clearProgress();
  };

  return { uploadData, isPending, abortUpload };
};
