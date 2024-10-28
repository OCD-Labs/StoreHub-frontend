import SearchIcon from "../../../../../public/assets/images/SearchIcon.png";
import { PlusIcon } from "@heroicons/react/24/solid";
import filter from "../../../../../public/assets/icons/filter.svg";
import Image from "next/image";

const salesHIstory = () => {
  const salesHistory = [
    {
      image: "/assets/images/productImage1.png",
      name: "Barilla",
      description: "Pasta",
      category: "Food",
      price: "$1.25",
      quantity: 3,
      id: "WDT-444",
      Discount: "25%",
      paymentMethods: "Near",
      statusColor: "text-green-500 ",
      statusColorDot: "bg-green-500",
    },
    {
      image: "/assets/images/productImage1.png",
      name: "Barilla",
      description: "Pasta",
      category: "Food",
      price: "$1.25",
      quantity: 3,
      id: "WDT-444",
      Discount: "15%",
      paymentMethods: "Near",
      statusColor: "text-green-500 ",
      statusColorDot: "bg-green-500",
    },
    {
      image: "/assets/images/productImage1.png",
      name: "Barilla",
      description: "Pasta",
      category: "Food",
      price: "$1.25",
      quantity: 3,
      id: "WDT-444",
      Discount: "25%",
      paymentMethods: "Near",
      statusColor: "text-green-500 ",
      statusColorDot: "bg-green-500",
    },
    {
      image: "/assets/images/productImage1.png",
      name: "Barilla",
      description: "Pasta",
      category: "Food",
      price: "$1.25",
      quantity: 3,
      id: "WDT-444",
      Discount: "15%",
      paymentMethods: "Near",
      statusColor: "text-green-500 ",
      statusColorDot: "bg-green-500",
    },
  ];

  return (
    <div className="px-10">
      {/* Top Section with Filters and Search */}
      <div className="flex items-center rounded-lg md:justify-between justify-center bg-[#FCF8F2] py-2 px-4 shadow-sm">
        {/* Left section with icons */}
        <div className="flex items-center gap-2 md:mr-0 mr-7">
          <button className="p-2 ">
            <PlusIcon className="h-5 w-5 text-black" />
          </button>

          <Image alt="" src={filter} className="h-5 w-5 text-black" />
        </div>

        {/* Search bar */}

        <div className="relative">
          <input
            type="text"
            className="bg-white border border-gray-300 rounded-lg md:pl-10 pl-2  md:pr-8 pr-0 py-2  focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Search"
          />
          <div className="absolute left-4 top-[13px] hidden lg:block">
            <Image
              alt=""
              src={SearchIcon}
              height={17}
              width={15}
              className="text-black"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg ">
          <thead>
            <tr className="text-left text-gray-500 text-sm">
              <th className="py-3 px-4 border-b">
                <input type="checkbox" className="rounded" />
              </th>
              <th className="py-3 px-4 border-b">Product</th>
              <th className="py-3 px-4 border-b">Category</th>
              <th className="py-3 px-4 border-b">Price</th>
              <th className="py-3 px-4 border-b">Quantity</th>
              <th className="py-3 px-4 border-b">Product ID</th>
              <th className="py-3 px-4 border-b">Discount</th>
              <th className="py-3 px-4 border-b">Payment Method</th>
            </tr>
          </thead>
          <tbody className=" border-b">
            {salesHistory.map((salesHistory, index) => (
              <tr key={index} className="border-t">
                <td className="py-4 px-4">
                  <input type="checkbox" className="rounded" />
                </td>
                <td className="py-4 px-4 flex items-center space-x-2">
                  <Image
                    src={salesHistory.image}
                    alt={salesHistory.name}
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {salesHistory.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {salesHistory.description}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-9 text-black font-medium text-sm">
                  {salesHistory.category}
                </td>
                <td className="py-4 px-4 text-black font-medium text-sm">
                  {salesHistory.price}
                </td>
                <td className="py-4 px-9 text-black font-medium text-sm">
                  {salesHistory.quantity}
                </td>
                <td className="py-4 px-4 text-orange-500 font-medium text-sm">
                  {salesHistory.id}
                </td>
                <td className="">
                  <span className="py-4 px-9 font-medium text-black text-sm">
                    {salesHistory.Discount}
                  </span>
                </td>
                <td className="">
                  <span
                    className={`py-4 px-9 font-medium text-sm ${salesHistory.statusColor}`}
                  ></span>
                  {salesHistory.paymentMethods}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default salesHIstory;
