// components/HeroSection.tsx
import FooterImage from "@public/assets/images/FooterImage.png";
import Image from "next/image";
import storehubIcon from "@public/assets/images/storehubIcon.svg";
import Link from "next/link";
import twitter from "public/assets/icons/twitter.svg";
import linkedin from "public/assets/icons/linkedin.svg";
import github from "public/assets/icons/github.svg";

const Footer: React.FC = () => {
  return (
    <div className="bg-gray-900 py-16 ">
      <div className=" max-w-[75rem] bg-[#FFE4D8] rounded-[40px] mx-auto text-black ">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center pl-[40px] gap-8">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Start Your Journey with StoreHub Today
            </h2>
            <p className="mb-6 text-black">
              Ready to transform your e-commerce experience? Sign up now to
              launch your store with StoreHub and harness the power of NEAR’s
              blockchain technology.
            </p>
            <div className="space-x-4">
              <button className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-md">
                Get Started
              </button>
              <button className="px-6 py-2 bg-white text-gray-900 font-semibold rounded-md">
                Marketplace
              </button>
            </div>
          </div>
          <div className="flex-1">
            <Image
              src={FooterImage}
              alt="StoreHub Overview"
              className="mx-4 mt-9 "
            />
          </div>
        </div>
      </div>

      {/* Navigation start here */}

      <div className="mt-[100px] mb-[65px] max-w-[70rem] container mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Left Section */}
          <div className="space-y-6">
            <div>
              {/* Replace with your logo path */}
              <Link href="/">
                <Image
                  className=" w-[125px]
          h-[30px]"
                  src={storehubIcon}
                  alt=" store hub Logo"
                />{" "}
              </Link>
            </div>
            <p className="text-sm text-gray-400">
              Embrace e-commerce’s future with <br /> StoreHub. Simplify your
              growth journey.
            </p>
            <div className="flex space-x-4 text-gray-500">
              <Link href="/">
                <Image
                  className="hover:text-white cursor-pointer"
                  src={twitter}
                  alt="twitter"
                ></Image>
              </Link>
              <Link href="/">
                <Image
                  className="hover:text-white cursor-pointer"
                  src={linkedin}
                  alt="twitter"
                ></Image>
              </Link>
              <Link href="/">
                <Image
                  className="hover:text-white cursor-pointer"
                  src={github}
                  alt="twitter"
                ></Image>
              </Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Company</h3>
              <ul className="text-gray-400 space-y-1">
                <li className="hover:text-white cursor-pointer">About</li>
                <li className="hover:text-white cursor-pointer">Get Wallet</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Explore</h3>
              <ul className="text-gray-400 space-y-1">
                <li className="hover:text-white cursor-pointer">Features</li>
                <li className="hover:text-white cursor-pointer">Marketplace</li>
                <li className="hover:text-white cursor-pointer">Demo</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Support</h3>
              <ul className="text-gray-400 space-y-1">
                <li className="hover:text-white cursor-pointer">
                  Getting Started
                </li>
                <li className="hover:text-white cursor-pointer">FAQs</li>
                <li className="hover:text-white cursor-pointer">Help Center</li>
                <li className="hover:text-white cursor-pointer">
                  Report a Bug
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-white">Contact</h3>
              <ul className="text-gray-400 space-y-1">
                <li className="hover:text-white cursor-pointer">Contact Us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
