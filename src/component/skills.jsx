  import React from 'react'
import { skillData } from './text'

  const Skills = () => {
    return (
  <>  
      <div className='items-center text-white text-sm sm:text-sm'>
      {skillData.map((category, index) => (
        <ul key={index}>
          <li className='text-pink-600 font-bold'>{category.category}</li>
          {category.skills.map((skill, skillIndex) => (
            <li key={skillIndex} className=''>{skill}</li>
          ))}
        </ul>
      ))}
    </div>
  </>
  );
};

  export default Skills;