import { useEffect } from 'react';
import { auth } from '../firebase/initialStart';
import DashboardHeader from './Dashboardheader';
import Sidebar from './sidebar';
import { Outlet, useNavigate } from 'react-router-dom';

const DefaultLayout = () => {
  const user = auth.currentUser;

  let navigate = useNavigate();

  if (!user ){
    navigate('/login');
  }

 



  return (
    <div  className='flex h-screen w-full dark:bg-gray-500 dark:text-white'>
      <Sidebar open={open} />
      <div className='relative flex flex-1 flex-col z-999 overflow-y-auto overflow-x-hidden'>
        <DashboardHeader/>
        <main>
          <div className='mx-auto p-2'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
