import React, { useState } from 'react';
import { AboutMe } from './routes_about';
import Skills from './skills';
import Experience from './experience';
import Education from './education';
import { AboutMy, about } from './text';

const About = () => {
  const [showTab, setShowTab] = useState("skills");

  const handleTab = (tab) => {
    setShowTab(tab);
  };
  return (
    <div className='bg-black p-2'>
      <div className='flex flex-col sm:flex-row gap-4 sm:text-sm'>
        <div className='flex-shrink-0 sm:w-1/3'>
          <img src='/pasa.jpg' className='h-[500px] w-full object-contain rounded border border-stone-900' alt='Portrait'/>
        </div>
        <div className='flex flex-col sm:w-2/3'>
          <h1 className='text-white font-bold text-3xl p-2'>{about}</h1>
          <p className='text-white text-sm text-justify p-2'>
            {AboutMy}
          </p>
          <ul className='text-white p-2 flex space-x-6 text-sm relative flex-wrap'>
            {AboutMe.map((about) => (
              <li
                key={about.link}
                className={`about text-sm font-bold ${showTab === about.title.toLocaleLowerCase() ? 'text-pink-700' : ''}`}
                onClick={() => handleTab(about.title.toLocaleLowerCase())}
                 // Set default font size for larger screens
              >
                {about.title}
              </li>
            ))}
          </ul>
          <div className='p-2 text-sm text-white'>
            {showTab === 'skills' && <Skills />}
            {showTab === 'experience' && <Experience />}
            {showTab === 'education' && <Education />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
