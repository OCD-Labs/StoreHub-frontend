import '@styles/globals.css'

const Inventory = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className="bg-graybrand">
          <div className="max-w-7xl h-72 flex justify-center m-auto font-light">
            {children}
          </div>
        </div>

        <svg
          className="z-[-1]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#B0A4DB1F"
            fill-opacity="1"
            d="M0,0L40,37.3C80,75,160,149,240,154.7C320,160,400,96,480,69.3C560,43,640,53,720,64C800,75,880,85,960,122.7C1040,160,1120,224,1200,224C1280,224,1360,160,1400,128L1440,96L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg>
      </body>
    </html>
  )
}

export default Inventory
