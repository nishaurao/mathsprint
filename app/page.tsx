"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const levels = [
  { year: 1, icon: "🐣", label: "Little Explorer", style: "from-yellow-300 to-orange-400" },
  { year: 2, icon: "🐼", label: "Number Ninja", style: "from-green-300 to-emerald-500" },
  { year: 3, icon: "🦁", label: "Math Hero", style: "from-blue-300 to-blue-500" },
  { year: 4, icon: "🦊", label: "Math Master", style: "from-purple-300 to-purple-500" },
  { year: 5, icon: "🐲", label: "Math Legend", style: "from-pink-300 to-rose-500" },
];

export default function Home() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
const router = useRouter();

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-sky-200 via-purple-100 to-pink-200">

      {/* Background decorations */}
      <div className="absolute left-10 top-10 text-6xl opacity-30">⭐</div>
      <div className="absolute right-10 top-24 text-7xl opacity-30">☁️</div>
      <div className="absolute bottom-20 left-20 text-6xl opacity-30">🌈</div>
      <div className="absolute bottom-10 right-20 text-6xl opacity-30">🚀</div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center px-6 py-10">

        {/* Top bar */}
        <div className="flex w-full items-center justify-between">
          <div className="text-2xl font-black text-purple-700">
            🚀 MathSprint
          </div>

          <div className="flex gap-3">
            <div className="rounded-full bg-white px-4 py-2 font-bold shadow">
              🔥 3
            </div>

            <div className="rounded-full bg-white px-4 py-2 font-bold shadow">
              ⭐ 250
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="mt-12 text-center">
          <div className="text-7xl">🚀</div>

          <h1 className="mt-4 text-4xl font-black text-purple-900 sm:text-6xl">
            Ready for a Math Adventure?
          </h1>

          <p className="mt-4 text-xl font-medium text-purple-700">
            Pick your level and start today's challenge!
          </p>
        </div>

        {/* Level card */}
        <div className="mt-10 w-full rounded-[2.5rem] bg-white/80 p-6 shadow-2xl backdrop-blur sm:p-10">

          <h2 className="text-center text-3xl font-black text-slate-800">
            Choose Your Level
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {levels.map((level) => {
              const selected = selectedYear === level.year;

              return (
                <button
                  key={level.year}
                  onClick={() => setSelectedYear(level.year)}
                  className={`group rounded-3xl bg-gradient-to-br ${level.style}
                    p-1 transition duration-300 hover:-translate-y-2 hover:scale-105
                    ${
                      selected
                        ? "scale-105 ring-4 ring-purple-600 ring-offset-4"
                        : ""
                    }`}
                >
                  <div className="flex h-full flex-col items-center rounded-[1.3rem] bg-white/90 p-6">

                    <span className="text-6xl transition group-hover:scale-125">
                      {level.icon}
                    </span>

                    <span className="mt-4 text-2xl font-black text-slate-800">
                      Year {level.year}
                    </span>

                    <span className="mt-1 text-sm font-semibold text-slate-500">
                      {level.label}
                    </span>

                    {selected && (
                      <span className="mt-3 rounded-full bg-purple-600 px-3 py-1 text-xs font-bold text-white">
                        ✓ SELECTED
                      </span>
                    )}

                  </div>
                </button>
              );
            })}
          </div>

          {/* Start button */}
          <div className="mx-auto mt-10 max-w-md">

            <button
              disabled={!selectedYear}
              onClick={() => router.push(`/quiz?year=${selectedYear}`)}
              className="w-full rounded-full bg-gradient-to-r from-purple-600 to-pink-500
                px-8 py-5 text-xl font-black text-white shadow-xl
                transition hover:scale-105 hover:shadow-2xl
                disabled:cursor-not-allowed disabled:from-slate-300
                disabled:to-slate-300 disabled:hover:scale-100"
            >
              {selectedYear
                ? `🚀 Start Year ${selectedYear} Sprint!`
                : "👆 Pick Your Level"}
            </button>

          </div>

        </div>

        {/* Daily challenge */}
        <div className="mt-8 rounded-full bg-white/70 px-6 py-3 text-center font-bold text-purple-700 shadow">
          ⭐ Today's Mission: Complete 10 questions and earn 100 coins!
        </div>

      </div>
    </main>
  );
}