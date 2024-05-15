import React, { createContext, useContext, useState, ReactNode } from "react";

export type Mood = "Happy" | "Sad" | "Anxious";
export type Activity =
  | "Watch something relaxing"
  | "Look for inspiration"
  | "Other";
export type Preference = "Reflect it" | "Change it";

type Answers = {
  question1: Mood;
  question2: Activity;
  question3: Preference;
};

interface QuizContextType {
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [answers, setAnswers] = useState<Answers>({
    question1: "Happy",
    question2: "Watch something relaxing",
    question3: "Reflect it",
  });

  return (
    <QuizContext.Provider value={{ answers, setAnswers }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

export { QuizContext };
