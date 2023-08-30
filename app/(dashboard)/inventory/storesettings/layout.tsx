'use client'

import React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const Order = ({ children }: { children: React.ReactNode }) => {
  const token = useSearchParams().get('token')
  const userID = useSearchParams().get('user')
  const id = useSearchParams().get('id')
  const name = useSearchParams().get('name')

  return (
    <div>
      <div className="py-4 averagescreen:py-6">
        <section>
          <div className="bg-[#000000] text-white rounded-[5px] p-3">
            Settings
          </div>
          <div className="flex justify-between my-5">
            <li className="flex gap-5">
              <ul>
                <Link
                  href={{
                    pathname: '/inventory/orders/ordersoverview',
                    query: {
                      id: id,
                      name: name,
                      token: token,
                      user: userID,
                    },
                  }}
                >
                  <span>General</span>
                </Link>
              </ul>
              <ul>
                <Link
                  href={{
                    pathname: '/inventory/orders/ordersinsight',
                    query: {
                      id: id,
                      name: name,
                      token: token,
                      user: userID,
                    },
                  }}
                >
                  <span>Notifications</span>
                </Link>
              </ul>
            </li>

            <div className="flex gap-3">
              <Link
                href={{
                  pathname: '/inventory/orders/ordersoverview',
                  query: {
                    id: id,
                    name: name,
                    token: token,
                    user: userID,
                  },
                }}
              >
                <span>Co-ownership Settings</span>
              </Link>
              <Link
                href={{
                  pathname: '/inventory/orders/ordersoverview',
                  query: {
                    id: id,
                    name: name,
                    token: token,
                    user: userID,
                  },
                }}
              >
                <span>Social Media Integration</span>
              </Link>
            </div>
          </div>
          <hr className="py-3" />
        </section>
        <section>{children}</section>
      </div>
    </div>
  )
}

export default Order
