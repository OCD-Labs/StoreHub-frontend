'use client'
import { useState, useEffect } from 'react'
import { getSession } from '@components/util/session'
import Storecard from '@components/stores/storecard'

const UserStores = () => {
  const [session, setSession] = useState<Session>()
  const [userStores, setUserStores] = useState([])
  useEffect(() => {
    let session = getSession()
    setSession(session)
  }, [3])

  const baseUrl = 'https://store-hub-djxu.onrender.com/api/v1/'
  const getStoreOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session ? session.access_token : ''}`,
    },
  }

  const fetchAllUserStores = (): void => {
    try {
      fetch(baseUrl + 'stores', getStoreOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data, 'all user stores')
          setUserStores(data.data.result.stores)
        })
    } catch (error) {
      console.log(error)
    }
  }
  console.log('stores', userStores)

  useEffect(() => {
    fetchAllUserStores()
  }, [2])
  return (
    <div>
      {userStores.map((store, index) => (
        <Storecard key={index} store={store} />
      ))}
    </div>
  )
}

export default UserStores
