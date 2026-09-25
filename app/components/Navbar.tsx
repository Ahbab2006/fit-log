import React from "react";
import Logo from "../assets/logo.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="border-b border-white/10 bg-[#0b0c0f]">
      <div className="mx-auto flex h-20 max-w-7xl items-center px-6">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src={Logo}
            width={34}
            height={34}
            alt="FitLog Logo"
          />

          <span className="text-lg font-black tracking-wide text-white">
            FITLOG
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="mx-auto hidden items-center gap-2 md:flex">
          <a
            href="#workouts"
            className="rounded-full bg-[#243500] px-5 py-2 text-sm font-medium text-[#baff00]"
          >
            Workouts
          </a>

          <a
            href="#plan"
            className="rounded-full px-5 py-2 text-sm text-gray-400 transition hover:text-white"
          >
            My Plan
          </a>
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-5 text-sm md:flex">
          <div className="flex items-center gap-2 text-gray-400">
            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#baff00] px-1 text-xs font-bold text-black">
              0
            </span>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-white/20 px-1 text-xs">
              0
            </span>
          </div>
        </div>

        {/* Mobile menu */}
        <button className="ml-auto text-gray-300 md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
