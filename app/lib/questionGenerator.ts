export type Topic =
  | "addition"
  | "subtraction"
  | "multiplication"
  | "division";

export type Difficulty = "easy" | "medium" | "hard";

export type Question = {
  text: string;
  answer: number;
  options: number[];
};

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(numbers: number[]) {
  return [...numbers].sort(() => Math.random() - 0.5);
}

/*
  Maximum ANSWER for addition and subtraction.

  This means:
  Year 1 Easy will never have an answer above 5.
  Year 1 Medium will never have an answer above 10.
  Year 1 Hard will never have an answer above 20.
*/
function getAnswerLimit(
  year: number,
  difficulty: Difficulty
): number {
  const ranges: Record<
    number,
    Record<Difficulty, number>
  > = {
    1: {
      easy: 5,
      medium: 10,
      hard: 20,
    },
    2: {
      easy: 10,
      medium: 20,
      hard: 50,
    },
    3: {
      easy: 20,
      medium: 50,
      hard: 100,
    },
    4: {
      easy: 100,
      medium: 500,
      hard: 1000,
    },
    5: {
      easy: 500,
      medium: 1000,
      hard: 10000,
    },
  };

  return ranges[year]?.[difficulty] ?? 20;
}

/*
  Multiplication and division ranges.

  Difficulty now makes a visible difference.
*/
function getMultiplicationRange(
  year: number,
  difficulty: Difficulty
) {
  if (year === 1) {
    if (difficulty === "easy") {
      return { min: 1, max: 2 };
    }

    if (difficulty === "medium") {
      return { min: 1, max: 5 };
    }

    return { min: 2, max: 5 };
  }

  if (year === 2) {
    if (difficulty === "easy") {
      return { min: 1, max: 5 };
    }

    if (difficulty === "medium") {
      return { min: 2, max: 10 };
    }

    return { min: 3, max: 10 };
  }

  if (year === 3) {
    if (difficulty === "easy") {
      return { min: 1, max: 5 };
    }

    if (difficulty === "medium") {
      return { min: 2, max: 10 };
    }

    return { min: 5, max: 12 };
  }

  if (year === 4) {
    if (difficulty === "easy") {
      return { min: 2, max: 6 };
    }

    if (difficulty === "medium") {
      return { min: 3, max: 10 };
    }

    return { min: 5, max: 12 };
  }

  // Year 5
  if (difficulty === "easy") {
    return { min: 2, max: 8 };
  }

  if (difficulty === "medium") {
    return { min: 4, max: 10 };
  }

  return { min: 6, max: 12 };
}

/*
  Generate 4 multiple choice answers.
*/
function createOptions(answer: number) {
  const options = new Set<number>();

  options.add(answer);

  while (options.size < 4) {
    const difference = randomNumber(
      1,
      Math.max(3, Math.ceil(answer * 0.2))
    );

    const wrongAnswer =
      Math.random() > 0.5
        ? answer + difference
        : answer - difference;

    if (
      wrongAnswer >= 0 &&
      wrongAnswer !== answer
    ) {
      options.add(wrongAnswer);
    }
  }

  return shuffle(Array.from(options));
}

/*
  ADDITION

  We generate the final answer first.

  Example:
  Year 1 Easy
  Answer limit = 5

  Possible:
  2 + 3 = 5

  Impossible:
  5 + 5 = 10
*/
function generateAddition(
  answerLimit: number
): Question {
  const answer = randomNumber(2, answerLimit);

  const firstNumber = randomNumber(
    1,
    answer - 1
  );

  const secondNumber =
    answer - firstNumber;

  return {
    text: `${firstNumber} + ${secondNumber}`,
    answer,
    options: createOptions(answer),
  };
}

/*
  SUBTRACTION

  No negative answers.
*/
function generateSubtraction(
  answerLimit: number
): Question {
  const firstNumber = randomNumber(
    2,
    answerLimit
  );

  const secondNumber = randomNumber(
    1,
    firstNumber
  );

  const answer =
    firstNumber - secondNumber;

  return {
    text: `${firstNumber} − ${secondNumber}`,
    answer,
    options: createOptions(answer),
  };
}

/*
  MULTIPLICATION
*/
function generateMultiplication(
  year: number,
  difficulty: Difficulty
): Question {
  const range = getMultiplicationRange(
    year,
    difficulty
  );

  const firstNumber = randomNumber(
    range.min,
    range.max
  );

  const secondNumber = randomNumber(
    range.min,
    range.max
  );

  const answer =
    firstNumber * secondNumber;

  return {
    text: `${firstNumber} × ${secondNumber}`,
    answer,
    options: createOptions(answer),
  };
}

/*
  DIVISION

  Generate answer and divisor first.
  This guarantees whole number answers.
*/
function generateDivision(
  year: number,
  difficulty: Difficulty
): Question {
  const range = getMultiplicationRange(
    year,
    difficulty
  );

  const divisor = randomNumber(
    range.min,
    range.max
  );

  const answer = randomNumber(
    range.min,
    range.max
  );

  const dividend =
    divisor * answer;

  return {
    text: `${dividend} ÷ ${divisor}`,
    answer,
    options: createOptions(answer),
  };
}

/*
  Generate ONE question
*/
export function generateQuestion(
  year: number,
  topic: Topic,
  difficulty: Difficulty
): Question {
  const answerLimit = getAnswerLimit(
    year,
    difficulty
  );

  switch (topic) {
    case "addition":
      return generateAddition(
        answerLimit
      );

    case "subtraction":
      return generateSubtraction(
        answerLimit
      );

    case "multiplication":
      return generateMultiplication(
        year,
        difficulty
      );

    case "division":
      return generateDivision(
        year,
        difficulty
      );

    default:
      throw new Error(
        "Unknown maths topic"
      );
  }
}

/*
  Generate complete quiz
*/
export function generateQuiz(
  year: number,
  topic: Topic,
  difficulty: Difficulty,
  numberOfQuestions = 10
): Question[] {
  return Array.from(
    { length: numberOfQuestions },
    () =>
      generateQuestion(
        year,
        topic,
        difficulty
      )
  );
}