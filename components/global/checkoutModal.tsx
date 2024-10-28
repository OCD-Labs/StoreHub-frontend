"use client";

import { useState, FC } from "react";
import { Dialog, DialogContent } from "@components/ui/Dialog";
import { Button } from "@components/ui/Button";
import "@/styles/cart.css";
import Nearlogocart from "@public/assets/images/Nearlogocart.png";
import Master from "@public/assets/images/Master.png";
import visa from "@public/assets/images/visa.png";
import Image from "next/image";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal: FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedPayment, setSelectedPayment] = useState<string>("");

  const handlePaymentSelection = (paymentType: string) => {
    setSelectedPayment(paymentType);
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center py-9 justify-center z-50 ">
      <div className="bg-white rounded-lg shadow-lg p-8 md:w-full w-[90%] max-w-lg">
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-6">
          {["Delivery Information", "Payment", "Confirmation"].map(
            (label, index) => (
              <div key={index} className="flex flex-col items-center">
                <div></div>
                <div
                  className={`h-8 w-8 step-indicator rounded-md flex items-center justify-center ${
                    step === index + 1
                      ? "bg-orange-500 text-white"
                      : "bg-[#FCF8F2] text-black"
                  }`}
                >
                  <span className="step-indicator-span">{index + 1}</span>
                </div>
                <p
                  className={`mt-1 text-sm ${
                    step === index + 1 ? "text-black" : "text-gray-500"
                  }`}
                >
                  {label}
                </p>
              </div>
            )
          )}
        </div>

        {/* Form for each step */}
        {step === 1 && (
          <div className="px-5">
            <form action="">
              <label className="block text-[14px] font-medium font-vietnam mb-1">
                Full Name
              </label>
              <input type="text" className="w-full border p-1 rounded mb-4" />

              <label className="block text-[14px] font-medium font-vietnam mb-1">
                Phone Number
              </label>
              <input type="text" className="w-full border p-1 rounded mb-4" />

              <label className="block text-[14px] font-medium font-vietnam mb-1">
                City
              </label>
              <select className="w-full border p-2 rounded mb-4">
                <option value="Lagos">Lagos</option>
                <option value="Lagos">Abuja</option>
                <option value="Lagos">Port Harcourt</option>
                {/* Add more options here */}
              </select>

              <label className="block text-[14px] font-medium font-vietnam mb-2">
                Delivery Address
              </label>
              <textarea className="w-full border p-1 rounded mb-4"></textarea>

              <div className="flex justify-center">
                <button
                  className="bg-orange-500 text-white w-[300px] text-[13px] font-vietnam  p-1 rounded"
                  onClick={handleNext}
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2 and Step 3 Placeholder */}
        {step === 2 && (
          <div className="px-4">
            {/* Card Payment Option */}
            <div className="mb-6">
              <h3 className="text-[16px] font-vietnam font-medium mb-2">
                Card Payment
              </h3>
              <div
                className={`flex items-center justify-between p-2 border rounded-lg cursor-pointer ${
                  selectedPayment === "card"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => handlePaymentSelection("card")}
              >
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    checked={selectedPayment === "card"}
                    onChange={() => handlePaymentSelection("card")}
                    className="form-radio h-5 w-5 text-blue-500"
                  />
                  <span className="text-gray-600 text-[12px]">
                    Other Payment Methods
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Image
                    src={visa} // Replace with actual icon source
                    alt="Visa"
                    className="h-6"
                  />
                  <Image
                    src={Master} // Replace with actual icon source
                    alt="Mastercard"
                    className="h-6"
                  />
                </div>
              </div>
            </div>

            {/* Near Payment Option */}
            <div className="mb-6">
              <h3 className="text-[16px] font-vietnam font-medium mb-2">
                Near
              </h3>
              <div
                className={`flex items-center justify-between p-2 border rounded-lg cursor-pointer ${
                  selectedPayment === "near"
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => handlePaymentSelection("near")}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={selectedPayment === "near"}
                    onChange={() => handlePaymentSelection("near")}
                    className="form-radio h-5 w-5 text-blue-500"
                  />

                  <span className="text-gray-500 text-[12px]">
                    You will be redirected to the Near website
                  </span>
                </div>
                <Image src={Nearlogocart} alt="Near" className="h-6 w-6" />
              </div>
            </div>

            {/* Proceed to Payment Button */}
            <div className="flex mt-3 justify-center">
              <button
                className="w-[300px] bg-orange-500 hover:bg-orange-600 text-white font-semibold py-1 rounded-lg"
                onClick={handleNext}
              >
                Confirm Payment
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="px-5">
            {/* Confirmation step */}
            <div className="flex justify-center py-0 md:py-[100px] w-full"><p className="font-medium md:text-[35px] text-[20px] text-[#000000B2] font-vietnam">Order confirmed!</p></div>
            
            <button
              className="bg-orange-500 text-white w-full py-2 rounded mt-4"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
