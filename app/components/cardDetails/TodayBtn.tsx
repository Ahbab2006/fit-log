'use client';

import { CardContext } from '@/app/context/CardContext';
import { ICard } from '@/app/types/card';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';

const TodayBtn = ({ card }: { card: ICard }) => {
  const { todayPlan, addToTodayPlan } = useContext(CardContext);

  const handleTodayBtn = () => {
   
    const alreadyExists = todayPlan.some((item) => String(item.id) === String(card.id));

    if (alreadyExists) {
      toast.warn(`"${card.name}" is already in your plan!`);
      return;
    }

    const added = addToTodayPlan(card);
    if (added) {
      toast.success(`"${card.name}" added to today's plan!`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleTodayBtn}
      className="flex items-center gap-2 rounded-lg bg-[#baff00] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#cbfb2d]"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      Add to today&apos;s plan
    </button>
  );
};

export default TodayBtn;