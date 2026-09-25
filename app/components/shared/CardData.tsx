import { ICard } from '@/app/types/card';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface ICardProps{
card:ICard;
} 


const CardData = ({card}:ICardProps) => {
    return (
        <div className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-emerald-400/30 hover:bg-white/[0.09]"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={card.image}
                  alt={card.name}
                  width={800}
                  height={600}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                {/* Difficulty */}
                <div className="absolute left-4 top-4">
                  <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                    {card.difficulty}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-md">
                  <span className="text-yellow-400">★</span>
                  {card.rating}
                </div>

                {/* Workout name */}
                <div className="absolute bottom-4 left-5 right-5">
                  <h2 className="text-2xl font-bold text-white">
                    {card.name}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Muscle groups */}
                <div className="mb-5 flex flex-wrap gap-2">
                  {card.muscleGroups.map((muscle) => (
                    <span
                      key={muscle}
                      className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-400/20"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-2xl bg-white/5 p-3 text-center">
                    <p className="text-lg font-bold text-white">
                      {card.duration}
                    </p>
                    <p className="text-[11px] text-slate-400">Minutes</p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-3 text-center">
                    <p className="text-lg font-bold text-white">
                      {card.caloriesBurned}
                    </p>
                    <p className="text-[11px] text-slate-400">Calories</p>
                  </div>

                  <div className="rounded-2xl bg-white/5 p-3 text-center">
                    <p className="text-lg font-bold text-white">
                      {card.sets} × {card.reps}
                    </p>
                    <p className="text-[11px] text-slate-400">Sets / Reps</p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-5 line-clamp-2 text-sm leading-6 text-slate-400">
                  {card.description}
                </p>

                {/* Equipment */}
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="text-xs text-slate-500">Equipment</p>
                    <p className="mt-1 text-sm font-medium text-slate-200">
                      {card.equipment}
                    </p>
                  </div>

                  <Link href={`/cards/${card.id}`}>
                  <button
                    className="rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-300 active:scale-95"
                  >
                    Start Workout
                  </button>
                  </Link>
                </div>
              </div>
            </div>
    );
};

export default CardData;