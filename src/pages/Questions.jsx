export default function Questions() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">Add Question</h2>

      <div className="bg-white p-6 rounded shadow space-y-4">
        {/* Competition */}
        <select className="w-full border p-2 rounded">
          <option value="">Select Competition</option>
          <option>JEE</option>
          <option>NEET</option>
          <option>SSC</option>
        </select>

        {/* Subject */}
        <select className="w-full border p-2 rounded">
          <option value="">Select Subject</option>
          <option>Physics</option>
          <option>Chemistry</option>
          <option>Math</option>
          <option>Biology</option>
        </select>

        {/* Topic */}
        <input
          className="w-full border p-2 rounded"
          placeholder="Topic (e.g. Thermodynamics)"
        />

        {/* Question */}
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Enter Question"
        />

        {/* MCQ Options */}
        <input className="w-full border p-2 rounded" placeholder="Option A" />
        <input className="w-full border p-2 rounded" placeholder="Option B" />
        <input className="w-full border p-2 rounded" placeholder="Option C" />
        <input className="w-full border p-2 rounded" placeholder="Option D" />

        <select className="w-full border p-2 rounded">
          <option value="">Correct Option</option>
          <option>A</option>
          <option>B</option>
          <option>C</option>
          <option>D</option>
        </select>

        {/* Marks */}
        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Marks"
        />

        <input
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Negative Marks"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Question
        </button>
      </div>
    </div>
  );
}
