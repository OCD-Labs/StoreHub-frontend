"use client";

import { set, useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { setUser } from "@lib/session";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@components/ui/Button";

import { Upload, Wand2, X } from "lucide-react";

// @ts-nocheck
import {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { getSession, getUser } from "@lib/session";
import { BASE_URL, CONTRACT_ADDRESS } from "@constants";
import { userWallet } from "@StoreManager";
import ImageUploader from "@components/global/ImageUploader";
import { getCookie } from "@lib/cookie";
import router from "next/router";

const CreateStore = () => {
  const session = getCookie("token");
  const user = getUser("user");
  const { wallet } = userWallet.getState();

  const router = useRouter();
  const [imageData, setImageData] = useState<any>();
  console.log(imageData);
  const [inputTag, setTagInput] = useState<string>("");

  //Select Category logic
  const [selectedCategory, setSelectedCategory] = useState("");
  const [generateTextError, setGenerateTextError] = useState("");
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  console.log(selectedCategory);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    store_account_id: "",
    profile_image_url:
      "https://res.cloudinary.com/duxnx9n5t/image/upload/fl_preserve_transparency/v1728395460/shopopn_wisbzc.jpg?_s=public-apps",
    category: "fashion",
  });
  console.log(formData, "formData");

  interface StoreDataInterface {
    store_id: string;
    user_id: string | number;
  }
  console.log(user);

  const storeData: StoreDataInterface = {
    store_id: formData.store_account_id,
    user_id: session ? user.user_id : "",
  };

  // setform data

  useMemo(() => {
    setFormData({
      ...formData,
      store_account_id: `${
        Math.random().toString(36) + formData.name
      }.v2-storehub.testnet`,
    });
  }, [formData.name]);

  // formData.profile_image_url = imageData?.fileUrl;
  const handleChange = (e: any) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // generate description with ai
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
            debugger;
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
    setValue,
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

          <ImageUploader name={formData.name} category={formData.category} />

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
            <div className="mb-4"></div>

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

            {/*Description  */}
            <div className="mb-4">
              <label
                htmlFor="store-description"
                className="block text-sm font-medium text-gray-700"
              >
                Store Description
              </label>

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
              <span>
                {generateTextError && (
                  <p className="text-red-500 mb-2 text-sm">
                    {generateTextError}
                  </p>
                )}
              </span>
              <span>
                {errors.description && (
                  <p className="text-red-500 mb-2 text-sm">
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
