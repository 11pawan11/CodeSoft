import { useRef, useState } from "react";
import { userProfile } from "../component/text";
import { auth } from "../firebase/firebase";

const UserProfile = () => {
    const [userDropDown, setUserDropDown] = useState("");
    const [open, setOpen] = useState(false);

    const menuRef = useRef();
    const imgRef = useRef();

    window.addEventListener('click',(e)=>{
        if (e.target !== menuRef.current && e.target !== imgRef.current){
            setOpen(false);
        }
    });
    
    const handleDropdown = (profile) => {
        setUserDropDown(profile);
        setOpen(false);
    }

    return (
        <>
            <div className="relative inline-block">
                <img
                    ref={imgRef}
                    src={auth.currentUser?.photoURL || `/public/pasa.jpg`}
                    alt="avatar"
                    className="rounded-full h-10 w-10 border cursor-pointer"
                    onClick={() => setOpen(!open)} />

                <div
                    ref={menuRef}
                    className={`absolute top-full -right-4 z-10 bg-white dark:bg-gray-600 dark:text-white border rounded shadow-lg ${open ? 'block' : 'hidden'} mt-4`}
                >
                    <ul className="flex flex-col w-[150px] ">
                        {userProfile.map((profile) => (
                            <li
                                key={profile.title}
                                onClick={() => handleDropdown(profile)}
                                className={`flex items-center justify-center border-b p-2border-gray-400 text-sm font-medium px-4 py-2 duration-300 dark:text-white dark:hover:bg-gray-400 hover:bg-blue-100 hover:text-blue-800 ${userDropDown === profile ? "bg-stone-600 text-white" : "black-gray-800"}`}
                            >
                                {profile.title}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* <div className="block">
                <span>{auth.currentUser?.email || ""}</span>
            </div> */}
        </>
    );
}

export default UserProfile;

