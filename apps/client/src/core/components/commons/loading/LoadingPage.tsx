import { Loader2 } from 'lucide-react';

function LoadingPage() {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='size-8 animate-spin text-primary' />
        <span className='text-sm text-muted-foreground'>Loading...</span>
      </div>
    </div>
  );
}

export default LoadingPage;
