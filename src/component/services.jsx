import React, { useEffect, useState } from "react";
import { getDocs, collection, getFirestore } from 'firebase/firestore';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, 'servicesRoutes'));
        const data = querySnapshot.docs.map(doc => doc.data());
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <div id='ServiceSection' className="bg-black text-white p-4 justify-center">
        <div className="text-white font-bold justify-center text-center text-4xl">
          <span>Services</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 p-4 md:p-10 lg:p-16">
          {services.map((service, index) => (
            <div key={index} className="">
              <div className="bg-stone-900 border border-pink-700 h-80 text-pretty text-sm p-8 rounded hover:bg-pink-600 hover:-translate-y-2 transistion-all duration-500">
              <img src={service.imageUrl} alt={service.topic} className="mt-4 w-10 h-10 rounded-md" />
                <p className="font-bold text-2xl sm:text-2xl">{service.topic}</p>
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
