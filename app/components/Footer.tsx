import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-white/5 bg-[#0b0c0f] py-6 text-xs text-gray-500">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">

        <div className="flex items-center gap-2 font-black tracking-wider text-white">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 text-[#baff00]"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6.5 6.5 11 11" />
            <path d="m21 21-1-1" />
            <path d="m3 3 1 1" />
            <path d="m18 22 4-4" />
            <path d="m2 6 4-4" />
            <path d="m3 10 7-7" />
            <path d="m14 21 7-7" />
          </svg>
          <span className="uppercase">FITLOG</span>
        </div>

        <p className="text-gray-400">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;