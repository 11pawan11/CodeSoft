import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { useImage } from "../../../component/conext api/imageContext";
import { useToaster } from "../../../component/conext api/toast";

const AddImage = () => {
  const { updateImageUrl } = useImage();
  const [image, setImage] = useState(null);
  const {showToast} = useToaster();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleImageUpload = () => {
    try
    {
    if (!image) return;

    const storage = getStorage();
    const storageRef = ref(storage , "images/"); // Create a reference to the storage

    const imageRef = ref(storageRef, image.name); // Create a reference to the file

    uploadBytes(imageRef, image).then(() => {
      getDownloadURL(imageRef).then((url) => {
        const database = getFirestore();
        const aboutRef = doc(database, 'about', 'aboutImage'); // Replace "your_document_id" with the actual document ID

        // Update the about section in the database with the new image URL
        updateDoc(aboutRef, { imageUrl: url });

        // Update the context with the new image URL
        updateImageUrl(url);
            });
    });
    showToast("Images Updated Sucessfully");
  }
  catch(error){
    showToast(error,"","red");
  }
  };

  return (
    <>
    <p className="text-xl p-2 font-bold text-gray-900 dark:text-white">Change About Section Image</p>
    <div className="flex w-full gap-2 p-2 flex-wrap text-sm ">
      <input type="file" className="" onChange={handleImageChange} />
      <button className="p-1 text-center items-center text-sm text-white bg-slate-700 dark:bg-slate-800 dark:hover:bg-gray-900 hover:bg-gray-900 rounded" onClick={handleImageUpload}>Upload Image</button>
    </div>
    </> 
  );
};

export default AddImage;
