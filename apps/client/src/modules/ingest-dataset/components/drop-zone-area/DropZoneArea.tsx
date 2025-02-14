import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface DropzoneAreaProps {
  onDrop: (files: File[]) => void;
}

const DropzoneArea = ({ onDrop }: DropzoneAreaProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'text/csv': ['.csv'] },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-2 border-dashed rounded-lg p-8
        ${isDragActive ? 'border-primary bg-secondary/50' : 'border-border'}
        hover:border-primary hover:bg-secondary/25
        transition-colors duration-200
        cursor-pointer
      `}
    >
      <input {...getInputProps()} />
      <div className='flex flex-col items-center justify-center space-y-4 text-center'>
        <Upload className='h-8 w-8 text-muted-foreground' />
        {isDragActive ? (
          <p className='text-sm'>Drop the file here</p>
        ) : (
          <p className='text-sm'>Drag and drop your CSV file here, or click to select</p>
        )}
      </div>
    </div>
  );
};

export default DropzoneArea;
