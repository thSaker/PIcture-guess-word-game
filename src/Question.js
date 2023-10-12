// Question.js

import React, { useState, useEffect } from "react";

function Question({ image, word, onAnswer, onRestart }) {
  const [chosenLetters, setChosenLetters] = useState(Array(word.length).fill(""));
  const [availableLetters, setAvailableLetters] = useState([]);
  const [defeated, setDefeated] = useState(false);
  const [numCharacters, setNumCharacters] = useState(word.length);
  const [deletedLetters, setDeletedLetters] = useState([]);

  useEffect(() => {
    setChosenLetters(Array(numCharacters).fill(""));
    setAvailableLetters([]);

    const allLetters = word.split("");
    const randomLetters = generateRandomNonDuplicateLetters(allLetters, 5);
    const combinedLetters = [...allLetters, ...randomLetters];

    const shuffledLetters = shuffleArray(combinedLetters);
    setAvailableLetters(shuffledLetters);
    setNumCharacters(word.length);
  }, [word, numCharacters]);

  const handleLetterClick = (letter, index) => {
    if (defeated) return;

    const emptySlotIndex = chosenLetters.findIndex((char) => char === "");

    if (emptySlotIndex !== -1) {
      const updatedChosenLetters = [...chosenLetters];
      updatedChosenLetters[emptySlotIndex] = letter;
      setChosenLetters(updatedChosenLetters);

      setAvailableLetters((prevAvailableLetters) =>
        prevAvailableLetters.filter((_, i) => i !== index)
      );
    }
  };

  const handleDeleteClick = () => {
    if (defeated) return;

    // Find the index of the last non-empty slot in chosenLetters
    const lastNonEmptyIndex = chosenLetters.slice().reverse().findIndex((char) => char !== "");
    if (lastNonEmptyIndex !== -1) {
      // Clone chosenLetters and remove the last non-empty character
      const updatedChosenLetters = [...chosenLetters];
      updatedChosenLetters[chosenLetters.length - 1 - lastNonEmptyIndex] = "";

      // Remove the last non-empty character from availableLetters and add it back
      const removedCharacter = chosenLetters[chosenLetters.length - 1 - lastNonEmptyIndex];
      setAvailableLetters([...availableLetters, removedCharacter]);

      // Update chosenLetters
      setChosenLetters(updatedChosenLetters);
    }
  };

  const handleDefeatClick = () => {
    setDefeated(true);
    alert("You accepted defeat. The answer is: " + word);
    onRestart(); // Call the onRestart function from App.js
  };

  const handleRestartClick = () => {
    setDefeated(false);
    setChosenLetters(Array(numCharacters).fill(""));
    setAvailableLetters(
      shuffleArray([...word.split(""), ...generateRandomNonDuplicateLetters(word.split(""), 4)])
    );
    setDeletedLetters([]);
    onRestart(); // Call the onRestart function from App.js
  };

  const handleAnswerClick = () => {
    const userAnswer = chosenLetters.join("").toLowerCase();
  if (userAnswer === word.toLowerCase()) {
    alert("Bạn đã trả lời đúng!");
    onAnswer(userAnswer); // Tăng điểm số
    onRestart(); // Chuyển sang câu hỏi tiếp theo
  } else {
    alert("Trả lời không đúng.");
  }
  };

  return (
    <div className="question">
      <img src={image} alt="Question" width="500px" height="500px" />
      <div className="word-container">
        {Array(numCharacters).fill(" ").map((char, index) => (
          <div className="word-letter" key={index}>
            {chosenLetters[index] ? chosenLetters[index] : char}
          </div>
        ))}
      </div>
      <div className="available-letters">
        {availableLetters.map((letter, index) => (
          <button
            className="letter-button"
            key={index}
            onClick={() => handleLetterClick(letter, index)}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="buttons">
        <button className="delete-button" onClick={handleDeleteClick}>
          Delete
        </button>
        {defeated ? (
          <button className="restart-button" onClick={handleRestartClick}>
            Restart
          </button>
        ) : (
          <button className="defeat-button" onClick={handleDefeatClick}>
            Accept Defeat
          </button>
        )}
        <button className="submit-button" onClick={handleAnswerClick}>
          Submit
        </button>
      </div>
    </div>
  );
}

function generateRandomNonDuplicateLetters(excludeLetters, count) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomLetters = [];
  while (randomLetters.length < count) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const randomLetter = alphabet[randomIndex];
    if (!excludeLetters.includes(randomLetter)) {
      randomLetters.push(randomLetter);
    }
  }
  return randomLetters;
}

function shuffleArray(array) {
  const shuffled = array.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default Question;
