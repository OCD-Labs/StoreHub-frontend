'use client'
import React from 'react'
import sorticon from 'public/assets/icons/sorticon.svg'
import Image from 'next/image'
import { Stack } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Storecard from '@components/stores/storecard'
import { useGlobalContext } from '../../app/Context/store'
const Storepage = () => {
  const [allStores, setAllStores] = useState([])
  const { wallet } = useGlobalContext()
  const baseUrl = 'https://store-hub-djxu.onrender.com/api/v1/'
  // Get all stores

  const getStoreOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const fetchAllStores = () => {
    try {
      fetch(baseUrl + 'stores', getStoreOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data, 'all stores')
          setAllStores(data.data.result.stores)
        })
    } catch (error) {
      console.log(error)
    }
  }
  console.log('stores', allStores)

  useEffect(() => {
    fetchAllStores()
  }, [])

  return (
    <div className="border border-black pt-8">
      <div className="mx-8">
        {wallet.accountId ? (
          <>
            <div></div>
          </>
        ) : (
          <>
            <div className="bg-blue p-6">
              <p>
                Powered by the NEAR blockchain, Store Hub offers secure,
                user-friendly, and infinitely scalable solutions for seamless
                operations. Revolutionize your digital presence with Store Hub.
              </p>
              <button type="button" className="outline_btn mt-6 font-medium">
                <p className="hover:text-white items-baseline leading-tight text-black text-[16px]">
                  Connect Wallet
                </p>
              </button>
            </div>
          </>
        )}

        <div>
          <div>
            <div className="flex justify-between pt-8 mx-2">
              <div>12 stores</div>
              <div>
                <Image src={sorticon} alt="sorticon" />
              </div>
            </div>
          </div>
          <Stack gap={3}>
            {allStores.map((store, index) => (
              <Storecard key={index} store={store} />
            ))}
            <div></div>
          </Stack>
        </div>
      </div>
    </div>
  )
}

export default Storepage
