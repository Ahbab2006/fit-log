import React from "react";
import Image from "next/image";
import Link from "next/link"; // ১. Link ইমপোর্ট থাকতে হবে
import { ICard } from "@/app/types/card";

interface CardProps {
  card: ICard;
}

const CardData = ({ card }: CardProps) => {
  return (
    // ২. এখানে চেক করুন href={`/card/${card.id}`} দেওয়া আছে কিনা
    <Link 
      href={`/cards/${card.id}`} 
      className="group block overflow-hidden rounded-xl border border-white/10 bg-[#12141a] transition hover:border-[#baff00]/50"
    >
      <div className="relative h-48 w-full overflow-hidden bg-black/40">
        <Image
          src={card.image}
          alt={card.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        {/* Muscle group */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {card.muscleGroups?.map((muscle) => (
            <span
              key={muscle}
              className="rounded-full bg-[#baff00] px-2 py-0.5 text-[10px] font-bold uppercase text-black"
            >
              {muscle}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold uppercase text-white group-hover:text-[#baff00] transition">
          {card.name}
        </h3>

        <p className="mt-1 line-clamp-2 text-xs text-gray-400">
          {card.description}
        </p>

        {/* Footer info */}
        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3 text-xs text-gray-400">
          <span>{card.duration} min</span>
          <span>{card.caloriesBurned} kcal</span>
          <span className="text-yellow-400">★ {card.rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default CardData;