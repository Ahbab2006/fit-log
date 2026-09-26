import Myplan from '@/app/components/cardDetails/Myplan';
import TodayBtn from '@/app/components/cardDetails/TodayBtn';
import { ICard } from '@/app/types/card';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

interface ICardDetailsPageProps {
  params: Promise<{ id: string }>;
}

const getCards = async (): Promise<ICard[]> => {
  try {
    const response = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 3600 },
    });
    const result = await response.json();
    return Array.isArray(result)
      ? result
      : Array.isArray(result?.data)
      ? result.data
      : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const CardDetailsPage = async ({ params }: ICardDetailsPageProps) => {
  const { id } = await params;
  const cardsData = await getCards();
  const card = cardsData.find((item) => String(item.id) === String(id));

  if (!card) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0b0c0f] px-4 py-10 text-white md:px-8">
      <div className="mx-auto w-full max-w-5xl rounded-2xl border border-white/10 bg-[#12141a] p-6 md:p-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[400px_minmax(0,1fr)]">
          {/* IMAGE */}
          <figure className="relative h-[400px] w-full overflow-hidden rounded-xl bg-black/40">
            <Image
              src={card.image}
              alt={card.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 400px"
            />
          </figure>

          {/* CONTENT */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-black uppercase tracking-tight text-white">
                {card.name}
              </h1>

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

              <p className="mt-4 text-sm leading-6 text-gray-400">
                {card.description}
              </p>

              {/* STATS */}
              <div className="mt-6 rounded-xl border border-white/10 bg-[#171a22]">
                {[
                  { label: "EQUIPMENT", val: card.equipment },
                  { label: "DIFFICULTY", val: card.difficulty },
                  { label: "SETS", val: card.sets },
                  { label: "REPS", val: card.reps },
                  { label: "DURATION", val: `${card.duration} min` },
                  { label: "CALORIES", val: `${card.caloriesBurned} kcal` },
                  { label: "RATING", val: `⭐ ${card.rating}` },
                ].map((item, idx, arr) => (
                  <div
                    key={item.label}
                    className={`flex items-center justify-between px-4 py-3 text-xs ${
                      idx !== arr.length - 1 ? "border-b border-white/5" : ""
                    }`}
                  >
                    <span className="font-semibold text-gray-500">{item.label}</span>
                    <span className="font-medium text-gray-200">{item.val}</span>
                  </div>
                ))}
              </div>

              {/* INSTRUCTIONS */}
              {card.instructions && (
                <div className="mt-6">
                  <h2 className="mb-3 text-xs font-black uppercase tracking-wider text-gray-300">
                    Instructions
                  </h2>
                  <div className="space-y-2">
                    {card.instructions.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-gray-300">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-gray-400">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-wrap gap-3">
              <TodayBtn card={card} />
              <Myplan card={card} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsPage;