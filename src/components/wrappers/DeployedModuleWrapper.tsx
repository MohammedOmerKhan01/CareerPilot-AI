"use client";

import { useState, useEffect } from "react";
import { ExternalLink, AlertCircle, Loader2 } from "lucide-react";

interface DeployedModuleWrapperProps {
  moduleName: string;
  deployedUrl: string;
  description: string;
  repoUrl: string;
}

export function DeployedModuleWrapper({
  moduleName,
  deployedUrl,
  description,
  repoUrl,
}: DeployedModuleWrapperProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check if URL is configured
    if (!deployedUrl || deployedUrl.includes('your-')) {
      setError(true);
      setLoading(false);
      return;
    }

    // Simulate loading check
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [deployedUrl]);

  if (error || !deployedUrl || deployedUrl.includes('your-')) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Configuration Required: {moduleName}
                </h3>
                <p className="text-gray-700 mb-4">{description}</p>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Setup Steps:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>Get your Vercel deployment URL for this module</li>
                    <li>Create a <code className="bg-gray-100 px-1 rounded">.env.local</code> file in the project root</li>
                    <li>Add the environment variable with your deployed URL</li>
                    <li>Restart the development server</li>
                  </ol>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <p className="text-xs text-gray-400 mb-2">Add to .env.local:</p>
                  <code className="text-sm text-green-400 block">
                    NEXT_PUBLIC_{moduleName.toUpperCase().replace(/\s+/g, '_')}_URL=https://your-app.vercel.app
                  </code>
                </div>

                <div className="flex gap-3">
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    View Repository
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                  <a
                    href="https://vercel.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    Vercel Dashboard
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">About This Module</h4>
            <p className="text-gray-700 mb-4">{description}</p>
            <p className="text-sm text-gray-600">
              This module loads from your deployed Vercel application, preserving all original functionality,
              routing, assets, and UI/UX exactly as deployed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading {moduleName}...</p>
        </div>
      </div>
    );
  }

  // Load the deployed app in iframe
  return (
    <div className="h-full relative">
      <iframe
        src={deployedUrl}
        className="w-full h-full border-0"
        title={moduleName}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads allow-modals"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
      <a
        href={deployedUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-4 right-4 inline-flex items-center px-3 py-1.5 bg-white/90 backdrop-blur-sm text-gray-700 text-sm rounded-lg hover:bg-white shadow-sm border border-gray-200 transition-colors z-10"
      >
        Open in New Tab
        <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
      </a>
    </div>
  );
}
