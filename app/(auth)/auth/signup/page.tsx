"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { Button } from "@components/ui/Button";
import { setCookie } from "@components/util/cookie";
import { signupAction } from "@app/actions/auth-action";
import "../../../../styles/signup.css";
import "react-toastify/dist/ReactToastify.css";
import { signUp } from "@app/apis";

const SignUp = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const [modal, setModal] = useState(false);
  const [loading, setloading] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [user, setUser] = useState<UserInfo>({
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    account_id: "",
    profile_image_url: "",
  });

  const handleRadioChange = (): void => {
    setChecked(!checked);
  };
  const toggleModal = () => {
    setModal(!modal);
  };

  interface IUserForm {
    first_name: "";
    last_name: "";
    email: "";
    password: "";
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserForm>();
  const onSubmit = async (data: IUserForm) => {
    let r = (Math.random() + 1).toString(36).substring(7);

    setloading(true);
    const userInfo = {
      ...data,
      account_id: `${r}.testnet`,
      profile_image_url: "",
    };
    await createAccount(userInfo);
  };

  const createAccount = async (data: UserInfo) => {
    try {
      const res = await signupAction(data);
      console.log(res);

      if (res.status !== "error") {
        console.log(data, "ggggg");
        const credential = JSON.stringify({
          email: data.email,
          password: data.password,
        });
        setCookie("credential", credential, 1);
        setModal(true);
        setSeconds(30);
      } else {
        toast.error("User exists already");
      }

      console.log(res, "respon");
    } catch (error) {
      console.log(error);
    }
  };

  // timer code

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (seconds === 0) {
        clearInterval(timerInterval);
      } else {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [seconds]);

  return (
    <div className="sm:flex sm:justify-between w-screen mb-3 sm:mb-6 z-10 p-8 font-light">
      <ToastContainer></ToastContainer>
      {/*Left Section */}
      <section className="border sm:px-4 lg:px-12 py-4 w-[40%] hidden sm:block rounded-[10px] ">
        <h3 className="text-black font-bold">StoreHub</h3>

        <h1 className="text-center text-3xl text-black pt-7">
          Welcome to <span className="font-bold">StoreHub!!!</span>
        </h1>
        <img
          className="py-11 w-full"
          src="../../assets/images/signup.svg"
          alt="sign up"
        />
      </section>

      {/*Right Section */}
      <section className="sm:w-[55%] pb-6 md:px-6">
        <form autoComplete="on">
          <p className="text-end">
            Already have an account?
            <Link href="/auth/signin">
              <span className="text-dark hover:bg-blue p-1 ml-2">Sign In</span>
            </Link>
          </p>
          <p className="text-2xl mb-6 font-bold py-4">
            Create a StoreHub Account
          </p>
          <div className="flex flex-col gap-5 sm:gap-3 lg:gap-7">
            {/*FirstName Input */}
            <div>
              <label
                className="block text-gray-700 mb-2 font-medium"
                htmlFor="email"
              >
                First Name*
              </label>
              <input
                className=" w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                type="text"
                placeholder="Enter your first name"
                {...register("first_name", { required: true, maxLength: 80 })}
              />
            </div>

            {/*LastName Input */}
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="email"
              >
                Last name *
              </label>
              <input
                className=" w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                type="text"
                placeholder="Enter your last name"
                {...register("last_name", { required: true, maxLength: 100 })}
              />
            </div>

            {/*Email Input */}
            <div>
              {" "}
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="email"
              >
                Work Email *
              </label>
              <input
                className=" w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                type="email"
                placeholder="Enter your Email"
                {...register("email", {
                  required: true,

                  pattern: {
                    value: /[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/i,
                    message: "provide valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/*Password Input */}
            <div>
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="email"
              >
                Password *
              </label>
              <input
                className=" w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
                type="text"
                placeholder="Enter 6 or more characters"
                {...register("password", { required: true, min: 9 })}
              />
            </div>

            {/* Checkmark  */}
            <div className="flex gap-2">
              <input type="checkbox" name="Agreement" id="" />
              <span className="text-sm">
                I agree to the terms of service and privacy policy.
              </span>
            </div>

            {/* error message */}
            {/* {errors? <div>Fill the form correctly</div>: ''} */}

            <Button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className="rounded-[10px] md:py-2 sm:py-1 py-2 text-white bg-[#161616] text-lg w-full my-3 md:my-6"
            >
              {isSubmitting ? (
                <div className="flex justify-center">
                  <Loader2 className="mr-2 mt-1 h-6 w-6 animate-spin" />{" "}
                  Creating Your Account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>

      </section>
    </div>
  );
};

export default SignUp;
