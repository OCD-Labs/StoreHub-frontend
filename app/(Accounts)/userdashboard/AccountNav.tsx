"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Cross1Icon } from "@radix-ui/react-icons";
import logo from "@public/assets/images/storehublogo.svg";
import { useSearchParams } from "next/navigation";
import myAccount from "@public/assets/icons/Myaccount.svg";
import myAccountBlack from "@public/assets/icons/myAccount-white.svg";
import orders from "@public/assets/icons/Inventory/orders.svg";
import ordersWhite from "@public/assets/icons/orders-white.svg";
import notification from "@public/assets/icons/Notification 2.svg";
import notificationWhite from "@public/assets/icons/notification-white.svg";
import saved from "@public/assets/icons/saved.svg";
import savedWhite from "@public/assets/icons/saved-white.svg";
import "../../../styles/Hamburger.css";

const AccountNav = () => {
	const [navbar, setNavbar] = useState(false);
	const [activeItem, setActiveItem] = useState<string>("myAccount");

	const handleItmeClick = (item: string): void => {
		setActiveItem(item);
	};

	const userID = useSearchParams().get("user");
	const id = useSearchParams().get("id");
	const name = useSearchParams().get("name");

	return (
		<div className="max-w-7xl text-sm mt-4 mb-4 px-2">
			<nav>
				<div className="flex justify-between md:hidden mt-30">
					<Link href="/">
						<Image src={logo} width={100} height={100} alt="logo"></Image>
					</Link>
					<button
						className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
						onClick={() => setNavbar(!navbar)}
					>
						{navbar ? (
							<Cross1Icon width={20} height={20} />
						) : (
							<HamburgerMenuIcon width={20} height={20} />
						)}
					</button>
				</div>

				<div
					onClick={() => setNavbar(!navbar)}
					className={`flex justify-center ${navbar ? "block" : "hidden"}`}
				>
					<ul
						className="bg-white absolute justify-center h-[40vh] w-[60vh] z-10 text-left shadow-lg"
						style={{ animation: "slideInFromRight 0.5s ease-out forwards" }}
					>
						<li className="rounded-t-[10px] bg-[#000000] text-white p-4">
							<Link
								className="flex cursor-pointer"
								href={{
									pathname: "/userdashboard/accountinfo/accountdetails",
									query: { id, name, user: userID },
								}}
							>
								<span className="flex font-bold">
									<Image
										src={
											activeItem === "myAccount" ? myAccount : myAccountBlack
										}
										alt="My account"
										width={15}
										height={15}
									/>
									<p>My Account</p>
								</span>
							</Link>
						</li>

						<li className="p-4">
							<Link
								className="flex cursor-pointer"
								href={{
									pathname: "/userdashboard/orders/pending",
									query: { id, name, user: userID },
								}}
							>
								<span className="flex px-4 font-bold">
									<Image
										src={activeItem === "orders" ? ordersWhite : orders}
										alt="Orders"
										width={15}
										height={15}
									/>
									<p>Orders</p>
								</span>
							</Link>
						</li>

						<li className="p-4">
							<Link
								className="flex cursor-pointer"
								href={{
									pathname: "/userdashboard/notifications/notificationinfo",
									query: { id, name, user: userID },
								}}
							>
								<span className="flex px-4 font-bold">
									<Image
										src={
											activeItem === "notification"
												? notificationWhite
												: notification
										}
										alt="Notifications"
										width={15}
										height={15}
									/>
									<p>Notifications</p>
								</span>
							</Link>
						</li>

						<li className="p-4">
							<Link
								className="flex cursor-pointer"
								href={{
									pathname: "/userdashboard/saved/saveditems",
									query: { id, name, user: userID },
								}}
							>
								<span className="flex px-4 font-bold">
									<Image
										src={activeItem === "saved" ? savedWhite : saved}
										alt="Saved"
										width={15}
										height={15}
									/>
									<p>Saved</p>
								</span>
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default AccountNav;
