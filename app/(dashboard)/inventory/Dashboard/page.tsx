"use client";

import Image from "next/image";
import DashboardImage from "../../../../public/assets/images/DashboardImage.png";

const Dashboard = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center space-x-4">
          {/* Profile Image */}
          <div className=" hidden sm:block">
            <Image
              src={DashboardImage}
              alt="Dashboard Image"
              height={200}
              width={200}
            />
          </div>

          {/* Store Info */}
          <div>
            <h1 className="lg:text-2xl text-lg font-bold text-gray-900">
              Shine, Shimmer, Glimmer
              <span className="ml-2 inline-flex items-center bg-green-100 text-green-600 text-sm font-medium px-2 py-0.5 rounded-full">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Store ID
              </span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2">
              Welcome to the Glittering Gems Boutique, where timeless elegance
              meets modern style! Step into our enchanting jewelry haven nestled
              within the heart of our beloved general store.
            </p>
          </div>
        </div>

        {/* Placeholder Content */}
        <div className="mt-8 border-2 border-gray-300 rounded-lg h-96 flex justify-center items-center">
          <p className="text-gray-400 text-xl">Open to ideas</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
