"use client";

import React, { createContext, useEffect, useState } from "react";
import { ICard } from "../types/card";

interface CardContextType {
  todayPlan: ICard[];
  setTodayPlan: React.Dispatch<React.SetStateAction<ICard[]>>;
  addToTodayPlan: (card: ICard) => boolean;
  removeFromTodayPlan: (id: number) => void;

  myPlan: ICard[];
  setMyPlan: React.Dispatch<React.SetStateAction<ICard[]>>;
  addToMyPlan: (card: ICard) => boolean;
  removeFromMyPlan: (id: number) => void;

  loading: boolean;
}

export const CardContext = createContext<CardContextType>({
  todayPlan: [],
  setTodayPlan: () => {},
  addToTodayPlan: () => false,
  removeFromTodayPlan: () => {},

  myPlan: [],
  setMyPlan: () => {},
  addToMyPlan: () => false,
  removeFromMyPlan: () => {},

  loading: true,
});

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [todayPlan, setTodayPlan] = useState<ICard[]>([]);
  const [myPlan, setMyPlan] = useState<ICard[]>([]);
  const [loading, setLoading] = useState(false);

  const addToTodayPlan = (card: ICard) => {
    const exists = todayPlan.some((item) => String(item.id) === String(card.id));
    if (exists) return false;
    setTodayPlan((prev) => [...prev, card]);
    return true;
  };

  const removeFromTodayPlan = (id: number) => {
    setTodayPlan((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  };

  const addToMyPlan = (card: ICard) => {
    const exists = myPlan.some((item) => String(item.id) === String(card.id));
    if (exists) return false;
    setMyPlan((prev) => [...prev, card]);
    return true;
  };

  const removeFromMyPlan = (id: number) => {
    setMyPlan((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  };

  return (
    <CardContext.Provider
      value={{
        todayPlan,
        setTodayPlan,
        addToTodayPlan,
        removeFromTodayPlan,
        myPlan,
        setMyPlan,
        addToMyPlan,
        removeFromMyPlan,
        loading,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default CardProvider;