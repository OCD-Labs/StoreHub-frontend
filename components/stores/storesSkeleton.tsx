import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const StoresSkeleton = () => {
  return (
    <div className="border-2 pb-2 border-b-0">
      <div>
        <div>
          <div className="flex flex-row gap-3 ">
            <div className="border-[1px] rounded border-black">
              <Skeleton width={60} height={60} />
            </div>

            <div className="flex flex-col">
              <h2 className="text-dark opacity-80 font-semibold leading-4 ">
                <Skeleton width={100} />
              </h2>
              <ul className="flex gap-3 font-thin">
                <li>
                  <Skeleton width={20} />
                </li>
                <li>
                  <Skeleton width={20} />
                </li>
                <li>
                  <Skeleton width={20} />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-3 font-thin">
            <button>
              <Skeleton width={20} />
            </button>
            <button>
              <Skeleton width={20} />
            </button>
            <button>
              <Skeleton width={20} />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <p>
              <Skeleton width={40} />
            </p>
            <div className="rounded-full">
              <Skeleton circle width={60} height={60} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoresSkeleton
