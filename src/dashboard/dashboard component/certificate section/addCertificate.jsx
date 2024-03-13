import { useState, useEffect } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { UploadCerti, browse, chooseImage, deleted, drag, uploadImages, uploadNow } from '../../../component/text';
import { useToaster } from '../../../component/conext api/toast';
import { FaImage, FaPlus, FaTimes, FaTrash } from 'react-icons/fa';
import { storage } from '../../../firebase/initialStart';

const AddCertificate = () => {
  const [image, setImage] = useState(null);
  const [certificates, setCertificates] = useState([]);
  const {showToast} = useToaster();

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
      fetchCertificates();

      // Clear the file input field after submission
      setImage(null);
      const fileInput = document.getElementById("imageUpload");
        fileInput.value = "";

      showToast('Image uploaded successfully!');
    } catch (error) {
      showToast(`Error uploading image ${error}`,"","red");
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
      setImage(null);
      showToast('File deleted successfully!', "","red");
    } catch (error) {
      showToast(`Error deleting certificate: ${error}`,"","red");
    }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const selectedImagesArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImage(selectedImagesArray);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCloseImage = () => {
    setImage(null); // Deselect image
  };

  return (
    <div className="text-sm overflow-hidden w-full p-2">
      <h2 className="text-3xl font-semibold mb-8">{uploadImages}</h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">

      <div className="block  items-center ">
      <label
          htmlFor="imageUpload"
         className="bg-blue-500 gap-2 items-center dark:bg-gray-800 dark:hover:bg-slate-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded cursor-pointer w-fit"
      >
         <FaImage className='inline-block mr-2 items-center text-lg '/> {chooseImage}
      </label>
      <input
        type='file'
        id="imageUpload"
        onChange={handleChange}
        required 
        className="hidden "
      />    
      <div
          className="mt-8 border w-full text-lg border-dashed border-gray-400 rounded-md p-8"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
      >
      <FaPlus className='mx-auto text-3xl text-gray-400'/>
      <p className="text-gray-600 text-center dark:text-white">{drag}<br/>{browse}</p>
      </div>

      
      {image && (
        <div className="flex flex-wrap mt-8">
      <img src={image.name} alt='Selected Photo' className='border h-20 w-20 '/>
      <button
       className="absolute ml-[65px] mt-[0.5px] text-white bg-black rounded-full transisiton-all duration-500 ease-in hover:scale-110" 
       onClick={handleCloseImage}>
    <FaTimes/>
    </button>
      </div>
      )}
  </div>
       
        <button
          type="submit"
          className="bg-blue-500 dark:bg-gray-800 hover:bg-blue-800 dark:hover:bg-slate-700 text-white p-2 font-bold w-40 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          {uploadNow}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-3xl font-semibold mb-4">{UploadCerti}</h2>
        <div className="grid grid-cols-3 gap-4">
          {certificates.map(certificate => (
            <div key={certificate.id} className="bg-slate-300 rounded dark:bg-gray-700 p-2 relative">
              <img src={certificate.imageUrl} alt="Certificate" className="w-fit h-40 dark:hover:" />
              <button
                onClick={() => handleDelete(certificate.id, certificate.imageUrl)}
                className="absolute top-0 right-0 p-3 hover:text-red-600  text-red-500 rounded-full dark:text-gray-700"
              >
                <FaTrash/>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddCertificate;
