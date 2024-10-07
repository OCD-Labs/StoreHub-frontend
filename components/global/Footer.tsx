// components/HeroSection.tsx
import FooterImage from "@public/assets/images/FooterImage.png";
import Image from "next/image";
import storehubFooterLogo from "@public/assets/images/StorehubFooterLogo.png";
import twitter from "@public/assets/images/twitter.png";
import FacebookLogo from "@public/assets/images/FacebookLogo.png";
import InstagramLogo from "@public/assets/images/InstagramLogo.png";
import LinkedInLogo from "@public/assets/images/LinkedInLogo.png";
import YouTube from "@public/assets/images/YouTube.png";
import Link from "next/link";


const Footer: React.FC = () => {
  return (
    <div className="bg-gray-900 py-16 ">
      <div className=" max-w-[75rem] bg-[#FFE4D8] rounded-[15px] md:rounded-[40px] mx-[20px] md:mx-auto text-center md:text-left text-black ">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center pl-0 md:pl-[40px] gap-8">
          <div className="flex-1">
            <h2 className="text-3xl md:text-5xl  font-vietnam font-bold mt-4 mb-4">
              Start Your Journey with StoreHub Today
            </h2>
            <p className="mb-6 px-3 font-vietnam text-black">
              Ready to transform your e-commerce experience? Sign up now to
              launch your store with StoreHub and harness the power of NEAR’s
              blockchain technology.
            </p>
            <div className="space-x-7">
              <Link href={"/auth/onboarding"}>
                <button className="px-6 py-2 font-vietnam bg-orange-500 hover:bg-[#d46e43] text-white font-semibold rounded-md">
                  Get Started
                </button>
              </Link>
              <Link href="/stores">
                <button className="px-6 py-2 font-vietnam bg-white hover:bg-gray-200 text-gray-900 font-semibold rounded-md">
                  Marketplace
                </button>
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <Image
              src={FooterImage}
              alt="StoreHub Overview"
              className="mx-4 mt-9 hidden sm:block"
            />
          </div>
        </div>
      </div>

      {/* Navigation start here */}

      <div className="mt-[100px] mb-[65px] max-w-[70rem] container mx-auto px-6 md:px-10">
        <div className="flex flex-col font-vietnam md:flex-row md:justify-between gap-10">
          {/* Left Section */}
          <div className="space-y-6">
            <div>
              {/* Replace with your logo path */}
              <Link href="/">
                <Image
                  className=" w-[125px]
          h-[30px]"
                  src={storehubFooterLogo}
                  alt=" store hub Logo"
                />{" "}
              </Link>
            </div>
            <p className="text-sm font-vietnam text-gray-400">
              Embrace e-commerce’s future with <br /> StoreHub. Simplify your
              growth journey.
            </p>
            <div className="flex space-x-4 font-vietnam text-gray-500">
              <Link href="/">
                <Image
                  className="hover:text-white h-7 cursor-pointer"
                  src={twitter}
                  alt="twitter"
                ></Image>
              </Link>
              <Link href="/">
                <Image
                  className="hover:text-white h-7 cursor-pointer"
                  src={LinkedInLogo}
                  alt="twitter"
                ></Image>
              </Link>
              <Link href="/">
                <Image
                  className="hover:text-white h-7 cursor-pointer"
                  src={FacebookLogo}
                  alt="twitter"
                ></Image>
              </Link>
              <Link href="/">
                <Image
                  className="hover:text-white h-7 cursor-pointer"
                  src={InstagramLogo}
                  alt="twitter"
                ></Image>
              </Link>
              <Link href="/">
                <Image
                  className="hover:text-white h-7 cursor-pointer"
                  src={YouTube}
                  alt="twitter"
                ></Image>
              </Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            <div className="space-y-2">
              <h3 className="font-semibold font-vietnam text-white">Company</h3>
              <ul className="text-gray-400 space-y-1">
                <li className="hover:text-white font-vietnam cursor-pointer">About</li>
                <li className="hover:text-white font-vietnam cursor-pointer">Get Wallet</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold font-vietnam text-white">Explore</h3>
              <ul className="text-gray-400 space-y-1">
                <li className="hover:text-white font-vietnam cursor-pointer">Features</li>
                <li className="hover:text-white font-vietnam cursor-pointer">Marketplace</li>
                <li className="hover:text-white font-vietnam cursor-pointer">Demo</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold font-vietnam text-white">Support</h3>
              <ul className="text-gray-400 space-y-1">
                <li className="hover:text-white cursor-pointer">
                  Getting Started
                </li>
                <li className="hover:text-white font-vietnam cursor-pointer">FAQs</li>
                <li className="hover:text-white font-vietnam cursor-pointer">Help Center</li>
                <li className="hover:text-white cursor-pointer font-vietnam">
                  Report a Bug
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-white font-vietnam">Contact</h3>
              <ul className="text-gray-400 space-y-1 font-vietnam">
                <li className="hover:text-white cursor-pointer font-vietnam">Contact Us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
