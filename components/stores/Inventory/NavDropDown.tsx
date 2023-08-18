'use client'
import { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import Image from 'next/image'
// import { useSearchParams } from 'next/navigation'
// import { BASE_URL } from '@components/util/config'
import deleteicon from '@public/assets/icons/Inventory/Delete.svg'
import duplicate from '@public/assets/icons/Inventory/duplicate.svg'
import Edit from '@public/assets/icons/Inventory/Edit.svg'
import status from '@public/assets/icons/Inventory/status.svg'

const NavDropDown = () => {
  const [isNavModalOpen, setIsNavModalOpen] = useState<boolean>(false)
  const toggleDropdown = () => {
    setIsNavModalOpen(!isNavModalOpen)
  }
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

        <div
          className={`flex flex-col z-20 border border-black text-sm p-4 gap-3 bg-white rounded-lg ${
            isNavModalOpen === false ? 'hidden' : ''
          }`}
        >
          <div className="text-xs">
            <div className="flex gap-2">
              <button>My Store</button>
              <span>
                <Image
                  src={Edit}
                  width={15}
                  height={15}
                  alt="inventory"
                ></Image>
              </span>
            </div>
          </div>
          <Dropdown.Divider />
          <div className="text-xs flex gap-2">
            Switch User
            <span>
              <Image
                src={duplicate}
                width={15}
                height={15}
                alt="inventory"
              ></Image>
            </span>
          </div>
          <Dropdown.Divider />
          <div className="text-xs flex gap-2">
            Sign Out{' '}
            <span>
              <Image
                src={status}
                width={15}
                height={15}
                alt="inventory"
              ></Image>
            </span>
          </div>
        </div>
      </Dropdown>
    </div>
  )
}

export default NavDropDown
