import React from "react";
import { IoCodeSlashSharp } from "react-icons/io5";
import { CgDesignmodo } from "react-icons/cg";
import { Link } from "react-router-dom";
import { ServicesRoute, services } from "./text";

const Services = () => {
 
  return (
    <>
    <div className="bg-black text-white p-4 justify-center">
      <span className="text-white font-bold ml-[50px] sm:text-center text-4xl mb-4 ">
        {services}
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-4 md:p-10 lg:p-16">
      {ServicesRoute.map((service) => (
        <div key={service.id} className="">
      <div className="bg-stone-900 border h-80 text-pretty text-sm p-8 rounded hover:bg-pink-600 hover:-translate-y-2 transistion-all duration-500">
        <p className="text-xl sm:text-center font-bold mb-4">{service.icon}</p>        
        <p className="font-bold  text-2xl sm:text-2xl">{service.topic}</p>
        <p>{service.subtopic}. {service.path}</p>
      </div>
      </div>
      ))}
      </div>      
      </div>
        </>
  );
};

export default Services;
