import { NAVIGATION_BAR } from '@/core/constants/navigationBar.constant';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/core/lib/utils';

const NavigationBarItems = () => {
  const location = useLocation();
  return (
    <nav className='flex space-x-4'>
      {NAVIGATION_BAR.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md',
              location.pathname === item.href
                ? 'bg-secondary text-secondary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
            )}
          >
            <Icon className='mr-2 size-4' />
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavigationBarItems;
