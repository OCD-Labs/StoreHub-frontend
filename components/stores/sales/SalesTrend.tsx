// import Image from "next/image"

type salestrendProps = {
    img: React.ReactNode; //img is an SVG icon
    text: string;
    amount: string;
    trendImg: React.ReactNode; //trendImg is an SVG icon
    percent: string;
  };

const SalesTrend = ({ img, text, amount, trendImg, percent}: salestrendProps) => {
    return (
        <>
        <div className="border w-fit px-4 py-2 rounded shadow-xl">
            <span className="flex items-center">
                <div className="mr-4 bg-gray-300 p-2 rounded-full">
                {/* <Image src={img} alt='total sales today' width={15} height={15}/> */}
                <div className="w-6 h-6">{img}</div>
                </div>
                <p className="font-semibold">{text}</p>
            </span>
            <span className="flex items-end justify-between mt-2">
                <p className="font-bold text-xl">{amount}</p>
                <span className="flex items-center ml-6 bg-red-100 px-2 rounded-[39px]">
                    {/* <Image src={trendImg} alt='sales drop' /> */}
                    <div className="w-6 h-6">{trendImg}</div>
                    <p className="text-red-500 text-[8px] ml-1">{percent}%</p>
                </span>
            </span>
        </div></>
    )
}

export default SalesTrend;