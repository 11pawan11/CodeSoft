import React, { useEffect, useState } from 'react';
import { GrNext, GrPrevious } from "react-icons/gr";
import { previous, seemore, work } from './text';

const Mywork = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [displayedColumns, setDisplayedColumns] = useState(2);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault(); // Prevent default behavior of arrow keys
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault(); // Prevent default behavior of arrow keys
        handleNext();
      } else if (event.key === 'Enter') {
        setCurrentImage((prev) => nextImageIndex(prev)); // Update currentImage state with the calculated index
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentImage]);

  const nextImageIndex = (index) => {
    if (index < 0) {
      return images.length - 1;
    } else if (index >= images.length) {
      return 0;
    }
    return index;
  };

  const handleSeeMore = () => {
    if (displayedColumns < images.length) {
      setDisplayedColumns((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (displayedColumns > 2) {
      setDisplayedColumns((prev) => prev - 1);
    }
  };

  const handlePrev = () => {
    setCurrentImage((prev) => nextImageIndex(prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => nextImageIndex(prev + 1));
  };

  return (
    <>
      <div className='bg-black text-white p-4'>
        <p className='text-white text-center text-4xl p-4 sm:text-center font-bold'>{work}</p>
        <div className='grid grid-cols-1 md:grid-cols-2 justify-center gap-4 items-center'>
          {images.slice(0, displayedColumns).map((image, columnIndex) => (
            <div key={columnIndex} className='border border-pink-700'>
              <div className='main-image'>
                <img
                  src={images[currentImage]}
                  alt={`Photo ${currentImage + 1}`}
                  className='p-2 w-full h-80 object-contain'
                />
              </div>
              <div className='second-image flex p-2 gap-2 justify-center transition-all duration-700'>
                <button className='hover:' onClick={handlePrev}><GrPrevious /></button>
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className={`w-10 items-center justify-items-center hover:opacity-50 ${index === currentImage ? 'active' : ''}`}
                    onClick={() => setCurrentImage(index)} // Directly update currentImage state on click
                  />
                ))}
                <button onClick={handleNext}><GrNext/></button>
              </div>
            </div>
          ))}
        </div>
        {displayedColumns < images.length && (
          <div className="text-center p-4">
            <button className="p-2 rounded mb-4 bg-pink-700 text-white hover:bg-blue-800" onClick={handleSeeMore}>
              {seemore}
            </button>
          </div>         
        )}
        {displayedColumns > 2 && (
          <div className="text-center p-4">
            <button className="p-2 rounded mb-4 bg-pink-700 text-white hover:bg-blue-800" onClick={handlePrevious}>
              {previous}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Mywork;
