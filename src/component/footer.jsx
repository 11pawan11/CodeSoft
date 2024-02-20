import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-sm py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <p className="text-white">© 2024 Your Website</p>
          </div>
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:mr-4 mb-4 md:mb-0">
              <p className="text-gray-300">Jadibuti, Narephate, Kathmandu City</p>
              <p className="text-gray-300">Country: Nepal</p>
            </div>
            <div className="md:mr-4 mb-4 md:mb-0">
              <p className="text-gray-300">Phone: +977-986628040, 9812176317</p>
              <p className="text-gray-300">Email: pawanupreti35@gmail.com</p>
            </div>
            <div>
              <Link to="/" className="text-gray-300 hover:text-white mr-4">Home</Link>
              <Link to="/about" className="text-gray-300 hover:text-white mr-4">About</Link>
              <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
