'use client';

import { CardContext } from '@/app/context/CardContext';
import { ICard } from '@/app/types/card';
import React, { useContext } from 'react';

const Myplan = ({ card }: { card: ICard }) => {

    const { myPlan, setMyPlan } = useContext(CardContext)



    const handelMyplanBtn = () => {
        console.log("Card Tragerd", card);


        setMyPlan([...myPlan, card]);
        alert(`you have read card"${card.name}"`)
    }

    return (
        <button
            type="button"
            className="rounded-lg bg-lime-400 px-5 py-3 text-xs font-bold text-black transition hover:bg-lime-300"
            onClick={() => handelMyplanBtn()}>
            <span className="mr-2 text-sm">⊞</span>
            Save for later
        </button>
    );
};

export default Myplan;