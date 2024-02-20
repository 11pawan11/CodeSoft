  import React, { useState } from 'react'
  import { Link } from 'react-router-dom';
  import { FaBars, FaHome, FaShekelSign } from 'react-icons/fa';
  import { MdContactPhone ,MdOutlineRoundaboutRight } from "react-icons/md";


  const Header = () => {
    const scrollTo = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    
  

    

    
    return (
      <>
      <div className="overflow-hidden bg-black font-poppins-regular">
      {/* <div className='bg-transparent h-10 w-full items-center md:ml-auto '>
        <ul className=' flex items-center -right-1 lg:ml-[1000px] p-2 md:ml-[350px] sm:ml-[150px] xsm:ml-auto space-x-4 shadow-black'>
          <li><Link to="#"><img src={"/fb.svg"} alt='fb' className='w-7 h-7 rounded-full'/></Link></li>
          <li><Link to="#"><img src={"/linkedin.svg"} alt='ld' className='w-7 h-8 rounded-full'/></Link></li>
          <li><Link to="#"><img src={"/telegram.svg"} alt='tele'className='w-7 h-7 rounded-full'/></Link></li>
          <li><Link to="#"><img src={"/gmail.svg"} alt='gma' className='w-7 h-7 rounded-full'/></Link></li>
        </ul>
        </div>  */}
        
      
      <div className="FixedImage">
          <div className='container flex p-2'>
            <img src='/logo.jpg' alt="my pic" className='h-40 w-40 rounded-full object-cover'/>
            
          
      <nav className="justify-between align-middle flex-wrap ml-auto xsm:ml-auto text-white">
      <ul className='flex space-x-8 py-8 relative'> 
      
      <li>
      <Link to="#" className='about'>
        <span>Home</span>
        </Link>  
        </li>
        <li id="About">
        <Link to="" className='about' onClick={()=>scrollTo('About')}>
        <span>About</span>
        </Link>  
          </li>
        <li>
        <Link to="#" className='about'>
        <span>Skills</span>
        {/* <span className='bg-pink-700 h-0.5 w-full absolute -mt-7'></span> */}
        </Link>        
         </li>
        <li>
        <Link to="#" className='about'>
        <span>Contact</span>
        </Link> 
        {/* <Link to="#" className='flex items-center text-white relative'>
        <span className='mb-2'>Contact</span>
        <span className='bg-pink-700 h-0.5 w-full absolute mt-4'></span>
        </Link>         */}
         </li>
        </ul>
        {/* <div className="search">
        <input type='search' placeholder='Search about me' className='rounded p-2 text-sm'/>
        </div> */}
        

        </nav>
        </div>
        <div className='mt-[50px] ml-10'>
          <span className='font-bold text-white text-[100px] xsm:text-[50px]'>Its Me Pawan</span>
          <p className='font-semibold text-white text-xl transition-all duration-1000 hover:text-blue-900'>Frontend Developer & DevOps Enthusiastic</p>
        </div>
      </div>
      </div>
      </>
    ) 
  }

  export default Header;