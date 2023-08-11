"use client";
import Link from "next/link";
import React, { useState } from "react";

const SignUp = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleRadioChange = (): void => {
    setChecked(!checked);
  };

  return (
    <div className="sm:flex sm:justify-between mb-3 sm:mb-6">
      <section className="border sm:px-4 lg:px-12 py-4 w-[40%] hidden sm:block rounded-[10px]">
        <h3 className="text-black font-bold">StoreHub</h3>

        <h1 className="text-center text-3xl text-black pt-7">
          Welcome to <span className="font-bold">StoreHub!!!</span>
        </h1>
        <img
          className="py-11"
          src="../../assets/images/signup.svg"
          alt="sign up"
        />
      </section>

      <section className="sm:w-[55%] sm:px-6">
        <form>
          <p className="text-end">
            Already have an account?{" "}
            <Link href="/signin">
              <span className="text-blue">Sign In</span>
            </Link>
          </p>
          <p className="text-2xl font-bold py-4">Create Account</p>
          <div className="flex flex-col gap-5 sm:gap-3 lg:gap-7">
            <input
              type="text"
              name="fullname"
              id="full-name"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Full Name"
            />

            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Email Adress"
            />

            <input
              type="password"
              name="password"
              id="password"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Password"
            />

            <input
              type="passowrd"
              name="confirm-password"
              id="confirm-password"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Confirm Password"
            />

            <div className="flex items-center">
              {/* Hidden default radio input */}
              <div>
                <input
                  type="radio"
                  id="customRadio"
                  name="radioGroup"
                  className="hidden"
                  checked={checked}
                  onClick={handleRadioChange}
                />

                {/* Custom radio button */}
                <label
                  htmlFor="customRadio"
                  className="w-6 h-6 border-2 border-black rounded-md flex items-center justify-center cursor-pointer transition-colors duration-300 hover:border-gray-600"
                >
                  {/* Checked state indicator (checkmark) */}
                  <div
                    className={`w-4 h-4 bg-black rounded ${
                      checked ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    } transform rotate-45 transition-opacity duration-300`}
                  >
                    {/* Checkmark SVG */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <path d="M6 12l4 4 10-10"></path>
                    </svg>
                  </div>
                </label>
              </div>

              {/* Label text */}
              <span className="ml-4">
                I agree to the terms of service and privacy policy
              </span>
            </div>

            <button className="rounded-[10px] md:py-2 sm:py-1 py-2 text-white bg-[#161616] text-lg w-full my-3 md:my-6">
              Create Account
            </button>
          </div>

          <div className="py-2 sm:py-1 md:py-3">
            <span className="flex items-center justify-between">
              <hr className="font-bold w-[45%] border-t-1 border-black" />
              <p className="px-2">or</p>
              <hr className="font-bold w-[45%] border-t-1 border-black" />
            </span>

            <span className="flex justify-between pt-2 sm:pt-1 md:pt-2">
              <button className="flex items-center justify-center py-1 md:py-2 w-[44%] rounded-[10px] border cursor-pointer">
                <img
                  className="w-6"
                  src="../../assets/icons/google.svg"
                  alt="sign up with google"
                />
                <p className="ml-3">Google</p>
              </button>
              <button className="flex items-center justify-center py-1 md:py-2 w-[44%] rounded-[10px] border cursor-pointer">
                <img
                  className="w-6"
                  src="../../assets/icons/google.svg"
                  alt="sign up with google"
                />
                <p className="ml-3">Google</p>
              </button>
            </span>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SignUp;
