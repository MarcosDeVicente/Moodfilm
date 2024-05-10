import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import "./Quiz.css";

const Quiz = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({
    question1: "",
    question2: "",
    question3: "",
  });
  const [animate, setAnimate] = useState(false);

  const navigate = useNavigate();

  const questions = [
    {
      question: "How are you feeling today?",
      options: ["Happy", "Sad", "Anxious"],
    },
    {
      question: "What do you prefer to do when you're in this mood?",
      options: [
        "Watch something relaxing",
        "Look for inspiration",
        "Distract myself with something exciting",
      ],
    },
    {
      question:
        "Do you like movies that reflect your mood or do you prefer to change it?",
      options: ["Reflect it", "Change it"],
    },
  ];

  const handleQuiz = (option: string) => {
    const field = `question${currentStep}`;
    setAnswers((prev) => ({
      ...prev,
      [field]: option,
    }));

    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Do not navigate here
    }
    setAnimate(false);
  };

  useEffect(() => {
    // Check if all questions have been answered
    if (answers.question1 && answers.question2 && answers.question3) {
      navigate("/film", { state: { answers } });
    }
  }, [answers]); // Add answers to the dependency array

  const resetSurvey = () => {
    setCurrentStep(1);
    setAnswers({
      question1: "",
      question2: "",
      question3: "",
    });
    setAnimate(false);
  };

  useEffect(() => {
    setAnimate(true);
  }, [currentStep]);

  return (
    <div className="quiz">
      <div className={`content_container ${animate ? "fade-in" : ""}`}>
        <h1 className="quiz_container">
          {questions[currentStep - 1].question}
        </h1>
        <div>
          {questions[currentStep - 1].options.map((option, index) => (
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
          className={`button_start ${currentStep === 1 ? "disabled" : ""}`}
          onClick={resetSurvey}
        />
      </div>
    </div>
  );
};

export default Quiz;
