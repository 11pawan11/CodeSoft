  import React, { useState } from 'react';
  import { AboutMe } from './routes_about';
import Skills from './skills';
import Experience from './experience';
import Education from './education';

  const About = () => {
    const [showTab, setShowTab] = useState("skills");

    const handeleTab  = (tab) => {
      setShowTab(tab);
    }
    return (
      <> 
        <div className=' bg-black grid grid-cols-2 p-2'>
        <div className='flex col-span-1 '>
            <img src='/pasa.jpg' className='h-[500px] w-full object-contain rounded ' alt='Portrait' />
        </div>
          <div className='col-span-1 h-full w-full'>
            <span className='text-white font-bold text-5xl p-2'>About Me </span>
            <p className='text-white text-sm text-justify p-2 mr-4 '>
              Sure! I'm an AI language model created by OpenAI called GPT-3. I'm designed to understand and generate human-like text based on the input I receive. My capabilities include answering questions, generating creative content, providing explanations, assisting with coding, and much more.
              I've been trained on a diverse range of internet text up to January 2022, which means I can provide information on various topics up to that point in time. My purpose is to assist users like you with tasks and inquiries to the best of my abilities.
              If you have any specific questions or topics you'd like to learn more absolute, feel free to ask, and I'll do my best to assist you!
            </p>


            
              <ul className='text-white p-2 flex space-x-8 relative'>
              {AboutMe.map((about)=>(
                  <li key={about.link} className={`about font-bold ${showTab == about.title.toLocaleLowerCase() ? 'text-pink-700': ''}`} onClick={()=>handeleTab(about.title.toLocaleLowerCase())}>{about.title}</li>
                    ))}
              </ul>


              <div className="p-2 text-sm text-white">
                {showTab ==  "skills" && <Skills/>}                 
                {showTab ==  "experience" && <Experience/>}
                {showTab == "education" && <Education/>}                        
              </div>   
    
          </div>          
        </div>
      </>
    );
  };

  export default About;
