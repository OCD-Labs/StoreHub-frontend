import Image from "next/image";
import arrowleft from "@public/assets/icons/arrow.svg";
import near from "@public/assets/icons/near.svg";
import jewellery from "@public/assets/images/jewellery.png";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import heart from "@public/assets/icons/heart.svg";
import cart from "@public/assets/icons/smallcart.svg";

const SavedItems = () => {
  type dataType = {
    name: string;
    amount: string;
    discount: string;
    savings: string;
  }[];
  const data: dataType = [
    {
      name: "Celestial Luster",
      amount: "500",
      discount: "13",
      savings: "0.67",
    },
    {
      name: "Celestial Luster",
      amount: "500",
      discount: "13",
      savings: "0.67",
    },
    {
      name: "Celestial Luster",
      amount: "500",
      discount: "13",
      savings: "0.67",
    },
    {
      name: "Celestial Luster",
      amount: "500",
      discount: "13",
      savings: "0.67",
    },
    {
      name: "Celestial Luster",
      amount: "500",
      discount: "13",
      savings: "0.67",
    },
    {
      name: "Celestial Luster",
      amount: "500",
      discount: "13",
      savings: "0.67",
    },
    {
      name: "Celestial Luster",
      amount: "500",
      discount: "13",
      savings: "0.67",
    },
    {
      name: "Celestial Luster",
      amount: "500",
      discount: "13",
      savings: "0.67",
    },
  ];

  const rederSavedItems = data.map((item, index: number) => {
    return (
      <div
        key={index}
        className="border border-gray-200 rounded-lg shadow-sm p-4 h-full w-full"
      >
        <div className="flex justify-between items-center mb-1">
          <Image src={heart} width={20} height={20} alt="heart" />
          <Image src={cart} width={20} height={20} alt="cart" />
        </div>
        <div className="flex justify-center">
          <Image
            className="max-w-full h-auto"
            src={jewellery}
            alt="product"
            width={70}
            height={70}
          />
        </div>
        <hr className="w-full my-2" />
        <div className="flex flex-col px-2 space-y-2 mt-auto">
          <p className="font-vietnam font-weight-700 break-words text-lg">{item.name}</p>
          <div className="flex items-center space-x-2">
            <span className="bg-[#FF0000] text-white text-xs px-1.5 py-0.5 rounded-md">
              ⚡-{item.discount}%
            </span>
            <span className="text-gray-500 text-xs">Save ${item.savings}</span>
          </div>

          <span className="flex items-center mt-2">
            <Image
              src={near}
              width={17}
              height={17}
              alt="Near"
            />
            <p className="font-vietnam font-weight-600 font-bold ml-1 text-xl">{item.amount}</p>
          </span>
        </div>
        <div className="mt-2 flex">
          <button className="rounded-[6px] px-2 py-1 ml-auto text-white bg-[#FE5B13] ">
            Buy now
          </button>
        </div>
      </div>
    );
  });
  return (
    <main className="px-4 pt-8">
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[70vh] overflow-auto">
        {rederSavedItems}
      </section>

      {/* todo: fix this sections display */}
      <section className="mt-8 flex justify-between">
        <button className="flex border-2 p-1  w-20 justify-center rounded-[10px] text-gray-400">
          <ArrowLeftIcon className="mt-1" width={25} height={15} />
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
