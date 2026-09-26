"use client";

import React, { useContext, useState } from "react";
import { CardContext } from "@/app/context/CardContext";
import Link from "next/link";
import Image from "next/image";

const ListedPage = () => {
  const { todayPlan, removeFromTodayPlan, myPlan, removeFromMyPlan, loading } =
    useContext(CardContext);

  const [activeTab, setActiveTab] = useState<"today" | "saved">("today");

  const currentList = activeTab === "today" ? todayPlan : myPlan;

  // Summary stats
  const totalExercises = currentList.length;
  const totalDuration = currentList.reduce((acc, c) => acc + (c.duration || 0), 0);
  const totalCalories = currentList.reduce((acc, c) => acc + (c.caloriesBurned || 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0c0f] p-10 text-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0c0f] px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-xl font-black uppercase tracking-wider text-white">
          MY PLAN
        </h1>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 rounded-xl border border-white/10 bg-[#14171e] p-6 text-center">
          <div>
            <p className="text-3xl font-black text-[#baff00]">{totalExercises}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Exercises
            </p>
          </div>
          <div>
            <p className="text-3xl font-black text-[#baff00]">{totalDuration}m</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Duration
            </p>
          </div>
          <div>
            <p className="text-3xl font-black text-[#baff00]">{totalCalories}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Calories (kcal)
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-3 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab("today")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
              activeTab === "today"
                ? "bg-[#baff00] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Today&apos;s Plan ({todayPlan.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition ${
              activeTab === "saved"
                ? "bg-[#baff00] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Saved ({myPlan.length})
          </button>
        </div>

        {/* Items List or Empty State */}
        <div className="mt-6">
          {currentList.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-[#14171e] py-16 text-center">
              <p className="text-sm font-semibold tracking-wider text-gray-400">
                NOTHING HERE YET
              </p>
              <Link
                href="/"
                className="mt-5 rounded-md bg-[#baff00] px-6 py-2.5 text-xs font-black uppercase text-black transition hover:bg-[#c8ff33]"
              >
                BROWSE WORKOUTS
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {currentList.map((card) => (
                <div
                  key={card.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-[#14171e] p-4 transition hover:border-white/20"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-20 overflow-hidden rounded-lg bg-black">
                      <Image
                        src={card.image}
                        alt={card.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-white uppercase">{card.name}</h3>
                      <p className="text-xs text-gray-400">
                        {card.duration}m · {card.caloriesBurned} kcal · {card.difficulty}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/card/${card.id}`}
                      className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20"
                    >
                      View
                    </Link>
                    <button
                      onClick={() =>
                        activeTab === "today"
                          ? removeFromTodayPlan(card.id)
                          : removeFromMyPlan(card.id)
                      }
                      className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/20"
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

export default ListedPage;