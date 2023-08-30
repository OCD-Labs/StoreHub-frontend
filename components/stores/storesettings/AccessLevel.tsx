import React from 'react'
import Image from 'next/image'
import moreinfo from '../../../public/assets/icons/Inventory/more info.svg'

const AccessLevel = ({
  icon,
  info,
  access,
}: {
  icon: any
  info: string
  access: string
}) => {
  return (
    <div className="flex flex-col bg-dark rounded-lg p-2">
      <div className="pb-2 flex justify-between">
        <p>{access}</p>
        <span>
          <Image src={icon} width={20} height={20} alt="fullaccess"></Image>
        </span>
      </div>
      <div className="pb-2">{info}</div>
      <div>
        <span>
          <Image src={moreinfo} width={20} height={20} alt="fullaccess"></Image>
        </span>
      </div>
    </div>
  )
}

export default AccessLevel
