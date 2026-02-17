import Link from "next/link";
import { Briefcase, Target, FileText } from "lucide-react";

export default function Home() {
  const modules = [
    {
      name: "KodNest Careers",
      description: "Track job applications and opportunities",
      href: "/careers",
      icon: Briefcase,
      color: "bg-blue-500",
    },
    {
      name: "Placement Readiness",
      description: "Assess your readiness and prepare for placements",
      href: "/readiness",
      icon: Target,
      color: "bg-green-500",
    },
    {
      name: "AI Resume Builder",
      description: "Create ATS-optimized resumes with AI",
      href: "/resume",
      icon: FileText,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to Your Career Platform
          </h1>
          <p className="text-lg text-gray-600">
            Access all your career development tools in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Link
              key={module.name}
              href={module.href}
              className="block p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className={`inline-flex p-3 rounded-lg ${module.color} mb-4`}>
                <module.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {module.name}
              </h3>
              <p className="text-gray-600">{module.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Getting Started
          </h2>
          <p className="text-gray-700 mb-4">
            This platform integrates three independent applications as modules. Each module maintains its original functionality and code.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Navigate using the sidebar to access different modules</li>
            <li>Each module runs independently within the unified platform</li>
            <li>All original features and functionality are preserved</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
