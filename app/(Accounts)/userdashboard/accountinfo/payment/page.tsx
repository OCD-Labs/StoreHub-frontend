import Image from "next/image";
import Link from "next/link";
import mastercard from "@public/assets/icons/logos_mastercard.svg";
import paypal from "@public/assets/icons/logos_paypal.svg";
import troy from "@public/assets/icons/fontisto_troy.svg";
import visa from "@public/assets/icons/visa.svg";
import near from "@public/assets/icons/near.svg";
import add from "@public/assets/icons/formkit_add.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Dropdown";

const PaymentInfo = () => {
  return (
    <main>
      <section className="flex justify-center">
        <Popover>
          <PopoverTrigger>
            <section className="border-2 px-7 py-2 flex items-center gap-3 rounded-[10px] mt-6 mx-auto w-72 bg-[#FCF8F2]">
              <Image src={add} alt="add payment" />
              <p className="text-black font-bold">Add new payment menthod</p>
            </section>
          </PopoverTrigger>
          <PopoverContent>
            <section>
              <div className="flex justify-between cursor-pointer px-4">
                <p className="text-black font-bold">Card</p>
                <span className="flex gap-2">
                  <Image src={mastercard} alt="add card" />
                  <Image src={visa} alt="add card" />
                  <Image src={troy} alt="add card" />
                </span>
              </div>
              <hr className="my-2 w-full" />
              <hr className="mb-2 w-full" />

              <div className="flex justify-between cursor-pointer px-4">
                <p className="text-black font-bold">PayPal</p>
                <Image src={paypal} alt="use paypal" />
              </div>

              <hr className="my-2 w-full" />
              <hr className="mb-2 w-full" />

              <div className="flex justify-between cursor-pointer px-4">
                <p className="text-black font-bold">NEAR Token</p>
                <Image src={near} height={25} width={25} alt="use paypal" />
              </div>

              <hr className="my-2 w-full" />
              <hr className="mb-2 w-full" />

              <div className="flex justify-between cursor-pointer px-4">
                <p className="text-black font-bold">Fiat</p>
              </div>
            </section>
          </PopoverContent>
        </Popover>
      </section>
    </main>
  );
};

export default PaymentInfo;
