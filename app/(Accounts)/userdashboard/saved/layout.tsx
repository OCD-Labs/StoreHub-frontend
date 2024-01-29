"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Saved = ({ children }: { children: React.ReactNode }) => {
//   const token = useSearchParams().get("token");
//   const userID = useSearchParams().get("user");
//   const id = useSearchParams().get("id");
//   const name = useSearchParams().get("name");
  return (
    <div >
      <section>
        <div className="font-bold text-lg p-3">
          Saved Item
        </div>
        <hr className="w-full" />
      </section>
      <section className="">{children}</section>
    </div>
  );
};
export default Saved;
