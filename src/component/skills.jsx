import { useImage } from './conext api/imageContext';

  const Skills = () => {
    const {textSkill} = useImage();
    // console.log("first,",textSkill)
    return (
  <>  
      <div className='items-center text-white text-sm sm:text-sm'>
      {textSkill.map((category, index) => (
        <ul key={index}>
          <li className='text-pink-600 font-bold'>{category.name}</li>
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