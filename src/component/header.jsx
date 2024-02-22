import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa"; // Import FaTimes for close icon

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="overflow-hidden bg-black">
      <div className="FixedImage">
        <div className=" flex justify-between items-center p-2">
          <div className="float-left">
            <img src='/logo.jpg' alt="my pic" className='rounded-full object-contain max-w-40 max-h-40' />
          </div>
          <div className="flex flex-col sm:flex-row">
            <button className="absolute sm:hidden text-white top-8 space-y-4 z-10 right-4 text-lg" onClick={toggleMenu}>
              {isMenuOpen ? <FaTimes /> : <FaBars />} {/* Show close icon when menu is open */}
            </button>
            <nav className={`sm:flex flex-wrap justify-end text-white ${isMenuOpen ? 'block ' : 'hidden'}`}>
              <ul className='flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 py-8 relative font-bold'>
                <li>
                  <Link to="#" className='about'>
                    <span>Home</span>
                  </Link>
                </li>
                <li id="About">
                  <Link to="" className='about' onClick={() => scrollTo('About')}>
                    <span>About</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className='about'>
                    <span>Services</span>
                  </Link>
                </li>
                <li>
                  <Link to="#" className='about'>
                    <span>Contact</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className='ml-10'>
          <h1 className='font-bold text-white text-6xl mb-4'>Its Me Pawan</h1>
          <p className='text-white text-6xl font-bold mb-4'>from <span className='font-bold text-pink-700 text-6xl'>Nepal</span></p>
          <p className='font-semibold text-white text-lg sm:text-2xl transition-all duration-1000 hover:text-blue-900'>
            Frontend Developer & DevOps Enthusiastic
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
