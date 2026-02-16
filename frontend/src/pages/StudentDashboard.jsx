import { useEffect, useState } from "react";
import API from "../api";

export default function StudentDashboard() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    API.get("/tests", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => setTests(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Available Tests</h1>

      <div className="grid grid-cols-3 gap-4">
        {tests.map((t) => (
          <div key={t._id} className="p-4 border rounded-lg shadow">
            <h3 className="font-bold">{t.title}</h3>
            <p>{t.subject}</p>
            <p>Duration: {t.duration} mins</p>
            <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">
              Start Test
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
