import Banner from "./components/homepage/Banner";
import CardData from "./components/shared/CardData";
import { ICard } from "./types/card";

async function getWorkouts(): Promise<ICard[]> {
  try {
    const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.workouts)
      ? data.workouts
      : [];
  } catch (error) {
    console.error("Home page fetch error:", error);
    return [];
  }
}

export default async function Home() {
  const cards = await getWorkouts();

  return (
    <main className="min-h-screen bg-[#0b0c0f] pb-20">
      <Banner />

      <section className="mx-auto max-w-7xl px-6">
        <h2 className="mb-6 text-xs font-black tracking-widest text-[#baff00]">
          THE LIBRARY
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <CardData key={card.id} card={card} />
          ))}
        </div>
      </section>
    </main>
  );
}