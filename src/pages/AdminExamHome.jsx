import { useParams, useNavigate } from "react-router-dom";

export default function AdminExamHome() {
  const { exam } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {exam.toUpperCase()} – Admin Panel
      </h1>

      <div className="grid md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate(`/admin/${exam}/resources`)}
          className="p-6 rounded-xl border bg-white hover:shadow text-left"
        >
          📚 Upload Resources
          <p className="text-sm text-gray-500 mt-1">
            PDFs, notes, videos, links
          </p>
        </button>

        <button
          onClick={() => navigate(`/admin/${exam}/previous-papers`)}
          className="p-6 rounded-xl border bg-white hover:shadow text-left"
        >
          📝 Upload Previous Year Papers
          <p className="text-sm text-gray-500 mt-1">
            Year-wise question papers
          </p>
        </button>

        <button
          onClick={() => navigate(`/admin/${exam}/mocktest`)}
          className="p-6 rounded-xl border bg-white hover:shadow text-left"
        >
          🧪 Create Mock Test
          <p className="text-sm text-gray-500 mt-1">
            MCQ + negative marking + subjects
          </p>
        </button>
      </div>
    </div>
  );
}
