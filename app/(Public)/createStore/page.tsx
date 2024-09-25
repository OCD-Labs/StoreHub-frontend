"use client";

import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { setUser } from "@components/util/session";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Upload, X } from "lucide-react";

// @ts-nocheck
import { useState, useEffect, useRef, useContext } from "react";
import { getSession, getUser } from "@components/util/session";
import { BASE_URL, CONTRACT_ADDRESS } from "@components/util/config";
import { userWallet } from "@app/StoreManager";
import ImageUploader from "@components/global/ImageUploader";
import { getCookie } from "@components/util/cookie";

const CreateStore = () => {
  const session = getCookie("token");
  const user = getUser("user");
  const { wallet } = userWallet.getState();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [imageData, setImageData] = useState<any>();
  console.log(imageData)
  const [inputTag, setTagInput] = useState<string>("");

  //Select Category logic
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log(selectedCategory)
  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Books",
    "Toys",
  ];

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    store_account_id: "",
    profile_image_url: "",
    category: "",
    // category: "fashion",
  });

  interface StoreDataInterface {
    store_id: string;
    user_id: string | number;
  }
  console.log(user);

  const storeData: StoreDataInterface = {
    store_id: formData.store_account_id,
    user_id: session ? user.user_id : "",
  };
  console.log(session, "session");
  formData.profile_image_url = imageData?.fileUrl;
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (): void => {
    console.log(formData, "formData");
    // debugger
    createNewStore();
  };

  // set Image data
  const handleImageData = (data: string) => {
    setImageData(data);
    console.log(data, "image data at store");
  };

  //crete new store
  const createNewStore = (): void => {
    formData.store_account_id = `${formData.store_account_id}.v2-storehub.testnet`;
    // debugger
    if (session) {
      try {
        setUser("storeData", JSON.stringify(storeData));
        fetch(BASE_URL + `/inventory/stores`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session}`,
          },
          body: JSON.stringify(formData),
        })
          .then((response) => {
            return response.json();
          })
          .then((data: StoreResult) => {
            // TODO: Store data in Context or Redux
            console.log(data);
            if (data?.status !== "error") {
              toast("Successfully created your store!");
              setTimeout(() => {
                router.push(
                  `/inventory/Itemsdashboard?id=${
                    data.data.result.store.id
                  }&name=${data.data.result.store.name}&user=${
                    session ? user.user_id : ""
                  }`
                );
              }, 2000);
            } else {
              toast("failed to create your store. Try again!");
            }
            // debugger

            wallet
              .callMethod({
                contractId: CONTRACT_ADDRESS,
                method: "create_store",
                args: { store_id: formData.store_account_id },
              })
              .then((data: any) => {
                console.log(data);
              })
              .catch((error: any) => console.log(error));
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  //handle form validation

  interface IFormInputs {
    name: string;
    category: string;
    description: string;
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  // handle add tag
  const [tags, setTags] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

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
    <main className="container py-7">
      <ToastContainer />
      <form
        className="max-w-4xl mx-auto bg- overflow-hidden"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/*Store Title */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Create Your Store</h2>
          <p className="text-gray-400 text-[16px] mb-4">
            Fill in the details to set up your new store.
          </p>
        </div>

        <div className="lg:flex lg:justify-between ">
          {/*Image uploader component */}

          <ImageUploader />

          {/* <ImageUploader onUpdateImage={handleImageData} /> */}

          {/*Store Form */}
          <div className="mt-6 md:mt-0 lg:w-[50%] ">
            {/*Store Name Input */}
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Store Name
            </label>
            <div className="mb-4">
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
                onInput={handleChange}
                value={formData.name}
                placeholder="Farmland Groceries Store"
                className=" w-full p-3 border border-gray-300 rounded-lg focus:outline-none"
              />
              <span>
                {errors.name && (
                  <p className="text-red-500 mb-2">{errors.name.message}</p>
                )}
              </span>
            </div>

            {/*Category  */}
            <div className="mb-4">
              {/* <label
                htmlFor="store-category"
                className="block text-sm font-medium text-gray-700"
              >
                Store Category
              </label> */}
              {/* <div className="relative">
                <button
                  type="button"
                  className="mt-1 relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-3 text-left cursor-pointer focus:outline-none focus:ring-1"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span className="block text-gray-400 truncate">
                    {selectedCategory || "Select a category"}
                  </span>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <span className="border-4 border-transparent border-t-gray-400 ml-1"></span>
                  </span>
                </button>
                {isDropdownOpen && (
                  <ul className="absolute z-10 mt-1 w-full bg-white max-h-60 rounded-lg py-1 border-[0.5px] border-gray-700 text-base overflow-auto focus:outline-none sm:text-sm">
                    {categories.map((category) => (
                      <li
                        key={category}
                        className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-black hover:text-white"
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                )}
              </div> */}
            </div>

            <div className="mb-4">
              <label
                htmlFor="store-category"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                Store Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className=" w-full  bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option className="text-gray-300" value="select">
                  Select a category
                </option>
                <option>Fashion</option>
                <option>Books</option>
                <option>Electronics</option>
                <option>Apparels</option>
                <option>Food & Fruits</option>
              </select>
            </div>

            {/*Store ID  */}
            <div className="mb-4">
              <label
                htmlFor="store-tags"
                className="block text-sm mb-2 font-medium text-gray-700"
              >
                Store Account ID
              </label>

              <input
                name="store_account_id"
                value={formData.store_account_id}
                onChange={handleChange}
                placeholder="farm-land"
                className="mt-1 block w-full px-3 py-3 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              ></input>
            </div>

            {/*Description  */}
            <div className="mb-4">
              <label
                htmlFor="store-description"
                className="block text-sm font-medium text-gray-700"
              >
                Store Description
              </label>

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
                // placeholder="Best farmland produces at your door step"
                placeholder="Manually Describe Your Store or Utilize Our AI"
                className="mt-2 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
              <span>
                {errors.description && (
                  <p className="text-red-500 mb-2">
                    {errors.description.message}
                  </p>
                )}
              </span>
            </div>

            {/*Add Tags  */}
            <div className="">
              <label
                htmlFor="store-tags"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Store Tags
              </label>

              <div
                onClick={handleAddTagDivClick}
                className="flex w-full  rounded-md border-0 px-3.5 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:mt-0 md:mb-2"
              >
                <ul className="flex flex-wrap">
                  {tags.length === 0 && inputTag.length === 0 && (
                    <p className="absolute mt-[0.65rem] md:mt-[0.5rem] text-gray-400">
                      Press space after each word to add a tag
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
                <p className="text-yellow-500">Maximum tag limit reached (6)</p>
              )}
            </div>
          </div>
        </div>

        {/*Submit Button */}
        <div className="flex justify-center items-center">
          <Button
            onClick={handleSubmit(onSubmit)}
            className="rounded-[10px] py-4 text-white bg-[#161616] text-lg w-full sm:w-3/4 sm:mx-auto my-6 sm:my-12"
          >
            Create Store
          </Button>
        </div>
      </form>
    </main>
  );
};

export default CreateStore;
