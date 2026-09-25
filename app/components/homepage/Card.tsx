import Image from "next/image";
import React from "react";
import CardData from "../shared/CardData";
import { ICard } from "@/app/types/card";

const getCard = async () => {
    const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
    const data = await response.json();
    return data;
};

const Card = async () => {
    const cardData = await getCard();

    return (
        <div className="min-h-screen bg-slate-950 px-6 py-12">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                        FitLog
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight text-white">
                        Workout Library
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Choose a workout and start building your strength.
                    </p>
                </div>

                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {cardData.map((card:ICard,ind:number) => {
                        return <CardData key={ind} card={card} />
                    }
                    )}
                </div>
            </div>
        </div>
    );
};

export default Card;
