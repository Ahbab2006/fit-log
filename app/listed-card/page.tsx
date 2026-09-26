"use client";

import React, { useContext, useState, useMemo, useEffect, Suspense } from "react";
import { CardContext } from "@/app/context/CardContext";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

type SortOption = "duration" | "calories" | "rating";

const ListedCardContent = () => {
  const { todayPlan, removeFromTodayPlan, myPlan, removeFromMyPlan } =
    useContext(CardContext);

  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  useEffect(() => {
    if (tabParam === "saved") {
      setActiveTab("saved");
    } else if (tabParam === "today") {
      setActiveTab("today");
    }
  }, [tabParam]);

  const currentRawList = activeTab === "today" ? todayPlan : myPlan;

  const totalExercises = currentRawList.length;
  const totalMinutes = currentRawList.reduce(
    (acc, item) => acc + (Number(item.duration) || 0),
    0
  );
  const totalCalories = currentRawList.reduce(
    (acc, item) => acc + (Number(item.caloriesBurned) || 0),
    0
  );

  const sortedList = useMemo(() => {
    const list = [...currentRawList];

    if (sortBy === "duration") {
      list.sort((a, b) => (Number(b.duration) || 0) - (Number(a.duration) || 0));
    } else if (sortBy === "calories") {
      list.sort((a, b) => (Number(b.caloriesBurned) || 0) - (Number(a.caloriesBurned) || 0));
    } else if (sortBy === "rating") {
      list.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
    }

    return list;
  }, [currentRawList, sortBy]);

  return (
    <main className="min-h-screen bg-[#0b0c0f] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-xl font-black uppercase tracking-wider text-white">
          MY PLAN
        </h1>

        <div className="grid grid-cols-3 gap-3 rounded-2xl border border-white/5 bg-[#12141a] p-6 text-center">
          <div>
            <p className="text-3xl font-black text-[#baff00] md:text-4xl">
              {totalExercises}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Exercises
            </p>
          </div>
          <div>
            <p className="text-3xl font-black text-[#baff00] md:text-4xl">
              {totalMinutes}m
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Minutes
            </p>
          </div>
          <div>
            <p className="text-3xl font-black text-[#baff00] md:text-4xl">
              {totalCalories}
            </p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Calories
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-b border-white/10 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("today")}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition ${activeTab === "today"
                  ? "bg-[#baff00] text-black"
                  : "bg-transparent text-gray-400 hover:text-white"
                }`}
            >
              Today&apos;s Plan ({todayPlan.length})
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`rounded-lg px-4 py-2 text-xs font-bold transition ${activeTab === "saved"
                  ? "bg-[#baff00] text-black"
                  : "bg-transparent text-gray-400 hover:text-white"
                }`}
            >
              Saved ({myPlan.length})
            </button>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-gray-400">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="cursor-pointer rounded-lg border border-white/10 bg-[#161922] px-3 py-1.5 text-xs font-medium text-white outline-none transition hover:border-white/20"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          {sortedList.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-[#12141a] py-20 text-center">
              <p className="text-sm font-semibold tracking-wider text-gray-400">
                NOTHING HERE YET
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Add workouts to get today moving.
              </p>
              <Link
                href="/"
                className="mt-5 rounded-md bg-[#baff00] px-6 py-2.5 text-xs font-black uppercase text-black transition hover:bg-[#cbfb2d]"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedList.map((card) => (
                <div
                  key={card.id}
                  className="flex flex-col gap-4 rounded-xl border border-white/5 bg-[#12141a] p-4 transition hover:border-white/15 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-black">
                      <Image
                        src={card.image}
                        alt={card.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase text-white">
                        {card.name}
                      </h3>
                      <p className="mt-1 text-xs text-gray-400">
                        {card.duration} min · {card.caloriesBurned} kcal · ⭐ {card.rating}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                   
                    <Link
                      href={`/cards/${card.id}`}
                      className="rounded-lg bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
                    >
                      View Details
                    </Link>

                  
                    <button
                      onClick={() => {
                        if (activeTab === "today") {
                          removeFromTodayPlan(card.id);
                        } else {
                          removeFromMyPlan(card.id);
                        }
                        toast.success("Remove Successful");
                      }}
                      className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/20 active:scale-95"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default function ListedCardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b0c0f] p-10 text-center text-gray-400">Loading...</div>}>
      <ListedCardContent />
    </Suspense>
  );
}