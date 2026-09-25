'use client';

import { CardContext } from '@/app/context/CardContext';
import { ICard } from '@/app/types/card';
import React, { useContext } from 'react';

const TodayBtn = ({ card }: { card: ICard }) => {

    const { workouts, setWorkouts } = useContext(CardContext)



    const handelTodayBtn = () => {
        console.log("Card Tragerd", card);


        setWorkouts([...workouts, card]);
        alert(`you have read card"${card.name}"`)
    }

    return (
        <button
            type="button"
            className="rounded-lg bg-lime-400 px-5 py-3 text-xs font-bold text-black transition hover:bg-lime-300"
            onClick={() => handelTodayBtn()}>
            <span className="mr-2 text-sm">⊞</span>
            Add to today&apos;s plan
        </button>
    );
};

export default TodayBtn;