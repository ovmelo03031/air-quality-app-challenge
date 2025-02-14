import { Loader2 } from 'lucide-react';

import { Button } from '@components-ui/button';

interface ButtonLoadingProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}
function ButtonLoading({ loading, disabled, children, ...props }: ButtonLoadingProps) {
  return (
    <Button {...props} disabled={loading || disabled}>
      {loading ? <Loader2 className='animate-spin mr-1' /> : null}
      {children}
    </Button>
  );
}

export default ButtonLoading;
