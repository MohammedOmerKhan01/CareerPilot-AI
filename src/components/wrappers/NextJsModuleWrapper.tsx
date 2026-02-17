"use client";

import { ExternalLink, Info, Terminal } from "lucide-react";

interface NextJsModuleWrapperProps {
  moduleName: string;
  modulePath: string;
  description: string;
  repoUrl: string;
  devPort: number;
}

export function NextJsModuleWrapper({ 
  moduleName, 
  modulePath, 
  description, 
  repoUrl,
  devPort 
}: NextJsModuleWrapperProps) {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-start">
            <Info className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {moduleName} - Next.js Application
              </h3>
              <p className="text-gray-700 mb-4">{description}</p>
              
              <p className="text-sm text-gray-600 mb-4">
                This module is a full Next.js application that runs on its own server. 
                It cannot be embedded directly in this platform but can be accessed separately.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
            <Terminal className="w-5 h-5 text-gray-600 mr-2" />
            How to Run This Module
          </h4>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">1. Install dependencies (first time only):</p>
              <div className="bg-gray-900 rounded-lg p-3">
                <code className="text-sm text-green-400 block">cd modules/{modulePath}</code>
                <code className="text-sm text-green-400 block">pnpm install</code>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">2. Start the development server:</p>
              <div className="bg-gray-900 rounded-lg p-3">
                <code className="text-sm text-green-400 block">pnpm run dev:web</code>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">3. Access the application:</p>
              <a
                href={`http://localhost:${devPort}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Open http://localhost:{devPort}
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">Integration Options</h4>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-start">
              <span className="font-semibold mr-2">Current:</span>
              <span>Run as separate application on port {devPort}</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">Alternative:</span>
              <span>Deploy separately and link from this platform</span>
            </div>
            <div className="flex items-start">
              <span className="font-semibold mr-2">Advanced:</span>
              <span>Use reverse proxy to serve under /careers path</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-3">About This Module</h4>
          <p className="text-gray-700 mb-4">{description}</p>
          <p className="text-sm text-gray-600 mb-4">
            This is a full-stack Next.js application with its own routing, API routes, and server-side rendering.
            It maintains complete independence from this unified platform.
          </p>
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            View Repository
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
