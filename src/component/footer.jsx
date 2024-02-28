import React from "react";
import { Link } from "react-router-dom";
import { LiaCopyrightSolid } from "react-icons/lia";
import {
  MyName,
  contact,
  contactForm,
  copyRight,
  downloadCv,
  email,
  phoneno,
  sendMessage,
} from "./text";

const Footer = () => {

  const handleDownload = () => {
    const cvFile = "/pawancv.pdf";
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'pawancv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }; 

  return (
    <footer id="ContactSection" className="bg-transparent text-sm ">
      <div className="text-center text-white text-3xl py-4">
        <span className="font-bold">{contact}</span>
      </div>

      <div className=" p-2 grid grid-cols-1 md:grid-cols-2 lg:mx-40 ">
        <div className="space-y-4 text-center text-white mb-4 lg:mx-10">
          <span className="text-white text-xl font-semibold rounded">
            {contactForm}
          </span>
          <input
            type="text"
            placeholder="Your Name"
            className="p-2 w-full md:w-3/4 bg-stone-900 rounded block mx-auto"
          />
          <input
            type="text"
            placeholder="Your Email"
            className="p-2 w-full md:w-3/4 bg-stone-900 rounded block mx-auto"
          />
          <textarea
            id="textareaField"
            name="textareaField"
            className="w-full md:w-3/4 bg-stone-900 p-2 rounded-md block py-2 mx-auto"
            rows="5"
            placeholder="Enter your message..."
          ></textarea>
          <button className="border border-pink-800 text-white p-2 text-sm rounded w-full md:w-auto  hover:bg-pink-700 mx-auto">
            {sendMessage}
          </button>
        </div>
        <div className="text-white mt-8 lg:mx-20">
          <div className="space-y-2 mx-auto">
            <a
              href="mailto:pawanupreti35@gmail.com"
              className="flex items-center gap-4 mx-auto"
            >
              <img
                src={"/gmail.svg"}
                alt="gmail"
                className="w-5 h-5 rounded-full items-center flex"
              />
              <span className="items-center font-semibold text-white">{email}</span>
            </a>

            <Link to="tel:+977-9866284088" className="flex font-semibold items-center gap-4 ">
              <img
                src={"/phone.png"}
                alt="gmail"
                className="w-5 h-5 rounded-full items-center flex"
              />
              <span className="items-center">{phoneno}</span>
            </Link>
            <button onClick={handleDownload} className="p-2 text-white text-center border w-full md:w-auto border-pink-900 rounded  hover:bg-pink-700">
              {downloadCv}
            </button>
          </div>
        </div>
      </div>
      <hr className="border-b border-stone-800" />

      <div className="items-center justify-center mt-2">
        <ul className="flex items-center space-x-4 justify-center ">
          <li>
            <Link to="#">
              <img
                src={"/fb.svg"}
                alt="fb"
                className="w-8 h-8 hover:border-pink-600 hover:border-4 rounded-full"
              />
            </Link>
          </li>
          <li>
            <Link to="#">
              <img
                src={"/linkedin.svg"}
                alt="ld"
                className="w-10 h-10 hover:border-pink-600 hover:border-4 rounded-full"
              />
            </Link>
          </li>
          <li>
            <Link to="#">
              <img
                src={"/telegram.svg"}
                alt="telegram"
                className="w-9 h-9  hover:border-pink-600 hover:border-4 rounded-full"
              />
            </Link>
          </li>
          <li>
            <Link to="#">
              <img
                src={"/gmail.svg"}
                alt="gmail"
                className="w-9 h-9  hover:border-pink-600 hover:border-4 rounded-full"
              />
            </Link>
          </li>
        </ul>
      </div>
      <hr className="border-b border-stone-800" />
      <p className="text-white text-center flex justify-center items-center gap-1 text-xs py-2">
        <LiaCopyrightSolid className="text-lg" /> {copyRight}
        <span className="font-semibold hover:text-pink-700">{MyName}</span>
      </p>
    </footer>
  );
};

export default Footer;
