"use client";
import { Switch } from "@components/ui/SwitchButton";

const NotificationSettings = () => {
  return (
    <div className="p-3 sm:p-6">
      <ul className="flex flex-col gap-4 sm:gap-6">
        <li>
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold text-base">Notifications</p>
            <Switch />
          </div>
          <p className="w-[90%] sm:w-[80] text-sm">
            Enable app notifications to stay informed. Receive real-time updates
            on your orders, product restocks, and important app changes. Keep
            everything at your fingertips for a seamless shopping experience!
          </p>
        </li>
        <li>
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold text-base">Orders</p>
            <Switch />
          </div>
          <p className="w-[90%] sm:w-[80] text-sm">
            Enable app notifications to stay informed. Receive real-time updates
            on your orders, product restocks, and important app changes. Keep
            everything at your fingertips for a seamless shopping experience!
          </p>
        </li>
        <li>
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold text-base">App Updates</p>
            <Switch />
          </div>
          <p className="w-[90%] sm:w-[80] text-sm">
            Turn on notifications to stay in the loop about important app
            changes. We're always improving, and we want you to experience the
            best of what we offer.
          </p>
        </li>
        <li>
          <div className="flex justify-between items-center mb-2">
            <p className="font-bold text-base">App Promotion</p>
            <Switch />
          </div>
          <p className="w-[90%] sm:w-[80] text-sm">
            Enable notifications and never miss out on exclusive app-only deals
            and promotions. Special savings are just a tap away!
          </p>
        </li>
      </ul>
    </div>
  );
};

export default NotificationSettings;
