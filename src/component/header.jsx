import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaHome, FaShekelSign } from 'react-icons/fa';
import { MdContactPhone ,MdOutlineRoundaboutRight } from "react-icons/md";
import { motion } from 'framer-motion';


const Header = () => {
  const [isHovered, setIsHovered] = useState(false);

  
  return (
    <>
    <div className="overflow-hidden bg-black font-poppins-regular">
    {/* <div className='bg-gray-200 h-10 w-full items-center md:ml-auto fixed '>
      <ul className=' flex items-center align-middle lg:ml-[600px] p-2 md:ml-[350px] sm:ml-[150px] xsm:ml-auto space-x-4 shadow-black'>
        <li><Link to="#"><img src={"/fb.svg"} alt='fb' className='w-6 h-6 rounded-full'/></Link></li>
        <li><Link to="#"><img src={"/linkedin.svg"} alt='ld' className='w-7 h-8 rounded-full'/></Link></li>
        <li><Link to="#"><img src={"/telegram.svg"} alt='tele'className='w-6 h-6 rounded-full'/></Link></li>
        <li><Link to="#"><img src={"/gmail.svg"} alt='gma' className='w-6 h-6 rounded-full'/></Link></li>
      </ul>
       </div> */}
        
        
       {/* <img src={"/test.jpg"} alt='bg' className='w-full h-full object-cover'style={{
        backgroundAttachment:'fixed', backgroundPosition: 'center', backgroundSize:'cover'
       }}/> */}
     
    {/* <div className='text-blue-500  bg-slate-400 border-2 border-t-white float-right flex-1 h-full rounded p-2'> */}
      
     
    {/* </div> */}
    <div className="FixedImage">
        {/* <span className='text-white font-bold ld:text-[150px] md:text-[100px] sm:text-[90px] xsm:text-[80px]'>Its Me Pawan</span> */}
        <div className='container flex p-2'>
          <img src='/logo.jpg' alt="my pic" className='h-40 w-40 rounded-full object-cover'/>
          <nav className='justify-between flex-wrap relative ml-auto '>
      <ul className='flex space-x-10'> 
     
      <motion.li
        whileHover={{ scale: 1.1, backgroundColor: isHovered ? 'white' : 'black' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transition={{ duration: 0.5 }}
        style={{
          width: 90,
          height: 40,
          borderRadius: 50,
        }}
      >  
      <Link to="#" className='flex items-center'> <FaHome className='text-white  mr-1 hover:animate-bounce hover:text-white items-center'/> <span className='text-white hover:text-black  p-2 text-sm rounded-full'>Home</span></Link> 
       </motion.li>
      
      <li>
      <Link to="#" className='flex items-center'> <MdOutlineRoundaboutRight className='text-white  mr-1 hover:animate-bounce hover:text-white items-center'/> <span className='text-white hover:text-black hover:bg-white p-2 text-sm rounded-full w-auto'>About</span></Link> 
      </li>
      <li>
      <Link to="#" className='flex items-center'> <FaShekelSign className=' text-white  mr-1 hover:animate-bounce hover:text-white items-center'/> <span className='text-white hover:text-black hover:bg-white p-2 text-sm rounded-full text-center'>Skills</span></Link> 
      </li>
      <li>
      <Link to="#" className='flex items-center'> <MdContactPhone  className=' text-white  mr-1 hover:animate-bounce hover:text-white items-center'/> <span className='text-white hover:text-black hover:bg-white p-2 text-sm rounded-full '>Contact</span></Link> 
      </li>
      </ul>
      {/* <div className="search">
      <input type='search' placeholder='Search about me' className='rounded p-2 text-sm'/>
      </div> */}
      

      </nav>
      </div>
    </div>
    </div>
    </>
  ) 
}

export default Header;