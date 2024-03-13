import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { useImage } from "../../../component/conext api/imageContext";
import { useToaster } from "../../../component/conext api/toast";
import { ChangeImage, browse, drag, updateNow, uploadImages } from "../../../component/text";
import { FaTimes } from "react-icons/fa";

const AddImage = () => {
  const { updateImageUrl } = useImage();
  const [image, setImage] = useState(null);
  const { showToast } = useToaster();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleImageUpload = () => {
    try {
      if (!image) return;

      const storage = getStorage();
      const storageRef = ref(storage, "images/"); // Create a reference to the storage

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
        setImage(null); // Reset image state
        // Reset file input field
        const fileInput = document.getElementById("imageUpload");
        fileInput.value = "";
        showToast("Images Updated Successfully");
      });
    } catch (error) {
      showToast(error, "", "red");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    const selectedImage = files[0];
    setImage(selectedImage);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCloseImage = () => {
    setImage(null); // Deselect image
  };

  return (
    <>
      <p className="text-3xl text-center p-2 font-bold text-gray-900 dark:text-white">{ChangeImage}</p>
      <div className="w-full gap-2 p-2 text-sm">
        <div className="flex flex-col items-center justify-center">
          <label
            htmlFor="imageUpload"
            className="bg-blue-500  dark:bg-gray-800 dark:hover:bg-slate-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded cursor-pointer"
          >
            <svg className="w-6 h-6 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>{uploadImages}
          </label>
          <input
            type='file'
            id="imageUpload"
            onChange={handleImageChange}
            required
            className="hidden"
          />
          <div
            className="mt-8 border border-dashed border-gray-400 rounded-md p-8"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <p className="text-gray-600 text-center dark:text-white">{drag}<br />{browse}</p>
          </div>


          {image && (
            <div className="flex flex-wrap mt-8">
              <img src={URL.createObjectURL(image)} alt='Selected Photo' className='border my-4 h-20 w-20' />
              <button
                className="absolute ml-[65px] mt-[0.5px] text-white bg-black rounded-full transition-all duration-500 ease-in hover:scale-110"
                onClick={handleCloseImage}
              >
                <FaTimes />
              </button>
            </div>
          )}
        </div>
        <div className="text-center mt-4">
          <button className="p-2 w-40 text-center items-center text-sm text-white bg-green-600 dark:bg-slate-800 dark:hover:bg-gray-900 hover:bg-green-900 rounded" onClick={handleImageUpload}>{updateNow}</button>
        </div>
      </div>
    </>
  );
};

export default AddImage;
