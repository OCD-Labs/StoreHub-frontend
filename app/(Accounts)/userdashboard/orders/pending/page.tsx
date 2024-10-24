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
import { useState } from "react";

const Pending = () => {
	const [trackOrder, setTrackOrder] = useState(false);
	const [confirmOrder, setconfirmOrder] = useState(false);

	return (
		<main className="p-3 sm:p-6 flex flex-col gap-3">
			{/*The Start of track modal */}
			<AlertDialog open={trackOrder} onOpenChange={setTrackOrder}>
				<AlertDialogTrigger></AlertDialogTrigger>
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
												<p className="font-semibold text-base">Order Update</p>
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
						</div>
					</AlertDialogDescription>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction>Continue</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			{/*The obvious end of track modal */}

			{/* The start of confirm order*/}
			<AlertDialog open={confirmOrder} onOpenChange={setconfirmOrder}>
				<AlertDialogTrigger></AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogDescription>
						<div className=" border rounded-[10px] m-0 p-2 sm:p-4">
							<div>
								<div className="flex justify-between">
									<p className="font-semibold text-[#000000] text-base mb-2">
										Butter Cream Cakes
									</p>
									<p className="hidden text-[#000000] sm:block">May 22, 2024</p>
								</div>

								<div className="flex gap-2 sm:gap-3">
									<Image
										src={schoolbag}
										alt="product"
										className="sm:w-[100px]"
									/>
									<div className="flex flex-col gap-0 sm:gap-2">
										<span className="flex items-center gap-2 sm:gap-3">
											<p className="font-semibold text-[#000000] text-base">
												Bento Cake
											</p>
											<p className="text-black ml-1">x1</p>
											<span className="text-[8px] flex justify-center text-center bg-[#0965B9] text-[#000000] ml-2 px-3  h-5 rounded-[39px]">
												processing
											</span>
										</span>
										<p className="text-[10px] text-black">
											Choco, nude & white
										</p>

										<p className="text-sm text-[#00000]">$24.99</p>
									</div>
								</div>
								<div className="flex">
									<span className="text-[8px] flex ml-auto px-3 bg-[#7f8081] text-[#000000] h-5 rounded-[39px]">
										<p>estimated delivery date may 24 2024</p>
									</span>
								</div>
								<div className="flex justify-between pt-3">
									<div className="">
										<ul className="list-none">
											<li>Sub total:</li>
											<li>Shipping Fee</li>
											<li>Total</li>
										</ul>
									</div>
									<div>
										<ul className="list-none text-right">
											<li>10$</li>
											<li>$50.00</li>
											<li>10$</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="p-3">
							<h1 className="mb-3 text-[#000000] text-[20px]">
								Order Information
							</h1>
							<div className="flex">
								<div className="w-[50%]">
									<p className="text-[#000000] p-1">Janet Dove</p>
									<p className=" p-1 text-left">
										Suite 456, 123 Elm Street Maplewood, MN 55109 USA
									</p>
									<p className="text-[#000000] p-1 text-bold">
										+223-678-456-987
									</p>
								</div>
								<div className="text-rigt">
									<p className="flex gap-3 p-1">
										<span className="text-[#000000]">Order ID</span>{" "}
										<p>2473950</p>
									</p>
									<p className="flex gap-3 p-1">
										<span className="text-[#000000]">Order Date</span>
										May 22, 2023
									</p>
									<p className=" p-1">
										<span className="text-[#000000]">Payment Method  </span>
										Debit/Credit card
									</p>
								</div>
							</div>
              
              
							<div className="flex justify-between mt-[50px] gap-3">
								<AlertDialogCancel className="border text-bold bg-[#FCF8F2] text-[#000000] rounded-[10px] p-3 mt-12 w-[100%]">
								  Confirm Delivery
								</AlertDialogCancel>

								<AlertDialogCancel className="border text-bold bg-[#FE5B13] text-[#000000] rounded-[10px] p-3 mt-12 w-[100%]">
									Track Order
								</AlertDialogCancel>
							</div>
						</div>
						</AlertDialogDescription>
						<AlertDialogFooter></AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			{/* The end of confirm order*/}

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
									<p
										className="text-sm cursor-pointer"
										onClick={() => {
											setTrackOrder(!trackOrder);
										}}
									>
										Track Order{" "}
									</p>
								</DropdownMenuItem>
								{/* alert dialog ends here */}

								<DropdownMenuSeparator />
								<DropdownMenuItem>
									<p
										className="text-green-600 mb-2 cursor-pointer"
										onClick={() => {
											setconfirmOrder(!confirmOrder);
										}}
									>
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
