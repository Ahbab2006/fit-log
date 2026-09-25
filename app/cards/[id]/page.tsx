import Myplan from '@/app/components/cardDetails/myplan';
import TodayBtn from '@/app/components/cardDetails/TodayBtn';
import { ICard } from '@/app/types/card';
import Image from 'next/image';
import React from 'react';

interface ICardDetailsPageProps {
    params: Promise<{
        id: string
    }>;
}



const getCard = async () => {
    const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
    const data = await response.json();
    return data;
};


const CardDetailsPage = async ({ params }: ICardDetailsPageProps) => {

    const { id } = await params;

    const cardsData = await getCard();
    const card = cardsData.find((card: ICard) => String(card.id) === String(id)) as ICard;

 return (
    <div className="min-h-screen bg-[#0d0f12] px-4 py-8 text-white md:px-6">
        <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-white/5 bg-[#0d0f12]">

            <div className="grid grid-cols-1 gap-8 p-4 md:p-6 lg:grid-cols-[380px_minmax(0,1fr)]">

                {/* ================= IMAGE ================= */}
                <figure className="relative h-[400px] overflow-hidden rounded-xl md:h-[430px]">
                    <Image
                        src={card.image}
                        alt={card.name}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 380px"
                    />
                </figure>


                {/* ================= CONTENT ================= */}
                <div className="min-w-0">

                    {/* Title */}
                    <div>
                        <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white">
                            {card.name}
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-gray-400">
                            {card.description}
                        </p>

                        {/* Muscle Groups */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {card.muscleGroups.map((muscle) => (
                                <span
                                    key={muscle}
                                    className="rounded-full bg-lime-400 px-3 py-1 text-[10px] font-bold uppercase text-black"
                                >
                                    {muscle}
                                </span>
                            ))}
                        </div>
                    </div>


                    {/* ================= STATS ================= */}
                    <div className="mt-6 overflow-hidden rounded-xl border border-white/5 bg-[#12151a]">

                        {/* Equipment */}
                        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                            <span className="text-[10px] font-semibold tracking-wider text-gray-500">
                                EQUIPMENT
                            </span>

                            <span className="text-xs font-medium text-gray-300">
                                {card.equipment}
                            </span>
                        </div>


                        {/* Difficulty */}
                        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                            <span className="text-[10px] font-semibold tracking-wider text-gray-500">
                                DIFFICULTY
                            </span>

                            <span className="text-xs font-medium text-gray-300">
                                {card.difficulty}
                            </span>
                        </div>


                        {/* Sets */}
                        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                            <span className="text-[10px] font-semibold tracking-wider text-gray-500">
                                SETS
                            </span>

                            <span className="text-xs font-medium text-gray-300">
                                {card.sets}
                            </span>
                        </div>


                        {/* Reps */}
                        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                            <span className="text-[10px] font-semibold tracking-wider text-gray-500">
                                REPS
                            </span>

                            <span className="text-xs font-medium text-gray-300">
                                {card.reps}
                            </span>
                        </div>


                        {/* Duration */}
                        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                            <span className="text-[10px] font-semibold tracking-wider text-gray-500">
                                DURATION
                            </span>

                            <span className="text-xs font-medium text-gray-300">
                                {card.duration} min
                            </span>
                        </div>


                        {/* Calories */}
                        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
                            <span className="text-[10px] font-semibold tracking-wider text-gray-500">
                                CALORIES
                            </span>

                            <span className="text-xs font-medium text-gray-300">
                                {card.caloriesBurned} kcal
                            </span>
                        </div>


                        {/* Rating */}
                        <div className="flex items-center justify-between px-4 py-3">
                            <span className="text-[10px] font-semibold tracking-wider text-gray-500">
                                RATING
                            </span>

                            <span className="text-sm font-semibold text-gray-200">
                                ⭐ {card.rating}
                            </span>
                        </div>

                    </div>


                    {/* ================= INSTRUCTIONS ================= */}
                    <div className="mt-6">

                        <h2 className="mb-4 text-sm font-extrabold uppercase tracking-wider text-white">
                            Instructions
                        </h2>

                        <div className="space-y-3">
                            {card.instructions.map((instruction, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3"
                                >
                                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1b1f25] text-[10px] font-semibold text-gray-400">
                                        {index + 1}
                                    </span>

                                    <p className="text-xs leading-5 text-gray-400">
                                        {instruction}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>


                    {/* ================= BUTTONS ================= */}
                    <div className="mt-7 flex flex-wrap gap-3">

                        <TodayBtn card={card}/>

                       <Myplan card={card}/>

                    </div>

                </div>
            </div>
        </div>
    </div>
);


};

export default CardDetailsPage;