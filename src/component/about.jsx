import React from 'react';

const About = () => {
  return (
    <>
      <div className='bg-black grid grid-cols-2'>
      <div className='col-span-1'>
          <img src='/pasa.jpg' className='h-80 w-80 object-cover' alt='Portrait' />
        </div>
        <div className='col-span-1'>
          <span className='text-white font-bold mt-10 text-5xl p-2'>About Me </span>
          <p className='text-white text-lg text-justify p-2 mr-4 '>
            Sure! I'm an AI language model created by OpenAI called GPT-3. I'm designed to understand and generate human-like text based on the input I receive. My capabilities include answering questions, generating creative content, providing explanations, assisting with coding, and much more.
            I've been trained on a diverse range of internet text up to January 2022, which means I can provide information on various topics up to that point in time. My purpose is to assist users like you with tasks and inquiries to the best of my abilities.
            If you have any specific questions or topics you'd like to learn more about, feel free to ask, and I'll do my best to assist you!
          </p>
        </div>
        
      </div>
    </>
  );
};

export default About;
