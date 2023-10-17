import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Question from "./Question";
import Score from "./Score";
import questionBank from "./questionBank.json";
import ModalEndGame from "./ModalEndGame";

function App() {
  const [start, setStart] = useState(true)
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const waitingScreen = useRef()

  useEffect(() => {
    const allQuestions = questionBank.slice();
    const shuffledQuestions = shuffleArray(allQuestions);
    const selectedQuestions = shuffledQuestions.slice(0, 5);
    setQuestions(selectedQuestions);
  }, []);

  const handleAnswer = (userAnswer) => {
    if (userAnswer === questions[currentQuestion].word) {
      if (currentQuestion < 4) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameOver(true)
      }
      setScore(score + 1);
    }
  };

  const handleRestart = (restart = false) => {
    if (restart) {
      setCurrentQuestion(0);
      setScore(0); // Đặt lại điểm số khi bắt đầu chơi lại
      return;
    }

    if (currentQuestion < 4 && score < 5) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // setCurrentQuestion(0);
      setScore(score + 1); // Đặt lại điểm số khi bắt đầu chơi lại
    }
  };

  return (
    <div className="App">
      <div className="waiting-screen" ref={waitingScreen}>
        <h1>Picture guess word game</h1>
        <button onClick={() => {
          waitingScreen.current.style.opacity = 0;
          waitingScreen.current.style = ' transform: translateX(-100%);'
          setTimeout(() => waitingScreen.current.style.display = "none", 700)
          
        }}>Start</button>
      </div>
      <h1 style={{ paddingTop: 30 }}>Picture Word Game</h1>
      {questions.length > 0 && (
        <>
          <Score score={score} />
          <Question
            image={questions[currentQuestion].image}
            word={questions[currentQuestion].word}
            onAnswer={handleAnswer}
            onRestart={handleRestart}
            score={score}
          />
        </>
      )}
      <ModalEndGame show={gameOver} handleClose={() => setGameOver(false)} score={score} restart={handleRestart} setCurrentQuestion={setCurrentQuestion} setScore={setScore}/>
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
