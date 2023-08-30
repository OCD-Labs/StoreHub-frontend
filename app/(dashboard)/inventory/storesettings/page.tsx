import React from 'react'
import AccessLevel from '@components/stores/storesettings/AccessLevel'
import fullaccess from '../../../../public/assets/icons/Inventory/fullaccess.svg'
import inventoryaccess from '../../../../public/assets/icons/Inventory/inventoryaccess.svg'
import salesaccess from '../../../../public/assets/icons/Inventory/salesaccess.svg'
import dropicon from '../../../../public/assets/icons/Inventory/dropicon.svg'
import coown from '../../../../public/assets/icons/Inventory/coown.svg'
import Image from 'next/image'
import { Button } from '@components/ui/Button'
import search from '../../../../public/assets/icons/search.svg'
import filter from '../../../../public/assets/icons/filter.svg'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../../components/ui/Dialog'

const Settings = () => {
  return (
    <div>
      <div className="flex sm:flex-nowrap flex-wrap gap-3 text-white">
        <AccessLevel
          icon={fullaccess}
          info="This access level grants you complete control over the store"
          access="Full access"
        />
        <AccessLevel
          icon={inventoryaccess}
          info="This access level grants you complete control over the store"
          access="Inventory access"
        />
        <AccessLevel
          icon={salesaccess}
          info="This access level grants you complete control over the store"
          access="Sales access"
        />
        <AccessLevel
          icon={salesaccess}
          info="This access level grants you complete control over the store"
          access="Sales access"
        />
      </div>
      <div>
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4">Manage Co-ownership Access</h2>
          <section className="border-dashed border-2 p-4 h-60 rounded-lg flex justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-4">
              <Image
                src={coown}
                width={60}
                height={60}
                alt="fullaccess"
              ></Image>
              <p>No Co-owners Yet</p>

              <Dialog>
                <DialogTrigger>
                  <Button variant="default">Add people</Button>
                </DialogTrigger>
                <DialogContent>
                  <div className="flex flex-col justify-center items-center gap-4">
                    <Image
                      src={coown}
                      width={60}
                      height={60}
                      alt="fullaccess"
                    ></Image>
                    <p>Add a co-owner to your store</p>
                    <div className="flex flex-col gap-3">
                      <span className="relative w-[100%] sm:w-[100%]">
                        <input
                          className="border w-full h-[35px] rounded-[5px] pl-[30px] sm:pl-[40px] pr-[30px] sm:pr-[35px]"
                          placeholder="Search full name, username or email"
                        />
                        <Image
                          src={search}
                          alt="search product"
                          height={20}
                          width={20}
                          className="absolute top-2 left-2 sm:left-3"
                        />
                      </span>
                      <span className="relative w-[100%] sm:w-[100%]">
                        <select className="border w-full h-[35px] rounded-[5px] pl-[30px] sm:pl-[40px] pr-[30px] sm:pr-[35px] text-gray-400">
                          <option>Select Access</option>
                          <option>Full Access</option>
                          <option>Inventory Access</option>
                          <option>Sales Access</option>
                        </select>
                      </span>
                    </div>
                    <Button variant="default">Add as co-owner</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Settings
