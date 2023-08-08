import { Card } from 'react-bootstrap'
import Image from 'next/image'
import pfpic from 'public/assets/images/pfpic.png'
import owner from 'public/assets/images/owner.png'
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
            <Image
              src={store.profile_image_url ? store.profile_image_url : pfpic}
              width={60}
              height={60}
              alt="storepic"
            ></Image>
            <div className="flex flex-col">
              <h2 className="text-dark opacity-80 font-semibold leading-4 ">
                <Link href="/stores/1">{store.name}</Link>
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
          <div>
            <p>owner</p>
            <div>
              <Link
                href={{
                  pathname: '/inventory/Itemsdashboard',
                  query: {
                    id: store.id,
                    name: store.name,
                    token: token,
                    user: user_id,
                  },
                }}
              >
                <Image src={owner} alt="owner"></Image>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Storecard