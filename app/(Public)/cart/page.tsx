"use client";

import necklace from "../../../public/assets/images/PngItem_2678115 1.png";
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
		<div className="">
			<ul className="flex gap-[250px] py-4 m-[10px] px-[10%] border justify-end">
				<li></li>
				<li>Price</li>
				<li>Quantity</li>
				<li>Total</li>
			</ul>
			<ul className="flex gap-[250px] py-4 m-[10px] px-[10%] border-b-[1px] justify-end">
				<li>
					<Image src={necklace} height={60} width={60} alt="necklace" />{" "}
				</li>
				<li className="flex gap-1">
					<span>
						<img
							className="w-[27px]"
							src="../../assets/icons/near.svg"
							alt="amount"
						/>
					</span>
					<span>500</span>
				</li>
				<li>
					<div className="border rounded-[5px]">
						<span className="text-[17px] py-3  px-4" onClick={countDecrement}>
							-
						</span>
						<span className="text-[17px]  py-3 px-4">{count}</span>
						<span
							className="text-[17px]  py-3 px-4"
							onClick={() => setCount(count + 1)}
						>
							+
						</span>
					</div>
				</li>
				<li className="flex gap-1">
					<span>
						<img
							className="w-[27px]"
							src="../../assets/icons/near.svg"
							alt="amount"
						/>
					</span>
					<span>500</span>
				</li>
			</ul>
		</div>
	);
};

export default Cart;
