import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { CiText } from "react-icons/ci";
import {
  AccountSetting,
  EditAbout,
  EditCertification,
  EditContactForm,
  EditEducation,
  EditExperience,
  EditMyWork,
  EditServices,
  EditSkill,
  Logout,
  Profile,
  addImage,
  addText,
  dashboards,
} from "../component/text";
import { MdCastForEducation, MdEventNote, MdLogout, MdManageAccounts, MdOutlineMenuBook, MdSettings } from "react-icons/md";
import { FaAngleDown, FaAngleUp, FaBars, FaBell, FaEdit, FaTimes } from "react-icons/fa";
import { PiProjectorScreenLight } from "react-icons/pi";
import { GrServices } from "react-icons/gr";
import { LiaCertificateSolid } from "react-icons/lia";
import { GiSkills } from "react-icons/gi";
import { MdContactEmergency } from "react-icons/md";
import { useRef, useState } from "react";
import { signOut } from 'firebase/auth';
import { auth } from "../firebase/initialStart";
import { useToaster } from "../component/conext api/toast";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const [open, setOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const dropDownRef = useRef();
  const clickRef = useRef();
  const {showToast} = useToaster();

  const navigate = useNavigate();


  const handleLogout = async () => {
    try
     {
      await signOut(auth);
      navigate("/");
      showToast("Logout Sucessfully");
    }
    catch(error){
      showToast("Error during logout",error)
    }
  }

  window.addEventListener("click", (e) => {
    if (e.target !== clickRef.current && e.target !== dropDownRef.current) {
      setOpen(false);
      setDropDown(false)
    }
  });
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleDropDown = () => {
    setDropDown(!dropDown);
  }

  return (
    <div>
      <button
        ref={clickRef}
        onClick={handleToggle}
        className=" lg:hidden md:hidden left-0 top-0 z-30 p-4 h-[73.5px] bg-slate-700 text-white"
      >
        {open ? <FaTimes /> : <FaBars />}
      </button>
      <nav
        className={`fixed top-0 left-0 font-semibold bottom-0 bg-gray-800 text-white z-20 transition-transform duration-300 ease-in-out transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0 sm:relative sm:translate-y-0 sm:flex sm:flex-col sm:h-screen sm:w-56 sm:transition-none`}
      >
        <div className="flex items-center gap-2 text-white mb-4 mt-10 font-extralight text-sm border-b border-white px-2">
          <MdOutlineMenuBook />
          <p>Dashboard Menu</p>
        </div>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/dashboard"
              className={`text-white hover:bg-gray-700 p-2 w-full left-0 text-sm flex items-center gap-2 ${
                pathname.includes("dashboard") ? "active" : ""}`} >
              <AiOutlineDashboard /> {dashboards}
            </NavLink>
          </li>
                
          <li className="transition-all duration-500 ">
         <span ref={dropDownRef} className="text-sm flex items-center gap-2 p-2 dropdown" onClick={handleDropDown}><FaEdit/>
          {EditAbout} <span className="transition-transform duration-1000">
         {dropDown ? <FaAngleUp/> : <FaAngleDown/>
        }</span>
         </span>
         {dropDown &&
            <ul className="m-2">
              <li className="transition-all duration-500">
                <NavLink
                  to="/addimage"
                  className={`text-white p-2 hover:bg-gray-700 left-0 text-sm text-center flex items-center gap-2 ${
                    pathname.includes("addImage") ? "active" : ""
                  }`}
                >
                  <RiImageAddLine />
                  {addImage}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/addtext"
                  className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${
                    pathname.includes("addText") ? "active" : ""
                  }`}
                >
                  <CiText /> {addText}
                </NavLink>
              </li>
              <li>
              <NavLink
                to="/addSkills"
                className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${
                  pathname.includes("addText") ? "active" : ""
                }`}
              >
                <GiSkills /> {EditSkill}
              </NavLink>
            </li>
            <li>
            <NavLink
              to="/addExperience"
              className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${
                pathname.includes("addText") ? "active" : ""
              }`}
            >
              <MdEventNote/> {EditExperience}
            </NavLink>
          </li>
          <li>
          <NavLink
            to="/addEducation"
            className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${
              pathname.includes("addText") ? "active" : ""
            }`}
          >
            <MdCastForEducation /> {EditEducation}
          </NavLink>
        </li>

            </ul>
                }
          </li>

          <li>
          <NavLink
            to="/addService"
            className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${
              pathname.includes("addService") ? "active" : ""
            }`}
          >
            <GrServices/> {EditServices}
          </NavLink>
        </li>

        <li>
        <NavLink
          to="/addWork"
          className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${
            pathname.includes("addWork") ? "active" : ""
          }`}
        >
          <PiProjectorScreenLight/> {EditMyWork}
        </NavLink>
      </li>
      <li>
      <NavLink
        to="/addCertificate"
        className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${
          pathname.includes("addCertificate") ? "active" : ""
        }`}
      >
        <LiaCertificateSolid/> {EditCertification}
      </NavLink>
    </li>
    <li>
    <NavLink
      to="/addContact"
      className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${
        pathname.includes("addContact") ? "active" : ""
      }`}
    >
      <MdContactEmergency/> {EditContactForm}
    </NavLink>
  </li>
  <li>
  <NavLink
    to="/profile"
    className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${
      pathname.includes("profile") ? "active" : ""
    }`}
  >
    <MdManageAccounts/> {Profile}
  </NavLink>
</li>
<li>
<NavLink
  to="/profile_setting"
  className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${
    pathname.includes("profile") ? "active" : ""
  }`}
>
  <MdSettings/> {AccountSetting}
</NavLink>
</li>
<li>
<NavLink
  to="#"
  className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${
    pathname.includes("logout") ? "active" : ""
  }`} onClick={handleLogout}
>
  <MdLogout/> {Logout}
</NavLink>
</li>


        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
