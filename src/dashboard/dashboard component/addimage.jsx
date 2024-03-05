import { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useImage } from '../../component/conext api/imageContext';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const AddImage = () => {
  const { setImage } = useImage();
  const storage = getStorage();
  const db = getFirestore();
  const [selectImage, setSelectedImage] = useState(null);

  // Function to fetch the image URL from Firestore
  const fetchImageUrlFromFirestore = async () => {
    const docRef = doc(db, 'images', 'aboutImage');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const imageUrl = docSnap.data().imageUrl;
      setImage(imageUrl);
      console.log("add image", imageUrl) // Update the image URL in the context
    }
  };

  useEffect(() => {
    fetchImageUrlFromFirestore(); // Fetch the image URL from Firestore when the component mounts
  }, []); // Run only once when the component mounts

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectImage) {
      console.log("Not selected");
      return;
    }

    const storageRef = ref(storage, `images/${selectImage.name}`);
    await uploadBytes(storageRef, selectImage);
    console.log('Image uploaded successfully');

    const newStorageRef = ref(storage, `images/${selectImage.name}`);
    const url = await getDownloadURL(newStorageRef);
    
    // Update the image URL in Firestore
    const docRef = doc(db, 'images', 'aboutImage');
    await setDoc(docRef, { imageUrl: url });

    // Update the image URL in the context
    setImage(url);
    setSelectedImage(null);
    console.log("test after update",url)

  };

  return (
    <div className='flex flex-wrap justify-center items-center'>
      <input type='file' onChange={handleImageChange} className='my-2' />
      <button className='p-2 bg-gray-600 text-white rounded dark:bg-black' onClick={handleImageUpload}>Update</button>
    </div>
  );
};

export default AddImage;
