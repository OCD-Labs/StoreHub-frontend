"use client";

import Image from "next/image";
import schoolbag from "@public/assets/images/schoolbag.png";
import threeDots from "@public/assets/icons/three-dot.svg";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/NavDropdown";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/AlertDialog";

const Pending = () => {
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
                <span className="text-[8px] bg-[#FABF351F] ml-2 px-6 py-0 h-5 rounded-[39px]">
                  delayed
                </span>
              </span>
              <p className="text-[10px] text-black">Choco, nude & white</p>
              <p className="text-sm text-black">$249</p>
            </div>
          </div>
        </div>
        <div className="flex items-end flex-col justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image src={threeDots} alt="more details" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div>
                <DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <p className="text-sm cursor-pointer">Track Order </p>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogDescription>
                        <div>
                          <div className="flex justify-between border rounded-[10px] p-2 sm:p-4">
                            <div>
                              <p className="font-semibold text-base mb-2">
                                Butter Cream Cakes
                              </p>
                              <div className="flex gap-2 sm:gap-3">
                                <Image
                                  src={schoolbag}
                                  alt="product"
                                  className="sm:w-[100px]"
                                />
                                <div className="flex flex-col gap-0 sm:gap-2">
                                  <span className="flex items-center gpa-2 sm:gap-3">
                                    <p className="font-semibold text-base">
                                      Order Update
                                    </p>
                                    <p className="text-black ml-1">x1</p>
                                    <span className="text-[8px] bg-green-300 text-green-900 ml-2 px-6 py-0 h-5 rounded-[39px]">
                                      completed
                                    </span>
                                  </span>
                                  <p className="text-[10px] text-black">
                                    Choco, nude & white
                                  </p>
                                  <p className="text-sm text-black">$249</p>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-end flex-col justify-between">
                              <p className="hidden sm:block">May 22, 2024</p>
                              <p className="hidden sm:block text-green-600 font-semi-bold cursor-pointer underline">
                                Review Product
                              </p>
                            </div>
                          </div>

                          <div></div>
                          {/* ask victor for help  */}
                        </div>
                      </AlertDialogDescription>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction>Continue</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  {/* alert dialog ends here */}
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <p className="text-green-600 mb-2 cursor-pointer">
                    Confirm Delivery
                  </p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <p className="text-red-600 mb-2 cursor-pointer">
                    Cancle Delivery
                  </p>
                </DropdownMenuItem>

                <span className="sm:hidden">
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>
                      <p className="text-black mb-1">
                        Estimated delivery date:
                      </p>
                      <p className="text-black">May 22, 2024</p>
                    </span>
                  </DropdownMenuItem>
                </span>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <p className="hidden sm:block">May 22, 2024</p>
          <span className="text-[8px] bg-[#8486881F] px-6 py-0 h-5 ml-2 sm:ml-3 rounded-[39px] hidden sm:block">
            estimated delivery date: May 22, 2024
          </span>
        </div>
      </div>
    </main>
  );
};

export default Pending;
