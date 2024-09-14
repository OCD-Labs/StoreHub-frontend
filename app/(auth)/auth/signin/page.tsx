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
      // const user = await signIn("credentials", {
      //   email: data.email,
      //   password: data.password,
      //   redirect: false,
      // });
      // if (user) {
      //   console.log(user);
      //   debugger;
      //   setloading(false);
      //   if (user?.error) {
      //     toast.error("Wrong email or password. Try again");
      //   } else {
      //     debugger;
      //     router.push("/home");
      //   }
      // }
    } catch (error) {}
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen z-10">
      <div className="flex flex-col md:flex-row w-full md:p-12">
        <ToastContainer></ToastContainer>

        {/* Left Section with Image or Graphics (Optional) */}
        <div className="hidden md:flex flex-col justify-center p-6 items-center w-1/2 ">
          <img
            src="https://store-hub-frontend.vercel.app/assets/images/signup.svg"
            alt="Login Illustration"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Right Section: Form */}
        <section className="w-full md:w-1/2 p-[6%]">
          <form autoComplete="on">
            <p className="text-2xl font-bold py-4">Sign In</p>
            <div className="flex flex-col gap-5 sm:gap-3 lg:gap-7">
              {/* Email Input */}
              <div className="">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className=" w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: true,
                    pattern: /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i,
                  })}
                />
              </div>

              {/* Password Input */}
              <div className="mb-2">
                <label
                  className="block text-gray-700 text-sm font-medium mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    className=" w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 font-small  "
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", { required: true, min: 9 })}
                  />
                  {errors.root && (
                    <p className="text-sm text-red-500">
                      {errors.root.message}
                    </p>
                  )}

                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <button
                      type="button"
                      className="text-gray-600"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Forgot password */}
                <div className="text-right mb-6">
                  <a href="#" className="text-black-500 text-xs">
                    Forgot your password?
                  </a>
                </div>

                {/* Hidden default radio input */}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                className="rounded-[10px] md:py-2 sm:py-1 py-2 text-white bg-[#161616] text-lg w-full "
              >
                {isSubmitting ? (
                  <div className="flex justify-center">
                    <Loader2 className="mr-2 mt-1 h-6 w-6 animate-spin" />{" "}
                    Logging in ...
                  </div>
                ) : (
                  "Log in"
                )}
              </Button>
            </div>
          </form>
          {/* 
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
  </span> */}
          {/* Divider */}
          <div className=" my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Signup Link */}
          <p className="text-center text-l text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link href="/auth/signup">
              <span className="text-dark text-indigo-500 hover:underline">
                Create Account
              </span>
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default SignIn;
