import Myplan from "@/app/components/cardDetails/Myplan";
import TodayBtn from "@/app/components/cardDetails/TodayBtn";
import { ICard } from "@/app/types/card";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const getCards = async (): Promise<ICard[]> => {
  try {
    const response = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      cache: "no-store",
    });
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.workouts)
      ? data.workouts
      : [];
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
};

const CardDetailsPage = async ({ params }: PageProps) => {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const cardsData = await getCards();
  const card = cardsData.find((c) => String(c.id).trim() === String(id).trim());

  if (!card) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0d0f12] px-4 py-8 text-white md:px-8">
      {/* aponar baki UI code ekdom ager motoi thakbe */}
    </main>
  );
};

export default CardDetailsPage;