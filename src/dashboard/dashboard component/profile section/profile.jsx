import { useEffect, useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { AboutMy, about, edit } from '../../../component/text';
import { auth } from '../../../firebase/initialStart';



const Profile = () => {
  const [user,setUser] = useState();

  useEffect(()=>{
    const currentUser = auth.currentUser;
    setUser(currentUser);
  },[])

  return (
    <>
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:text-white dark:border-gray-800 dark:bg-gray-700">
        <div className="relative z-20 h-35 md:h-65 dark:text-white">
          <p className="h-full w-full text-black font-bold text-4xl dark:text-white text-center mb-4">{user?.email || ""} </p>
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
            >
              <input type="file" name="cover" id="cover" className="sr-only" />
              {/* <span className='dark:text-white z-2 dark:bg-gray-800 dark:hover:bg-slate-900 bg-blue-500 hover:bg-blue-700 p-1 text-center rounded'>{edit}</span> */}
            </label>
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-gray-300 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img src={user?.photoURL || '/default.jpg'} alt="Profile" className='h-full text-white w-full rounded-full object-cover' />
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full  text-black hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <FaCamera/>
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="sr-only"
                />
              </label>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-4 text-2xl font-semibold text-black dark:text-white">
              {user?.displayName?.toUpperCase()}
            </h3>         

            <div className="mx-auto w-full">
              <p className="font-semibold text-black dark:text-white">
                {about}
              </p>
              <p className="mt-4 text-justify ">
              {AboutMy}
              </p>
            </div>                  
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
