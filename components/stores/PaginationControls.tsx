'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import AppLoader from '@components/global/AppLoader'

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
    <div className="flex gap-2 justify-center w-full my-8">
      <button
        className="bg-black text-white p-1 rounded-md"
        disabled={Number(page) == 1}
        onClick={() => {
          handlePaginationLoading()
          router.push(`stores/?page=${Number(page) - 1}&page_size=${page_size}`)
        }}
      >
        prev page
      </button>

      <div>
        {page} / {Math.ceil(10 / Number(page_size))}
      </div>

      <button
        className="bg-black text-white p-1 rounded-md"
        disabled={!hasNextPage}
        onClick={() => {
          handlePaginationLoading()
          router.push(`stores/?page=${Number(page) + 1}&page_size=${page_size}`)
        }}
      >
        next page
      </button>
    </div>
  )
}

export default PaginationControls
