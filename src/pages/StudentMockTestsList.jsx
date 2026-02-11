import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function StudentMockTestsList() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await fetch(`${API_URL}/api/tests`);
        const allTests = await res.json();

        // Get student's registered exam preference
        const studentExam = localStorage.getItem("examPreference")?.toLowerCase();

        if (!studentExam) {
          alert("No exam preference found. Please update your profile.");
          setLoading(false);
          return;
        }

        // ✅ Filter tests by exam (case-normalized)
        const filtered = allTests.filter(
          (t) => t.exam.toLowerCase() === studentExam
        );

        setTests(filtered);
      } catch (err) {
        console.error("Error fetching tests:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  if (loading) return <p className="p-6">Loading mock tests...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Available Mock Tests</h1>

      {tests.length === 0 ? (
        <p>No mock tests available for your registered exam.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tests.map((test) => (
            <Link
              key={test._id}
              to={`/student/mocktest/${test.exam}/${encodeURIComponent(
                test.testName
              )}`}
              className="p-4 border rounded-lg hover:shadow-md transition bg-white"
            >
              <h2 className="font-semibold text-lg">{test.testName}</h2>
              <p className="text-gray-500">{test.exam.toUpperCase()}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
