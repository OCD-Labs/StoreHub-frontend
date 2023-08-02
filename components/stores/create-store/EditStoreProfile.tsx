import { useState, useRef } from "react";
import { handleImageUpload } from "../../../app/services/uploadService";
import { BASE_URL } from "@components/util/config";

interface FormData {
  name: string;
  description: string;
  // tags: string[];
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
    //   tags: [],
    profile_image_url: "",
    category: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [imageUploadComplete, setImageUploadComplete] = useState<boolean>(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleHideModal = () => {
    hideModal(false);
  };

  const handleImgUpload = async (file: File) => {
    try {
      const fileData = await handleImageUpload(file);
      console.log(fileData?.secure_url);
      formData.profile_image_url = fileData?.secure_url || "";
      return true;
    } catch (error) {
      console.error("Error uploading image:", error);
      return false;
    }
  };

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

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

  const store_id: number = 48;

  //handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedFile) {
      const isUploadSuccessful = await handleImgUpload(selectedFile);

      if (isUploadSuccessful) {
        console.log(JSON.stringify(formData));
        console.log(formData, "form data");
        // submitting formdata to the server.
        try {
          fetch(
            BASE_URL +
              `/users/${
                session ? session.user.user_id : ""
              }/stores/${store_id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session ? session.access_token : ""}`,
              },
              body: JSON.stringify(formData),
            }
          )
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.log(error));
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Image upload failed. Please try again.");
      }
    } else {
      console.log("Please select an image before submitting the form.");
    }
  };

  //component jsx
  return (
    <div className="modal-content w-[100%]">
      <div className="flex justify-between items-center lg:px-20px">
        <h2 className="text-lg font-bold text-black">Add Item</h2>
        <span onClick={handleHideModal} className="text-lg cursor-pointer p-2">X</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          name="profile_image_url"
          onChange={(e) => handleImageInputChange(e)}
          type="file"
          accept="image/*"
          alt="store profile"
        />
        <input
          name="description"
          onChange={handleChange}
          type="text"
          alt="descrition"
        />
        <input name="name" onChange={handleChange} type="text" alt="name" />

        <select name="category" onChange={handleChange}>
          <option>Fashion</option>
          <option>Electronics</option>
          <option>house</option>
          <option>food</option>
          <option>cloting</option>
        </select>

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
              <p className="text-yellow-500">Maximum tag limit reached (6)</p>
            )}
          </div>
        </span>

        <button>Submit</button>
      </form>
    </div>
  );
};
