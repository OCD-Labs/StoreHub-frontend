import { Card } from 'react-bootstrap'
import Image from 'next/image'
import pfpic from 'public/assets/images/pfpic.png'
import owner from 'public/assets/images/owner.jpg'
import Link from 'next/link'
import { FC } from 'react'
import { useState, useEffect } from 'react'
import { getSession } from '@components/util/session'

export interface StoreProps {
  store: Store
}

const Storecard: FC<StoreProps> = ({ store }: StoreProps) => {
  console.log(store, 'store')
  const [Session, setSession] = useState<Session>()
  let token = Session?.access_token
  let user_id = Session?.user.user_id
  useEffect(() => {
    let session = getSession()
    setSession(session)
    console.log(Session)
  }, [2])
  console.log(Session)
  return (
    <Card className="border p-2">
      <div>
        <div>
          <div className="flex flex-row gap-3 ">
            <div className="border-[1px] rounded border-black">
              <Image
                className="p-1 rounded"
                src={
                  store.store.profile_image_url
                    ? store.store.profile_image_url
                    : pfpic
                }
                width={60}
                height={60}
                alt="storepic"
              ></Image>
            </div>

            <div className="flex flex-col">
              <h2 className="text-dark opacity-80 font-semibold leading-4 ">
                <Link href="/stores/1">{store.store.name}</Link>
              </h2>
              <ul className="flex gap-3 font-thin">
                <li>cloth</li>
                <li>fashion</li>
                <li>toy</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-3 font-thin">
            <button>cloth</button>
            <button>fashion</button>
            <button>hardware</button>
          </div>
          <div className="flex items-center gap-2">
            <p>owner</p>
            <div>
              <Link
                href={{
                  pathname: '/inventory/Itemsdashboard',
                  query: {
                    id: store.store.id,
                    name: store.store.name,
                    token: token,
                    user: user_id,
                  },
                }}
              >
                <Image
                  className="rounded-full"
                  src={owner}
                  width={40}
                  height={40}
                  alt="owner"
                ></Image>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Storecard
