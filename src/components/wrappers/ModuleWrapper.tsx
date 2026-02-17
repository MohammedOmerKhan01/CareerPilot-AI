"use client";

import { useEffect, useState } from "react";
import { AlertCircle, ExternalLink, CheckCircle } from "lucide-react";

interface ModuleWrapperProps {
  moduleName: string;
  modulePath: string;
  description: string;
  repoUrl: string;
}

export function ModuleWrapper({ moduleName, modulePath, description, repoUrl }: ModuleWrapperProps) {
  const [moduleExists, setModuleExists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if module dist exists
    fetch(`/modules/${modulePath}/dist/index.html`)
      .then((res) => {
        setModuleExists(res.ok);
        setLoading(false);
      })
      .catch(() => {
        setModuleExists(false);
        setLoading(false);
      });
  }, [modulePath]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {moduleName}...</p>
        </div>
      </div>
    );
  }

  if (!moduleExists) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Module Setup Required: {moduleName}
                </h3>
                <p className="text-gray-700 mb-4">{description}</p>
                
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                    Setup Steps:
                  </h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>The submodule is already added ✓</li>
                    <li>Install dependencies in the module</li>
                    <li>Build the module</li>
                    <li>Refresh this page</li>
                  </ol>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <p className="text-xs text-gray-400 mb-2">Run these commands:</p>
                  <code className="text-sm text-green-400 block mb-1">
                    cd modules/{modulePath}
                  </code>
                  <code className="text-sm text-green-400 block mb-1">
                    npm install
                  </code>
                  <code className="text-sm text-green-400 block mb-1">
                    npm run build
                  </code>
                  <code className="text-sm text-green-400 block">
                    cd ../..
                  </code>
                </div>

                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  View Repository
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">About This Module</h4>
            <p className="text-gray-700 mb-4">{description}</p>
            <p className="text-sm text-gray-600">
              This module is integrated as a Git submodule, preserving all original code and functionality.
              Once built, it will load seamlessly within this unified platform.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If module exists, load it in an iframe
  return (
    <div className="h-full">
      <iframe
        src={`/modules/${modulePath}/dist/index.html`}
        className="w-full h-full border-0"
        title={moduleName}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
    </div>
  );
}
