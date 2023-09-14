import Image from "next/image";
import arrow from "@public/assets/icons/arrow.svg";
import near from "@public/assets/icons/near.svg";
import jewellery from "@public/assets/images/jewellery-13325 1.png";

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
      <div key={index} className="border w-full rounded-[10px] shadow-sm">
        <div className="p-4">
          <Image src={jewellery} alt="product" width={200} height={200}/>
        </div>
        <hr className="w-full" />
        <div className="flex justify-between p-1 sm:p-2">
          <p>{item.name}</p>
          <span className="flex">
            <Image src={near} width={17} height={17} alt="Near" className="mr-1"/>
            <p>{item.amount}</p>
          </span>
        </div>
        <div className="p-1 sm:p-2">
          <button className="rounded-[6px] px-2 py-1 text-white bg-[#161616]">Buy now</button>
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
      <section>
        <button>
          <Image src={arrow} alt="previous page" />
          <p>Previous</p>
        </button>
        <button>
          <p>Next</p>
          <Image src={arrow} alt="previous page" />
        </button>
      </section>
    </main>
  );
};

export default SavedItems;
