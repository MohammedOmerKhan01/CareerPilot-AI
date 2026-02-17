import Link from "next/link";
import { Briefcase, Target, FileText, Sparkles } from "lucide-react";

export default function Home() {
  const modules = [
    {
      name: "KodNest Careers",
      description: "Track job applications, get notifications, and manage your entire job search process",
      href: "/careers",
      icon: Briefcase,
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: "Placement Readiness",
      description: "Analyze job descriptions, assess your readiness score, and prepare strategically",
      href: "/readiness",
      icon: Target,
      color: "bg-green-500",
      gradient: "from-green-500 to-green-600",
    },
    {
      name: "AI Resume Builder",
      description: "Create ATS-optimized resumes with AI assistance and professional templates",
      href: "/resume",
      icon: FileText,
      color: "bg-purple-500",
      gradient: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">CareerPilot AI</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your all-in-one career development platform. Access powerful tools to track jobs, 
            assess readiness, and build professional resumes - all in one place.
          </p>
        </div>

        {/* Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {modules.map((module) => (
            <Link
              key={module.name}
              href={module.href}
              className="group block p-6 bg-white rounded-xl border border-gray-200 hover:shadow-xl hover:border-transparent transition-all duration-300"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${module.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                <module.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {module.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{module.description}</p>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100 p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            🚀 Getting Started
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Seamless Integration</h3>
              <p className="text-gray-700 text-sm">
                Each module loads from its deployed Vercel application, preserving all original 
                functionality, routing, and UI/UX exactly as designed.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Navigation</h3>
              <p className="text-gray-700 text-sm">
                Use the sidebar to switch between modules instantly. All your career development 
                tools are just one click away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
