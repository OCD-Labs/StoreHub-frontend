import twitter from 'public/assets/icons/twitter.svg'
import linkedin from 'public/assets/icons/linkedin.svg'
import github from 'public/assets/icons/github.svg'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  const LINKS = [
    {
      title: 'Resources',
      items: ['Features', 'Services', 'Stores'],
    },
    {
      title: 'Location',
      items: ['4 Privet Drive, Little Whinging, Surrey'],
    },
  ]

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#B0A4DB1F"
          fill-opacity="1"
          d="M0,224L80,197.3C160,171,320,117,480,122.7C640,128,800,192,960,186.7C1120,181,1280,107,1360,69.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
      <footer className="relative w-full bg-graybrand text-black pt-10">
        <div className="mx-auto w-full max-w-7xl px-8">
          <div className="flex justify-between">
            <div className="grid grid-cols-3 justify-between gap-4">
              {LINKS.map(({ title, items }) => (
                <ul key={title}>
                  <div className="mb-3 font-medium text-dark">{title}</div>
                  {items.map((link) => (
                    <li key={link}>
                      <div
                        color="gray"
                        className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                      >
                        {link}
                      </div>
                    </li>
                  ))}
                </ul>
              ))}
              <div>
                <div className="mb-3 font-medium text-dark">Social</div>

                <div className="flex gap-3">
                  <Link href="/">
                    <Image src={twitter} alt="twitter"></Image>
                  </Link>
                  <Link href="/">
                    <Image src={linkedin} alt="twitter"></Image>
                  </Link>
                  <Link href="/">
                    <Image src={github} alt="twitter"></Image>
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-[150px] max-w-[150px]  h-[135px] border border-black border-opacity-20">
              <p className="text-black font-bold flex ml-8 mt-4">Storehub</p>
              <div className="w-[81px] h-[68px] relative mt-4 m-auto">
                <div className="w-[30px] h-[30px] left-[0px] top-[0px] absolute bg-orange-200" />
                <div className="w-[45px] h-[25px] left-[36px] top-[43px] absolute bg-purple-200" />
                <div className="w-[30px] h-[30px] left-[0px] top-[38px] absolute bg-stone-300 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
