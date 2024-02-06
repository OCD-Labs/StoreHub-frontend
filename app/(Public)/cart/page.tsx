"use client";

import necklace from "../../../public/assets/images/PngItem_2678115 1.png";
import Vector from "../../../public/assets/images/Vector.png";
import Image from "next/image";
import { useState } from "react";

const Cart = () => {
	const [count, setCount] = useState<number>(1);

	function countDecrement() {
		setCount(count - 1);
		if (count < 1) {
			return setCount(0);
		}
	}

	return (
		<div className="m-0">
			<ul className="flex gap-[260px] py-4 m-[10px] px-[10%] border justify-end">
				<li></li>
				<li>Price</li>
				<li>Quantity</li>
				<li>Total</li>
			</ul>
			<div className="flex gap-[250px] m-[30px] w-100%  border-b-[1px] space-between">
				<div className="flex gap-2">
					<span>
						<input type="checkbox" />
					</span>
					<span>
						<Image src={necklace} height={60} width={70} alt="necklace" />
					</span>
				</div>
				<div className="flex gap-[190px] ">
					<div className="flex gap-3 ">
						<span>
							<img
								className="w-[27px]"
								src="../../assets/icons/near.svg"
								alt="amount"
							/>
						</span>
						<span>500</span>
					</div>
					<div className="mb-[10px]">
						<div className="border cursor-pointer h-[30px]  rounded-[5px]">
							<span
								className="text-[17px] py-[25px]  px-5"
								onClick={countDecrement}
							>
								-
							</span>
							<span className="text-[17px]  py-[25px] px-5">{count}</span>
							<span
								className="text-[17px]  py-[25px] px-5"
								onClick={() => setCount(count + 1)}
							>
								+
							</span>
						</div>
					</div>
					<div className="flex gap-9">
						<div className="flex gap-3">
							<span>
								<img
									className="w-[27px]"
									src="../../assets/icons/near.svg"
									alt="amount"
								/>
							</span>
							<span>500</span>
						</div>
						<div className="mt-1">
							<Image src={Vector} height={15} width={15} alt="necklace" />
						</div>
					</div>
				</div>
			</div>

			<div className="flex gap-[250px] m-[30px] w-100%  border-b-[1px] space-between">
				<div className="flex gap-2">
					<span>
						<input type="checkbox" />
					</span>
					<span>
						<Image src={necklace} height={60} width={70} alt="necklace" />
					</span>
				</div>
				<div className="flex gap-[190px] ">
					<div className="flex gap-3 ">
						<span>
							<img
								className="w-[27px]"
								src="../../assets/icons/near.svg"
								alt="amount"
							/>
						</span>
						<span>500</span>
					</div>
					<div className="mb-[10px]">
						<div className="border cursor-pointer h-[30px]  rounded-[5px]">
							<span
								className="text-[17px] py-[25px]  px-5"
								onClick={countDecrement}
							>
								-
							</span>
							<span className="text-[17px]  py-[25px] px-5">{count}</span>
							<span
								className="text-[17px]  py-[25px] px-5"
								onClick={() => setCount(count + 1)}
							>
								+
							</span>
						</div>
					</div>
					<div className="flex gap-9">
						<div className="flex gap-3">
							<span>
								<img
									className="w-[27px]"
									src="../../assets/icons/near.svg"
									alt="amount"
								/>
							</span>
							<span>500</span>
						</div>
						<div className="mt-1">
							<Image src={Vector} height={15} width={15} alt="necklace" />
						</div>
					</div>
				</div>
			</div>

			<div className="flex gap-[250px] m-[30px] w-100%  border-b-[1px] space-between">
				<div className="flex gap-2">
					<span>
						<input type="checkbox" />
					</span>
					<span>
						<Image src={necklace} height={60} width={70} alt="necklace" />
					</span>
				</div>
				<div className="flex gap-[190px] ">
					<div className="flex gap-3 ">
						<span>
							<img
								className="w-[27px]"
								src="../../assets/icons/near.svg"
								alt="amount"
							/>
						</span>
						<span>500</span>
					</div>
					<div className="mb-[10px]">
						<div className="border cursor-pointer h-[30px]  rounded-[5px]">
							<span
								className="text-[17px] py-[25px]  px-5"
								onClick={countDecrement}
							>
								-
							</span>
							<span className="text-[17px]  py-[25px] px-5">{count}</span>
							<span
								className="text-[17px]  py-[25px] px-5"
								onClick={() => setCount(count + 1)}
							>
								+
							</span>
						</div>
					</div>
					<div className="flex gap-9">
						<div className="flex gap-3">
							<span>
								<img
									className="w-[27px]"
									src="../../assets/icons/near.svg"
									alt="amount"
								/>
							</span>
							<span>500</span>
						</div>
						<div className="mt-1">
							<Image src={Vector} height={15} width={15} alt="necklace" />
						</div>
					</div>
				</div>
			</div>

			
		</div>
	);
};

export default Cart;
