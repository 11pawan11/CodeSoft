User
import React, { useEffect, useState } from 'react';
import { certifications } from './text';
import { GiTireIronCross } from 'react-icons/gi';
import { getDocs, collection, getFirestore } from 'firebase/firestore';


const Certification = () => {
  const [preview, setPreview] = useState(null);
  const [certificates, setCertificates] = useState([]);

  const fetchCertificates = async () => {
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, 'certificateImages'));
      const certificatesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCertificates(certificatesData);
    } catch (error) {
      console.error('Error fetching certificates:', error);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handlePreview = (image) => {
    setPreview(image);
    document.body.style.overflow = 'hidden';
  };

  const handlePreviewClose = () => {
    setPreview(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.keyCode === 27) {
        handlePreviewClose();
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  return (
    <>
      <div className="bg-black text-white justify-center">
        <div className="font-bold flex flex-wrap justify-center text-center items-center mb-4 text-4xl">
          <span>{certifications}</span>
        </div>
        <div className="bg-black grid grid-cols-1 sm:grid-cols-4 justify-center gap-4">
        {certificates.map(certificate => (
            <div key={certificate.id} className="bg-black p-4 justify-center w-full">
            <img
              key={certificate.id}
              src={certificate.imageUrl}
              alt="pic"
              className="lg:w-full md:w-1/2 sm:w-40 h-60 rounded mb-4 object-center hover:-translate-y-3 transition-all duration-700 cursor-pointer"
              onClick={() => handlePreview(certificate.imageUrl)}
            />
            </div>            
          ))}
        </div>
    
      </div>

      {preview && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center">
          <div className="bg-transparent p-4 flex justify-center items-center">
            <img
              src={preview}
              alt="preview"
              className="gap-4 w-auto h-[950px] sm:max-w-[90%] sm:max-h-[90%] md:max-w-[80%] md:max-h-[80%] lg:max-w-[70%] lg:max-h-[70%] xl:max-w-[60%] xl:max-h-[60%] object-contain"
            />
            <button className="absolute top-2 right-2 p-2 text-white bg-red-500 rounded-full" onClick={handlePreviewClose}>
              <GiTireIronCross />
            </button>
          </div>
        </div>
      )}
    </>
  );
};