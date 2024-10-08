import Image from "next/image";
import Link from "next/link";
import NearLogo from "@public/assets/images/NearLogo.png";
import NearLogo1 from "@public/assets/images/NearLogo1.png";



const MobileLogoSlider = () => {
  return (
    <div className=" lg:hidden flex justify-center mt-5 mb-[80px] gap-8  items-center py-4 px-4  bg-[#1D2131] ">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex justify-center gap-3">
          <Image
            src={NearLogo1}
            className="h-4"
            alt="Social Media Integration"
          />
          <Image
            src={NearLogo}
            className="h-4"
            alt="Social Media Integration"
          />
        </div>
      ))}
    </div>
  );
};

export default MobileLogoSlider;