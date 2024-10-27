// "use client";

// import { useState, FC } from "react";
// import { Dialog, DialogContent } from "@components/ui/Dialog";
// import { Button } from "@components/ui/Button";

// interface CheckoutModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const CheckoutModal: FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
//   const [step, setStep] = useState<number>(1);

  
//     const handleNext = () => {
//       if (step < 3) setStep(step + 1);
//     };
  
//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center py-9 justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
//           {/* Step Indicator */}
//           <div className="flex justify-between items-center mb-6">
//             {["Delivery Information", "Payment", "Confirmation"].map(
//               (label, index) => (
//                 <div key={index} className="flex flex-col items-center">
//                   <div
//                     className={`h-8 w-8 rounded-full flex items-center justify-center ${
//                       step === index + 1
//                         ? "bg-orange-500 text-white"
//                         : "bg-gray-200 text-gray-500"
//                     }`}
//                   >
//                     {index + 1}
//                   </div>
//                   <p
//                     className={`mt-1 text-sm ${
//                       step === index + 1 ? "text-black" : "text-gray-500"
//                     }`}
//                   >
//                     {label}
//                   </p>
//                 </div>
//               )
//             )}
//           </div>
  
//           {/* Form for each step */}
//           {step === 1 && (
//             <div>
//               <label className="block mb-2">Full Name</label>
//               <input type="text" className="w-full border p-2 rounded mb-4" />
  
//               <label className="block mb-2">Phone Number</label>
//               <input type="text" className="w-full border p-2 rounded mb-4" />
  
//               <label className="block mb-2">City</label>
//               <select className="w-full border p-2 rounded mb-4">
//                 <option value="Lagos">Lagos</option>
//                 {/* Add more options here */}
//               </select>
  
//               <label className="block mb-2">Delivery Address</label>
//               <textarea
//                 className="w-full border p-2 rounded mb-4"
//                 rows="3"
//               ></textarea>
  
//               <button
//                 className="bg-orange-500 text-white w-full py-2 rounded"
//                 onClick={handleNext}
//               >
//                 Proceed to Payment
//               </button>
//             </div>
//           )}
  
//           {/* Step 2 and Step 3 Placeholder */}
//           {step === 2 && (
//             <div>
//               {/* Payment step form here */}
//               <p>Payment details will go here...</p>
//               <button
//                 className="bg-orange-500 text-white w-full py-2 rounded mt-4"
//                 onClick={handleNext}
//               >
//                 Proceed to Confirmation
//               </button>
//             </div>
//           )}
  
//           {step === 3 && (
//             <div>
//               {/* Confirmation step */}
//               <p>Order confirmed!</p>
//               <button
//                 className="bg-orange-500 text-white w-full py-2 rounded mt-4"
//                 onClick={onClose}
//               >
//                 Close
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }


//   export default CheckoutModal;
  
  
  
  
  
  
  
