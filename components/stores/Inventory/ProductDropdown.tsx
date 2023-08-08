// @ts-nocheck
'use client'
import { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import Image from 'next/image'
import deleteicon from '@public/assets/icons/Inventory/Delete.svg'
import duplicate from '@public/assets/icons/Inventory/duplicate.svg'
import Edit from '@public/assets/icons/Inventory/Edit.svg'
import status from '@public/assets/icons/Inventory/status.svg'
import { modalstore } from '@app/StoreManager/modalstore'

const ProductDropdown: React.FC = () => {
  const isModalOpen = modalstore((state) => state.isOpen)
  const toggleModal = modalstore((state) => state.toggleModal)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  console.log(isModalOpen)

  return (
    <div>
      <Dropdown
        onToggle={toggleDropdown}
        className="flex flex-col static"
        style={{
          position: 'static',
          padding: 0,
          minWidth: 'auto',
          width: '10px',
        }}
      >
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          // onClick={() => {
          //   setMenuOpen(!isMenuOpened)
          // }}
        >
          <div className="cursor-pointer w-12 flex justify-center">
            <Image
              src="../../assets/icons/three-dot.svg"
              alt="see more"
              width={3}
              height={3}
              className=""
            />
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu
          className={`flex flex-col z-20 border border-black text-sm p-4 gap-3 bg-white rounded-lg ${
            isOpen === false ? 'hidden' : ''
          }`}
        >
          <Dropdown.Item className="text-xs">
            <div onClick={console.log('help')} className="flex gap-2">
              <button onClick={toggleModal}>Edit</button>
              <span>
                <Image
                  src={Edit}
                  width={15}
                  height={15}
                  alt="inventory"
                ></Image>
              </span>
            </div>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-3" className="text-xs flex gap-2">
            Duplicate
            <span>
              <Image
                src={duplicate}
                width={15}
                height={15}
                alt="inventory"
              ></Image>
            </span>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-3" className="text-xs flex gap-2">
            Change Status
            <span>
              <Image
                src={status}
                width={15}
                height={15}
                alt="inventory"
              ></Image>
            </span>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#/action-3" className="text-xs flex gap-2">
            Delete
            <span>
              <Image
                src={deleteicon}
                width={13}
                height={13}
                alt="inventory"
              ></Image>
            </span>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default ProductDropdown
