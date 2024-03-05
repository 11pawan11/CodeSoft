import { NavLink, useLocation } from 'react-router-dom';
import { AiOutlineDashboard } from "react-icons/ai";
import { RiImageAddLine } from "react-icons/ri";
import { CiText } from "react-icons/ci";
import { about, addImage, addText, dashboards } from '../component/text';
import { MdOutlineMenuBook } from "react-icons/md";
import { FaBars, FaBell, FaCross, FaTimes } from 'react-icons/fa';
import { useRef, useState } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const [open, setOpen] = useState(false);

  // console.log("Test", open)

  const clickRef = useRef();

  window.addEventListener('click', ((e) => {
    if (e.target !== clickRef.current) {
      setOpen(false);

    }
  }));

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>

      <button ref={clickRef} onClick={handleToggle} className="left-0 border-r top-0 z-30 p-3 mx-auto bg-gray-800 text-white">
        {open ? <FaTimes /> : <FaBars />}
      </button>

      <nav className={`fixed top-0 left-10 bottom-0 bg-gray-800 text-white z-20 transition-transform duration-300 ease-in-out transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className='flex items-center gap-2 text-white mb-4 mt-10 font-light text-sm border-b border-white px-2'>
          <MdOutlineMenuBook /><p >Dashboard Menu</p>
        </div>
        <ul className="space-y-2">
          <li>
            <NavLink to="/dashboard" className={`text-white hover:bg-gray-700 p-2 w-full left-0 text-sm flex items-center gap-2 ${pathname.includes('dashboard') ? 'active' : ''}`}>
              <AiOutlineDashboard /> {dashboards}
            </NavLink>
          </li>
          <li>
            <NavLink to="/addimage" className={`text-white p-2 hover:bg-gray-700 left-0 text-sm text-center flex items-center gap-2 ${pathname.includes('addImage') ? 'active' : ''}`}>
              <RiImageAddLine />{addImage}
            </NavLink>
          </li>
          <li>
            <NavLink to="/addtext" className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${pathname.includes('addText') ? 'active' : ''}`}>
              <CiText /> {addText}
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={`text-white p-2 left-0 hover:bg-gray-700 text-sm text-center flex items-center gap-2 ${pathname.includes('about') ? 'active' : ''}`}>
              <FaBell /> {about}
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;