import Image from "next/image";
import React from "react";
import { Button } from "@components/ui/Button";
import Link from "next/link";


function VerifyEmail() {
  return (
    <div className="md:flex justify-center items-center h-screen w-screen p-5 m-0 z-10 ">
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center p-6 items-center w-1/2 ">
        <img
          className="w-full p-8 object-contain"
          src="../../assets/images/signup.svg"
          alt="sign up"
        />
      </div>

      {/*Right Section */}
      
      <div className=" w-full max-w-md text-center">
        <img
          src="https://img.icons8.com/?size=100&id=60688&format=png&color=000000"
          alt="Hubstaff Logo"
          className="w-8 mx-auto mb-2"
        />

        <h2 className="text-2xl font-bold mb-4">Verify your email</h2>
        <p className="text-gray-600 mb-4">
          You're in. An email has been sent to{" "}
          <strong>yourmail@gmail.com</strong>. Hit confirm and you'll be ready
          to start working.
        </p>
        <p className="text-blue-500 cursor-pointer mb-8">
          Didn't see an email?
        </p>
        <Button className="w-full text-white font-bold py-2 px-4 ">
          Resend it
        </Button>
        <div className="mt-4">
          <Link href="/auth/signup">
            <button className="text-gray-500 hover:text-gray-700 font-medium">
              ← Back to sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
