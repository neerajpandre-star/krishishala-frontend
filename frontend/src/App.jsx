import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Student Pages
import StudentDashboard from "./pages/StudentDashboard";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import StudentMockTest from "./pages/MockTest"; // ✅ Student mock test page
import StudentMockTestsList from "./pages/StudentMockTestsList"; // ✅ Student mock tests list page

// Admin Pages
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import Papers from "./pages/papers";
import Questions from "./pages/Questions";
import UploadPdf from "./pages/UploadPdf";
import AdminPaperBuilder from "./pages/AdminPaperBuilder";
import AdminExamHome from "./pages/AdminExamHome";
import AdminCreateMockTest from "./pages/AdminCreateTest";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="student">
              <Navbar />
              <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <Dashboard />
              </main>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute role="student">
              <Navbar />
              <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <StudentDashboard />
              </main>
            </ProtectedRoute>
          }
        />
          
        <Route
          path="/student/mocktests"
          element={
            <ProtectedRoute role="student">
              <Navbar />
              <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <StudentMockTestsList />
              </main>
           </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute role="student">
              <Navbar />
              <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <Profile />
              </main>
            </ProtectedRoute>
          }
        />

        {/* Student Mock Test Route */}
        <Route
          path="/student/mocktest/:exam/:testName"
          element={
            <ProtectedRoute role="student">
              <Navbar />
              <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <StudentMockTest />
              </main>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes with Layout */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="papers" element={<Papers />} />
          <Route path="questions" element={<Questions />} />
          <Route path="UploadPdf" element={<UploadPdf />} />
          <Route path="paper-builder" element={<AdminPaperBuilder />} />
          <Route path="exam/:exam" element={<AdminExamHome />} />
          <Route path="exams/:exam/mocktest" element={<AdminCreateMockTest />} />
        </Route>

        {/* Fallback */}
        <Route
          path="*"
          element={
            <div className="py-20 text-center text-neutral-400">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </div>
  );
}
