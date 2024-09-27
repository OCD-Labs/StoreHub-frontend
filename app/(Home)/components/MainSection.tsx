// components/MainSection.tsx
"use client";

import React, { useEffect, useRef } from "react";
import "@/styles/mainsection.css";

const MainSection = () => {
  const slideRef = useRef(null);

  useEffect(() => {
    // Cloning the content to make the animation seamless
    if (slideRef.current) {
      const clone = slideRef.current.cloneNode(true);
      slideRef.current.parentNode.appendChild(clone);
    }
  }, []);

  return (
    <main className="text-center py-20 px-8">
      <h1 className="text-[70px]  text-[#1D2131] font-bold">
        Effortless Store Launch
      </h1>

      {/* Backgroud image comes after this, also fix the margin bottom */}
      <div className=" custom-bg ">
        <h1 className="text-[70px] text-[#1D2131] font-bold mb-6">
          with Blockchain Security
        </h1>
        <p className="text-lg text-[#414040] mb-8 max-w-2xl mx-auto">
          Effortlessly launch your online store and co-own it with friends.
          Access valuable business insights to grow your venture while ensuring
          the integrity and security of your store through cutting-edge
          blockchain technology, powered by NEAR.
        </p>
        {/* The buttons here, has to be a component */}
        <div className="space-x-4">
          <button className="bg-[#FE5B13] text-white rounded-[15px] px-6 py-3 hover:bg-[#d46e43]">
            Get Started
          </button>
          <button className="bg-[#ffffff] border  text-black px-6 py-3 rounded-[15px] hover:bg-gray-200">
            Marketplace
          </button>
        </div>
        <div className="slide-container flex justify-center mt-[250px] gap-8 rounded-lg items-center py-4 mx-[130px] bg-gray-800 text-white space-x-4">
          <div className="logos-slide" ref={slideRef}>
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className="slide-text text-2xl font-bold">
                Near
              </span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainSection;
