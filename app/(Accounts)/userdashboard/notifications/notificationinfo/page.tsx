"use client";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/NavDropdown";
import schoolbag from "@public/assets/images/schoolbag.png";
import threeDots from "@public/assets/icons/three-dot.svg";

const NotificationInfo = () => {
  return (
    <main className="p-3 sm:p-6 flex flex-col gap-3">
      <div className="flex justify-between border rounded-[10px] p-2 sm:p-4">
        <div className="flex gap-2 sm:gap-3">
          <Image src={schoolbag} alt="product" className="sm:w-[70px]"/>
          <div className="flex flex-col gap-2">
            <span className="flex items-center">
              <p className="font-semibold text-base">Order Update</p>
              <span className="text-[8px] bg-[#D335FA1F] px-6 h-5 ml-2 sm:ml-3 rounded-[39px] text-center">
                shipped
              </span>
            </span>
            <p className="text-sm text-black">Your order has been shipped</p>
          </div>
        </div>

        <div className="flex items-start">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image src={threeDots} alt="more details" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div>
                <DropdownMenuItem>
                  <p className="text-red-600 mb-2 cursor-pointer">
                    Delete message
                  </p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <p className="text-sm font-semibold cursor-pointer">
                    View details
                  </p>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex justify-between border rounded-[10px] p-2 sm:p-4">
        <div className="flex gap-2 sm:gap-3">
          <Image src={schoolbag} alt="product" className="sm:w-[70px]"/>
          <div className="flex flex-col gap-2">
            <span className="flex items-center">
              <p className="font-semibold text-base">Order Update</p>
              <span className="text-[8px] bg-[#D335FA1F] px-6 py-0 h-5 ml-2 sm:ml-3 rounded-[39px]">
                shipped
              </span>
            </span>
            <p className="text-sm text-black">Your order has been shipped</p>
          </div>
        </div>

        <div className="flex items-start">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image src={threeDots} alt="more details" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div>
                <DropdownMenuItem>
                  <p className="text-red-600 mb-2 cursor-pointer">
                    Delete message
                  </p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <p className="text-sm font-semibold cursor-pointer">
                    View details
                  </p>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </main>
  );
};

export default NotificationInfo;
