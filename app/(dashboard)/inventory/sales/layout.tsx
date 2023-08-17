'use client'
import Link from "next/link";

const Sales = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="py-4 averagescreen:py-6"> 
            <section>
                <div className="bg-[#000000] text-white rounded-[5px] p-3">Sales Management</div>
                <div className="flex justify-between my-5">
                    <li className="flex gap-5">
                        <ul>
                            <Link
                               href={{
                                pathname: "sales/salesoverview",
                              }}
                            >
                            <span>Sales Overview</span>
                            </Link>
                            </ul>
                        <ul>Sales Chart</ul>
                        <ul>Top Selling Products</ul>
                        <ul>Review</ul>
                    </li>

                    <div>
                        <select className="border py-1 px-3 ">
                            <option>Near</option>
                            <option>Naira</option>
                            <option>USD</option>
                        </select>

                        <button className="py-1 px-3 border">Export</button>
                    </div>
                </div>
                <hr className="py-3"/>
                
                </section>
            <section>{children}</section>
        </div>
    )
}

export default Sales;