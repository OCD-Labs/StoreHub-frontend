'use client'

import React from 'react'
import useProfile from '@app/hooks/useProfile'
import axios from 'axios'
import { BASE_URL } from '@components/util/config'

export const storehubAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${useProfile().getSession()?.access_token}`,
  },
})

export const StorehubClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const page = () => {
  return <div>page</div>
}

export default page
