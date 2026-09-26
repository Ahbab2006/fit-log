import React from "react";
import BannerImg from "../../assets/banner.png";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="px-4 py-8 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between rounded-3xl border border-white/5 bg-[#12141a] px-8 py-12 md:px-14 md:py-16 lg:flex-row">
        
  
        <div className="w-full lg:max-w-2xl">
   
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#baff00]">
            WORKOUT LIBRARY
          </p>

    
          <h1 className="mt-4 font-black uppercase tracking-tight text-white text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[0.95]">
            <span className="block whitespace-nowrap">TRAIN WITH INTENT. LOG</span>
            <span className="block whitespace-nowrap">EVERY SET.</span>
          </h1>

   
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-gray-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

       
          <div className="mt-7">
            <button
              type="button"
              className="rounded-lg bg-[#baff00] px-6 py-3 text-xs font-black uppercase tracking-wider text-black transition-colors hover:bg-[#cbfb2d]"
            >
              BROWSE WORKOUTS
            </button>
          </div>
        </div>

        <div className="relative mt-8 flex w-full items-center justify-center lg:mt-0 lg:w-auto">
          <div className="relative h-[280px] w-[280px] sm:h-[340px] sm:w-[340px] lg:h-[380px] lg:w-[380px]">
            <Image
              src={BannerImg}
              alt="Workout Machine"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Banner;