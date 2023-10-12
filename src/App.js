import React, { useState, useEffect } from "react";
import "./App.css";
import Question from "./Question";
import Score from "./Score";
import questionBank from "./questionBank.json";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Lấy danh sách tất cả câu hỏi
    const allQuestions = questionBank.slice();

    // Trộn lẫn câu hỏi để chọn ngẫu nhiên
    const shuffledQuestions = shuffleArray(allQuestions);

    // Chọn 5 câu hỏi đầu tiên
    const selectedQuestions = shuffledQuestions.slice(0, 5);

    setQuestions(selectedQuestions);
  }, []);

  const handleAnswer = (userAnswer) => {
    if (userAnswer === questions[currentQuestion].word) {
      // Trả lời đúng, cộng điểm
      setScore(score + 1);
    }
    // Chuyển sang câu hỏi tiếp theo
    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert(`Game Over! Your Score: ${score}`);
      setCurrentQuestion(0);
      setScore(0);
    }
  };

  const handleRestart = () => {
    // Chuyển sang câu hỏi tiếp theo nếu còn câu hỏi
    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Nếu hết câu hỏi, quay lại câu hỏi đầu tiên
      setCurrentQuestion(0);
    }

    // Reset điểm số về 0
    setScore(0);
  };

  return (
    <div className="App">
      <h1 style={{ marginTop: "100px" }}>Picture Word Game</h1>
      {questions.length > 0 && (
        <>
          <Score score={score} />
          <Question
            image={questions[currentQuestion].image}
            word={questions[currentQuestion].word}
            onAnswer={handleAnswer}
            onRestart={handleRestart}
          />
        </>
      )}
    </div>
  );
}

function shuffleArray(array) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default App;
