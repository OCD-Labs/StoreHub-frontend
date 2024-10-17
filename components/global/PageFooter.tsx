const PageFooter: React.FC = () => {
  return (
    <div className="bg-gray-900 py-16 ">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
        <div className="space-y-2">
          <h3 className="font-semibold font-vietnam text-white">Company</h3>
          <ul className="text-gray-400 space-y-1">
            <li className="hover:text-white font-vietnam cursor-pointer">
              About
            </li>
            <li className="hover:text-white font-vietnam cursor-pointer">
              Get Wallet
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold font-vietnam text-white">Explore</h3>
          <ul className="text-gray-400 space-y-1">
            <li className="hover:text-white font-vietnam cursor-pointer">
              Features
            </li>
            <li className="hover:text-white font-vietnam cursor-pointer">
              Marketplace
            </li>
            <li className="hover:text-white font-vietnam cursor-pointer">
              Demo
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold font-vietnam text-white">Support</h3>
          <ul className="text-gray-400 space-y-1">
            <li className="hover:text-white cursor-pointer">Getting Started</li>
            <li className="hover:text-white font-vietnam cursor-pointer">
              FAQs
            </li>
            <li className="hover:text-white font-vietnam cursor-pointer">
              Help Center
            </li>
            <li className="hover:text-white cursor-pointer font-vietnam">
              Report a Bug
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-white font-vietnam">Contact</h3>
          <ul className="text-gray-400 space-y-1 font-vietnam">
            <li className="hover:text-white cursor-pointer font-vietnam">
              Contact Us
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PageFooter;
