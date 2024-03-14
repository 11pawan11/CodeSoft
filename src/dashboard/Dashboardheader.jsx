import { FaBars } from "react-icons/fa";
import Darkmode from "../darkmode/darkmode";
import { auth } from "../firebase/initialStart";
import Notification from "./notification";
import SearchButton from "./searchButton";
import UserProfile from "./userprofile";

const DashboardHeader = (props = { sidebarOpen, setSidebarOpen }) => {
  return (
    <div className=" sticky top-0 z-50 dark:bg-gray-900 items-center justify-center text-sm p-4 w-full bg-slate-700 transition-width duration-300 ease-in-out">
      <button
        aria-controls="sidebar"
        onClick={(e) => {
          e.stopPropagation();
          props.setSidebarOpen(!props.sidebarOpen);
        }}
        className="z-9999 rounded-sm border border-gray-500 bg-white p-2 text-center items-center 
            shadow-sm dark:border-white dark:bg-slate-700 lg:hidden"
      >
        <FaBars className="text-slate-700 dark:text-white" />
      </button>
      {/* <img src='logo.jpg' className='w-20 h-20 rounded-full '/> */}
      <ul className="items-center justify-center flex  dark:text-white float-right  gap-4">
        {/* <li className='w-full'><SearchButton/></li> */}
        <li>
          <Darkmode />
        </li>
        <li>
          <Notification />
        </li>
        <li className="">
          <UserProfile auth={auth} />
        </li>
      </ul>
    </div>
  );
};

export default DashboardHeader;
