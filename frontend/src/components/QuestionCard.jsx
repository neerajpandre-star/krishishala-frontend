// src/components/QuestionCard.jsx
export default function QuestionCard() {
  return (
    <div className="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
      <p className="mb-4 font-medium">Q1. What is 2 + 2?</p>
      {["1", "2", "3", "4"].map((opt, i) => (
        <label key={i} className="block mb-2 p-3 rounded-lg border border-neutral-700 hover:border-emerald-400 cursor-pointer">
          <input type="radio" name="q1" className="mr-2" />
          {opt}
        </label>
      ))}
    </div>
  );
}
