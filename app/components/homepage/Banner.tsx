import React from "react";
import BannerImg from "../../assets/banner.png";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto flex max-w-7xl items-center overflow-hidden rounded-2xl border border-white/10 bg-[#15171c]">

        {/* Left Content */}
        <div className="w-full px-8 py-14 md:px-12 lg:w-2/3 lg:py-16">

          {/* Small heading */}
          <p className="mb-5 text-xs font-bold tracking-widest text-[#baff00]">
            WORKOUT LIBRARY
          </p>

          {/* Main heading */}
          <h1 className="max-w-2xl text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl lg:text-6xl">
            TRAIN WITH INTENT. LOG
            <br />
            EVERY SET.
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          {/* Button */}
          <button className="mt-7 rounded-md bg-[#baff00] px-6 py-3 text-xs font-black text-black transition hover:bg-[#c8ff33] hover:shadow-[0_0_25px_rgba(186,255,0,0.2)]">
            BROWSE WORKOUTS
          </button>
        </div>

        {/* Right Image */}
        <div className="hidden h-full w-1/3 items-center justify-center lg:flex">
          <Image
            src={BannerImg}
            width={400}
            height={400}
            alt="Workout illustration"
            className="h-[330px] w-[330px] object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
