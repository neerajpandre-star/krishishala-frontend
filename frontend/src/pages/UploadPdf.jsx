import { useState } from "react";

export default function UploadPdf() {
  const [exam, setExam] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [topic, setTopic] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the upload logic here
    console.log({ exam, resourceType, topic, file });
    alert("PDF uploaded successfully!");
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Upload PDF</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        
        {/* Exam Selection */}
        <div>
          <label className="block font-medium mb-1">Select Exam</label>
          <select
            value={exam}
            onChange={(e) => setExam(e.target.value)}
            className="w-full border rounded p-2"
            required
          >
            <option value="">-- Choose Exam --</option>
            <option value="jee">JEE</option>
            <option value="neet">NEET</option>
            <option value="gate">GATE</option>
          </select>
        </div>

        {/* Resource Type */}
        <div>
          <label className="block font-medium mb-1">Resource Type</label>
          <select
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
            className="w-full border rounded p-2"
            required
          >
            <option value="">-- Choose Type --</option>
            <option value="notes">Notes</option>
            <option value="pyq">PYQs</option>
            <option value="books">Books</option>
          </select>
        </div>

        {/* Topic Name */}
        <div>
          <label className="block font-medium mb-1">Topic Name</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic name"
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block font-medium mb-1">Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
