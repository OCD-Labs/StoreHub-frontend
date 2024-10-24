"use client";
import { useState } from "react";
import Image from "next/image";
import schoolbag from "@public/assets/images/schoolbag.png";
import threeDots from "@public/assets/icons/three-dot.svg";
import star from "@public/assets/icons/star.svg";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/NavDropdown";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";

const Completed = () => {
  const [checked, setChecked] = useState<boolean>(false);
  const handleRadioChange = () => {
    setChecked(!checked);
  };
  return (
    <main className="p-3 sm:p-6 flex flex-col gap-3">
      <div className="flex justify-between border rounded-[10px] p-2 sm:p-4">
        <div>
          <p className="font-semibold text-base mb-2">Butter Cream Cakes</p>
          <div className="flex gap-2 sm:gap-3">
            <Image src={schoolbag} alt="product" className="sm:w-[100px]" />
            <div className="flex flex-col gap-0 sm:gap-2">
              <span className="flex items-center gpa-2 sm:gap-3">
                <p className="font-semibold text-base">Order Update</p>
                <p className="text-black ml-1">x1</p>
                <span className="text-[8px] bg-green-300 text-green-900 ml-2 px-6 py-0 h-5 rounded-[39px]">
                  completed
                </span>
              </span>
              <p className="text-[10px] text-black">Choco, nude & white</p>
              <p className="text-sm text-black">$249</p>
            </div>
          </div>
        </div>
        <div className="flex items-end flex-col justify-between">
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Image src={threeDots} alt="more details" />
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem>
                  <p>May 22, 2024</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <p className="text-green-600 font-semi-bold cursor-pointer underline">
                    Review Product
                  </p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="hidden sm:block">May 22, 2024</p>
          <Dialog>
            <DialogTrigger>
              <p className="hidden sm:block text-orange-600 font-semi-bold cursor-pointer underline">
                Review Product
              </p>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  <p className="text-start">Overall Rating (Click to rate)</p>
                </DialogTitle>
                <DialogDescription>
                  <div>
                    <section className="flex gap-3 my-2">
                      <Image
                        src={star}
                        alt="rate product"
                        className="border p-2 rounded-sm w-10"
                      />
                      <Image
                        src={star}
                        alt="rate product"
                        className="border p-2 rounded-sm w-10"
                      />
                      <Image
                        src={star}
                        alt="rate product"
                        className="border p-2 rounded-sm w-10"
                      />
                      <Image
                        src={star}
                        alt="rate product"
                        className="border p-2 rounded-sm w-10"
                      />
                      <Image
                        src={star}
                        alt="rate product"
                        className="border p-2 rounded-sm w-10"
                      />
                    </section>

                    <section>
                      <form className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                          <label className="font-semibold text-start">
                            name
                          </label>
                          <input
                            type="name"
                            name="name"
                            id="name"
                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="John Doe"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="font-semibold text-start">
                            What is the reason for your review?
                          </label>
                          <textarea className="border-2 rounded-[10px] h-[150px]" />
                        </div>

                        <div className="flex items-center w-full">
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
                                  checked
                                    ? "opacity-100 scale-100"
                                    : "opacity-0 scale-0"
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
                          <span className="ml-2 sm:ml-4 flex">
                            I agree to the{" "}
                            <p className="text-[#f5804a] px-1">
                              terms and condition
                            </p>
                            for this feedback
                          </span>
                        </div>
                      </form>
                    </section>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="submit" className="bg-[#FE5B13]">Submit Review</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </main>
  );
};

export default Completed;
