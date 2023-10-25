import NextAuth from "next-auth";
import AuthOptions from "@components/util/authoptions";

const handler = NextAuth(AuthOptions);
export { handler as GET, handler as POST };
