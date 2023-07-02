import { Card } from 'react-bootstrap'
import Image from 'next/image'
import pfpic from 'public/assets/images/pfpic.png'
import owner from 'public/assets/images/owner.png'
import Link from 'next/link'
import { FC } from 'react'

interface Props {
  store: Store
}

const Storecard: FC<Props> = ({store}) => {
  return (
    <Card>
      <div>
        <div>
          <div className="flex flex-row gap-3">
            <Image src={pfpic} width={60} height={60} alt="storepic"></Image>
            <div className="flex flex-col">
              <h2 className="text-dark opacity-80 font-semibold leading-4 ">
                <Link href="/stores/1">{ store.name }</Link>
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
              <Image src={owner} alt="owner"></Image>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default Storecard
