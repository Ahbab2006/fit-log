'use client';

import { CardContext } from '@/app/context/CardContext';
import { ICard } from '@/app/types/card';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';

const Myplan = ({ card }: { card: ICard }) => {
  const { myPlan, addToMyPlan } = useContext(CardContext);

  const handleMyPlanBtn = () => {
    // Check jodi agei save kora thake
    const alreadyExists = myPlan.some((item) => String(item.id) === String(card.id));

    if (alreadyExists) {
      toast.warn(`"${card.name}" is already saved!`);
      return;
    }

    const added = addToMyPlan(card);
    if (added) {
      toast.success(`"${card.name}" saved for later!`);
    }
  };

  return (
    <button
      type="button"
      onClick={handleMyPlanBtn}
      className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-white/10"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 text-gray-300"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
      Save for later
    </button>
  );
};

export default Myplan;