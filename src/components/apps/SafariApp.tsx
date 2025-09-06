import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Plus, Lock } from 'lucide-react';

const SafariApp: React.FC = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Browser toolbar */}
      <div className="flex items-center space-x-2 p-2 bg-muted border-b border-border">
        <div className="flex items-center space-x-1">
          <button className="p-1 hover:bg-accent rounded">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-accent rounded">
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="p-1 hover:bg-accent rounded">
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
        
        <div className="flex-1 flex items-center bg-background border border-border rounded px-3 py-1">
          <Lock className="w-4 h-4 text-green-500 mr-2" />
          <span className="text-sm">productivitytips.fake</span>
        </div>
        
        <button className="p-1 hover:bg-accent rounded">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Tab bar */}
      <div className="flex bg-muted border-b border-border">
        <div className="flex items-center px-4 py-2 bg-background border-r border-border min-w-0 flex-1 max-w-xs">
          <span className="text-sm truncate">Ultimate Productivity Tips</span>
        </div>
        <div className="flex-1"></div>
      </div>

      {/* Page content */}
      <div className="flex-1 bg-white p-8 overflow-auto">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Ultimate Productivity Tips
          </h1>
          
          <div className="prose prose-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              The Only Productivity Tip You'll Ever Need:
            </h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <p className="text-lg text-gray-800 font-medium">
                1) Close tabs.
              </p>
            </div>
            
            <p className="text-gray-600 mb-4">
              That's it. That's the whole article.
            </p>
            
            <p className="text-gray-600 mb-6">
              You currently have 47 tabs open. Close them. Right now. We'll wait.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                "But what if I need them later?"
              </h3>
              <p className="text-gray-600">
                You won't. You never do. Bookmark the important ones and let the rest go. 
                Your RAM will thank you.
              </p>
            </div>
            
            <div className="bg-red-50 border border-red-200 p-4 rounded">
              <p className="text-red-700 font-medium">
                ⚠️ Warning: Reading productivity articles instead of being productive 
                may be counterproductive. Consider closing this tab too.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafariApp;