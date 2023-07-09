import React from 'react'

interface Iproductitem {
  name: string
  category: string
  id: number
  quantity: number
  status: string
  img: string
  price: string
  supply_quantity: string
  discount_percentage: string
}

interface IproductProps {
  product: Iproductitem
}

const ProductItem = (props: IproductProps) => {
  const { product } = props
  const {
    name,
    category,
    id,
    quantity,
    status,
    img,
    price,
    supply_quantity,
    discount_percentage,
  } = product

  return (
    <>
      <div className="flex justify-between items-center py-3">
        <span className="flex gap-2 items-center md:w-[30%] w-[15em] text-right mr-4 whitespace-nowrap">
          <img src="../../assets/icons/dot.svg" alt="dot" className="w-[5px]" />
          <p>{name} </p>
          <img src={img} alt="product" className="w-[25px]" />
        </span>
        <p className="md:w-[15%] w-[90px] mr-6 md:mr-0">{category}</p>
        <p className="md:w-[15%] w-[90px]">{id}</p>
        <p className="md:w-[15%] w-[90px]">{supply_quantity}</p>
        <p className="md:w-[15%] w-[90px]">{price}</p>
        <p className="md:w-[15%] w-[90px]">{discount_percentage}</p>
        <img
          src="../../assets/icons/three-dot.svg"
          alt="see more"
          className=""
        />
      </div>
      <hr className="w-[95%] mx-auto" />
    </>
  )
}

export default ProductItem
