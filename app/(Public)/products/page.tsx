"use client";

import { BASE_URL } from "@components/util/config";
import { getItemID, getStoreID } from "@components/util/session";
import { useState, useEffect } from "react";
import Image from "next/image";
import jewellery from "@public/assets/images/jewellery.png";
import "/styles/Scroll.css";

const Products = () => {
	const [navbar, setNavbar] = useState(false);
	const [count, setCount] = useState(1);
	const [storeId, setStoreId] = useState<string | undefined>("");
	const [itemId, setItemId] = useState<string | undefined>("");
	const [retrievedItem, setRetrievedItem] = useState<StoreItem | undefined>();

	function countDecrement() {
		setCount(count - 1);
		if (count < 1) {
			return setCount(0);
		}
	}

	useEffect(() => {
		setStoreId(getStoreID());
		setItemId(getItemID());

		fetch(
			`${BASE_URL}/stores/${storeId ? storeId : 3}/items/${itemId ? itemId : 1}`
		)
			.then((response) => response.json())
			.then(({ data }: GetItemApiResponse) => {
				setRetrievedItem(data.result.item);
				console.log(retrievedItem, "PRODUCTIMAGE");
			})
			.catch((error) => console.log(error));
	}, [3]);

	// Function to calculate the discounted price
	function calculateDiscountedPrice(item: StoreItem): string {
		const price = parseFloat(item.price);
		const discountPercentage = parseFloat(item.discount_percentage);
		const discountedPrice = price * (discountPercentage / 100);
		return discountedPrice.toFixed(2);
	}

	// dummy datas to represent api data
	const productName = "Enchanted Sapphire";
	const amount = 500;
	const stockStatus = " in stock";
	const productId = "  221BB5";

	const data = [
		{
			img: "../../assets/images/jewellery.png",
			name: "Enchanted Halo",
			amount: 500,
		},
		{
			img: "../../assets/images/necklace.png",
			name: "Enchanted Halo",
			amount: 500,
		},
		{
			img: "../../assets/images/necklace.png",
			name: "Enchanted Halo",
			amount: 500,
		},
		{
			img: "../../assets/images/necklace.png",
			name: "Enchanted Halo",
			amount: 500,
		},
		{
			img: "../../assets/images/necklace.png",
			name: "Enchanted Halo",
			amount: 500,
		},
		{
			img: "../../assets/images/necklace.png",
			name: "Enchanted Halo",
			amount: 500,
		},
		{
			img: "../../assets/images/necklace.png",
			name: "Enchanted Halo",
			amount: 500,
		},
		{
			img: "../../assets/images/necklace.png",
			name: "Enchanted Halo",
			amount: 500,
		},
		{
			img: "../../assets/images/necklace.png",
			name: "Enchanted Halo",
			amount: 500,
		},
		{
			img: "../../assets/images/necklace.png",
			name: "Enchanted Halo",
			amount: 500,
		},
		{
			img: "../../assets/images/necklace.png",
			name: "Enchanted Halo",
			amount: 500,
		},
		{
			img: "../../assets/images/necklace.png",
			name: "Enchanted Halo",
			amount: 500,
		},
	];

	const renderedItem = data.map((item, id) => {
		return (
			<div
				key={id}
				className="border shadow-xl rounded-[7px] my-8 w-[80%] md:w-[25%] mr-4 md:mr-6 flex-shrink-0 flex-grow-0"
			>
				<div className="py-6 h-[200px] flex justify-center items-center">
					<img className="w-[200px]" src={item.img} alt="related product" />
				</div>
				<div>
					<hr />
					<p className="font-semibold text-[17px] text-black pl-3">
						{item.name}
					</p>
					<div className="flex justify-between py-2 pr-4 pl-2">
						<span className="flex text-[17px] items-center justify-start">
							<img
								className="w-[27px]"
								src="../../assets/icons/near.svg"
								alt="amount"
							/>
							{item.amount}
						</span>
						<img src="../../assets/icons/cart.svg" alt="cart" />
					</div>
				</div>
			</div>
		);
	});

	return (
		<div>
			<div className="flex my-[20px] gap-4">
				<p className="text-black">Stores</p>
				<span className="text-black">{">"}</span>
				<p className="text-black">
					{retrievedItem?.name ? retrievedItem.name : productName}
				</p>
				<span className="text-black">{">"}</span>
				<p className="text-black">Product</p>
			</div>

			<section className="md:flex items-center justify-between">
				<div className="border rounded-[7px] flex items-center justify-between md:mx-0 md:p-6 pb-16 w-[80%] relative my-4 md:w-[45%] md:h-[27rem]">
					<Image
						className="p-2 w-[300px] flex justify-center items-center"
						src={
							retrievedItem?.image_urls[0]
								? retrievedItem?.image_urls[0]
								: jewellery
						}
						width={300}
						height={200}
						alt="products-image"
					/>

					<img
						className="w-[25px] absolute right-8 bottom-4"
						src="../../assets/icons/love.svg"
						alt="like button"
					/>
				</div>
				{/*The mobile starts here*/}
				<div className="md:hidden ">
					<div className="flex justify-between  w-[80%] my-7 md:my-0">
						<button
							disabled
							className="rounded-[10px] px-1 border  text-white bg-[#161616] text-sm w-[40%]"
						>
							Add to Cart
						</button>
						<button className="rounded-[10px] py-2 text-white bg-[#161616] text-lg w-[40%]">
							Buy Now
						</button>
					</div>
					{/*The column starts here */}
					<div className="flex flex-row">
						<div>
							<p className="font-semibold text-[17px] mb-4 text-black">
								{retrievedItem?.name ? retrievedItem.name : productName}
							</p>
							<span className="flex text-[20px] items-center my-2 justify-start">
								<img
									className="w-[27px]"
									src="../../assets/icons/near.svg"
									alt="amount"
								/>
								{retrievedItem?.price ? retrievedItem.price : amount}
							</span>
							<div className="mt-5">
								<p className=" flex gap-3">
									{" "}
									<span className="text-[14px] text-black">Color:</span>{" "}
									<span> The colors</span>
								</p>
								<div className="flex items-center gap-4 my-4">
									<label className="text-[14px] text-black">Size:</label>
									<select className="block py-2 rounded-md border-0 px-1 md:px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 md:my-0">
										<option>Option 1</option>
										<option>Option 2</option>
										<option>Option 3</option>
										<option>Option 4</option>
									</select>
								</div>
								<div className="flex  items-center gap-4 my-4">
									<p className="text-[14px] text-[#000000]">Quantity:</p>
									<div className="border rounded-[10px]">
										<span
											className="text-[17px]  py-2 px-4"
											onClick={countDecrement}
										>
											-
										</span>
										<span className="text-[17px]  py-2 px-4">{count}</span>
										<span
											className="text-[17px]  py-2 px-4"
											onClick={() => setCount(count + 1)}
										>
											+
										</span>
									</div>
								</div>
							</div>
						</div>

						{/*a div for column */}
						<div>
							<p className="text-sm flex py-2 gap-3 ">
								<span className="font-bold text-[15px]">Availablity:</span>
								<span className="text-[#2F5015]">
									{retrievedItem?.supply_quantity
										? stockStatus
										: " out of stock"}
								</span>
							</p>

							<p className="flex py-2 gap-3">
								<span className="text-[#000000] text-[14px] font-bold">
									Product Id:
								</span>
								<span className="text-black">
									{retrievedItem?.id
										? `${retrievedItem?.id}-wdst-${retrievedItem?.store_id}`
										: productId}
								</span>
							</p>
							<p className="flex py-4 gap-3">
								{" "}
								<span className="text-[#000000] text-[15px] font-bold mb-6">
									Discount:
								</span>{" "}
								<span className="text-[#D89494]">20% off</span>
							</p>
						</div>
					</div>
				</div>

				{/*This mobile, stops here*/}

				{/*The big screen, starts here*/}

				<div className="hidden md:flex  flex-col gap-3 md:w-[45%] md:h-[27rem]">
					<p className="font-semibold text-[17px] text-black">
						{retrievedItem?.name ? retrievedItem.name : productName}
					</p>
					<span className="flex text-[17px] items-center justify-start">
						<img
							className="w-[27px]"
							src="../../assets/icons/near.svg"
							alt="amount"
						/>
						{retrievedItem?.price ? retrievedItem.price : amount}
					</span>
					<p className="text-sm flex gap-3 ">
						<span className="font-bold">Availablity:</span>
						<span className="text-black">
							{retrievedItem?.supply_quantity ? stockStatus : " out of stock"}
						</span>
					</p>
					<hr className="" />
					<p className="flex gap-3">
						<span className="text-[#000000] font-bold">Product Id:</span>
						<span className="text-black">
							{retrievedItem?.id
								? `${retrievedItem?.id}-wdst-${retrievedItem?.store_id}`
								: productId}
						</span>
					</p>
					<p className="flex gap-3">
						{" "}
						<span className="text-[#000000] font-bold mb-6">
							Discount:
						</span>{" "}
						<span className="text-black">20% off</span>
					</p>

					<hr className="" />

					<div className="mt-5">
						<p className=" flex gap-3">
							{" "}
							<span className="text-[14px] text-black">Color:</span>{" "}
							<span> The colors</span>
						</p>
						<div className="flex items-center gap-4 my-4">
							<label className="text-[14px] text-black">Size:</label>
							<select className="block py-2 rounded-md border-0 px-1 md:px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 md:my-0">
								<option>Option 1</option>
								<option>Option 2</option>
								<option>Option 3</option>
								<option>Option 4</option>
							</select>
						</div>
						<div className="flex items-center gap-4 my-4">
							<p className="text-[14px] text-black">Quantity:</p>
							<span
								className="text-[17px] border py-2 px-4"
								onClick={countDecrement}
							>
								-
							</span>
							<span className="text-[17px] border py-2 px-4">{count}</span>
							<span
								className="text-[17px] border py-2 px-4"
								onClick={() => setCount(count + 1)}
							>
								+
							</span>
						</div>
					</div>
					<div className="flex justify-between my-2 md:my-0">
						<button
							disabled
							className="rounded-[10px] px-2 border text-lg w-[40%]"
						>
							Add to Cart
						</button>
						<button className="rounded-[10px] py-2 text-white bg-[#161616] text-lg w-[40%]">
							Buy Now
						</button>
					</div>
				</div>
			</section>

			{/*Large screen ends here*/}
			<section>
				<div className="flex justify-between mt-[50px] mb-[50px] md:w-[45%]">
					<button className="rounded-[10px] py-2  text-white bg-[#161616] w-[30%] text-sm">
						Description
					</button>
					<button className="rounded-[10px] py-2 w-[30%] border text-sm">
						Reviews
					</button>
					<button className="rounded-[10px] py-2 w-[30%] flex items-center border justify-center text-sm">
						Share
						<img
							className="w-[20px] ml-2"
							src="../../assets/icons/share.svg"
							alt="share product"
						/>
					</button>
				</div>

				<div className="border py-4 my-4 md:py-6 px-4">
					<p>
						{retrievedItem?.description
							? retrievedItem?.description
							: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            scelerisque velit a lorem gravida, id sagittis metus dignissim. Cras
            dictum urna vitae arcu sagittis, a vestibulum mi pulvinar. Nulla
            feugiat enim non condimentum vulputate. Integer sed iaculis tellus.
            Proin luctus sem id nulla eleifend, vtae tristique nulla mattis.
            Nulla sit amet orci ac dui sollicitudin congue. Etiam aliquam tellus
            quis purus auctor`}
					</p>
				</div>
			</section>

			{/* Related prodcust section */}
			<section className="mb-4">
				<p className="font-semibold text-lg text-black">Related products</p>
				<div className="flex overflow-x-scroll scroll-smooth scroll-snap-x-mandatory hide-scrollbar">
					{renderedItem}
				</div>
			</section>
		</div>
	);
};

export default Products;
