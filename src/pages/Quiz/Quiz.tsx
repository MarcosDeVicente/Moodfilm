import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import "./Quiz.css";
import {
  QuizContext,
  Mood,
  Activity,
  Preference,
} from "../../context/QuizContext";

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [animate, setAnimate] = useState(false);
  const quizContext = useContext(QuizContext);

  const navigate = useNavigate();

  if (!quizContext) {
    throw new Error("QuizContext must be used within a QuizProvider");
  }

  const { setAnswers: setQuizAnswers } = quizContext;

  const questions = [
    {
      question: "How are you feeling today?",
      options: ["Happy", "Sad", "Anxious"],
    },
    {
      question: "What do you prefer to do when you're in this mood?",
      options: ["Watch something relaxing", "Look for inspiration", "Other"],
    },
    {
      question:
        "Do you like movies that reflect your mood or do you prefer to change it?",
      options: ["Reflect it", "Change it"],
    },
  ];

  const handleQuiz = (option: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] = option;
    setAnswers(updatedAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setQuizAnswers({
        question1: updatedAnswers[0] as Mood,
        question2: updatedAnswers[1] as Activity,
        question3: updatedAnswers[2] as Preference,
      });
      navigate("/film", { state: { answers: updatedAnswers } });
    }
    setAnimate(false);
  };

  const resetSurvey = () => {
    setCurrentStep(0);
    setAnswers([]);
    setAnimate(false);
  };

  useEffect(() => {
    setAnimate(true);
  }, [currentStep]);

  return (
    <div className="quiz">
      <div className={`content_container ${animate ? "fade-in" : ""}`}>
        <h1 className="quiz_container">{questions[currentStep].question}</h1>
        <div>
          {questions[currentStep].options.map((option, index) => (
            <Button
              text={option}
              key={index}
              className={"button_start"}
              onClick={() => handleQuiz(option)}
            />
          ))}
        </div>
      </div>
      <div className="button_container">
        <Button
          text={"Reset"}
          className={`button_start ${currentStep === 0 ? "disabled" : ""}`}
          onClick={resetSurvey}
        />
      </div>
    </div>
  );
};

export default Quiz;
