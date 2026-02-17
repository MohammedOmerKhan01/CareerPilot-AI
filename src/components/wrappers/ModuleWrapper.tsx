"use client";

import { useEffect, useState } from "react";
import { AlertCircle, ExternalLink } from "lucide-react";

interface ModuleWrapperProps {
  moduleName: string;
  modulePath: string;
  description: string;
}

export function ModuleWrapper({ moduleName, modulePath, description }: ModuleWrapperProps) {
  const [moduleExists, setModuleExists] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if module exists
    fetch(`/modules/${modulePath}/index.html`)
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
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Module Not Found: {moduleName}
                </h3>
                <p className="text-gray-700 mb-4">{description}</p>
                
                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Setup Instructions:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    <li>Clone the repository as a Git submodule</li>
                    <li>Run the setup script to initialize modules</li>
                    <li>Build the module if required</li>
                    <li>Refresh this page</li>
                  </ol>
                </div>

                <div className="bg-gray-900 rounded-lg p-4 mb-4">
                  <p className="text-xs text-gray-400 mb-2">Run these commands:</p>
                  <code className="text-sm text-green-400 block mb-1">
                    git submodule add https://github.com/MohammedOmerKhan01/{modulePath} modules/{modulePath}
                  </code>
                  <code className="text-sm text-green-400 block mb-1">
                    cd modules/{modulePath}
                  </code>
                  <code className="text-sm text-green-400 block">
                    npm install && npm run build
                  </code>
                </div>

                <a
                  href={`https://github.com/MohammedOmerKhan01/${modulePath}`}
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

          <div className="mt-6 p-6 bg-white rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">About This Module</h4>
            <p className="text-gray-700 mb-4">{description}</p>
            <p className="text-sm text-gray-600">
              This module is integrated as a Git submodule, preserving all original code and functionality.
              Once set up, it will load seamlessly within this unified platform.
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
        src={`/modules/${modulePath}/index.html`}
        className="w-full h-full border-0"
        title={moduleName}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
      />
    </div>
  );
}
