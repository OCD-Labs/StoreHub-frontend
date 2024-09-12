"use client";

import React from "react";

function VerifyEmail() {
  return (
      <div className="md:flex justify-center items-center h-screen w-screen p-5 m-0 ">
        {/* Left Section */}
        <div className="hidden md:flex flex-col justify-center p-6 items-center w-1/2 ">
          <img
            src="https://store-hub-frontend.vercel.app/assets/images/signup.svg"
            alt="Login Illustration"
            className="w-full p-8 object-contain"
          />
        </div>

        {/*Right Section */}
        <div className=" w-full max-w-md text-center">
          <img
            src="https://img.icons8.com/?size=100&id=60688&format=png&color=000000"
            alt="Hubstaff Logo"
            className="w-12 mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold mb-4">Verify your email</h2>
          <p className="text-gray-600 mb-4">
            You're in. An email has been sent to{" "}
            <strong>yourmail@gmail.com</strong>. Hit confirm and you'll be ready
            to start working.
          </p>
          <p className="text-blue-500 underline cursor-pointer mb-4">
            Didn't see an email?
          </p>
          <button className="w-full bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">
            Resend it
          </button>
          <div className="mt-4">
            <button className="text-gray-500 hover:text-gray-700 font-medium">
              ← Back to sign in
            </button>
          </div>
        </div>
      </div>
   
  );
}

export default VerifyEmail;
