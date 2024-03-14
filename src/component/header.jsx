import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Import FaTimes for close icon
import { Mine, country, position } from "./text";

export const TypeWriter = ({ text, delay }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return <span>{currentText}</span>
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 70; // Adjust this value as needed
      const offsetPosition = element.offsetTop - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="overflow-hidden bg-black">
      <div className="FixedImage">
        <nav className=" bg-black text-white  font-semibold -mx-4 h-10 top-0 flex justify-between items-center fixed w-full ">
          <div className="flex items-center">
            <Link to="/">
              <img
                src="/pawan_logo.png"
                id="HomeSection"
                alt="Logo"
                className="h-40 mt-24 rounded-full"
              />
            </Link>
          </div>
          <button
            className="sm:hidden text-white absolute top-6 right-0"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "" : <FaBars />}
          </button>
          <ul className="hidden sm:flex space-x-6">
            <li
              className={`about ${
                activeSection === "HomeSection" ? "about" : ""
              }`}
            >
              <Link
                to="#"
                onClick={() => {
                  scrollTo("HomeSection");
                  setActiveSection("HomeSection");
                  closeMenu();
                }}
              >
                <span>Home</span>
              </Link>
            </li>
            <li
              className={`about ${
                activeSection === "AboutSection" ? "about" : ""
              }`}
            >
              <Link
                to="#"
                onClick={() => {
                  scrollTo("AboutSection");
                  setActiveSection("AboutSection");
                  closeMenu();
                }}
              >
                <span>About</span>
              </Link>
            </li>
            <li
              className={`about ${
                activeSection === "ServiceSection" ? "about" : ""
              }`}
            >
              <Link
                to="#"
                onClick={() => {
                  scrollTo("ServiceSection");
                  setActiveSection("ServiceSection");
                  closeMenu();
                }}
              >
                <span>Services</span>
              </Link>
            </li>
            <li
              className={`about ${
                activeSection === "ContactSection" ? "about" : ""
              }`}
            >
              <Link
                to="#"
                onClick={() => {
                  scrollTo("ContactSection");
                  setActiveSection("ContactSection");
                  closeMenu();
                }}
              >
                <span>Contact</span>
              </Link>
            </li>
          </ul>
        </nav>
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50">
            <div className="flex justify-end p-4">
              <button className="text-white" onClick={toggleMenu}>
                <FaTimes />
              </button>
            </div>
            <ul className="text-center text-white">
              <li
                className={`about ${
                  activeSection === "HomeSection" ? "about" : ""
                }`}
              >
                <Link
                  to="#"
                  onClick={() => {
                    scrollTo("HomeSection");
                    setActiveSection("HomeSection");
                    closeMenu();
                  }}
                >
                  <span>Home</span>
                </Link>
              </li>
              <li className="about">
                <Link
                  to="#"
                  onClick={() => {
                    scrollTo("AboutSection");
                    closeMenu();
                  }}
                >
                  <span>About</span>
                </Link>
              </li>
              <li className="about">
                <Link
                  to="#"
                  onClick={() => {
                    scrollTo("ServiceSection");
                    closeMenu();
                  }}
                >
                  <span>Services</span>
                </Link>
              </li>
              <li className="about">
                <Link
                  to="#"
                  onClick={() => {
                    scrollTo("ContactSection");
                    closeMenu();
                  }}
                >
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>
        )}
        <div className="ml-10 pt-40">
          <h1 className="font-bold text-white text-6xl mb-4">
           {Mine}
          </h1>
          <p className="text-white text-6xl font-bold mb-4">
            from{" "}
            <span className="font-bold text-pink-700 text-6xl pasa">{country}</span>
          </p>
          <p className="font-semibold text-white text-lg sm:text-2xl transition-all duration-1000 hover:text-pink-800">
             <TypeWriter text={position} delay={100} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
