import { getSession } from "../../actions/auth-action";
import React from "react";
import MainSection from "../../(Home)/components/MainSection";
import Video from "../../(Home)/components/DemoVideo";
import Features from "../../(Home)/components/Features";
import FAQ from "../../(Home)/components/Faq";
import Footer from "@components/global/Footer";

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
        <section id="main-section">
          <MainSection />
        </section>
        <section id="video">
          <Video />
        </section>
        <section id="features">
          <Features />
        </section>
        <section id="faq">
          <FAQ />
        </section>
      </main>
      <Footer/>
    </>
  );
};

export default Page;
