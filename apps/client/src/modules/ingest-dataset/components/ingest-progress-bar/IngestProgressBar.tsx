import { useIngestDatasetState } from '@/modules/ingest-dataset/store/hook';
import { Progress } from '@components-ui/progress';

const IngestProgressBar = () => {
  const { progress } = useIngestDatasetState();

  if (progress === null) return null;

  return (
    <div className='w-full flex justify-center items-center gap-2'>
      <Progress value={progress} className='w-full' />
      <span className='text-sm text-muted-foreground w-12'>{progress}%</span>
    </div>
  );
};

export default IngestProgressBar;
