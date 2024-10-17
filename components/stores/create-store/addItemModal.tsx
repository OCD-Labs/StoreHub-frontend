import { Dispatch, SetStateAction, useRef, useState } from "react";
import AddImageUpload from "./addImageUpload";
import { SubmitHandler, useForm } from "react-hook-form";
import { BASE_URL } from "@components/util/config";
import { ModalOptions, modalstore } from "@StoreManager/modalstore";
import useProfile from "@hooks/useProfile";
import { getCookie } from "@lib/cookie";

interface PropsInterface {
  userID: string | null;
  id: string | null;
  addItemStatus: any;
  options: ModalOptions;
}

const AddItemModal: React.FC<PropsInterface> = ({
  userID,
  id,
  addItemStatus,
  options,
}) => {
  type FormData = {
    name: string;
    description: string;
    price: string;
    image_urls: string[];
    cover_img_url: string;
    category: string;
    discount_percentage: string;
    supply_quantity: number;
  };
  const [images, setImages] = useState<string[]>([]);
  const session = getCookie("token");
  const updateImage = (imgurl: string) => {
    images.push(imgurl);
    console.log(images);
  };
  const [formData, setFormData] = useState<any>({
    name: "",
    description: "",
    price: "",
    image_urls: [
      "https://res.cloudinary.com/duxnx9n5t/image/upload/v1689930570/bh8ys2dnwq7ttaxs3gpz.jpg",
    ],
    cover_img_url: "string",
    category: "Fashion",
    discount_percentage: "",
    supply_quantity: 1,
  });

  const toggleModal = modalstore((state) => state.toggleModal);

  console.log(session, "user oo");

  const addStoreProducts = async () => {
    debugger;

    const itemData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      image_urls: images,
      cover_img_url: "string",
      category: formData.category,
      discount_percentage: formData.discount_percentage,
      supply_quantity: parseInt(formData.supply_quantity),
      status: "VISIBLE",
    };
    const method = options.title == "update store" ? "PATCH" : "POST";
    debugger;
    try {
      fetch(options.url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${""}`,
        },
        body: JSON.stringify(itemData),
      })
        .then((response) => {
          console.log(response.clone().json());

          return response.json();
        })
        .then((data: any) => {
          addItemStatus(data?.status, options.title);
          console.log(data, "store items");
        });
    } catch (error) {
      console.log(error, "error from call");
      addItemStatus("error");
    }
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData, "formData");
  };

  const handleFormSubmit: SubmitHandler<IFormInputs> = () => {
    // e.preventDefault();
    // debugger;
    toggleModal(options);
    addStoreProducts();
  };

  //form validation
  interface IFormInputs {
    name: string;
    description: string;
    price: string;
    image_urls: string[];
    category: string;
    discount_percentage: string;
    supply_quantity: number;
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  // handle add tag
  const [tags, setTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputTag, setTagInput] = useState<string>("");

  const handleAddTagDivClick = (): void => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const removeTag = (tag: string): void => {
    const updatedTags = tags.filter((t) => t !== tag);
    setTags(updatedTags);
  };

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " " && tags.length < 6) {
      let tag = e.currentTarget.value.replace(/\$+/g, " ").trim();
      if (tag.length > 1 && !tags.includes(tag)) {
        tag.split(",").forEach((tag) => {
          setTags([...tags, tag]);
          console.log(tags);
          setTagInput("");
        });
      }
    }
  };
  //rendering list of tags
  const renderedItems = tags?.map((tag: string) => {
    return (
      <li
        key={tag}
        className="text-black flex justify-between items-center bg-blue py-[5px] pl-[10px] pr-[8px] my-[4px] mx-[5px] rounded-[5px]"
      >
        {tag}
        <img
          className="h-4 w-4 bg-[rgba (192, 225, 233, 0)] rounded ml-2 cursor-pointer"
          src="../../assets/icons/x.svg"
          alt="remove tag"
          onClick={() => removeTag(tag)}
        />
      </li>
    );
  });

  return (
    <>
      <div className="z-30">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Product Information Section */}
            <div className="lg:col-span-2 border p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">
                Product Information
              </h3>
              <div className="mb-4">
                <label className="block text-gray-600">Product Name</label>

                <input
                  {...register("name", {
                    required: "Store name is required",
                    minLength: {
                      value: 3,
                      message: "Store name must be at least 3 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Store name cannot exceed 50 characters",
                    },
                  })}
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  placeholder="Indomie Instant Noodles"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <span>
                  {errors.name && (
                    <p className="text-red-500 mb-2">{errors.name.message}</p>
                  )}
                </span>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-gray-600">Description</label>

                <textarea
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters",
                    },
                    maxLength: {
                      value: 200,
                      message: "Description cannot exceed 200 characters",
                    },
                  })}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Try Our AI Feature"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <span>
                  {errors.description && (
                    <p className="text-red-500 mb-2">
                      {errors.description.message}
                    </p>
                  )}
                </span>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="border p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Pricing</h3>
              <div className="mb-4">
                <label className="block text-gray-600">Base Price</label>
                <input
                  {...register("price", {
                    required: "Store name is required",
                    minLength: {
                      value: 3,
                      message: "Store name must be at least 3 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Store name cannot exceed 50 characters",
                    },
                  })}
                  name="price"
                  onChange={handleChange}
                  value={formData.price}
                  placeholder="20Near"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <span>
                  {errors.name && (
                    <p className="text-red-500 mb-2">{errors.name.message}</p>
                  )}
                </span>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">
                  Discount Percentage (%)
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  onChange={handleChange}
                  value={formData.discount_percentage}
                  placeholder="10% Discount"
                />
                <span>
                  {errors.name && (
                    <p className="text-red-500 mb-2">{errors.name.message}</p>
                  )}
                </span>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Discount Type</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Select discount type</option>
                </select>
              </div>
            </div>
          </div>

          {/* Media aand category section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Media Section */}
            <div className="lg:col-span-2 border  border-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Media</h3>
              <div className="border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center rounded-lg h-40">
                <span className="text-gray-500 mb-4">No images uploaded</span>
                {/* <AddImageUpload  updateImage={updateImage} /> */}
              </div>

              <div className="flex flex-col items-center justify-center">
                {" "}
                <button className="px-4 py-2 mt-4 bg-gray-200 text-sm text-gray-700 rounded-lg">
                  Add Image
                </button>
              </div>
            </div>

            {/* Category Section */}
            <div className="border border-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Category</h3>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm">
                  Product Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                >
                  <option>Fashion</option>
                  <option>Books</option>
                  <option>Electronics</option>
                  <option>Apparels</option>
                  <option>Food & Fruits</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm">
                  Select Tags
                </label>

                <div
                  onClick={handleAddTagDivClick}
                  className="flex w-full  rounded-md border-0 px-3.5 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:mt-0 md:mb-2"
                >
                  <ul className="flex flex-wrap">
                    {tags.length === 0 && inputTag.length === 0 && (
                      <p className="absolute mt-[0.65rem] md:mt-[0.5rem] text-gray-400">
                        Press space to add a tag
                      </p>
                    )}{" "}
                    {renderedItems}
                    <input
                      onKeyUp={addTag}
                      type="text"
                      className={`outline-none py-2 flex flex-1 text-base ${
                        tags.length >= 6 ? "hidden" : "block"
                      }`}
                      onChange={(e) => setTagInput(e.target.value)}
                      value={inputTag.toLocaleLowerCase()}
                      ref={inputRef}
                    />
                  </ul>
                </div>
                {tags.includes(inputTag) && (
                  <p className="text-red-500">
                    {inputTag.toLocaleUpperCase()} already exists
                  </p>
                )}
                {tags.length >= 6 && (
                  <p className="text-yellow-500">
                    Maximum tag limit reached (6)
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 border p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Product Details</h3>
              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded-lg"
                  placeholder="ID"
                />
                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded-lg"
                  placeholder="Colors"
                />
                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded-lg"
                  placeholder="Quantity"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end space-x-4">
            {/* add the close modal function here */}
            <button className="px-4 py-2 bg-gray-200 rounded-lg">
              Discard Items
            </button>
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded-lg"
              onClick={handleSubmit(handleFormSubmit)}
            >
              {options.title}
            </button>
          </div>

          {/* <div className="mt-6 md:mt-0 lg:w-[90%]">
            <span className="lg:flex lg:justify-end gap-3 md:py-4">
              <label>Item Name</label>
              <div className="lg:w-[75%] w-full">
                <input
                  {...register("name", {
                    required: "Store name is required",
                    minLength: {
                      value: 3,
                      message: "Store name must be at least 3 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Store name cannot exceed 50 characters",
                    },
                  })}
                  name="name"
                  onChange={handleChange}
                  value={formData.name}
                  placeholder="Wrist watch"
                  className="focus:border-blue block w-full md:gap-[30px] rounded-md border-1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 lg:my-0"
                />
                <span>
                  {errors.name && (
                    <p className="text-red-500 mb-2">{errors.name.message}</p>
                  )}
                </span>
              </div>
            </span>
            <span className="lg:flex gap-3 lg:py-4 lg:justify-end">
              <label>Description</label>
              <div className="w-full lg:w-[75%]">
                <textarea
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters",
                    },
                    maxLength: {
                      value: 200,
                      message: "Description cannot exceed 200 characters",
                    },
                  })}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Best farmland produces at your door step"
                  className="block w-full md:gap-[30px] rounded-md border-1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 lg:my-0"
                />
                <span>
                  {errors.description && (
                    <p className="text-red-500 mb-2">
                      {errors.description.message}
                    </p>
                  )}
                </span>
              </div>
            </span>

            
            <span className="lg:flex gap-3 md:py-4 md:justify-end md:items-center">
              <label>Price</label>
              <div className="lg:w-[75%] w-full">
                <input
                  {...register("price", {
                    required: "Store name is required",
                    minLength: {
                      value: 3,
                      message: "Store name must be at least 3 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Store name cannot exceed 50 characters",
                    },
                  })}
                  name="price"
                  onChange={handleChange}
                  value={formData.price}
                  placeholder="Farmland Groceries Store"
                  className="focus:border-blue block w-full md:gap-[30px] rounded-md border-1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 lg:my-0"
                />
                <span>
                  {errors.name && (
                    <p className="text-red-500 mb-2">{errors.name.message}</p>
                  )}
                </span>
              </div>
            </span>
            <span className="flex flex-col md:items-center md:py-4">
              <label className="mr-2 md:mr-4">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="rounded-md border-1 px-2.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 lg:my-0"
              >
                <option>Fashion</option>
                <option>Books</option>
                <option>Electronics</option>
                <option>Apparels</option>
                <option>Food & Fruits</option>
              </select>
            </span>
            <span className="lg:flex gap-3 md:py-4 lg:justify-end lg:items-center">
              <label>Discount</label>
              <div className="lg:w-[75%] w-full">
                <input
                  //   {...register("discount_percentage", {
                  //     required: "Store name is required",
                  //     minLength: {
                  //       value: 3,
                  //       message: "Store name must be at least 3 characters",
                  //     },
                  //     maxLength: {
                  //       value: 50,
                  //       message: "Store name cannot exceed 50 characters",
                  //     },
                  //   })}
                  name="discount_percentage"
                  onChange={handleChange}
                  value={formData.discount_percentage}
                  placeholder="Farmland Groceries Store"
                  className="focus:border-blue block w-full md:gap-[30px] rounded-md border-1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 lg:my-0"
                />
                <span>
                  {errors.name && (
                    <p className="text-red-500 mb-2">{errors.name.message}</p>
                  )}
                </span>
              </div>
            </span>
            <span className="lg:flex gap-3 lg:py-4 lg:justify-end lg:items-center">
              <label>Supply Quatntity</label>
              <div className="lg:w-[75%] w-full">
                <input
                  //   {...register("name", {
                  //     required: "Store name is required",
                  //     minLength: {
                  //       value: 3,
                  //       message: "Store name must be at least 3 characters",
                  //     },
                  //     maxLength: {
                  //       value: 50,
                  //       message: "Store name cannot exceed 50 characters",
                  //     },
                  //   })}
                  name="supply_quantity"
                  onChange={handleChange}
                  type="number"
                  min={1}
                  value={parseInt(formData.supply_quantity)}
                  placeholder="Farmland Groceries Store"
                  className="focus:border-blue block w-full md:gap-[30px] rounded-md border-1 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 lg:my-0"
                />
                <span>
                  {errors.name && (
                    <p className="text-red-500 mb-2">{errors.name.message}</p>
                  )}
                </span>
              </div>
            </span>

            <span className="flex lg:flex gap-3 lg:py-4 lg:justify-center justify-center items-center lg:items-center">
              <div>Product Images</div>
              <AddImageUpload updateImage={updateImage} />
              <AddImageUpload updateImage={updateImage} />
              <AddImageUpload updateImage={updateImage} />
            </span>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleSubmit(handleFormSubmit)}
              className="rounded-[10px] py-4 text-white bg-[#161616] text-lg w-full sm:w-3/4 sm:mx-auto my-6 sm:my-12"
            >
              {options.title}
            </button>
          </div> */}
        </form>
      </div>
    </>
  );
};

export default AddItemModal;
