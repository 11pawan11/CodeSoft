import DashboardHeader from './Dashboardheader';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <>
    <div>DefaultLayout</div>
    <div>
      <Sidebar />
    </div>
    <div>
      {/* <Outlet/> */}
      <DashboardHeader/>
    </div>
    </>
  );
};

export default DefaultLayout;