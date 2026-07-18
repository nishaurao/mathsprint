"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const topics = [
  {
    id: "addition",
    icon: "➕",
    title: "Addition",
    description: "Add numbers together",
    style: "from-blue-300 to-blue-500",
  },
  {
    id: "subtraction",
    icon: "➖",
    title: "Subtraction",
    description: "Become a subtraction star",
    style: "from-green-300 to-emerald-500",
  },
  {
    id: "multiplication",
    icon: "✖️",
    title: "Multiplication",
    description: "Master your times tables",
    style: "from-purple-300 to-purple-500",
  },
  {
    id: "division",
    icon: "➗",
    title: "Division",
    description: "Divide and conquer",
    style: "from-pink-300 to-rose-500",
  },
];

const difficulties = [
  {
    id: "easy",
    icon: "😊",
    title: "Easy",
    description: "Let's warm up!",
  },
  {
    id: "medium",
    icon: "😎",
    title: "Medium",
    description: "Ready for a challenge?",
  },
  {
    id: "hard",
    icon: "🔥",
    title: "Hard",
    description: "Show us your skills!",
  },
];

function getTopicsForYear(year: number) {
  if (year === 1) {
    return topics.filter(
      (topic) =>
        topic.id === "addition" ||
        topic.id === "subtraction"
    );
  }

  if (year === 2) {
    return topics.filter(
      (topic) =>
        topic.id === "addition" ||
        topic.id === "subtraction" ||
        topic.id === "multiplication"
    );
  }

  return topics;
}

/*
  Main page

  useSearchParams needs to be inside a Suspense boundary
  for the Next.js production build.
*/

export default function QuizPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-200 via-purple-100 to-pink-200">
          <div className="text-center">
            <div className="text-6xl">
              🚀
            </div>

            <p className="mt-4 text-2xl font-black text-purple-900">
              Loading MathSprint...
            </p>
          </div>
        </main>
      }
    >
      <QuizContent />
    </Suspense>
  );
}

/*
  Quiz setup content
*/

function QuizContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const year = Number(
    searchParams.get("year")
  );

  const availableTopics =
    getTopicsForYear(year);

  const [selectedTopic, setSelectedTopic] =
    useState<string | null>(null);

  const [
    selectedDifficulty,
    setSelectedDifficulty,
  ] = useState<string | null>(null);

  function startSprint() {
    if (
      !selectedTopic ||
      !selectedDifficulty
    ) {
      return;
    }

    router.push(
      `/play?year=${year}&topic=${selectedTopic}&difficulty=${selectedDifficulty}`
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-200 via-purple-100 to-pink-200 px-6 py-10">

      <div className="mx-auto max-w-5xl">

        {/* Top Navigation */}

        <div className="flex items-center justify-between">

          <a
            href="/"
            className="rounded-full bg-white px-5 py-3 font-bold text-purple-700 shadow transition hover:scale-105"
          >
            ← Back
          </a>

          <div className="rounded-full bg-white px-5 py-3 font-bold text-purple-700 shadow">
            🎓 Year {year}
          </div>

        </div>

        {/* Page Heading */}

        <div className="mt-12 text-center">

          <div className="text-7xl">
            🧠
          </div>

          <h1 className="mt-4 text-4xl font-black text-purple-900 sm:text-5xl">
            What shall we practise?
          </h1>

          <p className="mt-3 text-lg font-semibold text-purple-700">
            Choose your challenge for today&apos;s sprint!
          </p>

        </div>

        {/* Topic Selection */}

        <div className="mt-12 grid gap-6 sm:grid-cols-2">

          {availableTopics.map((topic) => {
            const selected =
              selectedTopic === topic.id;

            return (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(
                    topic.id
                  );

                  setSelectedDifficulty(
                    null
                  );
                }}
                className={`rounded-3xl bg-gradient-to-br ${topic.style}
                  p-1 transition duration-300
                  hover:-translate-y-2
                  hover:scale-[1.02]
                  ${
                    selected
                      ? "ring-4 ring-purple-600 ring-offset-4"
                      : ""
                  }`}
              >

                <div className="flex items-center rounded-[1.3rem] bg-white/90 p-7 text-left">

                  <div className="text-6xl">
                    {topic.icon}
                  </div>

                  <div className="ml-6">

                    <h2 className="text-2xl font-black text-slate-800">
                      {topic.title}
                    </h2>

                    <p className="mt-1 font-medium text-slate-500">
                      {topic.description}
                    </p>

                    {selected && (
                      <div className="mt-3">

                        <span className="rounded-full bg-purple-600 px-3 py-1 text-xs font-bold text-white">
                          ✓ SELECTED
                        </span>

                      </div>
                    )}

                  </div>

                </div>

              </button>
            );
          })}

        </div>

        {/* Difficulty Selection */}

        {selectedTopic && (

          <div className="mt-12">

            <h2 className="text-center text-3xl font-black text-purple-900">
              Choose Your Difficulty
            </h2>

            <p className="mt-2 text-center font-medium text-purple-700">
              How brave are you feeling today?
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">

              {difficulties.map(
                (difficulty) => {

                  const selected =
                    selectedDifficulty ===
                    difficulty.id;

                  return (
                    <button
                      key={
                        difficulty.id
                      }
                      onClick={() =>
                        setSelectedDifficulty(
                          difficulty.id
                        )
                      }
                      className={`rounded-3xl bg-white p-6 shadow-lg transition
                        hover:-translate-y-1
                        hover:shadow-xl
                        ${
                          selected
                            ? "ring-4 ring-purple-600 ring-offset-4"
                            : ""
                        }`}
                    >

                      <div className="text-5xl">
                        {
                          difficulty.icon
                        }
                      </div>

                      <h3 className="mt-3 text-xl font-black text-slate-800">
                        {
                          difficulty.title
                        }
                      </h3>

                      <p className="mt-1 text-sm font-medium text-slate-500">
                        {
                          difficulty.description
                        }
                      </p>

                      {selected && (

                        <div className="mt-4">

                          <span className="rounded-full bg-purple-600 px-3 py-1 text-xs font-bold text-white">
                            ✓ SELECTED
                          </span>

                        </div>

                      )}

                    </button>
                  );
                }
              )}

            </div>

          </div>

        )}

        {/* Start Button */}

        <div className="mx-auto mt-10 max-w-md">

          <button
            disabled={
              !selectedTopic ||
              !selectedDifficulty
            }
            onClick={startSprint}
            className="w-full rounded-full bg-gradient-to-r
              from-purple-600 to-pink-500
              px-8 py-5 text-xl font-black text-white
              shadow-xl transition
              hover:scale-105
              hover:shadow-2xl
              disabled:cursor-not-allowed
              disabled:from-slate-300
              disabled:to-slate-300
              disabled:hover:scale-100"
          >

            {selectedTopic &&
            selectedDifficulty
              ? "🚀 Start 10 Question Sprint!"
              : selectedTopic
              ? "👆 Choose Your Difficulty"
              : "👆 Pick a Challenge"}

          </button>

        </div>

        {/* Mission */}

        <div className="mt-8 text-center">

          <span className="inline-block rounded-full bg-white/70 px-6 py-3 font-bold text-purple-700 shadow">
            ⭐ Complete 10 questions to finish today&apos;s mission!
          </span>

        </div>

      </div>

    </main>
  );
}