import { PlusIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import search from "@public/assets/icons/search.svg";
import filter from "@public/assets/icons/filter.svg";

const OrdersInsight = () => {
  const productsOverview = [
    {
      image: "/assets/images/productImage1.png",
      name: "Barilla",
      description: "Pasta",
      id: "SDT-444",
      date: "06-07-2024",
      price: "$2.50",
      deliveryStatus: "processing",
      paymentMethod: "Near",
      statusColor: "text-purple-500 ",
      statusColorDot: "bg-green-500",
    },
    {
      image: "/assets/images/productImage1.png",
      name: "Barilla",
      description: "Pasta",
      id: "SDT-444",
      date: "06-07-2024",
      price: "$2.50",
      deliveryStatus: "processing",
      paymentMethod: "Near",
      statusColor: "text-yellow-500 ",
      statusColorDot: "bg-green-500",
    },
    {
      image: "/assets/images/productImage1.png",
      name: "Barilla",
      description: "Pasta",
      id: "SDT-444",
      date: "06-07-2024",
      price: "$2.50",
      deliveryStatus: "processing",
      paymentMethod: "Near",
      statusColor: "text-orange-500 ",
      statusColorDot: "bg-green-500",
    },
    {
      image: "/assets/images/productImage1.png",
      name: "Barilla",
      description: "Pasta",
      id: "SDT-444",
      date: "06-07-2024",
      price: "$2.50",
      deliveryStatus: "processing",
      paymentMethod: "Near",
      statusColor: "text-green-500 ",
      statusColorDot: "bg-green-500",
    },
  ];

  return (
    <div className="px-5">
      <section>
        {/* Top Section with Filters and Search */}
        <div className="flex items-center rounded-lg justify-between bg-[#FCF8F2] py-1 px-4 shadow-sm">
          {/* Left section with icons */}
          <div className="flex items-center space-x-2">
            <button className="p-2 ">
              <PlusIcon className="h-5 w-5 text-black" />
            </button>

            <Image alt="Filter" src={filter} width={25} height={25} />
          </div>

          {/* Search bar */}
          <div className="relative">
            <div className="relative">
              <input
                type="text"
                className="bg-white border border-gray-300 rounded-lg pl-10 pr-8 py-1 focus:outline-none focus:ring-2 focus:ring-gray-400"
                placeholder="Search"
                value=""
              />
              <div className="absolute left-4 top-[13px] hidden lg:block">
                <Image
                  alt="search"
                  src={search}
                  height={17}
                  width={15}
                  className="text-black"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table  */}
      <section className="mt-11">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg ">
            <thead>
              <tr className="text-left text-gray-500 text-sm">
                <th className="py-3 px-4 border-b">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="py-3 px-4 border-b">Product</th>
                <th className="py-3 px-4 border-b">Order ID</th>
                <th className="py-3 px-4 border-b">Order Date</th>
                <th className="py-3 px-4 border-b">Price</th>
                <th className="py-3 px-4 border-b">Delivery Status</th>
                <th className="py-3 px-4 border-b">Payment Method</th>
              </tr>
            </thead>
            <tbody className=" border-b">
              {productsOverview.map((product, index) => (
                <tr key={index} className="border-t">
                  <td className="py-4 px-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="py-4 px-4 flex items-center space-x-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {product.description}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-orange-500 font-medium text-sm">
                    {product.id}
                  </td>
                  <td className="py-4 px-4 text-[#00000] font-medium text-sm">
                    {product.date}
                  </td>
                  <td className="py-4 px-4 text-black font-semibold text-sm">
                    {product.price}
                  </td>
                  <td className="py-4 px-4 text-[10px] font-medium">
                    <span className=" bg-blue p-1 px-5 rounded-2xl text-tremor-brand-subtle">
                      {" "}
                      {product.deliveryStatus}
                    </span>
                  </td>
                  <td className="flex mb-4 items-center">
                    <span className={`py-4 px-4  ${product.statusColor}`}>
                      {product.paymentMethod}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default OrdersInsight;
