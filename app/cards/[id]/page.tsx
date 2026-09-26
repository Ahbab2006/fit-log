import Myplan from "@/app/components/cardDetails/Myplan";
import TodayBtn from "@/app/components/cardDetails/TodayBtn";
import { ICard } from "@/app/types/card";
import Image from "next/image";
import React from "react";

const getCards = async (): Promise<ICard[]> => {
  try {
    const response = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store", 
    });
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.workouts)
      ? data.workouts
      : [];
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
};

const CardDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) => {
  const resolvedParams = await params;
  const cardId = resolvedParams?.id;

  const cardsData = await getCards();

  const card = cardsData.find(
    (c) => String(c.id).trim() === String(cardId).trim()
  );

  if (!card) {
    return (
      <div className="min-h-screen bg-[#0d0f12] p-10 text-center text-white">
        <h2 className="text-2xl font-bold">Card Not Found for ID: {cardId}</h2>
        <p className="mt-2 text-gray-400">Total cards fetched: {cardsData.length}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d0f12] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
      
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/5 bg-[#151820]">
            <Image
              src={card.image}
              alt={card.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
              {card.name}
            </h1>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              {card.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {card.muscleGroups?.map((muscle) => (
                <span
                  key={muscle}
                  className="rounded-full bg-[#baff00] px-3 py-1 text-[11px] font-bold uppercase text-black"
                >
                  {muscle}
                </span>
              ))}
            </div>

            <div className="mt-6 divide-y divide-white/5 rounded-xl border border-white/5 bg-[#14171f]">
              <div className="flex items-center justify-between px-4 py-2.5 text-xs">
                <span className="font-semibold uppercase tracking-wider text-gray-400">Equipment</span>
                <span className="font-medium text-gray-200">{card.equipment}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 text-xs">
                <span className="font-semibold uppercase tracking-wider text-gray-400">Difficulty</span>
                <span className="font-medium text-gray-200">{card.difficulty}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 text-xs">
                <span className="font-semibold uppercase tracking-wider text-gray-400">Sets</span>
                <span className="font-medium text-gray-200">{card.sets}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 text-xs">
                <span className="font-semibold uppercase tracking-wider text-gray-400">Reps</span>
                <span className="font-medium text-gray-200">{card.reps}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 text-xs">
                <span className="font-semibold uppercase tracking-wider text-gray-400">Duration</span>
                <span className="font-medium text-gray-200">{card.duration} min</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 text-xs">
                <span className="font-semibold uppercase tracking-wider text-gray-400">Calories</span>
                <span className="font-medium text-gray-200">{card.caloriesBurned} kcal</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 text-xs">
                <span className="font-semibold uppercase tracking-wider text-gray-400">Rating</span>
                <span className="font-semibold text-gray-200">{card.rating}</span>
              </div>
            </div>

            {card.instructions && card.instructions.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xs font-black uppercase tracking-wider text-white">Instructions</h3>
                <ol className="mt-3 space-y-2 text-xs leading-relaxed text-gray-400">
                  {card.instructions.map((inst, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="font-semibold text-gray-500">{index + 1}.</span>
                      <span>{inst}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mt-7 flex flex-wrap gap-3">
              <TodayBtn card={card} />
              <Myplan card={card} />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default CardDetailsPage;