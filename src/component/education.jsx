import { useImage } from './conext api/imageContext';


const Education = () => {
  const{educationUpdate} = useImage();

  return (
    <div className='items-center text-white text-sm space-y-4 sm:text-sm'>
    {educationUpdate.map((education, index) => (
      <ul key={index}>
        <li className='text-pink-600 font-bold'>{education.name}</li>
        {education.skills.map((edu,eduIndex)=>(
        <li key={eduIndex} className="">{edu}</li>
        ))}
      </ul>
    ))}
  </div>
);
};


export default Education;