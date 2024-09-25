//Features Component
import Image from "next/image";
import FeaturesCard1 from "@public/assets/images/FeaturesCard1.png";
import FeaturesCard2 from "@public/assets/images/FeaturesCard2.png";
import FeaturesCard3 from "@public/assets/images/FeaturesCard3.png";
import CallToActionImage from "@public/assets/images/CallToActionImage.png";
import LaunchStore1 from "@public/assets/images/LaunchStore1.png";

const Features = () => {
  return (
    <div className="container max-w-[90rem] mx-auto px-4 py-10">
      {/* <!-- Heading Section --> */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
          Empowering Your <span className="text-orange-500">Business</span>
        </h2>
        <p className="mt-4 text-gray-600">
          Explore the powerful features that make StoreHub the ultimate choice
          for launching and managing your online store.
        </p>
      </div>

      {/* <!-- Feature Cards Section --> */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
        {/* <!-- Card 1 --> */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200">
          <div className="mb-4 flex justify-center">
            <Image
              className="h-10 bg-white"
              src={FeaturesCard1}
              alt=" Collaborative Ownership"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Collaborative Ownership
          </h3>
          <p className="mt-2 text-gray-600">
            Invite friends or partners to co-own and manage your store. Enjoy
            seamless collaboration and shared responsibilities.
          </p>
        </div>

        {/* <!-- Card 2 --> */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200">
          <div className="mb-4 flex justify-center">
            <Image
              className="h-10 bg-white"
              src={FeaturesCard2}
              alt=" Insightful Analytics"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Insightful Analytics
          </h3>
          <p className="mt-2 text-gray-600">
            By revealing trends and customer behaviors, these insights guide
            improvements in sales, inventory, and market response.
          </p>
        </div>

        {/* <!-- Card 3 --> */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center border border-gray-200">
          <div className="mb-4 flex justify-center">
            <Image
              className="h-10 bg-white"
              src={FeaturesCard3}
              alt=" Social Media Integration"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            Social Media Integration
          </h3>
          <p className="mt-2 text-gray-600">
            Receive real-time WhatsApp order notifications, and effortlessly
            share updates on your WhatsApp Status.
          </p>
        </div>
      </div>

      {/* <!-- Call to Action Section --> */}

      <div className="grid gap-6 sm:grid-cols-1 mb-5 rounded-lg border border-gray-200 lg:grid-cols-2">
        {/* Call To Action text */}
        <div className="bg-white rounded-lg p-10 mt-[50px] text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Launch your store with <br />
            <span className="text-orange-500">StoreHub</span> on NEAR BOS
          </h2>
          <p className="mt-4 text-gray-600">
            Our platform is built on NEAR BOS, providing you with a seamless,
            and scalable infrastructure to manage your store effortlessly.
          </p>
          <button className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-[15px] font-semibold hover:bg-orange-600 transition">
            Get Started
          </button>
        </div>
        {/* launch text Image */}
        <div>
          <Image src={CallToActionImage} alt="CTA Image" />
        </div>
      </div>




      {/* Launch store section */}
      <div className=" mx-auto py-12 px-4">
        {/* Main Content Section */}
        <div className="flex flex-col gap-5 lg:flex-row">
          {/* Left Side - Dark Box */}

          <div className="w-full lg:w-[70%]">
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8">
              StoreHub is designed <br /> for your{" "}
              <span className="text-orange-500">growth</span>
            </h2>

            <div className="bg-gray-900 text-white px-8 pt-8 pb-0 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">
                Launch, Grow, and Secure
              </h3>
              <p className="text-gray-300 mb-6">
                From launch to scale, StoreHub equips you with everything you
                need to succeed. Effortlessly set <br /> up your online store,
                manage products, and streamline operations with our intuitive
                platform. <br />
                As your business grows, tap into advanced analytics, secure
                blockchain technology, <br /> and collaborative tools that make
                expansion easy and efficient.
              </p>
              {/* Image placeholder - you can replace with your images later */}
              <div className="flex justify-center">
                <Image
                  className="rounded-lg max-w-full ml-[190px]  xlg:ml-[100px] pb-0 h-auto"
                  src={LaunchStore1}
                  alt=" StoreHub Features"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Orange Box */}
          <div className="bg-orange-500 text-white text-center p-8 rounded-lg w-full lg:w-[30%]">
            <h3 className="text-2xl font-semibold my-7">
              Innovative Features, Seamless Experience
            </h3>
            <p className="text-white mt-8 lg:mb-[60px]">
              Leverage cutting-edge technology and user-friendly tools designed
              to drive your store’s growth.
            </p>
            <button className="px-6 py-3 my-5 bg-white text-[#000000] rounded-lg font-semibold hover:bg-gray-100 transition">
              Launch Store
            </button>
            {/* Image placeholder - you can replace with your images later */}
            <div className="flex justify-center mt-6">
              <img
                src="path/to/your-second-image.png"
                alt="StoreHub Dashboard"
                className="rounded-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
