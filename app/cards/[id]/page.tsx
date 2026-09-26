import Myplan from '@/app/components/cardDetails/Myplan';
import TodayBtn from '@/app/components/cardDetails/TodayBtn';
import { ICard } from '@/app/types/card';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

interface ICardDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const getCards = async (): Promise<ICard[]> => {
  try {
    const response = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 3600 },
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
    console.error("Fetch card error:", error);
    return [];
  }
};

const CardDetailsPage = async ({ params }: ICardDetailsPageProps) => {
  const { id } = await params;
  const cards = await getCards();
  const card = cards.find((c) => String(c.id) === String(id));

  if (!card) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0d0f12] px-4 py-8 text-white md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-start">
          
          {/* Left: Image Container */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#151820] border border-white/5 shadow-2xl">
            <Image
              src={card.image}
              alt={card.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Right: Content Details */}
          <div className="flex flex-col">
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white">
              {card.name}
            </h1>

            {/* Description */}
            <p className="mt-2 text-sm leading-6 text-gray-400">
              {card.description}
            </p>

            {/* Muscle Group Badges */}
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

            {/* Specifications Card Table */}
            <div className="mt-6 divide-y divide-white/5 rounded-xl border border-white/5 bg-[#14171f]">
              <div className="flex items-center justify-between px-4 py-2.5 text-xs">
                <span className="font-semibold uppercase tracking-wider text-gray-400">
                  Equipment
                </span>
                <span className="font-medium text-gray-200">{card.equipment}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 text-xs">
                <span className="font-semibold uppercase tracking-wider text-gray-400">
                  Difficulty
                </span>
                <span className="font-medium text-gray-200">{card.difficulty}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 text-xs">
                <span className="font-semibold uppercase tracking-wider text-gray-400">
                  Sets
                </span>
                <span className="font-medium text-gray-200">{card.sets}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 text-xs">
                <span className="font-semibold uppercase tracking-wider text-gray-400">
                  Reps
                </span>
                <span className="font-medium text-gray-200">{card.reps}</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 text-xs">
                <span className="font-semibold uppercase tracking-wider text-gray-400">
                  Duration
                </span>
                <span className="font-medium text-gray-200">{card.duration} min</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 text-xs">
                <span className="font-semibold uppercase tracking-wider text-gray-400">
                  Calories
                </span>
                <span className="font-medium text-gray-200">{card.caloriesBurned} kcal</span>
              </div>
              <div className="flex items-center justify-between px-4 py-2.5 text-xs">
                <span className="font-semibold uppercase tracking-wider text-gray-400">
                  Rating
                </span>
                <span className="font-semibold text-gray-200">{card.rating}</span>
              </div>
            </div>

            {/* Instructions */}
            {card.instructions && card.instructions.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xs font-black uppercase tracking-wider text-white">
                  Instructions
                </h3>
                <ol className="mt-3 space-y-2 text-xs leading-relaxed text-gray-400">
                  {card.instructions.map((inst, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-gray-500 font-semibold">{index + 1}.</span>
                      <span>{inst}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Action Buttons */}
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