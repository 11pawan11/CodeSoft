import { useEffect, useState } from "react";
import { TfiUpload } from 'react-icons/tfi';
import { useToaster } from "../../../component/conext api/toast";
import MyAccount from "./myaccount";
import {  YourPhoto, browse, cancel, drag, save, uploadLine, uploadLines } from "../../../component/text";
import { auth } from "../../../firebase/initialStart";

const Settings = () => {
  const [selectFile, setSelectFile] = useState("");
  const [imageSrc, setImageSrc] = useState('');
  const {showToast} = useToaster();
  const [user, setUser] = useState();

  useEffect(() => {
    const currentUser = auth.currentUser;
    setUser(currentUser);
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target && e.target.result) {
          setImageSrc(e.target.result);
        }
      };

      reader.readAsDataURL(file);
      setSelectFile(file);
    }
  }; 

  const onSuccess = () => {
    showToast("Updated Successfully");
  }
  
  return (
    <div className="mx-auto max-w-270">
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-slate-800">
            {/* Left Side Content */}
            <MyAccount/>

          </div>
        </div>
        <div className="col-span-5 xl:col-span-2 dark:bg-slate-800">
          <div className="rounded-sm border border-gray-300 bg-white shadow-default dark:bg-slate-800 dark:bg-boxdark">
            <div className="border-b border-gray-300 py-4 px-7 text-center">
              <h3 className="font-medium text-black dark:text-white font-bold text-lg ">{YourPhoto}</h3>
            </div>
            <div className="p-4">
              <form action="/" className="dark:bg-slate-800">   
                {/* Profile Picture Upload Form */}
                <div className="mb-4 flex items-center gap-3 justify-center dark:bg-slate-800">
                  {selectFile && (
                    <div className="h-20 w-20 rounded-full dark:bg-gray-700 border border-gray-400 dark:hover:bg-slate-800">
                      <img src={imageSrc ?? (user?.photoURL || '/pasa.jpg')} alt="User" className='rounded-full' />
                    </div>
                  )}

                  {/* Buttons for Editing Profile Picture */}
                </div>
                {/* File Upload Input */}
                <div id="FileUpload" className="relative mb-5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-gray-400 bg-gray-50 py-4 px-4 dark:bg-slate-800  sm:py-7.5">
                  <input type="file" accept="image/*" className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none" onChange={handleFile} />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <span className="flex justify-center bg-blue-600 hover:bg-blue-800 rounded border border-stroke p-2 text-white dark:hover-slate-800 dark:bg-slate-800">
                      <TfiUpload />
                    </span>
                    <p className="text-center text-sm"> {drag}<br/>{browse}<br/>{uploadLine}<br/>{uploadLines}</p>
                  </div>
                </div>
                {/* Buttons for Saving and Cancelling */}
                <div className="flex justify-end text-sm gap-4">
                  <button className="flex justify-center bg-blue-600 hover:bg-blue-800 rounded border border-stroke p-1 text-white dark:hover-slate-800 dark:bg-gray-700 dark:hover:bg-slate-800" type="button" onClick={onSuccess}>{cancel}</button>
                  <button className="flex justify-center bg-blue-600 hover:bg-blue-800 rounded border border-stroke p-1 text-white dark:hover-slate-800 dark:bg-gray-700 dark:hover:bg-slate-800" type="submit">{save}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
