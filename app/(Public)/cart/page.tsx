'use client'

import necklace from "../../../public/assets/images/Pngitem_2678115 1.png";
import Image from "next/image";
import { useState } from "react";

const Cart = () => {
  const [quantity, setQuantity] = useState<number>(0);

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-3">
      <section className="flex border py-2 justify-between pl-3">
        <span className="w-[35%]">Item</span>
        <span className="w-[20%]">Price</span>
        <span className="w-[25%]">Quantity</span>
        <span className="w-[20%]">Total</span>
      </section>

      <section className="flex justify-between gap-3 pl-3">
        <span className="flex gap-4 w-[35%]">
          <input type="checkbox" />
          <Image src={necklace} height={60} width={60} alt="necklace" />
        </span>

        <p className="w-[20%]">500</p>
        <div className="flex border w-[25%]">
          <button className="border-r">-</button>
          {/* <div>{counter || '500'}</div> */}
          <div>500</div>
          <button className="border-l">+</button>
        </div>
        <p className="w-[20%]">500</p>
      </section>
    </div>
  );
};

export default Cart;
