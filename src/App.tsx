import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Quiz from "./pages/Quiz/Quiz";
import Film from "./pages/Film/Film";
import { QuizProvider } from "./context/QuizContext";

const App = () => {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/film" element={<Film />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
};

export default App;
