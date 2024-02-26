import React from 'react'
import { experienceData } from './text';

const Experience = () => {
  return (
    <div className='sm:text-sm'>
    {experienceData.map((experience, index) => (
      <ul key={index}>
        <li className='text-pink-700 font-bold'>{experience.duration}</li>
        <li>{experience.position}</li>
        <li className='text-pretty text-sm'>Employer: {experience.employer}</li>
      </ul>
    ))}
  </div>
);
};

export default Experience;