'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AppLoader from '@components/global/AppLoader'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  handlePaginationLoading: () => void
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  handlePaginationLoading,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'
  const page_size = searchParams.get('page_size') ?? '15'

  return (
    <div className="flex items-center gap-4 justify-center w-full my-8">
      <button
        className=" text-black font-bold hover:text-[#FE5B13] rounded-lg  flex items-center justify-center"
        disabled={Number(page) == 1}
        onClick={() => {
          handlePaginationLoading()
          router.push(`stores/?page=${Number(page) - 1}&page_size=${page_size}`)
        }}
      >
         <ChevronLeftIcon className="mr-1 h-4 w-4" /> {/* Radix left icon */}
         Prev Page
      </button>

      <div>
        {page} / {Math.ceil(10 / Number(page_size))}
      </div>

      <button
        className="text-black hover:text-[#FE5B13] font-bold rounded-lg  flex items-center justify-center"
        onClick={() => {
          handlePaginationLoading()
          router.push(`stores/?page=${Number(page) + 1}&page_size=${page_size}`)
        }}
      >
          Next Page
          <ChevronRightIcon className="ml-1 h-4 w-4" />
      </button>
    </div>
  )
}

export default PaginationControls
