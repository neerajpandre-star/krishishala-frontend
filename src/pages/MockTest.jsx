import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function MockTest() {
  const { exam, testName } = useParams();
  const storageKey = `exam_${exam}_${testName}`;

  const [test, setTest] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [review, setReview] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10 * 60);

  const [timeSpent, setTimeSpent] = useState({});
  const [lastTick, setLastTick] = useState(Date.now());

  /* ---------------- LOAD SAVED STATE ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const data = JSON.parse(saved);
      setAnswers(data.answers || {});
      setReview(data.review || {});
      setCurrentQ(data.currentQ || 0);
      setSubmitted(data.submitted || false);
      setReviewMode(data.reviewMode || false);
      setScore(data.score || 0);
      setTimeLeft(data.timeLeft ?? 10 * 60);
      setTimeSpent(data.timeSpent || {});
    }
  }, [storageKey]);

  /* ---------------- SAVE STATE ---------------- */
  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({
        answers,
        review,
        currentQ,
        submitted,
        reviewMode,
        score,
        timeLeft,
        timeSpent,
      })
    );
  }, [
    answers,
    review,
    currentQ,
    submitted,
    reviewMode,
    score,
    timeLeft,
    timeSpent,
  ]);

  /* ---------------- FETCH TEST ---------------- */
  useEffect(() => {
    fetch(`http://localhost:5000/api/tests/${exam}/${testName}`)
      .then((res) => res.json())
      .then(setTest)
      .catch(console.error);
  }, [exam, testName]);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (submitted) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const t = setInterval(() => {
      setTimeLeft((p) => p - 1);
    }, 1000);

    return () => clearInterval(t);
  }, [timeLeft, submitted]);

  /* ---------------- TIME PER QUESTION ---------------- */
  useEffect(() => {
    if (submitted) return;

    const now = Date.now();
    const diff = Math.floor((now - lastTick) / 1000);

    if (diff > 0) {
      setTimeSpent((prev) => ({
        ...prev,
        [currentQ]: (prev[currentQ] || 0) + diff,
      }));
      setLastTick(now);
    }
  }, [currentQ, timeLeft]);

  /* ---------------- HANDLERS ---------------- */
  const selectAnswer = (index) => {
    if (submitted) return;
    setAnswers({ ...answers, [currentQ]: index });
  };

  const toggleReview = () => {
    setReview({ ...review, [currentQ]: !review[currentQ] });
  };

  const handleSubmit = () => {
    if (!test || submitted) return;

    let s = 0;
    test.questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) s++;
    });

    setScore(s);
    setSubmitted(true);
    setReviewMode(false);
  };

  const handleReset = () => {
    if (!window.confirm("Start a new attempt? Previous result will be lost."))
      return;

    localStorage.removeItem(storageKey);
    setAnswers({});
    setReview({});
    setCurrentQ(0);
    setSubmitted(false);
    setReviewMode(false);
    setScore(0);
    setTimeLeft(10 * 60);
    setTimeSpent({});
    setLastTick(Date.now());
  };

  /* ---------------- ANALYTICS ---------------- */
  const getAnalytics = () => {
    const total = test.questions.length;
    const attempted = Object.keys(answers).length;
    const correct = score;
    const wrong = attempted - correct;
    const accuracy = attempted
      ? ((correct / attempted) * 100).toFixed(1)
      : 0;

    const totalTime = Object.values(timeSpent).reduce((a, b) => a + b, 0);
    const avgTime = total ? Math.round(totalTime / total) : 0;

    return { total, attempted, correct, wrong, accuracy, avgTime };
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  if (!test) return <p className="p-6">Loading Exam...</p>;

  const q = test.questions[currentQ];

  /* ---------------- UI ---------------- */
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-xl font-bold">{test.testName}</h1>
        {!submitted && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded">
            ⏱ {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {/* QUESTION VIEW */}
      {(reviewMode || !submitted) && (
        <>
          <div className="border p-4 rounded mb-4">
            <p className="font-semibold mb-3">
              Q{currentQ + 1}. {q.question}
            </p>

            {q.options.map((opt, i) => {
              const isCorrect = i === q.correctIndex;
              const isSelected = answers[currentQ] === i;

              return (
                <div
                  key={i}
                  className={`p-2 rounded mb-2
                    ${reviewMode && isCorrect ? "bg-green-200" : ""}
                    ${reviewMode && isSelected && !isCorrect ? "bg-red-200" : ""}
                  `}
                >
                  <label className="flex gap-2">
                    <input
                      type="radio"
                      checked={isSelected}
                      disabled={submitted}
                      onChange={() => selectAnswer(i)}
                    />
                    {opt}
                  </label>
                </div>
              );
            })}
          </div>

          {/* Controls */}
          {!submitted && (
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setCurrentQ((p) => Math.max(p - 1, 0))}
                disabled={currentQ === 0}
              >
                Previous
              </button>

              <button onClick={toggleReview}>
                {review[currentQ] ? "Unmark Review" : "Mark for Review"}
              </button>

              <button
                onClick={() =>
                  setCurrentQ((p) =>
                    Math.min(p + 1, test.questions.length - 1)
                  )
                }
                disabled={currentQ === test.questions.length - 1}
              >
                Next
              </button>
            </div>
          )}

          {/* Palette */}
          <div className="grid grid-cols-8 gap-2 mb-6">
            {test.questions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentQ(i)}
                className={`p-2 rounded text-sm
                  ${answers[i] !== undefined ? "bg-green-200" : "bg-gray-200"}
                  ${review[i] ? "border-2 border-orange-500" : ""}
                `}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {/* SUBMIT */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-green px-6 py-2 rounded"
        >
          Submit Exam
        </button>
      )}

      {reviewMode && (
          <div className="flex justify-center mt-4">
            <button
             onClick={() => setReviewMode(false)}
              className="bg-gray-600 text-green px-6 py-2 rounded"
             >
              Back to Result
             </button>
           </div>
          )}


      {/* RESULT + ANALYTICS */}
      {submitted && !reviewMode && (() => {
        const stats = getAnalytics();

        return (
          <div className="p-6 bg-green-100 rounded text-center">
            <h2 className="text-2xl font-bold mb-4">Exam Analysis 📊</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-3 rounded">
                <strong>Score</strong>
                <p>{score} / {stats.total}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <strong>Accuracy</strong>
                <p>{stats.accuracy}%</p>
              </div>
              <div className="bg-white p-3 rounded">
                <strong>Attempted</strong>
                <p>{stats.attempted}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <strong>Correct</strong>
                <p>{stats.correct}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <strong>Wrong</strong>
                <p>{stats.wrong}</p>
              </div>
              <div className="bg-white p-3 rounded">
                <strong>Avg Time / Q</strong>
                <p>{stats.avgTime}s</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setReviewMode(true)}
                className="bg-gray-700 text-green px-6 py-2 rounded"
              >
                Review Answers
              </button>

              <button
                onClick={handleReset}
                className="bg-blue-600 text-green px-6 py-2 rounded"
              >
                Re-attempt Exam
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
