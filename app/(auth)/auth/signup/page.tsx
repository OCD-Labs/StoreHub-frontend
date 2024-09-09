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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/Dialog";
import email from "@public/assets/images/carbon_email.png";
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
    <div className="sm:flex sm:justify-between mb-3 sm:mb-6 z-10 p-8 font-light">
      <ToastContainer></ToastContainer>
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
        <form autoComplete="on">
          <p className="text-end">
            Already have an account?
            <Link href="/auth/signin">
              <span className="text-dark ml-2">Sign In</span>
            </Link>
          </p>
          <p className="text-2xl font-bold py-4">Create Account</p>
          <div className="flex flex-col gap-5 sm:gap-3 lg:gap-7">
            <input
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              placeholder="First name"
              {...register("first_name", { required: true, maxLength: 80 })}
            />

            <input
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              placeholder="Last name"
              {...register("last_name", { required: true, maxLength: 100 })}
            />
            <div>
              {" "}
              <input
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="email"
                placeholder="Email"
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
            <input
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              type="text"
              placeholder="password"
              {...register("password", { required: true, min: 9 })}
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
                      className="transform -rotate-90"
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
              {/* error message */}
              {/* {errors? <div>Fill the form correctly</div>: ''} */}

              {/* Label text */}
              <span className="ml-4 text-sm">
                I agree to the terms of service and privacy policy
              </span>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              className="rounded-[10px] md:py-2 sm:py-1 py-2 text-white bg-[#161616] text-lg w-full my-3 md:my-6"
            >
              {isSubmitting ? (
                <div className="flex justify-center">
                  <Loader2 className="mr-2 h-4 w-6 animate-spin" /> Creating
                  User...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>
        </form>

        <Dialog open={modal} onOpenChange={toggleModal}>
          <DialogTrigger></DialogTrigger>
          <DialogContent>
            <div className="flex flex-col gap-5 justify-center items-center font-light">
              <Image
                src={email}
                width={100}
                height={100}
                alt="email logo"
              ></Image>
              <p className="font-medium text-2xl">Verify Email</p>
              <p className="text-sm leading-7">
                Thank you for signing up with{" "}
                <b className="font-bold">StoreHub</b>! To get started, please
                verify your email for security reasons. Check your inbox (and
                spam/junk folder) at{" "}
                <b className="font-bold">[Recipient's Email Address]</b> for our
                verification email.
              </p>
              <p className="flex flex-col items-center text-xs">
                You didn’t receive email? Request a new email in
                <p>
                  {" "}
                  <span className="text-purple-800">{seconds} seconds</span>
                </p>
              </p>
            </div>
          </DialogContent>
        </Dialog>
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
      </section>
    </div>
  );
};

export default SignUp;
