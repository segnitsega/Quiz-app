import React, { useState, useEffect } from "react";
import axios from "axios";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScore, setShowScore] = useState(false);

  // Fetch the questions from the Open Trivia Database API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          `https://opentdb.com/api.php?amount=5&category=18&type=multiple`
        );
        setQuestions(response.data.results);
        setIsLoading(false);
      } catch (err) {
        setError("Error fetching questions");
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Handle answer submission
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowScore(true);
    }
  };

  // Render loading state, error, or quiz
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="quiz-container text-center">
      {showScore ? (
        <div>
          <h2 className="text-2xl">You scored {score} out of {questions.length}</h2>
        </div>
      ) : (
        <div>
          <h2 className="text-xl">
            {questions[currentQuestionIndex].question}
          </h2>
          <div className="options mt-4">
            {questions[currentQuestionIndex].incorrect_answers.map((answer, index) => (
              <button
                key={index}
                className="btn bg-blue-500 text-white py-2 px-4 m-2"
                onClick={() => handleAnswer(false)}
              >
                {answer}
              </button>
            ))}
            <button
              className="btn bg-green-500 text-white py-2 px-4 m-2"
              onClick={() => handleAnswer(true)}
            >
              {questions[currentQuestionIndex].correct_answer}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
