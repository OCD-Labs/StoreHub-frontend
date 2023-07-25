import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type addStoreItemsOptions = {
  method: string;
  headers: {
    "Content-Type": string;
    Authorization: string;
  };
};

interface PropsInterface {
  BASE_URL: string;
  userID: string | null;
  id: string | null;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  addStoreItemsOptions: addStoreItemsOptions;
  setStoreItems: Dispatch<SetStateAction<never[]>>;
}

const AddItemModal: React.FC<PropsInterface> = ({
  BASE_URL,
  userID,
  id,
  setIsModalOpen,
  addStoreItemsOptions,
  setStoreItems,
}) => {
  type FormData = {
    name: string;
    description: string;
    price: string;
    image_url: string;
    category: string;
    discount_percentage: string;
    supply_quantity: number;
  };

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    image_url:
      "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    category: "",
    discount_percentage: "",
    supply_quantity: 0,
  });

  const addStoreProducts = async (): Promise<void> => {
    console.log(`${BASE_URL}users/${userID}/stores/${id}/items`);

    try {
      fetch(
        BASE_URL + `users/${userID}/stores/${id}/items`,
        addStoreItemsOptions
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data, "store items");
          setStoreItems(data?.data.result.items);
        });
    } catch (error) {
      console.log(error);
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
  };

  const handleFormSubmit: SubmitHandler<IFormInputs> = () => {
    // e.preventDefault();
    // debugger;
    console.log(formData, "formData");
    addStoreProducts();
    setIsModalOpen(false);
  };

  //form validation
  interface IFormInputs {
    name: string;
    description: string;
    price: string;
    category: string;
    discount_percentage: string;
    supply_quantity: string;
}

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>();

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="mt-6 md:mt-0 lg:w-[90%]">
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
                  value={formData.supply_quantity}
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

          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={handleSubmit(handleFormSubmit)}
              className="rounded-[10px] py-4 text-white bg-[#161616] text-lg w-full sm:w-3/4 sm:mx-auto my-6 sm:my-12"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddItemModal;
