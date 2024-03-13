import { useState, useEffect } from "react";
import { updateNow } from "../../../component/text";
import { useToaster } from "../../../component/conext api/toast";
import { auth } from "../../../firebase/initialStart";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


export const firebaseConfig = {
    apiKey: "AIzaSyCXThXYYpD0FR3nNXx9eY6kcUFPG62dLfE",
    authDomain: "portfolipawan.firebaseapp.com",
    projectId: "portfolipawan",
    storageBucket: "portfolipawan.appspot.com",
    messagingSenderId: "1059329198063",
    appId: "1:1059329198063:web:65aec307fbfc68a0d9581a",
    measurementId: "G-CXJSQDY52S"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auths = getAuth(app);
  const storage = getStorage(app);
  const dbse = getFirestore(app);
  export {auths, storage, dbse}

const MyAccount = () => {
  const [selectActive, setselectActive] = useState("basicinfo");
  const { showToast } = useToaster();
//   const dbse = getFirestore();
console.log("seconf",dbse)

  const handleTab = (tab) => {
    setselectActive(tab);
  };

  useEffect(() => {
    setselectActive("basicinfo");
  }, []);

  const createDocumentForUser = async (userId, userData) => {
    try {
        console.log("test",dbse)

      await dbse.collection("users").doc(userId).set(userData);

      console.log("Document created successfully for user:", userId);
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };
        
      // Replace 'userId' with the actual UID of the user
      // Replace 'userData' with an object containing the user's data
      const userId = "U7mCpU63OCetRy0y443rVri7nav1"; // Replace with actual UID
      const userData = {
        firstName: "Pawan",
        lastName: "Upreti",
        email: "pawan@gmail.com",
        phoneNumber: "9866284088", 
        dob: "",
        description:"hi"
      };
       // Create a document for the user
      createDocumentForUser(userId, userData);

  const validateBasicInfo = (formData) => {
    const { firstName, lastName, email, phoneNumber, dob, description} = formData;

    // Basic validation rules
    // if (!firstName || !lastName || !email || !phoneNumber || !dob || !description) {
    //   showToast("All fields are required", "", "red");
    //   return false;
    // }

    // Additional validation rules can be added here...

    return true;
  };

  const handleBasicInfoSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = Object.fromEntries(new FormData(form));

    // Validate form data
    if (!validateBasicInfo(formData)) {
      return;
    }

    // Update user info in Firestore

    console.log("first,", dbse)
    dbse.collection("users").doc(auth.currentUser.uid).set(formData, { merge: true })
      .then(() => {
        showToast("Basic Info updated successfully!", "", "green");
      })
      .catch((error) => {
        showToast(error.message, "", "red");
      });
      console.log("first",formData)

      return true;
  };

  const validateChangePassword = (formData) => {
    const { newPassword, confirmPassword } = formData;

    // Basic validation rules
    if (!newPassword || !confirmPassword) {
      showToast("Please enter new password and confirm password", "", "red");
      return false;
    }

    if (newPassword !== confirmPassword) {
      showToast("New password and confirm password must match", "", "red");
      return false;
    }

    // Additional validation rules can be added here...

    return true;
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = Object.fromEntries(new FormData(form));

    // Validate form data
    if (!validateChangePassword(formData)) {
      return;
    }

    // Update user password
    auth.currentUser.updatePassword(formData.newPassword)
      .then(() => {
        showToast("Password updated successfully!", "", "green");
        form.reset();
      })
      .catch((error) => {
        showToast(error.message, "", "red");
      });
  };

  return (
    <>
      {/* Tab Buttons */}
      <div className="items-center justify-center bg-gray-50 p-2 dark:bg-slate-800 w-full">
        <div className="flex justify-center p-2 space-x-4 text-sm w-full border-b border-gray-300">
          <button
            onClick={() => handleTab("basicinfo")}
            className={`p-3 hover:bg-blue-800 border border-gray-300 hover:text-white rounded text-center items-center ${selectActive === "basicinfo" ? "bg-blue-800 text-white" : ""}`}
          >
            Basic Info
          </button>
          <button
            onClick={() => handleTab("changepassword")}
            className={`hover:bg-blue-800 border border-gray-300  hover:text-white px-4 rounded text-center items-center ${selectActive === "changepassword" ? "bg-blue-800 text-white" : ""}`}
          >
            Change Password
          </button>
        </div>

        {/* Form for Basic Info */}
        {selectActive === "basicinfo" && (
          <form onSubmit={handleBasicInfoSubmit} className="mt-4 items-center justify-center space-y-2 dark:bg-slate-800 dark:text-white">
            {/* Basic Info Fields */}
            {/* Input fields for basic info */}
            <label id="firstname" className=" dark:text-white  after:content-['*'] after:ml-0.5 after:text-red-600 block text-sm font-medium text-gray-600"
            >
                        First Name</label>
                        <input
                          type="text"
                          className="p-2 border border-gray-400 rounded  dark:bg-slate-800 w-full focus:border-blue-600 focus-visible:outline-none" placeholder="Enter your firstname"
                        />
                      
                      <label id="lastname" className=" dark:text-white  after:content-['*'] after:ml-0.5 after:text-red-600 block text-sm font-medium text-gray-600"
            >
                        Last Name</label>
                        <input
                          type="text"
                          className="p-2 border border-gray-400 rounded w-full focus:border-blue-600 dark:bg-slate-800 focus-visible:outline-none"  placeholder="Enter your lastname"/>
                      
                      <label id="email" className=" dark:text-white  after:content-['*'] after:ml-0.5 after:text-red-600 block text-sm font-medium text-gray-600 ">
                        Email</label>
                        <input type="email" placeholder="Enter your email"  className="p-2 border dark:bg-slate-800 border-gray-400 rounded w-full focus:border-blue-600 focus-visible:outline-none"/>
                      
                      <label id="phoneno" className=" dark:text-white  after:content-['*'] after:ml-0.5 after:text-red-600 block text-sm font-medium text-gray-600 focus:border-blue-600 focus-visible:outline-none">
                        Phone number</label>
                        <input
                          type="number"
                          className="p-2 decoration-none border border-gray-400 dark:bg-slate-800 rounded w-full focus:border-blue-600 focus-visible:outline-none" placeholder="Enter your Phone no:"
                        />
                    
                      <label id="dobs" className=" dark:text-white after:content-['*'] after:ml-0.5 after:text-red-600 block text-sm font-medium text-gray-600">
                        DOB</label>
                        <input type="date" className="p-2 border border-gray-400 dark:bg-slate-800 w-full focus:border-blue-600 focus-visible:outline-none rounded" placeholder="Enter your DOB" />
                      
                      <label id="description" className="dark:text-white   mt-5 after:content-['*'] after:ml-0.5 after:text-red-600 block text-sm font-medium text-gray-600">
                        Your Description</label>
                        <textarea className="w-full dark:bg-slate-800 rounded border border-stroke bg-gray py-3 p-2 pr-2 text-black focus:border-blue-600 focus-visible:outline-none dark:border-strokedark mx-0 dark:text-white dark:focus:border-blue-600"
                                    name="bio"
                                    id="bio"
                                    rows={6}
                                    placeholder="Write your bio here..."
                                    defaultValue="">
                                  </textarea>
            <div>
              {/* Update button */}
              <button type="submit" className="p-2 mt-4 items-center float-right rounded text-white hover:bg-blue-800 bg-blue-900">{updateNow}</button>
            </div>
          </form>
        )}

          {/* Form for Change Password */}
        {selectActive === "changepassword" && (
          <form onSubmit={handleChangePasswordSubmit} className="mt-4 items-center justify-center space-y-2 dark:bg-slate-800 dark:text-white">
            {/* Change Password Fields */}
            {/* Input fields for change password */}
            <label htmlFor="password" className="dark:bg-slate-800 dark:text-white after:content-['*'] after:ml-0.5 after:text-red-600 block text-sm font-medium text-gray-600">
            Current Password  </label>
            <input
              type="password"
               placeholder="Enter your password"
              className="p-2 dark:bg-slate-800 w-fit dark:text-white border border-gray-400 w-full focus:border-blue-600 focus-visible:outline-none rounded"
            />
         
          <label htmlFor="newpassword" className="dark:bg-slate-800 dark:text-white after:content-['*'] after:ml-0.5 after:text-red-600 block text-sm font-medium text-gray-600">
            New password </label>
            <input
              type="password"
               placeholder="Enter your new password"
              className="p-2 border border-gray-400 dark:bg-slate-800 dark:text-white w-full focus:border-blue-600 focus-visible:outline-none rounded"
            />
         
          <label htmlFor="confirmpassword" className="dark:bg-slate-800 dark:text-white after:content-['*'] after:ml-0.5 after:text-red-600 block text-sm font-medium text-gray-600">
            Confirm Password </label>
            <input
              type="password"
               placeholder="Enter your confirm password"
              className="p-2 dark:bg-slate-800 dark:text-white border border-gray-400 w-full focus:border-blue-600 focus-visible:outline-none rounded"
            />     
            <div>     
              {/* Update button */}
              <button type="submit" className="p-2 mt-4 items-center float-right rounded text-white hover:bg-blue-800 bg-blue-900">{updateNow}</button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default MyAccount;
