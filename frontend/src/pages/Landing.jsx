import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="grid grid-cols-12 gap-10 items-center">
        {/* Left: Text */}
        <div className="col-span-12 lg:col-span-6 space-y-6">
          <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight">
            Crack your exams with smarter practice.
          </h1>
          <p className="text-lg text-gray-600">
            Take realistic mock tests, track your progress, and improve with
            personalized insights.
          </p>

          <div className="flex gap-4">
            <Link
              to="/register"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-xl border font-medium hover:bg-slate-50 transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Right: Illustration / placeholder */}
        <div className="col-span-12 lg:col-span-6">
          <div className="h-80 lg:h-96 w-full rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
            <span className="text-gray-400">[ Illustration / Image ]</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2">📝 Realistic Mock Tests</h3>
          <p className="text-gray-600">
            Practice with exam-like mock tests to build confidence and speed.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2">📊 Performance Analytics</h3>
          <p className="text-gray-600">
            Track scores, accuracy, and progress with detailed insights.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2">🎯 Personalized Practice</h3>
          <p className="text-gray-600">
            Focus on weak areas with tailored recommendations.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Start your preparation today 🚀
        </h2>
        <p className="mb-6 text-blue-100">
          Join thousands of students improving their scores every day.
        </p>
        <Link
          to="/register"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
        >
          Create Free Account
        </Link>
      </section>
    </div>
  );
}
