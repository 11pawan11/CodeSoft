import React from "react";

const Skills = () => {
  return (
    <>
      <div className="bg-black">
        <span className="text-white font-bold text-center ml-40 text-5xl mt-10">
          {" "}
          SKills & Certificates
        </span>
        {/* <img src={'/pasa.jpg'} alt='skills' w-auto h-auto/> */}

        <div className=" bg-black text-black space-x-10 mx-40 ml-40 relative">
          <button className="items-center  hover:bg-pink-700 h-0.5 w-0 transition-all hover:w-auto duration-[0.5s] absolute"><span className="">Achievement</span></button>
          <button className=" items-center hover:bg-pink-700 h-0.5 w-0 transition-all hover:w-auto duration-[0.5s] absolute">Qualification</button>
          <button className=" items-center hover:bg-pink-700 h-0.5 w-0 transition-all hover:w-auto duration-[0.5s] absolute">Projects</button>
        </div>
      </div>
    </>
  );
};

export default Skills;
