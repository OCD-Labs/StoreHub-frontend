import { Dispatch, SetStateAction, useRef, useState } from "react";
import AddImageUpload from "./addImageUpload";
import { set, SubmitHandler, useForm } from "react-hook-form";
// import { BASE_URL } from "@components/util/config";
import { ModalOptions, modalstore } from "@StoreManager/modalstore";
import useProfile from "@hooks/useProfile";
import { getCookie } from "@lib/cookie";
import { Wand2 } from "lucide-react";
import { Button } from "@components/ui/Button";
import { uploadImagesToCloudinary } from "@lib/uploadService";

interface PropsInterface {
  userID: string | null;
  id: string | null;
  addItemStatus: any;
  options: ModalOptions;
  setloading: Dispatch<SetStateAction<boolean>>;
}

const AddItemModal: React.FC<PropsInterface> = ({
  userID,
  id,
  addItemStatus,
  options,
  setloading,
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
  const [imageError, setImageError] = useState("");
  const [imageLoader, setImageLoader] = useState(false);
  const [generateTextError, setGenerateTextError] = useState("");
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
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
  console.log(formData);

  const toggleModal = modalstore((state) => state.toggleModal);

  const addStoreProducts = async () => {
    setloading(true);
    setImageLoader(true);
    const imageArray = await uploadImagesToCloudinary(images);
    debugger;

    const itemData = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      image_urls: imageArray,
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
          Authorization: `Bearer ${session}`,
        },
        body: JSON.stringify(itemData),
      })
        .then((response) => {
          console.log(response.clone().json());

          return response.json();
        })
        .then((data: any) => {
          addItemStatus(data?.status, options.title);
          setImageLoader(false);
          console.log(data, "store items");
        });
      setloading(false);
    } catch (error) {
      console.log(error, "error from call");
      addItemStatus("error");
    }
  };
  console.log(images, "images");

  // generate description
  const generateDesc = async (name: string, category: string) => {
    setGenerateTextError("");
    setIsGeneratingDescription(true);
    try {
      const response = await fetch("/api/generatetext", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          category: category,
        }),
      });
      if (!response.ok) {
        console.log(response, "response");
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setValue("description", data.message, { shouldValidate: true });
      setFormData({ ...formData, description: data.message });

      console.log(data, "ai_response");
    } catch (error) {
      setGenerateTextError(
        "An error occurred while generating the description. Please try again later."
      );
    } finally {
      setIsGeneratingDescription(false);
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
    setValue,
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
              <div className="relative">
                <textarea
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters",
                    },
                    maxLength: {
                      value: 1000,
                      message: "Description cannot exceed 200 characters",
                    },
                  })}
                  name="description"
                  onChange={handleChange}
                  // placeholder="Best farmland produces at your door step"
                  placeholder="Manually Describe Your Store or Utilize Our AI"
                  className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {formData.name && formData.category && !formData.description ? (
                  <Button
                    type="button"
                    size="sm"
                    className="absolute right-2 top-2"
                    onClick={() =>
                      generateDesc(formData.name, formData.category)
                    }
                    disabled={isGeneratingDescription}
                  >
                    {isGeneratingDescription ? (
                      "Generating..."
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        AI Generate
                      </>
                    )}
                  </Button>
                ) : null}
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
                  {...register("discount_percentage", {
                    required: "Store name is required",

                    maxLength: {
                      value: 4,
                      message: "can't be more than 100%",
                    },
                  })}
                  type="number"
                  inputMode="numeric"
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
            </div>
          </div>

          {/* Media aand category section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Media Section */}
            <div className="lg:col-span-2 border border-gray-200 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Media</h3>
              <div className="border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center rounded-lg h-40 relative">
                <span className="text-gray-500 mb-4 flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div>
                    {" "}
                    {images.length === 0
                      ? "No images uploaded"
                      : `${images.length} images selected`}
                  </div>
                  <p className="text-sm text-orange-600">
                    You can select Multiple images
                  </p>
                </span>
                <input
                  type="file"
                  multiple
                  accept=".png, .jpg, .jpeg, .gif"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={async (e) => {
                    if (e.target.files && e.target.files.length <= 3) {
                      setImageError("");
                      const files = Array.from(e.target.files);
                      const validFiles = files.filter(
                        (file) =>
                          file.size <= 2000000 && file.type.includes("image/")
                      );
                      if (validFiles.length !== files.length) {
                        setImageError(
                          "One or more images failed to upload due to size or type restrictions."
                        );
                        return;
                      }
                      const imagesUrls = await Promise.all(
                        validFiles.map(async (file) => {
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          return new Promise((resolve, reject) => {
                            reader.onload = () =>
                              resolve(reader.result as string);
                            reader.onerror = reject;
                          });
                        })
                      );
                      setImages(imagesUrls as string[]);
                    } else {
                      setImageError("Can't upload more than 5 images");
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap mt-4">
                {images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="uploaded image"
                    className="w-20 h-20 object-cover mr-2 mb-2"
                  />
                ))}
              </div>
              {imageError && (
                <p className="text-sm text-red-500">{imageError}</p>
              )}
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
              <label>quantity</label>
              <input
                {...register("supply_quantity", {
                  required: "Store name is required",
                })}
                name="supply_quantity"
                onChange={handleChange}
                value={formData.supply_quantity}
                placeholder="20Near"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-center  md:justify-end space-x-4">
            {/* add the close modal function here */}
            <button className="px-2 md:px-4 py-2 bg-gray-200 text-xs md:text-base rounded-lg">
              Discard Items
            </button>
            <button
              className=" py-2 bg-orange-500 text-white text-xs md:text-base px-2 md:px-4 rounded-lg"
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
