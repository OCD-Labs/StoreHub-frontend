import twitter from "public/assets/icons/twitter.svg";
import linkedin from "public/assets/icons/linkedin.svg";
import github from "public/assets/icons/github.svg";
import Image from "next/image";
import Link from "next/link";
import "../../styles/Footer.css" ;

const Footer = () => {
	const LINKS = [
		{
			title: "Comapnay",
			items: ["About", "Get Wallet"],
		},
		{
			title: "Explore",
			items: ["Features, Store, Demo"],
		},
		{
			title: "Location",
			items: ["4 Privet Drive, Little Whinging, Surrey"],
		},
		{
			title: "Location",
			items: ["4 Privet Drive, Little Whinging, Surrey"],
		},
	];

	return (
		<div>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
				<path
					fill="#B0A4DB1F"
					fill-opacity="1"
					d="M0,224L80,197.3C160,171,320,117,480,122.7C640,128,800,192,960,186.7C1120,181,1280,107,1360,69.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
				></path>
			</svg>
			<footer>
				<div className="container">
					<div className="sec aboutus">
						<h2>StoreHub</h2>
						<p>
							Embrace e-commerce's future with StoreHub. Simlify your growth
							journey.
						</p>
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

					<div className="sec quicklinks">
						<h2>Company</h2>
						<ul>
							<li>
								<a href="#">About</a>
							</li>
							<li>
								<a href="#">Get Wallet</a>
							</li>
						</ul>
					</div>
					<div className="sec quicklinks">
						<h2>Explore</h2>
						<ul>
							<li>
								<a href="#">Features</a>
							</li>
							<li>
								<a href="#">Store</a>
							</li>
							<li>
								<a href="#">Demo</a>
							</li>
						</ul>
					</div>

					<div className="sec quicklinks">
						<h2>Support</h2>
						<ul>
							<li>
								<a href="#">Getting Started</a>
							</li>
							<li>
								<a href="#">FAQs</a>
							</li>
							<li>
								<a href="#">Help Centre</a>
							</li>
							<li>
								<a href="#">Report a Bug</a>
							</li>
						</ul>
					</div>

					<div className="sec quicklinks">
						<h2>Contact</h2>
						<ul>
							<li>
								<a href="#">+234 123-7652-765</a>
							</li>
							<li>
								<a href="#">Support@storehub.com</a>
							</li>
							<li>
								<a href="#">Sunshine Daisey-Milk and honey 14432</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="copyrightText">
					<p>Copyright 2023 Store Hub . All Rights Reserved</p>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
