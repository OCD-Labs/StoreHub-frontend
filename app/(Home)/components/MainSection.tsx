"use client";
import NearLogo from "@public/assets/images/NearLogo.png";
import NearLogo1 from "@public/assets/images/NearLogo1.png";
import React, { useEffect, useRef } from "react";
import "@/styles/mainsection.css";
import Image from "next/image";
import Link from "next/link";

const MainSection = () => {
  return (
    <main className="text-center py-20 px-8">
      <h1 className="text-[40px] md:text-[70px] font-vietnam  text-[#1D2131] font-bold">
        Effortless Store <span className="hidden md:inline">Launch</span> 
      </h1>

      {/* Backgroud image comes after this, also fix the margin bottom */}
      <div className="custom-bg ">
        <h1 className="text-[40px] font-vietnam md:text-[70px] text-[#1D2131] font-bold mb-6">
         <span className="lg:hidden">Launch</span> with Blockchain Security
        </h1>
        <p className="font-vietnam text-base md:text-lg text-[#414040] mb-8 max-w-2xl mx-auto">
          Effortlessly launch your online store and co-own it with friends.
          Access valuable business insights to grow your venture while ensuring
          the integrity and security of your store through cutting-edge
          blockchain technology, powered by NEAR.
        </p>
        {/* The buttons here, has to be a component */}
        <div className=" space-x-4">
          <Link href={"/auth/onboarding"}>
            <button className="bg-[#FE5B13] text-white rounded-[15px] px-6 py-3 hover:bg-[#d46e43]">
              Get Started
            </button>
          </Link>

          <Link href="/stores">
            <button className="bg-[#ffffff] border  text-black px-6 py-3 rounded-[15px] hover:bg-gray-200">
              Marketplace
            </button>
          </Link>
        </div>
        <div className="hidden md:flex justify-center mt-[90px] md:mt-[250px] gap-8 rounded-lg items-center py-4 mx-[130px] bg-[#1D2131] text-white space-x-4">
          <div className="flex justify-center gap-4">
            <Image
              className=""
              src={NearLogo1}
              alt=" Social Media Integration"
            />
            <Image
              className=""
              src={NearLogo}
              alt=" Social Media Integration"
            />
          </div>

          <div className="flex justify-center gap-4">
            <Image
              className=""
              src={NearLogo1}
              alt=" Social Media Integration"
            />
            <Image
              className=""
              src={NearLogo}
              alt=" Social Media Integration"
            />
          </div>

          <div className="flex justify-center gap-4">
            <Image
              className=""
              src={NearLogo1}
              alt=" Social Media Integration"
            />
            <Image
              className=""
              src={NearLogo}
              alt=" Social Media Integration"
            />
          </div>

          <div className="flex justify-center gap-4">
            <Image
              className=""
              src={NearLogo1}
              alt=" Social Media Integration"
            />
            <Image
              className=""
              src={NearLogo}
              alt=" Social Media Integration"
            />
          </div>

          <div className="flex justify-center gap-4">
            <Image
              className=""
              src={NearLogo1}
              alt=" Social Media Integration"
            />
            <Image
              className=""
              src={NearLogo}
              alt=" Social Media Integration"
            />
          </div>

          <div className="flex justify-center gap-4">
            <Image
              className=""
              src={NearLogo1}
              alt=" Social Media Integration"
            />
            <Image
              className=""
              src={NearLogo}
              alt=" Social Media Integration"
            />
          </div>
        </div>

        
      </div>
    </main>
  );
};

export default MainSection;
