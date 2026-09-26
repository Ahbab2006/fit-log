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

        {/* Right Badges (Clickable with query parameter) */}
        <div className="flex items-center gap-4 text-sm">
          {/* Plan Button */}
          <Link
            href="/listed-card?tab=today"
            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-gray-300 transition hover:bg-white/5 hover:text-white"
          >
            <span className="font-medium">Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#baff00] px-1 text-xs font-bold text-black">
              {todayPlan.length}
            </span>
          </Link>

          {/* Saved Button */}
          <Link
            href="/listed-card?tab=saved"
            className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-gray-300 transition hover:bg-white/5 hover:text-white"
          >
            <span className="font-medium">Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-white/20 bg-white/5 px-1 text-xs font-bold text-white">
              {myPlan.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;