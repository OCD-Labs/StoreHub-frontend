import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const StoresSkeleton = () => {
  return (
    <div className="group m-auto my-10 flex w-full max-w-xs flex-col overflow-hidden border border-dark-200 bg-white rounded-lg">
      <a className="relative flex h-80 overflow-hidden" href="#">
        <Skeleton width={1000} height={1000} />
      </a>
      <div className="mt-4 px-5 pb-5">
        <div className="flex justify-between">
          <div>
            <a href="#">
              <h5 className="text-xl tracking-tight text-slate-900 font-medium">
                <Skeleton width={100} />
              </h5>
            </a>
            <div className="flex gap-2 mt-2">
              <p className="">
                <Skeleton width={100} />
              </p>
            </div>
          </div>
          <Skeleton
            circle
            height="100%"
            width={60}
            containerClassName="avatar-skeleton"
          />
        </div>
      </div>
    </div>
  );
};

export default StoresSkeleton;
