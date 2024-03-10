
import { useImage } from './conext api/imageContext';

const Experience = () => {
  const {experienceUpdate} = useImage();

  return (
    <div className='sm:text-sm'>
    {experienceUpdate.map((experience, index) => (
      <ul key={index}>
        <li className='text-pink-700 font-bold'>{experience.name}</li>
        {experience.skills.map((exp, expIndex)=>(
          <li key={expIndex} className='text-pretty text-sm'>{exp}</li>
    ))}
      </ul>
    ))}
  </div>
);
};

export default Experience;