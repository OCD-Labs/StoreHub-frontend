"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
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

	const handleItemClick = (item: string): void => {
		setActiveItem(item);
	};

	const userID = useSearchParams().get("user");
	const id = useSearchParams().get("id");
	const name = useSearchParams().get("name");

	return (
		<div className="max-w-7xl text-sm mt-4 mb-4 px-2">
			<nav>
				{/* Logo and Hamburger Menu */}
				<div className="flex justify-between items-center mt-3 md:hidden">
					<Link href="/">
						<Image src={logo} width={100} height={100} alt="logo" />
					</Link>
					<button
						className="p-2 text-gray-700 rounded-md focus:outline-none"
						onClick={() => setNavbar(!navbar)}
					>
						{navbar ? (
							<Cross1Icon width={20} height={20} />
						) : (
							<HamburgerMenuIcon width={20} height={20} />
						)}
					</button>
				</div>

				{/* Navbar Links */}
				<div
					className={`${
						navbar ? "block" : "hidden"
					} absolute top-16 left-0 w-full bg-dark z-10 shadow-lg rounded-t-lg`}
					style={{ animation: "slideInFromRight 0.8s ease-out forwards" }}
				>
					<ul className=" flex flex-col items-start py-4 text-white space-y-1">
						<li
							className={`flex items-center px-4 py-3 w-full ${
								activeItem === "myAccount" ? "bg-orange-500" : ""
							}`}
							onClick={() => handleItemClick("myAccount")}
						>
							<Image
								src={activeItem === "myAccount" ? myAccount : myAccount}
								alt="My Account"
								width={20}
								height={20}
								className="mr-3"
							/>
							<Link
								href={{
									pathname: "/userdashboard/accountinfo/accountdetails",
									query: { id, name, user: userID },
								}}
								className="flex-grow text-[16px]"
							>
								My Account
							</Link>
						</li>

						<li
							className={`flex items-center px-4 py-3 w-full ${
								activeItem === "orders" ? "bg-orange-500" : ""
							}`}
							onClick={() => handleItemClick("orders")}
						>
							<Image
								src={activeItem === "orders" ? ordersWhite : orders}
								alt="Orders"
								width={20}
								height={20}
								className="mr-3"
							/>
							<Link
								href={{
									pathname: "/userdashboard/orders/pending",
									query: { id, name, user: userID },
								}}
								className="flex-grow text-[16px]"
							>
								Orders
							</Link>
						</li>

						<li
							className={`flex items-center px-4 py-3 w-full ${
								activeItem === "notification" ? "bg-orange-500" : ""
							}`}
							onClick={() => handleItemClick("notification")}
						>
							<Image
								src={activeItem === "notification" ? notificationWhite : notificationWhite}
								alt="Notifications"
								width={20}
								height={20}
								className="mr-3"
							/>
							<Link
								href={{
									pathname: "/userdashboard/notifications/notificationinfo",
									query: { id, name, user: userID },
								}}
								className="flex-grow text-[16px]"
							>
								Notifications
							</Link>
						</li>

						<li
							className={`flex items-center px-4 py-3 w-full ${
								activeItem === "saved" ? "bg-orange-500" : ""
							}`}
							onClick={() => handleItemClick("saved")}
						>
							<Image
								src={activeItem === "saved" ? savedWhite : savedWhite}
								alt="Saved"
								width={20}
								height={20}
								className="mr-3"
							/>
							<Link
								href={{
									pathname: "/userdashboard/saved/saveditems",
									query: { id, name, user: userID },
								}}
								className="flex-grow text-[16px]"
							>
								Saved
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default AccountNav;
