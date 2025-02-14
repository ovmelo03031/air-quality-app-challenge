import { Outlet } from 'react-router-dom';
import Navigation from './nav-bar/NavigationBar';

function Layout() {
  return (
    <div className='min-h-screen bg-background'>
      <Navigation />
      <div className='mx-auto max-w-[110rem] px-4 sm:px-6 lg:px-8'>
        <main className='flex-1 space-y-4 py-8'>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
