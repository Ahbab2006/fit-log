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

  // Completed workouts track korar jonno state
  const [completedIds, setCompletedIds] = useState<number[]>([]);

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

  const handleMarkAsDone = (cardId: number, cardName: string) => {
    if (completedIds.includes(cardId)) {
      setCompletedIds((prev) => prev.filter((id) => id !== cardId));
      toast.info(`"${cardName}" marked as pending`);
    } else {
      setCompletedIds((prev) => [...prev, cardId]);
      toast.success(`"${cardName}" marked as done! Great job! 💪`);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0c0f] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-xl font-black uppercase tracking-wider text-white">
          MY PLAN
        </h1>
        <p className="mt-1 text-xs text-gray-400 sm:text-sm">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        {/* Stats Row */}
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

        {/* Tabs and Sort By */}
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

        {/* Workout List */}
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
              {sortedList.map((card) => {
                const isDone = completedIds.includes(card.id);

                return (
                  <div
                    key={card.id}
                    className={`flex flex-col gap-4 rounded-xl border border-white/5 bg-[#12141a] p-4 transition hover:border-white/15 sm:flex-row sm:items-center sm:justify-between ${isDone ? "opacity-60" : ""
                      }`}
                  >
                    {/* Left: Image & Info */}
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
                        <h3 className={`text-sm font-bold uppercase text-white ${isDone ? "line-through text-gray-400" : ""}`}>
                          {card.name}
                        </h3>
                        <p className="mt-1 text-xs text-gray-400">
                          {card.duration} min · {card.caloriesBurned} kcal · ⭐ {card.rating}
                        </p>
                      </div>
                    </div>

                    {/* Right: Actions (View Details, Mark as Done, Remove) */}
                    <div className="flex items-center gap-3">
                      {/* View Details */}
                      <Link
                        href={`/cards/${card.id}`}
                        className="rounded-full border border-white/10 bg-[#161922] px-4 py-2 text-xs font-medium text-gray-200 transition hover:bg-white/10 hover:text-white"
                      >
                        View Details
                      </Link>

                      {/* Mark as Done */}
                      <button
                        type="button"
                        onClick={() => handleMarkAsDone(card.id, card.name)}
                        className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition active:scale-95 ${isDone
                            ? "bg-zinc-800 text-gray-400 border border-white/10"
                            : "bg-[#baff00] text-black hover:bg-[#c8ff33]"
                          }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3.5 w-3.5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {isDone ? "Completed" : "Mark as Done"}
                      </button>

                      {/* Remove (Cross Icon) */}
                      <button
                        type="button"
                        onClick={() => {
                          if (activeTab === "today") {
                            removeFromTodayPlan(card.id);
                          } else {
                            removeFromMyPlan(card.id);
                          }
                          toast.success("Remove Successful");
                        }}
                        className="p-1 text-gray-500 transition hover:text-gray-300"
                        title="Remove"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default function ListedCardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0b0c0f] p-10 text-center text-gray-400">
          Loading...
        </div>
      }
    >
      <ListedCardContent />
    </Suspense>
  );
}