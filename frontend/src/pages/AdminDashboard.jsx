import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [exams, setExams] = useState(["PAT", "SSC", "JEE", "NEET"]);
  const [newExam, setNewExam] = useState("");
  const [expandedExam, setExpandedExam] = useState(null);

  const addExam = () => {
    if (!newExam.trim()) return;
    setExams([...exams, newExam.toUpperCase()]);
    setNewExam("");
  };

  const toggleExpand = (exam) => {
    setExpandedExam(expandedExam === exam ? null : exam);
  };

  const goToCreateMockTest = (exam) => {
    navigate(`/admin/exams/${exam.toLowerCase()}/mocktest`, {
      state: { testType: "mock" }, // Optional extra params
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add Exam */}
      <div className="flex gap-2 mb-6">
        <input
          value={newExam}
          onChange={(e) => setNewExam(e.target.value)}
          placeholder="Add new exam (e.g. CUET, CAT)"
          className="border rounded px-3 py-2 w-64"
        />
        <button
          onClick={addExam}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Exam
        </button>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {exams.map((exam) => (
          <div
            key={exam}
            className="bg-white border rounded-xl shadow hover:shadow-md transition"
          >
            <button
              className="w-full text-left p-6 font-semibold text-lg"
              onClick={() => toggleExpand(exam)}
            >
              {exam}
            </button>

            {expandedExam === exam && (
              <div className="p-4 border-t space-y-2">
                <button
                  onClick={() => navigate(`/admin/exams/${exam.toLowerCase()}`)}
                  className="w-full bg-blue-600 text-white py-2 rounded"
                >
                  Exam Home
                </button>

                <button
                  onClick={() => goToCreateMockTest(exam)}
                  className="w-full bg-green-600 text-white py-2 rounded"
                >
                  Create Mock Test
                </button>

                <button
                  onClick={() =>
                    navigate(`/admin/exams/${exam.toLowerCase()}/resources`)
                  }
                  className="w-full bg-yellow-500 text-white py-2 rounded"
                >
                  Upload Resources
                </button>

                <button
                  onClick={() =>
                    navigate(
                      `/admin/exams/${exam.toLowerCase()}/previous-papers`
                    )
                  }
                  className="w-full bg-purple-600 text-white py-2 rounded"
                >
                  Upload Previous Year Papers
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
