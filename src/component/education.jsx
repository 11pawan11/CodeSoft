import React from 'react'
import { educationData } from './text';

const Education = () => {
  return (
    <div className='items-center text-white text-sm space-y-4 sm:text-sm'>
    {educationData.map((education, index) => (
      <ul key={index}>
        <li className='text-pink-600 font-bold'>{education.year}</li>
        <li>{education.qualification} from {education.institution}</li>
      </ul>
    ))}
  </div>
);
};


export default Education;