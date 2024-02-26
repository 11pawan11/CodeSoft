import React from 'react';
import { Link } from 'react-router-dom';
import { LiaCopyrightSolid } from "react-icons/lia";
import { MyName, contact, copyRight, downloadCv, email, phoneno, sendMessage } from './text';

const Footer = () => {
  return (
    <footer className="bg-black text-sm">
      <div className='grid grid-cols-1 md:grid-cols-2 text-white gap-4 sm:text-sm'>
        <div className='bg-black flex flex-col  lg:place-items-center justify-center items-center md:items-start space-y-2'>
          <span className='font-bold text-3xl text-center '>{contact}</span>
          <a href="mailto:pawanupreti35@gmail.com" className='flex items-center gap-4 '>
            <img src={"/gmail.svg"} alt='gmail' className='w-5 h-5 rounded-full items-center flex'/>
            <span className='items-center'>{email}</span>
          </a>

          <Link to="tel:+977-9866284088" className='flex items-center gap-4 '>
            <img src={"/phone.png"} alt='gmail' className='w-5 h-5 rounded-full items-center flex'/>
            <span className='items-center'>{phoneno}</span>
          </Link>

          {/* <div className=' h-10 w-full items-center'> */}
            <ul className='flex items-center space-x-4  '>
              <li><Link to="#"><img src={"/fb.svg"} alt='fb' className='w-6 h-6 hover:border-pink-600 hover:border-4 rounded-full'/></Link></li>
              <li><Link to="#"><img src={"/linkedin.svg"} alt='ld' className='w-7 h-7 hover:border-pink-600 hover:border-4 rounded-full'/></Link></li>
              <li><Link to="#"><img src={"/telegram.svg"} alt='telegram'className='w-7 h-7  hover:border-pink-600 hover:border-4 rounded-full'/></Link></li>
              <li><Link to="#"><img src={"/gmail.svg"} alt='gmail' className='w-7 h-7  hover:border-pink-600 hover:border-4 rounded-full'/></Link></li>
            </ul>
          {/* </div>   */}
          <button className='p-2 mt-4 text-white border w-40 border-pink-900 rounded  hover:bg-pink-700'>{downloadCv}</button>
        </div>

        <div className='bg-black p-2 space-y-4'>
          <input type='text' placeholder='Your Name' className='p-2 w-full md:w-3/4 will-change-auto bg-stone-900 block'/> 
          <input type='text' placeholder='Your Email' className='p-2 w-full md:w-3/4 bg-stone-900 block'/>
          <textarea id="textareaField" name="textareaField" className="w-full md:w-3/4 bg-stone-900 p-2 rounded-md block py-2" rows="5" placeholder="Enter text..."></textarea>
          <button className='border border-pink-800 text-white p-2 text-sm rounded w-full md:w-auto hover:bg-pink-700'>{sendMessage}</button>
        </div> 
      </div>    
      <p className='text-white justify-center items-center gap-1 flex text-xs p-2'><LiaCopyrightSolid className='text-lg'/> {copyRight} 
      <span className='font-semibold hover:text-pink-700' >{MyName}</span></p>    
    </footer>
  );
};

export default Footer;
