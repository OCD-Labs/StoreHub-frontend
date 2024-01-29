import Image from "next/image";
import arrowleft from "@public/assets/icons/arrow.svg";
import near from "@public/assets/icons/near.svg";
import jewellery from "@public/assets/images/jewellery-13325 1.png";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

const SavedItems = () => {
	type dataType = {
		name: string;
		amount: string;
	}[];
	const data: dataType = [
		{
			name: "Celestial Luster",
			amount: "500",
		},
		{
			name: "Celestial Luster",
			amount: "500",
		},
		{
			name: "Celestial Luster",
			amount: "500",
		},
		{
			name: "Celestial Luster",
			amount: "500",
		},
		{
			name: "Celestial Luster",
			amount: "500",
		},
		{
			name: "Celestial Luster",
			amount: "500",
		},
		{
			name: "Celestial Luster",
			amount: "500",
		},
		{
			name: "Celestial Luster",
			amount: "500",
		},
	];

	const rederSavedItems = data.map((item, index: number) => {
		return (
			<div
				key={index}
				className="border h-[100%] w-[100%]  rounded-[10px] shadow-sm"
			>
				<div className="flex justify-center">
					<Image
						className="p-2"
						src={jewellery}
						alt="product"
						width={70}
						height={70}
					/>
				</div>
				<hr className="w-full" />
				<div className="flex justify-between px-2">
					<p className="font-bold">{item.name}</p>
					<span className="flex">
						<Image
							src={near}
							width={17}
							height={17}
							alt="Near"
							className="mr-1"
						/>
						<p className="font-bold">{item.amount}</p>
					</span>
				</div>
				<div className="flex p-2 sm:p-2">
					<button className="rounded-[6px] px-2 py-1 ml-auto text-white bg-[#161616]">
						Buy now
					</button>
				</div>
			</div>
		);
	});
	return (
		<main className="px-4 pt-8">
			<section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{rederSavedItems}
			</section>

			{/* todo: fix this sections display */}
			<section className=" mt-[80px] flex justify-between ">
				<button className="flex border-2 p-1  w-20 justify-center rounded-[10px] text-gray-400">
					<ArrowRightIcon className="mt-1" width={25} height={15} />
					<p className="">Previous</p>
				</button>

				<button className="flex border-2 p-1 w-20 justify-center rounded-[10px] text-gray-400">
					<p>Next</p>
					<ArrowRightIcon className="mt-1 pl-1" width={25} height={15} />
				</button>
			</section>
		</main>
	);
};

export default SavedItems;
