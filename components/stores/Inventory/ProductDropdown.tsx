'use client'
import { useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { BASE_URL } from '@components/util/config'
import deleteicon from '@public/assets/icons/Inventory/Delete.svg'
import duplicate from '@public/assets/icons/Inventory/duplicate.svg'
import Edit from '@public/assets/icons/Inventory/Edit.svg'
import status from '@public/assets/icons/Inventory/status.svg'
import { modalstore } from '@app/StoreManager/modalstore'
import { ModalOptions } from '@app/StoreManager/modalstore'
import { OPTIONS, deleteStoreItem } from '@app/apis'
import useProfile from '@app/hooks/useProfile'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@components/UI/AlertDialog'

const ProductDropdown = ({ itemid }: { itemid: number }) => {
  const toggleModal = modalstore((state) => state.toggleModal)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }
  const userID: string | null = useSearchParams().get('user')

  const id: string | null = useSearchParams().get('id')

  const url: string = BASE_URL + `/users/${userID}/stores/${id}/items/${itemid}`

  console.log(url, 'updateurl')

  const updateOptions: ModalOptions = {
    url: url,
    title: 'update store',
  }

  const DELETE_OPTION: OPTIONS = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${useProfile().getSession()?.access_token}`,
    },
  }

  const handleDelete = () => {
    deleteStoreItem(DELETE_OPTION, userID, id, itemid)
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

        <Dropdown.Menu
          className={`flex flex-col z-20 border border-black text-sm p-4 gap-3 bg-white rounded-lg ${
            isOpen === false ? 'hidden' : ''
          }`}
        >
          <Dropdown.Item className="text-xs">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  toggleModal(updateOptions)
                }}
              >
                Edit
              </button>
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
            <AlertDialog>
              <AlertDialogTrigger>Delete</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your Item.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
