"use client";

const Inventory = () => {
  const ID = "123PDWD";

  const data = [
    {
      name: "Celestial Luster",
      category: "jewelry",
      id: 25,
      quantity: 20,
      status: "Active",
      img: "../../assets/icons/product-img.svg",
      price: "$500",
    },
    {
      name: "Celestial Luster",
      category: "jewelry",
      id: 25,
      quantity: 20,
      status: "Active",
      img: "../../assets/icons/product-img.svg",
      price: "$500",
    },
    {
      name: "Celestial Luster",
      category: "jewelry",
      id: 25,
      quantity: 20,
      status: "Active",
      img: "../../assets/icons/product-img.svg",
      price: "$500",
    },
    {
      name: "Celestial Luster",
      category: "jewelry",
      id: 25,
      quantity: 20,
      status: "Active",
      img: "../../assets/icons/product-img.svg",
      price: "$500",
    },
    {
      name: "Celestial Luster",
      category: "jewelry",
      id: 25,
      quantity: 20,
      status: "Active",
      img: "../../assets/icons/product-img.svg",
      price: "$500",
    },
    {
      name: "Celestial Luster",
      category: "jewelry",
      id: 25,
      quantity: 20,
      status: "Active",
      img: "../../assets/icons/product-img.svg",
      price: "$500",
    },
    {
      name: "Celestial Luster",
      category: "jewelry",
      id: 25,
      quantity: 20,
      status: "Active",
      img: "../../assets/icons/product-img.svg",
      price: "$500",
    },
    {
      name: "Celestial Luster",
      category: "jewelry",
      id: 25,
      quantity: 20,
      status: "Active",
      img: "../../assets/icons/product-img.svg",
      price: "$500",
    },
    {
      name: "Celestial Luster",
      category: "jewelry",
      id: 25,
      quantity: 20,
      status: "Active",
      img: "../../assets/icons/product-img.svg",
      price: "$500",
    },
    {
      name: "Celestial Luster",
      category: "jewelry",
      id: 25,
      quantity: 20,
      status: "Active",
      img: "../../assets/icons/product-img.svg",
      price: "$500",
    },
    {
      name: "Celestial Luster",
      category: "jewelry",
      id: 25,
      quantity: 20,
      status: "Active",
      img: "../../assets/icons/product-img.svg",
      price: "$500",
    },
    {
      name: "Celestial Luster",
      category: "jewelry",
      id: 25,
      quantity: 20,
      status: "Active",
      img: "../../assets/icons/product-img.svg",
      price: "$500",
    },
    {
      name: "Celestial Luster",
      category: "jewelry",
      id: 25,
      quantity: 20,
      status: "Active",
      img: "../../assets/icons/product-img.svg",
      price: "$500",
    },
    {
      name: "Celestial Luster",
      category: "jewelry",
      id: 25,
      quantity: 20,
      status: "Active",
      img: "../../assets/icons/product-img.svg",
      price: "$500",
    },
  ];

  const renderedItems = data.map((product, key) => {
    return (
      <>
        <div className="flex justify-between items-center py-3">
          <span className="flex gap-2 items-center md:w-[30%] w-[15em] text-right mr-4 whitespace-nowrap">
            <img src="../../assets/icons/dot.svg" alt="dot" className="w-[5px]"/>
            <p>{product.name}</p>
            <img src={product.img} alt="product" className="w-[25px]"/>
          </span>
          <p className="md:w-[15%] w-[90px] mr-6 md:mr-0">{product.category}</p>
          <p className="md:w-[15%] w-[90px]">{product.id}</p>
          <p className="md:w-[15%] w-[90px]">{product.quantity}</p>
          <p className="md:w-[15%] w-[90px]">{product.price}</p>
          <p className="md:w-[15%] w-[90px]">{product.status}</p>
          <img src='../../assets/icons/three-dot.svg' alt="see more" className=""/>
        </div>
        <hr className="w-[95%] mx-auto"/>
      </>
    );
  });

  return (
    <main className="mb-6">
      <p className="text-[20px] font-bold text-black">
        Shine, Shimmer, Glimmer
      </p>
      <span className="flex my-4">
        <p>Store ID : {ID} </p>
        <span className="ml-4">
          <p>Verified</p>
        </span>
      </span>
      <div className="md:flex md:gap-5">
        <section className="flex gap-5 justify-between md:justify-start md:flex-col md:gap-5 mb-6 md:py-6">
          <img src="../../assets/icons/Dashboard.svg" alt="Dashboard" />
          <img src="../../assets/icons/user.svg" alt="user" />
          <img src="../../assets/icons/notification.svg" alt="notification" />
          <img src="../../assets/icons/money.svg" alt="money" />
          <img src="../../assets/icons/settings.svg" alt="settings" />
          <img src="../../assets/icons/trash.svg" alt="settings" />
        </section>

        <section className="md:flex-1">
          <div className="md:flex-1 flex justify-between items-center sticky top-0 bg-white py-4">
            <p className="text-[18px] font-bold text-black mr-6">Products</p>
            <div className="flex gap-3 md:gap-5">
              <select className="block py-2 rounded-md border-0 px-1 md:px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm md:my-0">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </select>
              <select className="block py-2 rounded-md border-0 px-1 md:px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 md:my-0">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
              </select>
              <button className="block py-2 rounded-md border-0 px-1 md:px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 md:my-0">
                Add Items
              </button>
            </div>
          </div>

          <div className="border py-4 px-2 md:p-6 flex flex-col overflow-x-scroll scroll-smooth ">
            <section className="flex justify-between pb-2 flex-0-0-auto scroll-snap-align-start min-w-[500px]">
              <p className="md:w-[30%] w-[15em] mr-4">Product Name</p>
              <p className="md:w-[15%] w-[90px] mr-6 md:mr-0">Category</p>
              <p className="md:w-[15%] w-[90px]">ID</p>
              <p className="md:w-[15%] w-[90px]">Quatity</p>
              <p className="md:w-[15%] w-[90px]">Price</p>
              <p className="md:w-[15%] w-[90px]">Staus</p>
            </section>
            <hr />
            <section className="flex-0-0-auto scroll-snap-align-start min-w-[500px]">{renderedItems}</section>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Inventory;
