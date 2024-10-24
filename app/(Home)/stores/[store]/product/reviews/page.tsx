import React from "react";

const Reviews = () => {
  return (
    <div className=" border flex flex-col justify-center items-center rounded-lg p-9">
      {/* No Reviews Message */}
      <h2 className="text-lg font-vietnam font-semibold text-gray-700">
        NO REVIEWS YET!
      </h2>

      {/* Add Review Link */}
      <a
        href="#"
        className="mt-2 text-sm text-gray-500 font-vietnam underline hover:text-gray-700"
      >
        Be the first to review
      </a>
    </div>
  );
};

export default Reviews;
