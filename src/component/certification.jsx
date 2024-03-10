import React, { useEffect, useState } from 'react';
import { certifications } from './text';
import { GiTireIronCross } from "react-icons/gi";

const Certification = () => {
    const imageList = [
        '/offer_letter.jpg',
        '/devops.jpg',
        '/Reactjs.jpg',
        '/ethical.jpg'
    ];
    const [preview, setPreview] = useState(null);

    const handlePreview = (image) => {
        setPreview(image);
        document.body.style.overflow = 'hidden';
    };

    const handlePreviewClose = () => {
        setPreview(null);
        document.body.style.overflow = 'auto';
    };

    useEffect (() => {
        const handleEscKey = (event) => {
            if (event.keyCode === 27){
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
            <div className='bg-black text-white justify-center'>
                <div className='font-bold justify-center text-center items-center mb-4 text-4xl'>
                    <span>{certifications}</span>
                </div>
                <div className='flex flex-wrap justify-center gap-4'>
                    {imageList.map((image, index) => (
                        <img key={index} src={image} alt="pic" className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 h-60 rounded mb-4 object-center hover:-translate-y-3 transition-all duration-700 cursor-pointer' onClick={() => handlePreview(image)} />
                    ))}
                </div>
            </div>

            {preview && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center">
                    <div className="bg-transparent p-4 flex justify-center items-center">
                        <img src={preview} alt="preview" className=" gap-4 w-auto h-[950px] sm:max-w-[90%] sm:max-h-[90%] md:max-w-[80%] md:max-h-[80%] lg:max-w-[70%] lg:max-h-[70%] xl:max-w-[60%] xl:max-h-[60%] object-contain" />
                        <button className="absolute top-2 right-2 p-2 text-white bg-red-500 rounded-full" onClick={handlePreviewClose}><GiTireIronCross/></button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Certification;