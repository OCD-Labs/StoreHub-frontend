import SearchIcon from "@public/assets/images/SearchIcon.png";
import { PlusIcon } from "@heroicons/react/24/solid";
import filter from "../../../../../public/assets/icons/filter.svg";
import Image from "next/image";

const topSellingProduct = () => {

    // Dummy Data
  const topSellingProduct = [
    {
      image: "/assets/images/productImage1.png",
      name: "Barilla",
      description: "Pasta",
      id: "WDT-444",
      category: "Food",
      quantity: 240,
      price: "$1.25",
      status: "In Stock",
      statusColor: "text-green-500 ",
      statusColorDot: "bg-green-500",
    },
    {
      image: "/assets/images/productImage2.png",
      name: "Indomie",
      description: "Noodles",
      id: "WDT-768",
      category: "Food",
      quantity: 190,
      price: "$1.25",
      status: "In Stock",
      statusColor: "text-green-500",
      statusColorDot: "bg-green-500",
    },
    {
      image: "/assets/images/productImage3.png",
      name: "Pack pasta",
      description: "Pasta",
      id: "WDT-890",
      category: "Food",
      quantity: 190,
      price: "$1.25",
      status: "Out of Stock",
      statusColor: "text-red-500",
      statusColorDot: "bg-red-500",
    },
    {
      image: "/assets/images/productImage4.png",
      name: "Heirloom",
      description: "Apples",
      id: "WDT-567",
      category: "Food",
      quantity: 190,
      price: "$1.25",
      status: "Low Stock",
      statusColor: "text-yellow-500",
      statusColorDot: "bg-yellow-500",
    },
  ];

  return (
    <div className="px-10">
      {/* Top Section with Filters and Search */}
      <div className="flex items-center rounded-lg justify-between bg-[#FCF8F2] py-2 px-4 shadow-sm">
        {/* Left section with icons */}
        <div className="flex items-center space-x-2">
          <button className="p-2 ">
            <PlusIcon className="h-5 w-5 text-black" />
          </button>

          <Image src={filter} alt="filter" width={25} height={25} />
        </div>

        {/* Search bar */}
        <div className="relative">
          <div className="relative">
            <input
              type="text"
              className="bg-white border border-gray-300 rounded-lg pl-10 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-gray-400"
              placeholder="Search"
              value=""
            />
            <div className="absolute left-4 top-[13px]">
              <Image
                src={SearchIcon}
                height={17}
                width={15}
                alt="searchIcon"
                className="text-black"
              />
            </div>
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
                  <th className="py-3 px-4 border-b">ID</th>
                  <th className="py-3 px-4 border-b">Category</th>
                  <th className="py-3 px-4 border-b">Quantity</th>
                  <th className="py-3 px-4 border-b">Pricing</th>
                  <th className="py-3 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody className=" border-b">
                {topSellingProduct.map((topSellingProduct, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-4 px-4">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="py-4 px-4 flex items-center space-x-2">
                      <Image
                        src={topSellingProduct.image}
                        alt={topSellingProduct.name}
                        width={40}
                        height={40}
                      />
                      <div>
                        <p className="font-medium text-gray-800">
                          {topSellingProduct.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {topSellingProduct.description}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-orange-500 font-medium text-sm">
                      {topSellingProduct.id}
                    </td>
                    <td className="py-4 px-4 text-black font-medium text-sm">
                      {topSellingProduct.category}
                    </td>
                    <td className="py-4 px-4 text-black font-medium text-sm">
                      {topSellingProduct.quantity}
                    </td>
                    <td className="py-4 px-4 text-black font-medium text-sm">
                      {topSellingProduct.price}
                    </td>
                    <td className="flex mb-4 items-center">
                      <span
                        className={`py-4 px-4 text-[10px] ${topSellingProduct.statusColor}`}
                      >
                        {topSellingProduct.status}{" "}
                      </span>{" "}
                      <span
                        className={`ml-1  w-1 h-1 rounded-full ${topSellingProduct.statusColorDot}`}
                      ></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </div>
  );
};

export default topSellingProduct;
