import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import API from "../api";

export default function AdminCreateTest() {
  const { exam } = useParams();
  const location = useLocation();
  const { testType } = location.state || {};

  const [testName, setTestName] = useState(
    `${exam.toUpperCase()} ${testType ? testType.toUpperCase() : ""} Mock Test`
  );
  const [questions, setQuestions] = useState([]);
  const [showPreview, setShowPreview] = useState(false); // Preview toggle

  // Add a new question with 4 options by default
  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctIndex: null },
    ]);
  };

  const removeQuestion = (qIndex) => {
    const updated = questions.filter((_, i) => i !== qIndex);
    setQuestions(updated);
  };

  const updateQuestionText = (qIndex, text) => {
    const updated = [...questions];
    updated[qIndex].question = text;
    setQuestions(updated);
  };

  const updateOptionText = (qIndex, oIndex, text) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = text;
    setQuestions(updated);
  };

  const selectCorrectAnswer = (qIndex, oIndex) => {
    const updated = [...questions];
    updated[qIndex].correctIndex = oIndex;
    setQuestions(updated);
  };

  // Submit test to backend
  const handleSubmit = async () => {
    if (!testName.trim()) return alert("Please enter a test name");
    if (questions.length === 0) return alert("Please add at least one question");

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) return alert(`Question ${i + 1} is empty`);
      if (q.correctIndex === null) return alert(`Select correct answer for Question ${i + 1}`);
    }

    const payload = { exam, testName, questions };

    try {
      const res = await fetch(`${API.BASE_URL}/api/tests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Mock Test "${testName}" for ${exam.toUpperCase()} created successfully!`);
        setQuestions([]);
        setTestName(`${exam.toUpperCase()} ${testType ? testType.toUpperCase() : ""} Mock Test`);
        setShowPreview(false);
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Server error, check console");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Create {testType ? testType.toUpperCase() : ""} Mock Test for {exam.toUpperCase()}
      </h1>

      <input
        type="text"
        placeholder="Test Name"
        value={testName}
        onChange={(e) => setTestName(e.target.value)}
        className="border px-3 py-2 mb-6 w-full"
      />

      {/* Questions Section */}
      {questions.map((q, qIndex) => (
        <div key={qIndex} className="border p-4 rounded mb-4 relative">
          <button
            onClick={() => removeQuestion(qIndex)}
            className="absolute top-2 right-2 text-red-500 font-bold"
          >
            ✕
          </button>

          <input
            type="text"
            placeholder={`Question ${qIndex + 1}`}
            value={q.question}
            onChange={(e) => updateQuestionText(qIndex, e.target.value)}
            className="border px-2 py-1 w-full mb-3"
          />

          {/* Fixed 4 options */}
          {q.options.map((opt, oIndex) => (
            <div key={oIndex} className="flex items-center mb-2">
              <input
                type="radio"
                name={`correct-${qIndex}`}
                checked={q.correctIndex === oIndex}
                onChange={() => selectCorrectAnswer(qIndex, oIndex)}
                className="mr-2"
              />
              <input
                type="text"
                placeholder={`Option ${oIndex + 1}`}
                value={opt}
                onChange={(e) => updateOptionText(qIndex, oIndex, e.target.value)}
                className="border px-2 py-1 w-full"
              />
            </div>
          ))}
        </div>
      ))}

      <div className="flex gap-4 mt-4">
        <button
          onClick={addQuestion}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Question
        </button>

        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Create Test
        </button>

        <button
          onClick={() => setShowPreview(!showPreview)}
          className="bg-gray-600 text-white px-4 py-2 rounded"
        >
          {showPreview ? "Hide Preview" : "Preview Test"}
        </button>
      </div>

      {/* Preview Section */}
      {showPreview && questions.length > 0 && (
        <div className="mt-6 border p-4 rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Test Preview</h2>
          {questions.map((q, qIndex) => (
            <div key={qIndex} className="mb-4">
              <p className="font-semibold">
                {qIndex + 1}. {q.question}
              </p>
              <ul className="list-disc list-inside ml-4">
                {q.options.map((opt, oIndex) => (
                  <li
                    key={oIndex}
                    className={q.correctIndex === oIndex ? "font-bold text-green-600" : ""}
                  >
                    {opt || "(empty)"}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
