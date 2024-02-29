import React, { useEffect, useState } from "react";
// import InputField from "../helper/input";
import { LuMails } from "react-icons/lu";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useForm, useFormState } from "react-hook-form";
import { auth } from "../firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  
  const handlePassworsd = () =>{
    setShowPassword(!showPassword);
  }
  const onSubmit = async (data) => {
      try
      {
        await signInWithEmailAndPassword(auth, data.email, data.password);
        console.log("Sucessfully logged in");
        navigate('/defaultLayout');
         
      } 
      catch(errors){
        console.error("Invalid Credentials",errors.message);
        if (errors.code === "auth/invalid-credential" || errors.code === "auth/user-not-found"){
            setErrorMessage("Invalid email or password");
        }
        else {
          setErrorMessage("Error during login. Please try again later");
        }
      }
     
 }
  return (
    <>
      <div className="flex justify-center items-center h-screen md:h-screen sm:h-screen overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto box-content">
          <div className="bg-white overflow-hidden rounded">
            <div className="p-2 my-80 flex flex-col justify-center lg:w-1/2 md:w-full md:mx-auto sm:mx-auto">
              <p className="font-semibold text-4xl text-red-600 text-center mb-4">
                Admin Login
              </p> 
              {errorMessage && <p className="text-red-600 text-sm sm:text-center">{errorMessage}</p>}
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 ">
                <div className="relative">
                    <input type="text" placeholder="Enter your email" {...register('email', {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    }
                    )}
                      className="pl-10 w-full h-full text-sm border border-stone-400 rounded p-2  " />
                    <LuMails className="absolute top-1/2 left-3 transform text-lg -translate-y-1/2 text-gray-400" />
                    {errors.email && <span className="text-red-600 text-sm absolute left-0 font-serif top-10"> <p>{errors.email.message} **</p></span>}
                  </div>
                    <div className="relative text-sm">
                      <input type={showPassword ? "text" : "password"} placeholder="Enter your password"
                        {...register('password', {
                          required: "Password is required",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 character long"
                          },
                        })}
                        className="pl-10 w-full h-full border text-sm border-stone-400 rounded p-2 " />
                      <FaLock className="absolute top-1/2 left-3 transform text-lg -translate-y-1/2 text-gray-400" />
                      {showPassword ? (
                        <FaEyeSlash
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg text-gray-400 cursor-pointer"
                          onClick={handlePassworsd} />
                      ) : (
                        <FaEye
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg text-gray-400 cursor-pointer"
                          onClick={handlePassworsd} />
                      )}
                      {errors.password && <span className="text-red-600 absolute left-0 top-10 ">{errors.password.message}</span>}

                    </div><div className="text-center">
                      <input
                        type="submit"
                        value="Login"
                        className="text-white border font-semibold justify-center items-center bg-stone-700 p-2 w-1/2 rounded-full hover:bg-black border-stone-700" />
                    </div>
                  </form>           
            </div>
          </div>
          <div className="hidden md:block overflow-hidden">
            <img
              src="/login.jpg"
              className="w-full h-auto"
              alt="Login"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
