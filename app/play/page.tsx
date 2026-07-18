"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import {
  generateQuiz,
  type Difficulty,
  type Question,
  type Topic,
} from "../lib/questionGenerator";

export default function PlayPage() {
  const searchParams = useSearchParams();

  const year = Number(searchParams.get("year"));
  const topic = searchParams.get("topic") as Topic;
  const difficulty = searchParams.get("difficulty") as Difficulty;

  // Generate 10 questions when the quiz starts
  const [questions] = useState<Question[]>(() =>
    generateQuiz(year, topic, difficulty, 10)
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Used to show correct and incorrect answer feedback
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const question = questions[currentQuestion];

  // Called when the child selects an answer
  function handleAnswer(answer: number) {
    // Prevent clicking multiple answers
    if (answered) return;

    setSelectedAnswer(answer);
    setAnswered(true);

    // Increase score if correct
    if (answer === question.answer) {
      setScore((previousScore) => previousScore + 1);
    }
  }

  // Move to the next question
  function handleNext() {
    // If this was the final question, show results
    if (currentQuestion === questions.length - 1) {
      setFinished(true);
      return;
    }

    // Otherwise move to next question
    setCurrentQuestion(
      (previousQuestion) => previousQuestion + 1
    );

    // Reset answer state
    setSelectedAnswer(null);
    setAnswered(false);
  }

  // =========================
  // RESULT SCREEN
  // =========================

  if (finished) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-200 via-pink-100 to-purple-200 px-6">

        <div className="w-full max-w-xl rounded-[2.5rem] bg-white p-10 text-center shadow-2xl">

          <div className="text-8xl">
            🎉
          </div>

          <h1 className="mt-6 text-4xl font-black text-purple-900">
            Sprint Complete!
          </h1>

          <p className="mt-4 text-xl font-semibold text-slate-600">
            Amazing work! You scored
          </p>

          <div className="mt-5 text-7xl font-black text-purple-600">
            {score} / {questions.length}
          </div>

          <div className="mt-5 text-3xl">

            {score >= 9
              ? "🏆 Math Superstar!"
              : score >= 7
              ? "🌟 Great Job!"
              : score >= 5
              ? "👏 Nice Work!"
              : "💪 Keep Practising!"}

          </div>

          <p className="mt-5 font-semibold text-slate-500">
            You completed your MathSprint!
          </p>

          <div className="mt-8">

            <a
              href="/"
              className="inline-block rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 text-xl font-black text-white shadow-lg transition hover:scale-105"
            >
              🚀 Play Again
            </a>

          </div>

        </div>

      </main>
    );
  }

  // Calculate progress percentage
  const progress =
    ((currentQuestion + 1) / questions.length) * 100;

  // =========================
  // QUIZ SCREEN
  // =========================

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-200 via-purple-100 to-pink-200 px-6 py-10">

      <div className="mx-auto max-w-2xl">

        {/* Top information */}

        <div className="flex items-center justify-between">

           <a
              href="/"
              className="rounded-full bg-white px-4 py-2 font-bold text-purple-700 shadow transition hover:scale-105"
            >
            🏠 Home
          </a>


          <div className="rounded-full bg-white px-4 py-2 font-bold text-purple-700 shadow">
            🎓 Year {year}
          </div>

          <div className="rounded-full bg-white px-4 py-2 font-bold text-purple-700 shadow">
            ⭐ Score {score}
          </div>

        </div>

        {/* Progress */}

        <div className="mt-8">

          <div className="flex justify-between font-bold text-purple-800">

            <span>
              Question {currentQuestion + 1}
            </span>

            <span>
              {currentQuestion + 1} / {questions.length}
            </span>

          </div>

          <div className="mt-3 h-4 overflow-hidden rounded-full bg-white">

            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

        {/* Question Card */}

        <div className="mt-10 rounded-[2.5rem] bg-white p-8 text-center shadow-2xl sm:p-12">

          <div className="text-5xl">
            🧠
          </div>

          <p className="mt-5 font-bold uppercase tracking-wider text-purple-500">
            Solve this
          </p>

          <h1 className="mt-5 text-6xl font-black text-slate-800">
            {question.text}
          </h1>

          {/* Answer buttons */}

          <div className="mt-10 grid grid-cols-2 gap-4">

            {question.options.map((option) => {

              const isCorrect =
                option === question.answer;

              const isSelected =
                option === selectedAnswer;

              let buttonStyle =
                "border-purple-100 bg-purple-50 text-purple-900 hover:-translate-y-1 hover:border-purple-500 hover:bg-purple-100 hover:shadow-lg";

              // Show correct answer in green
              if (answered && isCorrect) {
                buttonStyle =
                  "border-green-500 bg-green-100 text-green-800";
              }

              // Show selected wrong answer in red
              else if (
                answered &&
                isSelected &&
                !isCorrect
              ) {
                buttonStyle =
                  "border-red-500 bg-red-100 text-red-800";
              }

              return (
                <button
                  key={option}
                  disabled={answered}
                  onClick={() =>
                    handleAnswer(option)
                  }
                  className={`rounded-2xl border-2 px-6 py-6 text-3xl font-black transition ${buttonStyle}`}
                >

                  {option}

                  {answered &&
                    isCorrect &&
                    " ✓"}

                  {answered &&
                    isSelected &&
                    !isCorrect &&
                    " ✗"}

                </button>
              );
            })}

          </div>

          {/* Feedback */}

          {answered && (

            <div className="mt-8">

              <p className="mb-5 text-xl font-black text-slate-800">

                {selectedAnswer === question.answer
                  ? "🎉 Awesome! That's correct!"
                  : `💡 Good try! The correct answer is ${question.answer}.`}

              </p>

              <button
                onClick={handleNext}
                className="rounded-full bg-gradient-to-r from-purple-600 to-pink-500 px-8 py-4 text-lg font-black text-white shadow-lg transition hover:scale-105"
              >

                {currentQuestion ===
                questions.length - 1
                  ? "🏆 See My Score"
                  : "Next Question →"}

              </button>

            </div>

          )}

        </div>

        <p className="mt-6 text-center font-semibold text-purple-700">
          🚀 Keep going! You&apos;ve got this!
        </p>

      </div>

    </main>
  );
}