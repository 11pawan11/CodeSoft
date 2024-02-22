import React, { useEffect, useState } from 'react';
import { GrNext, GrPrevious } from "react-icons/gr";

const Mywork = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [displayedColumns, setDisplayedColumns] = useState(2); // Initial value set to 1
  const [animateScroll, setAnimateScroll] = useState(false); // State to trigger scroll animation

  const [myWorkVisible, setMyWorkVisible] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (myWorkVisible) {
        if (event.key === 'ArrowLeft') {
          handlePrev();
        } else if (event.key === 'ArrowRight') {
          handleNext();
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [myWorkVisible]);


  const handleImageView = (index) => {
    setAnimateScroll(true); // Trigger scroll animation when image changes
    setCurrentImage(index);
  };

  const handleSeeMore = () => {
    if (displayedColumns < images.length) {
      setDisplayedColumns((prev) => prev + 1); // Increment the number of displayed columns
    }
  };

  const handlePrevious = () => {
    if (displayedColumns > 2) {
      setDisplayedColumns((prev) => prev - 1); // Decrement the number of displayed columns
    }
  };

  const handlePrev = () =>{
    setCurrentImage((prev) => prev === 0 ? images.length - 1 : prev - 1  );
    setAnimateScroll(true);
  }

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setAnimateScroll(true);
  }

  return (
    <>
      <div className='bg-black text-white p-4'>
        <p className='text-white text-center text-4xl p-4 sm:text-center font-bold'>My Work</p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
          {images.slice(0, displayedColumns).map((image, columnIndex) => (
            <div key={columnIndex} className='border border-pink-700'>
              <div className='main-image'>
                <img
                  src={images[currentImage]}
                  alt={`Photo ${currentImage + 1}`}
                  className={`p-2 w-full h-80 object-contain ${animateScroll ? 'scroll-animation' : ''}`}
                  onAnimationEnd={() => setAnimateScroll(false)} // Reset animateScroll after animation completes
                />
              </div>
              <div className='second-image flex p-2 gap-2 justify-center transition-all duration-700'>
                <button className='hover:' onClick={handlePrev}><GrPrevious /></button>
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-20 h-20 items-center justify-items-center hover:opacity-50 ${index === currentImage ? 'active' : ''}`}
                    onClick={() => handleImageView(index)}
                  />
                ))}
                <button onClick={handleNext}><GrNext/></button>
              </div>
            </div>
          ))}
        </div>
        {displayedColumns < images.length && ( // Render the "See More" button only if there are more columns to display
           <div className="text-center p-4">
            <button className="p-2 rounded mb-4 bg-pink-700 text-white hover:bg-blue-800" onClick={handleSeeMore}>
              See More
            </button>
          </div>         
        )}
          {displayedColumns > 2 && ( // Render the "Previous" button only if there are more than 2 columns displayed
          <div className="text-center p-4">
            <button className="p-2 rounded mb-4 bg-pink-700 text-white hover:bg-blue-800" onClick={handlePrevious}>
              Previous
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Mywork;
