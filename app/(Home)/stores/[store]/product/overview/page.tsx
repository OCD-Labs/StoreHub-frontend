// pages/index.tsx

import React from "react";

const Overview = () => {
  return (
    <div className=" border rounded-lg p-6">
     
      
        {/* Important Note */}
        <p className="font-bold font-vietnam mb-4 text-lg">
          Notes: Before work it is necessary to take out the pasta from the pack
          and store it in a container after opening.
        </p>

        {/* Product Description */}
        <h2 className="font-bold font-vietnam text-lg mb-2">
          Barilla Pasta – Authentic Italian Taste in Every Bite
        </h2>
        <p className="text-gray-700 font-vietnam leading-relaxed mb-4">
          Barilla Pasta is made with the finest durum wheat to bring you the
          perfect blend of taste and texture. Whether you’re making a quick
          weeknight dinner or a gourmet meal, Barilla offers a wide variety of
          pasta shapes to complement any sauce or recipe. From classic spaghetti
          to penne and farfalle, Barilla ensures your pasta dishes are always
          cooked to perfection—al dente, every time!
        </p>
        <p className="text-gray-700 font-vietnam leading-relaxed mb-4">
          With over 140 years of Italian tradition, Barilla delivers premium
          quality that you can trust for all your favorite meals. Ideal for
          pasta salads, casseroles, or hearty bowls of pasta, Barilla is the
          go-to choice for families and home chefs alike.
        </p>

        {/* Why Choose Barilla Pasta Section */}
        <h3 className="font-bold font-vietnam text-lg mb-2">Why Choose Barilla Pasta?</h3>
        <ul className="list-disc list-inside font-vietnam text-gray-700 mb-4">
          <li>100% durum wheat semolina for perfect texture</li>
          <li>Non-GMO and free from preservatives</li>
          <li>Cooks to al dente perfection in minutes</li>
          <li>A versatile pasta for all your favorite sauces</li>
        </ul>

        {/* Conclusion */}
        <p className="text-gray-700 font-vietnam leading-relaxed">
          Bring a taste of Italy to your table with Barilla!
        </p>
    
    </div>
  );
};

export default Overview;
