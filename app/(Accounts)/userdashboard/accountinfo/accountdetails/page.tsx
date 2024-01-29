"use client";

import Image from "next/image";
import galleryadd from "@public/assets/images/galleryadd.png";

const AccountDetails = () => {
	return (
		<main>
			<section className="sm:flex-row flex flex-col justify-between my-8 px-4 gap-4">
				<div className=" sm:justify-center border-dashed border-2 border-gray-400 p-3 h-20 w-20 rounded-3xl flex items-center justify-center">
					<Image
						src={galleryadd}
						width={20}
						height={20}
						alt="onboardimage"
						className=" place-content-center"
					></Image>
				</div>

				<div className="sm:w-[35%] flex flex-col gap-6">
					<span className="flex flex-col gap-2">
						<label>Name</label>
						<input
							type="text"
							name="fullname"
							id="full-name"
							className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="Full Name"
						/>
					</span>

					<span className="flex flex-col gap-2">
						<label>Phone Number</label>
						<input
							type="text"
							name="fullname"
							id="full-name"
							className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="Full Name"
						/>
					</span>

					<span className="flex flex-col gap-2">
						<label>Email Address</label>
						<input
							type="email"
							name="email"
							id="email"
							className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							placeholder="Email Adress"
						/>
					</span>
				</div>

				<div className="sm:w-[35%] flex flex-col gap-6">
					<span className="flex flex-col gap-3">
						<p>Account ID:</p>
						<p>mxy567gt</p>
					</span>

					<div className="flex flex-col gap-3">
						<label>Shipping Adress</label>
						<textarea className="border-2 rounded-[10px] max-h-[120px]" />
					</div>
				</div>
			</section>
			<div className="w-full justify-center flex">
				<button className="rounded-[10px]  px-14 py-2 text-white bg-[#161616] mx-auto  mb-[35px]">
					Update Profile
				</button>
			</div>
		</main>
	);
};

export default AccountDetails;
