import { NavLink, useLocation } from "react-router-dom";
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
import {
  MdCastForEducation,
  MdEventNote,
  MdLogout,
  MdManageAccounts,
  MdOutlineMenuBook,
  MdSettings,
} from "react-icons/md";
import {
  FaAngleDown,
  FaAngleUp,
  FaBars,
  FaBell,
  FaEdit,
  FaTimes,
} from "react-icons/fa";
import { PiProjectorScreenLight } from "react-icons/pi";
import { GrServices } from "react-icons/gr";
import { LiaCertificateSolid } from "react-icons/lia";
import { GiSkills } from "react-icons/gi";
import { MdContactEmergency } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { useToaster } from "../component/conext api/toast";
import { useUserContext } from "../component/conext api/userContext";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const [open, setOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const dropDownRef = useRef();
  const clickRef = useRef();

  const { handleLogout } = useUserContext();

  window.addEventListener("click", (e) => {
    if (e.target !== clickRef.current && e.target !== dropDownRef.current) {
      setOpen(false);
      setDropDown(false);
    }
  });
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  const trigger = useRef();
  const sidebar = useRef();

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target } = MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode } = KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
    ref={sidebar}
    className={`absolute left-0 top-0 z-50 h-screen flex w-[207px] bg-black flex-col overflow-y-hidden overflow-x-hidden duration-300 ease-linear dark:bg-gray-700 lg:static lg:translate-x-0 ${
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5 lg:py-6">
        <NavLink to="/">
          <img src={"/logo.jpg"} alt="Logo" className="h-20 w-full lg:hidden" />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        ></button>
      </div>
      <div>
        <nav
          className={`fixed top-0 left-0 font-semibold bottom-0 bg-gray-800 text-white z-9999 transition-transform duration-300 ease-in-out transform  translate-x-0 -translate-x-full}`}
        >
          <div className="lg:block">
                <img src='/logo.jpg' className='w-20 h-20 mx-auto rounded-full '/>
        </div>
          <div className="flex items-center gap-2 text-white mb-4 mt-4 font-extralight text-sm border-b border-white px-2">
            
            <MdOutlineMenuBook />
            <p>Dashboard Menu</p>
          </div>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard"
                className={`text-white hover:bg-gray-700 p-2 w-full left-0 text-sm flex items-center gap-2 ${
                  pathname.includes("dashboard") ? "active" : ""
                }`}
              >
                <AiOutlineDashboard /> {dashboards}
              </NavLink>
            </li>

            <li className="transition-all duration-500 ">
              <span
                ref={dropDownRef}
                className="text-sm flex items-center gap-2 p-2 dropdown"
                onClick={handleDropDown}
              >
                <FaEdit />
                {EditAbout}{" "}
                <span className="transition-transform duration-1000">
                  {dropDown ? <FaAngleUp /> : <FaAngleDown />}
                </span>
              </span>
              {dropDown && (
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
                      <MdEventNote /> {EditExperience}
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
              )}
            </li>

            <li>
              <NavLink
                to="/addService"
                className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${
                  pathname.includes("addService") ? "active" : ""
                }`}
              >
                <GrServices /> {EditServices}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/addWork"
                className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${
                  pathname.includes("addWork") ? "active" : ""
                }`}
              >
                <PiProjectorScreenLight /> {EditMyWork}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addCertificate"
                className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${
                  pathname.includes("addCertificate") ? "active" : ""
                }`}
              >
                <LiaCertificateSolid /> {EditCertification}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/addContact"
                className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${
                  pathname.includes("addContact") ? "active" : ""
                }`}
              >
                <MdContactEmergency /> {EditContactForm}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${
                  pathname.includes("profile") ? "active" : ""
                }`}
              >
                <MdManageAccounts /> {Profile}
              </NavLink>
            </li>

                        {/* <li>
              <NavLink  to="/profile_setting"
                className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${
                  pathname.includes("profile") ? "active" : ""
                }`}
              >
                <MdSettings/> {AccountSetting}
              </NavLink>
              </li> */}

            <li>
              <NavLink
                to="#"
                className={`text-white p-2 left-0  hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${
                  pathname.includes("logout") ? "active" : ""
                }`}
                onClick={handleLogout}
              >
                <MdLogout /> {Logout}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
