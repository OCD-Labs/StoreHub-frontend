import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Saved = ({ children }: { children: React.ReactNode }) => {
  //   const token = useSearchParams().get("token");
  //   const userID = useSearchParams().get("user");
  //   const id = useSearchParams().get("id");
  //   const name = useSearchParams().get("name");
  return (
    <div>
      <section>
        <div className="font-vietnam font-bold text-xl p-3 bg-[#FCF8F2]">Saved Item</div>
        <hr className="w-full" />
      </section>
      <section className="">{children}</section>
    </div>
  );
};
export default Saved;
