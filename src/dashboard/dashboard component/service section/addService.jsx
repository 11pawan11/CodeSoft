import React, { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, getFirestore, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ServiceDescription, ServiceHeaderName, ServiceImage, ServiceLinks, ServicePreviewSection, addService, browse, deleted, drag, edit, save, submits, uploadImages } from '../../../component/text';
import { useToaster } from '../../../component/conext api/toast';
import { FaTimes } from 'react-icons/fa';
import { storage } from '../profile section/myaccount';

const db = getFirestore();

const initialServices = [
  {
    id: 1,
    label: 'Service Name',
    state: 'topic',
    type: 'text'
  },
  {
    id: 2,
    label: 'Service Description',
    state: 'subtopic',
    type: 'text'
  },
  {
    id: 3,
    label: 'Attach Link',
    state: 'path',
    type: 'text'
  },
  {
    id: 4,
    label: 'Image',
    state: 'image',
    type: 'file'
  }
];

const AddService = () => {
  const {showToast} = useToaster();
  const [serviceData, setServiceData] = useState({
    topic: '',
    subtopic: '',
    path: '',
    image: null,
    imageUrl: ''
  });
  const [fetchedServices, setFetchedServices] = useState([]);

  // Upload image to Firebase Storage
  const uploadImage = async (image) => {
    try {
      const storageRef = ref(storage, 'serviceImages/' + image.name);
      await uploadBytes(storageRef, image);
      return getDownloadURL(storageRef);
    } catch (error) {
      showToast(`Error uploading project: ${error}`, "", "red");
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImage(serviceData.image);

      await addDoc(collection(db, 'servicesRoutes'), {
        topic: serviceData.topic,
        subtopic: serviceData.subtopic,
        path: serviceData.path,
        imageUrl: imageUrl
      });

      setServiceData({ topic: '', subtopic: '', path: '', image: null });
      showToast('Data added successfully!');
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'servicesRoutes'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), editable: false }));
        setFetchedServices(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Update service data
  const handleSave = async (id) => {
    try {
      const serviceToUpdate = fetchedServices.find(service => service.id === id);
      const serviceRef = doc(db, 'servicesRoutes', id);
      await updateDoc(serviceRef, serviceToUpdate);
      showToast('Data updated successfully!');
      setFetchedServices(prevState =>
        prevState.map(service =>
          service.id === id ? { ...service, editable: false } : service
        )
      );
    } catch (error) {
      showToast(`Error uploading project: ${error}`, "", "red");
    }
  };

  // Handle input change
  const handleChange = (e, stateKey, id) => {
    if (stateKey === 'image') {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setFetchedServices(prevState =>
        prevState.map(service =>
          service.id === id ? { ...service, imageUrl: imageUrl, image: e.target.files[0] } : service
        )
      );
    } else {
      const { value } = e.target;
      setFetchedServices(prevState =>
        prevState.map(service =>
          service.id === id ? { ...service, [stateKey]: value } : service
        )
      );
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const selectedImagesArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setServiceData(selectedImagesArray);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleEdit = (id) => {
    setFetchedServices(prevState =>
      prevState.map(service =>
        service.id === id ? { ...service, editable: !service.editable } : service
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'servicesRoutes', id));
      showToast('Data deleted successfully!');
    } catch (error) {
      showToast(`Error deleting project: ${error}`, "", "red");
    }
  }; 

  return (
    <div className=" text-sm overflow-hidden border w-full p-2 ">
      <h2 className="text-3xl font-semibold mb-8">{addService}</h2>
      <form onSubmit={handleSubmit} className="p-1 rounded border border-gray-400 space-y-4 text-sm dark:text-white">
        {initialServices.map(service => (
          <div key={service.id}>
            <label htmlFor={service.state} className="block text-lg dark:text-white mb-1 ">{service.label}</label>
            {service.type === 'file' ? (
              <div className="flex flex-col items-center justify-center ">
              <label
                  htmlFor={service.state}
                  className="bg-blue-500  dark:bg-gray-800 dark:hover:bg-slate-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                  <svg className="w-6 h-6 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M12 4v16m8-8H4"></path>
                  </svg>{uploadImages}
              </label>
              <input
                type={service.type}
                id={service.state}
                onChange={(e) => setServiceData(prevState => ({ ...prevState, [service.state]: e.target.files[0] }))}
                required 
                className="hidden"
              />    
              <div
                  className="mt-8 border border-dashed border-gray-400 rounded-md p-8"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
              >
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M12 4v16m8-8H4"></path>
                  </svg>
                  <p className="text-gray-600 text-center dark:text-white">{drag}<br />{browse}</p>
              </div>
  
              
              {serviceData.image && serviceData.image.name && (
                <div className="flex flex-wrap mt-8">
              <img src={serviceData.image.name} alt='Selected Photo' className='border h-20 w-20 '/>
              <button
               className="absolute ml-[65px] mt-[0.5px] text-white bg-black rounded-full transisiton-all duration-500 ease-in hover:scale-110"
              onClick={() => setServiceData(prevState => ({ ...prevState, imageUrl: '', image: null }))}>
            <FaTimes/>
            </button>
              </div>
              )}
          </div>
              
            ) : (
              <textarea 
                rows={2}
                cols={80}
                type={service.type}
                id={service.state}
                value={serviceData[service.state]}
                onChange={(e) => setServiceData(prevState => ({ ...prevState, [service.state]: e.target.value }))}
                required 
                className="w-full border dark:bg-slate-500 dark:border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            )}
          </div>
        ))}
              <div className='text-center'> 
                <button type="submit" className="bg-blue-500 mb-2 dark:bg-gray-800 dark:hover:bg-slate-700 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                {submits}
              </button>
              </div>
       
      </form>

      <div className="mt-12 dark:bg-slate-500 text-sm border p-1 border-gray-400">
        <h2 className="text-3xl font-semibold mb-6">{ServicePreviewSection}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {fetchedServices.map(service => (
            <div key={service.id} className="bg-white dark:border dark:bg-slate-500 overflow-hidden shadow-md rounded-lg p-4">
              <p className="text-sm font-semibold mb-1">{ServiceHeaderName}</p>
              {service.editable ? (
                <input
                  type="text"
                  value={service.topic}
                  onChange={(e) => handleChange(e, 'topic', service.id)}
                  className="p-2 border border-gray-300 dark:bg-gray-700 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">{service.topic}</p>
              )}
              <p className="text-sm font-semibold mb-1 ">{ServiceDescription}:</p>
              {service.editable ? (
                <input
                  type="text"
                  value={service.subtopic}
                  onChange={(e) => handleChange(e, 'subtopic', service.id)}
                  className="p-2 border border-gray-300 rounded-md dark:bg-gray-700 w-full focus:outline-none focus:border-blue-500"
                />
              ) : ( 
                <p className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">{service.subtopic}</p>
              )}
              <p className="text-sm font-semibold mb-1">{ServiceLinks}</p>
              {service.editable ? (
                <input
                  type="text"
                  value={service.path}
                  onChange={(e) => handleChange(e, 'path', service.id)}
                  className="p-2 border border-gray-300 dark:bg-gray-700 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">{service.path}</p>
              )}
              <p className="text-sm font-semibold mb-1">{ServiceImage}</p>
              {service.editable ? (
                <input
                  type='file'
                  onChange={(e) => handleChange(e, service.state)}
                  className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              ) : (
                <div className="flex flex-col">
                  <img src={service.imageUrl} alt='Selected Photo' className='border h-20 w-20 '/>
                  <p className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">{service.imageUrl}</p>
                </div>
              )}
              <div className="flex justify-end mt-4">
                {service.editable ? (
                  <button className="bg-green-500 text-white py-2 px-4 rounded-md mr-4 hover:bg-green-600 focus:outline-none dark:bg-gray-800 dark:hover:bg-slate-700 focus:bg-green-600" onClick={() => handleSave(service.id)}>{save}</button>
                ) : (
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600 dark:bg-gray-800 dark:hover:bg-slate-700" onClick={() => handleEdit(service.id)}>{edit}</button>
                )}
                <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 dark:bg-gray-800 dark:hover:bg-slate-700" onClick={() => handleDelete(service.id)}>{deleted}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddService;
