
"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@components/ui/Button";
import Router, { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { signinAction } from "@app/actions/auth-action";
import { setUser as storeUser } from "@components/util/session";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
const SignIn = () => {
  const [loading, setloading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<IUserCredential>();
  /**
   * submit logic
   * @param data
   */
  const onSubmit = async (data: IUserCredential) => {
    setloading(true);
    try {
      const userData = await signinAction(data);
      console.log(userData?.user, "user");
      if (!userData) {
        setError("root", {
          type: "server",
          message: "Incorrect email or password",
        });
      } else {
        storeUser("user", JSON.stringify(userData?.user));
        router.push("/home");
      }
      
    
    } catch (error) {}
  };
  return (
    <div className="flex justify-center items-center h-screen w-screen z-10">
      <div className="flex flex-col md:flex-row w-full md:p-12">
        <ToastContainer></ToastContainer>
        {/* Left Section with Image or Graphics (Optional) */}
        <div className="hidden md:flex flex-col justify-center p-6 items-center w-1/2 ">
          <img
            className="w-full h-auto object-contain"
            src="../../assets/images/signup.svg"
            alt="sign up"
          />
        </div>
        {/* Right Section: Form */}
        <section className="w-full h-screen md:h-0 md:w-1/2 p-[6%]">
          <form autoComplete="on">
            <h1 className="text-3xl font-bold mb-9 py-4">
              Sign in to Storehub
            </h1>
            {/*Pasword error Message  */}
            {errors.root && (
              <p className="w-full p-3 mb-6 text-red-500 bg-red-50 border border-gray-300 rounded-lg">
                {errors.root.message}
              </p>
            )}
            <div className="flex flex-col gap-5 sm:gap-3 lg:gap-7">
              {/* Email Input */}
              <div className="">
                <label
                  className="block text-gray-700 font-medium mb-2"
                  htmlFor="email"
                >
                  Work Email *
                </label>
                <input
                  className=" w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                  type="email"
                  placeholder="Enter email"
                  {...register("email", {
                    required: true,
                    pattern: /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i,
                  })}
                />
              </div>
              {/* Password Input */}
              <div className="mb-2">
                <label
                  className="block text-gray-700 font-medium  mb-2"
                  htmlFor="password"
                >
                  Password *
                </label>
                <div className="relative w-full">
                  <input
                    className=" w-full p-3 border border-gray-300 rounded-lg focus:outline-none "
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    {...register("password", { required: true, min: 9 })}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      className="text-gray-600"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeClosedIcon className="h-5 w-5" />
                      ) : (
                        <EyeOpenIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {/* Forgot password */}
                <div className="text-right mb-6">
                  <p className="text-[#060606] mt-4 cursor-pointer font-medium text-sm">
                    Forgot your password?
                  </p>
                </div>
              </div>
              
              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                className="rounded-[10px] md:py-2 sm:py-1 py-2 text-white bg-[#FE5B13] hover:bg-[#a96a4f] text-lg w-full "
              >
                {isSubmitting ? (
                  <div className="flex justify-center">
                    <Loader2 className="mr-2 mt-1 h-6 w-6 animate-spin" />{" "}
                    Signing in ...
                  </div>
                ) : (
                  "Sign in"
                )}
              </Button>
            </div>
          </form>
         
          <div className=" my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>
          {/* Signup Link */}
          <p className="text-center text-l font-semibold text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link href="/auth/signup">
              <span className=" underline text-[#FE5B13] hover:underline">
                Get Started
              </span>
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};
export default SignIn;