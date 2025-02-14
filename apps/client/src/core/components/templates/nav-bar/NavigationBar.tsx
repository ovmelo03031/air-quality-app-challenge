import { NavLink } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { useMediaQuery } from '@/core/hooks/useMediaQuery';
import DropdownNavbarMenu from '@templates/dropdown-navbar-menu/DropdownNavbarMenu';
import { NAVIGATION_BAR } from '@/core/constants/navigationBar.constant';
import NavigationBarItems from '@templates/navigation-bar-items/NavigationBarItems';

function Navigation() {
  const isMobile = useMediaQuery('(max-width: 660px)');

  return (
    <div className='border-b flex justify-center'>
      <div className='flex h-16 items-center px-4 max-w-[110rem] w-full'>
        <NavLink
          to={NAVIGATION_BAR[0].href}
          className='flex items-center text-primary hover:text-primary'
        >
          <Activity className='mr-2 h-6 w-6' />
          {!isMobile && (
            <h2 className='text-lg font-semibold mr-8'>Air Quality Monitor</h2>
          )}
        </NavLink>

        {isMobile ? <DropdownNavbarMenu /> : <NavigationBarItems />}
      </div>
    </div>
  );
}

export default Navigation;
