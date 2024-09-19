
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";


function VerifyEmail() {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [seconds]);

  return (
    <div className="md:flex justify-center items-center h-screen w-screen p-5 m-0">
      {/* Left Section */}
      <div className="hidden md:flex flex-col justify-center p-6 items-center w-1/2">
        <Image
          src="https://store-hub-frontend.vercel.app/assets/images/signup.svg"
          alt="Login Illustration"
          width={500}
          height={500}
          className="w-full p-8 object-contain"
        />
      </div>

      {/*Right Section */}

      <div className="w-full max-w-md text-center">
        <Image
          src="https://img.icons8.com/?size=100&id=60688&format=png&color=000000"
          alt="Hubstaff Logo"
          width={48}
          height={48}
          className="mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold mb-4">Verify your email</h2>

        <p className="text-gray-600 mb-4">
          Thank you for signing up with StoreHub! To get started, please verify
          your email for security reasons. Check your inbox (and spam/junk
          folder) at [Recipient's Email Address] for our verification email.
        </p>
        <p className="flex flex-col items-center text-xs">
          You didn't receive email? Request a new email in
          <span className="text-purple-800">{seconds} seconds</span>
        </p>
        <button className="w-full bg-dark hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mt-4">
          Resend it
        </button>
        <div className="mt-4">
          <Link
            href="/auth/signin"
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            ← Back to sign in

          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
