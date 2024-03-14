  import { useRef, useState } from "react";
  import { Logout, userProfile } from "../component/text";
  import { auth } from "../firebase/initialStart";
  import { Link, useNavigate } from "react-router-dom";
  import { useToaster } from "../component/conext api/toast";
  import { signOut } from "firebase/auth";
  import { useUserContext } from "../component/conext api/userContext";

  const UserProfile = () => {
    const { showToast } = useToaster();
    const {handleLogout} =  useUserContext();
    const [userDropDown, setUserDropDown] = useState("");
    const [open, setOpen] = useState(false);

    const menuRef = useRef();
    const imgRef = useRef();

    window.addEventListener("click", (e) => {
      if (e.target !== menuRef.current && e.target !== imgRef.current) {
        setOpen(false);
      }
    });

    const handleDropdown = (profile) => {
      setUserDropDown(profile);
      setOpen(false);
    };
    // {userProfile.map((profile) => (
    //     <li
    //         key={profile.title}
    //         onClick={() => handleDropdown(profile)}
    //         className={`flex items-center justify-center border-b p-2border-gray-400 text-sm font-medium px-4 py-2 duration-300 dark:text-white dark:hover:bg-gray-400 hover:bg-blue-100 hover:text-blue-800 ${userDropDown === profile ? "bg-stone-600 text-white" : "black-gray-800"}`}
    //     >
    //         {profile.title}
    //     </li>
    // ))}


    return (
      <>
        <div className="relative inline-block w-full">
          <img
            ref={imgRef}
            src={auth.currentUser?.photoURL || `/default.jpg`}
            alt="avatar"
            className="rounded-full h-9 w-10  dark:border-white dark:border cursor-pointer"
            onClick={() => setOpen(!open)}
          />

          <div
            ref={menuRef}
            className={`absolute top-10 -right-4 z-999 bg-white dark:bg-gray-800 dark:text-white border rounded shadow-lg ${
              open ? "block" : "hidden"
            } mt-5`}
          >
            <ul className="flex flex-col w-[150px] z-100">
              <li>
                <Link
                  to="/profile"
                  className={`flex  items-center justify-center border-b p-2border-gray-400 text-sm font-medium px-4 py-2 duration-300 dark:text-white dark:hover:bg-gray-400 hover:bg-blue-100 hover:text-blue-800 ${
                    userDropDown === "profile"
                      ? "bg-stone-600 text-white"
                      : "black-gray-800"
                  }`}
                >
                  My Profile
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/profile_setting"
                  className={`flex items-center justify-center border-b p-2border-gray-400 text-sm font-medium px-4 py-2 duration-300 dark:text-white dark:hover:bg-gray-400 hover:bg-blue-100 hover:text-blue-800 ${
                    userDropDown === "profile"
                      ? "bg-stone-600 text-white"
                      : "black-gray-800"
                  }`}
                >
                  Account Setting
                </Link>
              </li> */}
              <li>
                <Link
                  to="#"
                  onClick={handleLogout}
                  className={`flex items-center justify-center border-b p-2border-gray-400 text-sm font-medium px-4 py-2 duration-300 dark:text-white dark:hover:bg-gray-400 hover:bg-blue-100 hover:text-blue-800 ${
                    userDropDown === "profile"
                      ? "bg-stone-600 text-white"
                      : "black-gray-800"
                  }`}
                >
                  Logout{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="block">
                  <span>{auth.currentUser?.email || ""}</span>
              </div> */}
      </>
    );
  };

  export default UserProfile;
