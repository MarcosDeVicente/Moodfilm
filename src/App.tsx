import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Quiz from "./pages/Quiz/Quiz";
import Film from "./pages/Film/Film";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/film" element={<Film />} />
      </Routes>
    </Router>
  );
}

export default App;
