import { useState, useEffect } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../../firebase/firebase';

const AddCertificate = () => {
  const [image, setImage] = useState(null);
  const [certificates, setCertificates] = useState([]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload the image to Firebase Storage
      const storageRef = ref(storage, 'certificateImages/' + image.name);
      await uploadBytes(storageRef, image);

      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);

      // Add document to Firestore with the image URL
      const db = getFirestore();
      await addDoc(collection(db, 'certificateImages'), {
        imageUrl: imageUrl
      });

      // Clear the file input field after submission
      setImage(null);
      console.log('Image uploaded successfully!');
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

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

  const handleDelete = async (certificateId, imageUrl) => {
    try {
      // Delete document from Firestore
      const db = getFirestore();
      await deleteDoc(doc(db, 'certificateImages', certificateId));

      // Delete image from Firebase Storage
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);

      // Fetch updated certificates after deletion
      fetchCertificates();
      console.log('Certificate deleted successfully!');
    } catch (error) {
      console.error('Error deleting certificate:', error);
    }
  };

  return (
    <div className="text-sm overflow-hidden w-full p-2">
      <h2 className="text-3xl font-semibold mb-8">Upload Image</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <div>
          <label htmlFor="image" className="block text-lg text-gray-700 mb-1">Choose Image:</label>
          <input
            type="file"
            id="image"
            onChange={handleChange}
            required
            className="border border-gray-300 dark:bg-slate-500 dark:border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 dark:bg-gray-800 dark:hover:bg-slate-700 text-white py-3 px-6 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Upload
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">Uploaded Certificates</h2>
        <div className="grid grid-cols-3 gap-4">
          {certificates.map(certificate => (
            <div key={certificate.id} className="bg-gray-200 p-4 relative">
              <img src={certificate.imageUrl} alt="Certificate" className="w-full" />
              <button
                onClick={() => handleDelete(certificate.id, certificate.imageUrl)}
                className="absolute top-2 right-2 p-2 bg-red-500 rounded-full text-white"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddCertificate;
