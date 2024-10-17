"use client";
import { create } from "zustand";

import { Wallet } from "../NearAuth/near-wallet.js";
const CONTRACT_ADDRESS: string = "v2-storehub.testnet";

const wallet = new Wallet({ createAccessKeyFor: CONTRACT_ADDRESS });

interface State {
  wallet: Wallet;
  user: UserData | null;
  setUser: (user: UserData) => void;
}

export const userWallet = create<State>((set) => ({
  wallet,
  user: null,
  setUser: (user) => set(() => ({ user: user })),
}));
