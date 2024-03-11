import React, { useRef, useState, useEffect } from 'react';
import DashboardHeader from './Dashboardheader';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  // const [open, setOpen] = useState(false);
 

  // console.log("Test from layout", open);

  return (
    <div  className='flex h-screen w-full dark:bg-gray-500 dark:text-white'>
      <Sidebar open={open} />
      <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
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
