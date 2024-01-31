import Image from "next/image";
import Link from "next/link";
import { Button } from "@components/ui/Button";
import { Heart } from "lucide-react";
import cartico from "../../public/assets/icons/cartico.svg";

import necklace from "../../public/assets/images/necklace.png";
import nearico from "../../public/assets/icons/nearicon.png";

export default function StoreItem({ product }: { product: StoreItem }) {
  console.log(product, "storeitemproduct");

  return (
    <div>
      <div className="group m-auto my-10 flex w-full max-w-xs flex-col overflow-hidden border-2 relative border-gray-100 bg-white rounded-lg">
        <Link href={`/products`}>
          <Image
            src={
              product.image_urls[0]
                ? product.image_urls[0]
                : "https://plus.unsplash.com/premium_photo-1683798464819-d1376249293e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2960&q=80"
            }
            width={600}
            height={600}
            alt="storimg"
          ></Image>
        </Link>
        <Heart className="absolute right-4 top-4 cursor-pointer" size={24} />

        <div className="mt-4 px-5 pb-5 border-t pt-2">
          <div className="flex flex-col gap-4 justify-between">
            <div className="flex justify-between gap-2">
              <h5 className="tracking-tight text-lg text-slate-900 font-medium">
                {product.name}
              </h5>

              <div className="flex gap-2 mt-2 ">
                <p>N{product.price}</p>
              </div>
            </div>
            <div className="flex justify-between gap-2">
              <Button variant="outline" className="font-light text-xs">
                Add to cart
              </Button>
              <Button variant="default" className="font-light text-xs">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
