import React, { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, getFirestore, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import storage related functions
import { storage } from '../../../firebase/firebase';

const db = getFirestore();

const initialServices = [
  {
    id: 1,
    label: 'Topic',
    state: 'topic',
    type: 'text'
  },
  {
    id: 2,
    label: 'Subtopic',
    state: 'subtopic',
    type: 'text'
  },
  {
    id: 3,
    label: 'Path',
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
      setServiceData(prevState => ({
        ...prevState,
        [stateKey]: e.target.files[0]
      }));
    } else {
      const { value } = e.target;
      setServiceData(prevState => ({
        ...prevState,
        [stateKey]: value
      }));
    }
  };

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

  
  const handleEdit = async (id) => {
    try {
      setFetchedServices(prevState =>
        prevState.map(service =>
          service.id === id ? { ...service, editable: !service.editable } : service
        )
      );
      console.log('Editable toggled successfully!');
    } catch (error) {
      console.error('Error toggling editable:', error);
    }
  };

  const handleSave = async (id) => {
    try {
      const serviceRef = doc(db, 'servicesRoutes', id);
      await updateDoc(serviceRef, fetchedServices.find(service => service.id === id));
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
    <div className=" p-2 text-sm overflow-hidden w-fit">
      <h2 className="text-3xl font-semibold mb-8">Add Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {initialServices.map(service => (
          <div key={service.id}>
            <label htmlFor={service.state} className="block text-lg text-gray-700 mb-1">{service.label}:</label>
            {service.type === 'file' ? (
              <input 
                type={service.type}
                id={service.state}
                onChange={(e) => handleChange(e, service.state)}
                required 
                className=" border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            ) : (
              <input 
                type={service.type}
                id={service.state}
                value={serviceData[service.state]}
                onChange={(e) => handleChange(e, service.state)}
                required 
                className="w-fit border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            )}
          </div>
        ))}
        <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Submit
        </button>
      </form>

      <div className="mt-12 text-sm">
        <h2 className="text-3xl font-semibold mb-6">Fetched Services</h2>
        <ul>
          {fetchedServices.map(service => (
            <li key={service.id} className="mb-8">
              <p className="text-sm  font-semibold">Topic: {service.editable ? <input type="text" value={service.topic} onChange={(e) => handleChange(e, 'topic', service.id)} className="p-2  border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" /> : service.topic}</p>
              <p className="text-sm">Subtopic: {service.editable ? <input type="text" value={service.subtopic} onChange={(e) => handleChange(e, 'subtopic', service.id)} className="p-2 space-y-10 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" /> : service.subtopic}</p>
              <p className="text-sm">Path: {service.editable ? <input type="text" value={service.path} onChange={(e) => handleChange(e, 'path', service.id)} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" /> : service.path}</p>
              <p className="text-sm">Image URL: {service.editable ? <input type="text" value={service.imageUrl} onChange={(e) => handleChange(e, 'imageUrl', service.id)} className="p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" /> : service.imageUrl}</p>
              <div className="flex mt-4">
                {service.editable ? (
                  <button className="bg-green-500 text-white py-2 px-4 rounded-md mr-4 hover:bg-green-600 focus:outline-none focus:bg-green-600" onClick={() => handleSave(service.id)}>Save</button>
                ) : (
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600" onClick={() => handleEdit(service.id)}>Edit</button>
                )}
                <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600" onClick={() => handleDelete(service.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddService;
