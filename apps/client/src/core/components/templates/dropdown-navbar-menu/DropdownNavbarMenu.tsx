import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@components-ui/dropdown-menu';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/core/lib/utils';
import { NAVIGATION_BAR } from '@/core/constants/navigationBar.constant';

const DropdownNavbarMenu = () => {
  const location = useLocation();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className='ml-auto border-0 bg-transparent focus:outline-none
       hover:bg-secondary/50 rounded-md p-2'
      >
        <Menu className='size-5' />
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {NAVIGATION_BAR.map((item) => (
          <DropdownMenuItem key={item.name} asChild>
            <Link
              to={item.href}
              className={cn(
                'w-full',
                location.pathname === item.href
                  ? 'bg-secondary text-secondary-foreground'
                  : 'text-muted-foreground',
              )}
            >
              <item.icon className='mr-2 size-4' />
              {item.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownNavbarMenu;
