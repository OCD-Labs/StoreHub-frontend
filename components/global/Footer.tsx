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
    <footer className="relative w-full bg-blue text-black pt-10">
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
  )
}

export default Footer
