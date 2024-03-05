import Darkmode from '../darkmode/darkmode';
import { auth } from '../firebase/firebase';
import Notification from './notification';
import SearchButton from './searchButton';
import Sidebar from './sidebar';
import UserProfile from './userprofile';

const DashboardHeader = ({ open }) => {
  console.log("Test from Header", open);

  return (
    <div className={`bg-slate-700 dark:bg-gray-900 justify-center text-sm p-4 transition-width duration-300 ease-in-out ${open ? 'w-full' : 'w-[calc(100%)]'}`}>
      <ul className='items-center justify-center flex  dark:text-white gap-4'>
        <li className='w-full'><SearchButton/></li>
        <li><Darkmode/></li>
        <li><Notification/></li>  
        <li><UserProfile auth={auth}/></li> 
      </ul>           
    </div>
  );
};

export default DashboardHeader;
