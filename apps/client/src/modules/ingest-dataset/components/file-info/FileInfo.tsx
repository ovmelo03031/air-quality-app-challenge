import { CheckCircle2 } from 'lucide-react';

interface FileInfoProps {
  file?: File;
}

const FileInfo = ({ file }: FileInfoProps) => {
  if (!file) return null;
  return (
    <div className='flex items-center space-x-2 text-sm'>
      <CheckCircle2 className='size-4 text-green-500' />
      <span>{file.name}</span>
    </div>
  );
};

export default FileInfo;
