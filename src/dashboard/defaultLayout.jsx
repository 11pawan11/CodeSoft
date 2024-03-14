import { useEffect, useState } from 'react';
import { UserContextProvider, useUserContext } from '../component/conext api/userContext';
import DashboardHeader from './Dashboardheader';
import Sidebar from './sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useToaster } from '../component/conext api/toast';
import Loader from '../loader';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const { user } = useUserContext();
  const navigate = useNavigate(); 
    if (!user) {
    return <Loader/>
  }




  return (
    <>
    <UserContextProvider/>
    <div  className='flex h-screen w-full dark:bg-gray-500 dark:text-white'>
      <Sidebar  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}  />
      <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
        <DashboardHeader  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className='mx-auto p-2'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
    <UserContextProvider/>
    </>
  );
};

export default DefaultLayout;
