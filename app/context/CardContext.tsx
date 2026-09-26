"use client";

import React, { createContext, useEffect, useState } from "react";
import { ICard } from "../types/card";

interface CardContextType {
  libraryWorkouts: ICard[];
  todayPlan: ICard[];
  addToTodayPlan: (card: ICard) => boolean;
  removeFromTodayPlan: (id: number) => void;
  myPlan: ICard[];
  addToMyPlan: (card: ICard) => boolean;
  removeFromMyPlan: (id: number) => void;
  loading: boolean;
}

export const CardContext = createContext<CardContextType>({
  libraryWorkouts: [],
  todayPlan: [],
  addToTodayPlan: () => false,
  removeFromTodayPlan: () => {},
  myPlan: [],
  addToMyPlan: () => false,
  removeFromMyPlan: () => {},
  loading: true,
});

export const CardProvider = ({ children }: { children: React.ReactNode }) => {
  const [libraryWorkouts, setLibraryWorkouts] = useState<ICard[]>([]);
  const [todayPlan, setTodayPlan] = useState<ICard[]>([]);
  const [myPlan, setMyPlan] = useState<ICard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!response.ok) throw new Error("Failed to fetch workouts");

        const result = await response.json();
        const data = Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
          ? result.data
          : Array.isArray(result?.workouts)
          ? result.workouts
          : [];

        setLibraryWorkouts(data);
      } catch (error) {
        console.error("Workout fetch error:", error);
        setLibraryWorkouts([]);
      } finally {
        setLoading(false);
      }
    };

    getWorkouts();
  }, []);

  const addToTodayPlan = (card: ICard) => {
    const exists = todayPlan.some((item) => item.id === card.id);
    if (exists) return false;
    setTodayPlan((prev) => [...prev, card]);
    return true;
  };

  const removeFromTodayPlan = (id: number) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
  };

  const addToMyPlan = (card: ICard) => {
    const exists = myPlan.some((item) => item.id === card.id);
    if (exists) return false;
    setMyPlan((prev) => [...prev, card]);
    return true;
  };

  const removeFromMyPlan = (id: number) => {
    setMyPlan((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <CardContext.Provider
      value={{
        libraryWorkouts,
        todayPlan,
        addToTodayPlan,
        removeFromTodayPlan,
        myPlan,
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