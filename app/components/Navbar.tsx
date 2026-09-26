"use client";

import React, { useContext } from "react";
import Logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { CardContext } from "@/app/context/CardContext";

const Navbar = () => {
  const { todayPlan, myPlan } = useContext(CardContext);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0c0f]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={Logo} width={34} height={34} alt="FitLog Logo" />
          <span className="text-lg font-black tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/"
            className="rounded-full bg-[#1e2a07] px-5 py-2 text-sm font-semibold text-[#baff00] transition hover:bg-[#28380a]"
          >
            Workouts
          </Link>
          <Link
            href="/listed-card"
            className="rounded-full px-5 py-2 text-sm font-semibold text-gray-400 transition hover:text-white"
          >
            My Plan
          </Link>
        </div>

        {/* Right Badges */}
        <div className="flex items-center gap-5 text-sm">
          <Link href="/listed-card" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <span>Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#baff00] px-1 text-xs font-bold text-black">
              {todayPlan.length}
            </span>
          </Link>

          <Link href="/listed-card" className="flex items-center gap-2 text-gray-400 hover:text-white">
            <span>Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-white/20 px-1 text-xs text-white">
              {myPlan.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;