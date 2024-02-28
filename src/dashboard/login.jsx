import React, { useState } from "react";
import InputField from "../helper/input";
import { LuMails } from "react-icons/lu";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useForm, useFormState } from "react-hook-form";

const Login = () => {
  const {register, handleSubmit, control }= useForm();
  const {errors} = useFormState({control}); 
  const [showPassword, setShowPassword] = useState(false);

  const handlePassworsd = () =>{
    setShowPassword(!showPassword);
  }
  const onSubmit = (data) => {
    console.log("present data",data);
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
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 ">
                <div className="relative">
                <InputField type="text" placeholder="Enter your email" required {...register('email') }className="pl-10 w-full h-full border border-stone-400 rounded p-2 "/>
                <LuMails className="absolute top-1/2 left-3 transform text-lg -translate-y-1/2 text-gray-400"/>
               <span className="text-red-600">{errors.email && errors.email.message}</span>
                </div>
                
                <div className="relative ">
                <InputField type={showPassword ? "text" : "password"}  placeholder="Enter your password" {...register('password')} className="pl-10 w-full h-full border border-stone-400 rounded p-2 "/>
                <FaLock className="absolute top-1/2 left-3 transform text-lg -translate-y-1/2 text-gray-400"/>
                {showPassword ? (
                    <FaEyeSlash
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg text-gray-400 cursor-pointer"
                      onClick={handlePassworsd}
                    />
                  ) : (
                    <FaEye
                      className="absolute top-1/2 right-3 transform -translate-y-1/2 text-lg text-gray-400 cursor-pointer"
                      onClick={handlePassworsd}
                    />
                  )}
                  <span className="text-red-600">{errors.password && errors.password.message}</span>

                </div>
                
                <div className="text-center">
                  <InputField
                    type="submit"
                    value="Login"
                    className="text-white border font-semibold justify-center items-center bg-stone-700 p-2 w-1/2 rounded-full hover:bg-black border-stone-700"
                  />
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
