import React, { useEffect, useState } from 'react';
import { GrNext, GrPrevious } from "react-icons/gr";
import { work } from './text';
import { collection, getFirestore, onSnapshot } from 'firebase/firestore';

const Mywork = () => {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const projectsPerPage = 1; // Number of projects per page
  const [currentPage, setCurrentPage] = useState(1); // Current page of projects

  useEffect(() => {
    const database = getFirestore();
    const projectsCollection = collection(database, 'projects');

    const unsubscribe = onSnapshot(projectsCollection, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projectsData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault(); // Prevent default behavior of arrow keys
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault(); // Prevent default behavior of arrow keys
        handleNext();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentProjectIndex, currentImageIndex]);

  const handlePrev = () => {
    setCurrentImageIndex(prev => prev === 0 ? projects[currentProjectIndex].images.length - 1 : prev - 1);
  };

  const handleNext = () => {
    setCurrentImageIndex(prev => (prev + 1) % projects[currentProjectIndex].images.length);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setCurrentProjectIndex((page - 1) * projectsPerPage); // Calculate current project index based on page
    setCurrentImageIndex(0); // Reset image index when changing page
  };

   // <div className='text-center'>
        //   {currentPage > 1 && (
        //     <button onClick={handlePrevious} className="text-white hover:text-gray-300 focus:outline-none p-2 bg-pink-600 rounded text-center items-center justify-center mr-2">Previous</button>
        //   )}
        //   {projects.length > currentPage * projectsPerPage && (
        //     <button onClick={handleSeeMore} className="text-white hover:text-gray-300 focus:outline-none p-2 bg-pink-600 rounded text-center items-center justify-center">See More</button>
        //   )}
        // </div>

  return (
    <div className='bg-black text-white'>
      <p className='text-white text-center text-4xl sm:text-center font-bold'>{work}</p>
      <div className='justify-center bg-black gap-4 items-center'>
        {projects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage).map((project, projectIndex) => (
          <div key={project.id} className="bg-black p-6 rounded-lg">
            <div className="bg-black grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className='border border-pink-700 rounded-sm'>
                <div className='main-image bg-black'>
                  <img
                    src={project.images[currentImageIndex].imageUrl}
                    alt={`Photo ${currentImageIndex + 1}`}
                    className='p-2 w-full h-80 object-contain'
                  />
                </div>
                <div className='second-image flex p-2 gap-2 justify-center transition-all duration-700'>
                  <button onClick={handlePrev}><GrPrevious /></button>
                  {project.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.imageUrl}
                      alt={`T ${index + 1}`}
                      className={`w-[60px]  items-center justify-items-center hover:opacity-50 ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                  <button onClick={handleNext}><GrNext /></button>
                </div>
              </div>
              <div className="flex bg-black">
                <div>
                  <h3 className="text-xl font-semibold">{project.name}</h3>
                  <p className='text-[10px] p-1 text-justify'>{project.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Pagination */}
        <div className='text-center'>
          {Array.from({ length: Math.ceil(projects.length / projectsPerPage) }).map((_, index) => (
            <button key={index} onClick={() => handlePageChange(index + 1)} className={`text-white hover:text-gray-500 focus:outline-none p-2 bg-pink-600 rounded text-center items-center justify-center mb-10 ${currentPage === index + 1 ? 'bg-gray-950 border' : ''}`}><span className=''>{index + 1}</span></button>
          ))}
        </div>

       
      </div>
    </div>
  );
};

export default Mywork;
