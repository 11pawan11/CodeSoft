import React from "react";
import { IoCodeSlashSharp } from "react-icons/io5";
import { CgDesignmodo } from "react-icons/cg";
import { Link } from "react-router-dom";

const Services = () => {
  const whiteImageStyle = {
    filter: "brightness(0) saturate(100%) invert(100%)",
  };

  return (
    <div className="bg-black text-white p-4">
      <span className="text-white font-bold ml-[50px] sm:text-center text-4xl mb-4 ">
        My Services
      </span>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-4 md:p-10 lg:p-16">
      <div className="bg-stone-900 border text-pretty text-sm p-8 rounded hover:bg-pink-600 hover:-translate-y-2 transistion-all duration-500">
          <IoCodeSlashSharp className="text-xl sm:text-center font-bold mb-4" />
          <p className="font-bold  text-2xl mb-4 sm:text-2xl">Web Design</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius ex
            repellendus delectus, labore dolore cumque? Ex eum nostrum
            distinctio repellat possimus vero suscipit. Esse modi ullam iure
            molestias fuga! Iste? <Link to='#' className="mt-4 hover:text-blue-800 font-bold">See More</Link>
          </p>
        </div>
        <div className="bg-stone-900 border text-pretty text-sm p-8 rounded hover:bg-pink-600 hover:-translate-y-2 transistion-all duration-500">
          <img
            src="/devops.png"
            alt="devops"
            className="mb-4 h-5 w-5"
            style={whiteImageStyle}
          />
          <p className="font-bold text-2xl mb-4">DevOps</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Accusantium error nam fuga, q uibusdam veritatis nulla dolore
            facilis alias dicta excepturi libero maxime repellat sunt blanditiis
            voluptatum officia odit architecto aliquam.
            </p>
            <Link to='#' className="mt-4 hover:text-blue-800 font-bold">See More</Link>
        </div>
        <div className="bg-stone-900 border text-pretty text-sm p-8 rounded hover:bg-pink-600 hover:-translate-y-2 transistion-all duration-500">
          <CgDesignmodo className="text-xl mb-4 font-bold" />
          <p className="font-bold  text-2xl mb-4 ">App Design</p>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Accusantium error nam fuga, q uibusdam veritatis nulla dolore
            facilis alias dicta excepturi libero maxime repellat sunt blanditiis
            voluptatum officia odit architecto aliquam.
            <Link to='#' className="mt-4 hover:text-blue-800 font-bold">See More</Link>
          </p>
        </div>
      </div>
      {/* <div className="text-center">
        <button className="p-2 rounded mb-4 bg-pink-700 text-white hover:bg-blue-800">
          See More
        </button>
      </div> */}
    </div>
  );
};

export default Services;
