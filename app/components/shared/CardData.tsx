import { ICard } from "@/app/types/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CardData = ({ card }: { card: ICard }) => {
  return (
    <Link
      href={`/card/${card.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#12141a] transition hover:border-[#baff00]/50"
    >
      <div className="relative h-48 w-full overflow-hidden bg-black/40">
        <Image
          src={card.image}
          alt={card.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
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

          <h3 className="text-base font-bold uppercase text-white group-hover:text-[#baff00] transition">
            {card.name}
          </h3>

          <p className="mt-1 line-clamp-2 text-xs text-gray-400">
            {card.description}
          </p>
        </div>

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