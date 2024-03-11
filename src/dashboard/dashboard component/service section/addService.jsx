import React, { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, getFirestore, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import storage related functions
import { storage } from '../../../firebase/firebase';
import { ServiceDescription, ServiceHeaderName, ServiceImage, ServiceLinks, ServicePreviewSection, addService, deleted, edit, save, submits } from '../../../component/text';

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
    label: 'Links',
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
  const [serviceData, setServiceData] = useState({
    topic: '',
    subtopic: '',
    path: '',
    image: null,
    imageUrl: '' // Add imageUrl to the state
  });
  const [fetchedServices, setFetchedServices] = useState([]);

  const handleChange = (e, stateKey, id) => {
    if (stateKey === 'image') {
      const imageUrl = URL.createObjectURL(e.target.files[0]); // Get the URL of the selected file
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
  

// Update the handleSubmit function to upload the image and update Firestore
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Upload the image to Firebase Storage
    const imageUrl = await uploadImage(serviceData.image);

    // Add document to Firestore with the image URL
    await addDoc(collection(db, 'servicesRoutes'), {
      topic: serviceData.topic,
      subtopic: serviceData.subtopic,
      path: serviceData.path,
      imageUrl: imageUrl  // Store the image URL in Firestore
    });

    // Clear the form fields after submission
    setServiceData({ topic: '', subtopic: '', path: '', image: null });
    console.log('Data added successfully!');
  } catch (error) {
    console.error('Error adding data:', error);
  }
};

// Add a new function to handle uploading the image to Firebase Storage
const uploadImage = async (image) => {
  try {
    const storageRef = ref(storage, 'serviceImages/' + image.name);
    await uploadBytes(storageRef, image);
    return getDownloadURL(storageRef);
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

  
  const handleEdit = (id) => {
    setFetchedServices(prevState =>
      prevState.map(service =>
        service.id === id ? { ...service, editable: !service.editable } : service
      )
    );
  };

  const handleSave = async (id) => {
    try {
      const serviceToUpdate = fetchedServices.find(service => service.id === id);
  
      // Update the Firestore document with the updated service data
      const serviceRef = doc(db, 'servicesRoutes', id);
      await updateDoc(serviceRef, serviceToUpdate);
      console.log('Data updated successfully!');
  
      // Toggle editable back to false after saving changes
      setFetchedServices(prevState =>
        prevState.map(service =>
          service.id === id ? { ...service, editable: false } : service
        )
      );
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  
    

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'servicesRoutes', id));
      console.log('Data deleted successfully!');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

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

  return (
    <div className=" text-sm overflow-hidden w-full p-2 ">
      <h2 className="text-3xl font-semibold mb-8">{addService}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        {initialServices.map(service => (
          <div key={service.id}>
            <label htmlFor={service.state} className="block text-lg text-gray-700 mb-1">{service.label}:</label>
            {service.type === 'file' ? (
              <input
                type={service.type}
                id={service.state}
                onChange={(e) => setServiceData(prevState => ({ ...prevState, [service.state]: e.target.files[0] }))}
                required 
                className="border border-gray-300 dark:bg-slate-500 dark:border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <textarea 
                rows={2}
                cols={80}
                type={service.type}
                id={service.state}
                value={serviceData[service.state]}
                onChange={(e) => setServiceData(prevState => ({ ...prevState, [service.state]: e.target.value }))}
                required 
                className="w-fit border dark:bg-slate-500 dark:border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            )}
          </div>
        ))}
        <button type="submit" className="bg-blue-500 dark:bg-gray-800 dark:hover:bg-slate-700 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          {submits}
        </button>
      </form>

      <div className="mt-12 dark:bg-slate-500 text-sm">
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
                  className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">{service.topic}</p>
              )}
              <p className="text-sm font-semibold mb-1">{ServiceDescription}:</p>
              {service.editable ? (
                <input
                  type="text"
                  value={service.subtopic}
                  onChange={(e) => handleChange(e, 'subtopic', service.id)}
                  className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
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
                  className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">{service.path}</p>
              )}
              <p className="text-sm font-semibold mb-1">{ServiceImage}</p>
              {service.editable ? (
                <input
                  type="file"
                  // value={service.imageUrl}
                  onChange={(e) => handleChange(e, 'imageUrl', service.id)}
                  className="p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">{service.imageUrl}
                <img src={service.imageUrl} alt='test' className='h-20 w-20 '/></p>
              )}
              <div className="flex justify-end mt-4">
                {service.editable ? (
                  <button className="bg-green-500 text-white py-2 px-4 rounded-md mr-4 hover:bg-green-600 focus:outline-nonedark:bg-gray-800 dark:hover:bg-slate-700 focus:bg-green-600" onClick={() => handleSave(service.id)}>{save}</button>
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
