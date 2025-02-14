import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPaginationItemClasses(disabled: boolean) {
  return cn(
    'text-secondary-foreground cursor-default',
    disabled
      ? 'cursor-not-allowed pointer-events-none bg-accent text-muted-foreground'
      : '',
  );
}
