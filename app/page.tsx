import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center space-y-8 p-8">
        <h1 className="text-5xl font-bold text-gray-800">Task Manager</h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Organize your tasks, boost your productivity, and achieve your goals with our simple task management app.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 bg-white text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}