import Darkmode from '../darkmode/darkmode';
import { auth } from '../firebase/firebase';
import Notification from './notification';
import UserProfile from './userprofile';

const DashboardHeader = () => {
  return (
<>
<div className='bg-slate-700 dark:bg-gray-700 w-full h-full justify-center mx-auto text-sm p-4'>
    <ul className='items-center justify-center flex flex-grow dark:text-white gap-4'>
      <li className='flex flex-grow dark:text-white dark:border-white'>
        <input type='search' placeholder='Type to search' className='mx-auto rounded w-full p-2 border dark:border-none dark:text-white dark:bg-stone-800'/> 
        </li>
          <li><Darkmode/></li>
          <li><Notification/></li>  
          <li><UserProfile auth={auth}/></li> 
          </ul>           
    </div>
</>    
  );
};

export default DashboardHeader;