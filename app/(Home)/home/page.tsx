import { getSession } from "../../actions/auth-action";
import React from "react";
import MainSection from "../../(Home)/components/MainSection";
import Video from "../../(Home)/components/DemoVideo";
import Features from "../../(Home)/components/Features";
import FAQ from "../../(Home)/components/Faq";

// import { InitContract } from '@components/util/config'

const Page = async () => {
  // const createUserAcc = async () => {
  //   const { createWalletAccount } = await InitContract()
  //   const account = await createWalletAccount('viky')
  //   console.log(account, 'new user')
  // }

  const session = await getSession();
  console.log(session);

  const authenticated = !!session;
  return (
    <>
      <main className="max-w-[90rem] mx-auto px-4">
        <MainSection />
        <Video />
        <Features />
        <FAQ />
      </main>
    </>
  );
};

export default Page;
