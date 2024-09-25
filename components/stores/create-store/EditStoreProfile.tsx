import { useState, useRef } from "react";
import { handleImageUpload } from "../../../app/services/uploadService";
import { BASE_URL } from "@components/util/config";
import ImageUploader from "@components/global/ImageUploader";
import "../../../styles/inventory.css";

interface FormData {
  name: string;
  description: string;
  tags: string[];
  profile_image_url: string;
  category: string;
}

type EditStoreProfileProps = {
  hideModal: (isOpen: boolean) => void;
  session: Session | undefined;
};

export const EditStoreProfile: React.FC<EditStoreProfileProps> = ({
  hideModal,
  session,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    tags: [],
    profile_image_url: "",
    category: "",
  });

  const [loading, setloading] = useState<boolean>(false);

  //tag feature
  const [inputTag, setTagInput] = useState<string>("");
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

  // set Image data
  const handleChange = (e: any) => {
    formData.profile_image_url = imageData?.secure_url;

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [imageData, setImageData] = useState<any>();

  const handleImageData = (data: ImageData) => {
    setImageData(data);
    console.log(data, "image data at store");
  };

  const store_id: number = 48;

  //handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    formData.tags = tags;
    setloading(true);
    e.preventDefault();
    // submitting formdata to the server.
    try {
      fetch(BASE_URL + `/users/${""}/stores/${store_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${""}`,
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setloading(false);
          hideModal(false);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  //component jsx
  return (
    <div className="modal-content h-[90vh] md:h-fit w-[90%] mt-3">
      <main>
        <form className="text-dark">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-black">
              Update Store Profile
            </h2>
            <span
              onClick={() => hideModal(false)}
              className="text-lg cursor-pointer p-2"
            >
              X
            </span>
          </div>

          <div className="md:flex md:justify-between">
            <ImageUploader onUpdateImage={handleImageData} />

            <div className="mt-6 md:mt-0 md:w-[60%] sm:w-[55%]">
              <span className="md:flex gap-3 md:py-4 md:justify-end md:items-center">
                <label>Store Name</label>
                <div className="md:w-[75%] w-full">
                  <input
                    name="name"
                    onInput={handleChange}
                    value={formData.name}
                    placeholder="Farmland Groceries Store"
                    className="focus:border-blue block w-full md:gap-[30px] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:my-0"
                  />
                </div>
              </span>

              <div className="flex justify-between md:justify-end">
                <span className="flex flex-col md:flex-row md:items-center w-[45%] md:w-[48%] mr-4 md:py-4 md:justify-end">
                  <label className="mr-2 md:mr-4">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="md:w-[55%] lg:w-[57%] block rounded-md border-0 px-2.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:my-0"
                  >
                    <option>Fashion</option>
                    <option>Books</option>
                    <option>Electronics</option>
                    <option>Apparels</option>
                    <option>Food & Fruits</option>
                  </select>
                </span>
                <span className="flex flex-col md:flex-row md:items-center w-[45%] sm:w-[43%] md:w-[45%] md:py-4 md:justify-end">
                  <label className="mr-2 md:mr-4">Store ID</label>
                  <input
                    name="store_account_id"
                    // value={formData.store_account_id}
                    onChange={handleChange}
                    placeholder="Leave here blank, it will auto generated after you create store"
                    className="md:w-[55%] lg:w-[57%] block rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:my-0"
                  ></input>
                </span>
              </div>
              <span className="md:flex gap-3"></span>

              <span className="md:flex gap-3 md:py-4 md:justify-end">
                <label>Description</label>
                <div className="w-full md:w-[75%]">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Best farmland produces at your door step"
                    className="block w-full md:gap-[30px] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:my-0"
                  />
                </div>
              </span>

              <span className="md:flex gap-3 md:py-4 justify-end">
                <label>Add Tags</label>
                <div className="md:w-[75%]">
                  <div
                    onClick={handleAddTagDivClick}
                    className="flex w-full  md:gap-[30px] rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 my-2 md:mt-0 md:mb-2"
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
                    <p className="text-yellow-500">
                      Maximum tag limit reached (6)
                    </p>
                  )}
                </div>
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center">
            <button
              onClick={handleSubmit}
              className="rounded-[10px] py-4 text-white bg-[#161616] text-lg w-full sm:w-3/4 sm:mx-auto my-6 sm:my-12"
            >
              {loading ? "Loading..." : "Update Store Profile"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};
