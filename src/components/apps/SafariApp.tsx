import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCcw, 
  Plus, 
  Lock, 
  Share, 
  BookmarkPlus,
  MoreHorizontal,
  X,
  ChevronDown,
  Star,
  Download,
  Printer
} from 'lucide-react';

const SafariApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [bookmarks, setBookmarks] = useState(false);
  
  const tabs = [
    { title: 'Apple', url: 'apple.com', favicon: '🍎' },
    { title: 'GitHub', url: 'github.com', favicon: '🐙' },
    { title: 'Design Inspiration', url: 'dribbble.com', favicon: '🏀' },
  ];

  const bookmarksList = [
    { title: 'Apple', url: 'apple.com', favicon: '🍎' },
    { title: 'GitHub', url: 'github.com', favicon: '🐙' },
    { title: 'Design Inspiration', url: 'dribbble.com', favicon: '🏀' },
    { title: 'Unsplash', url: 'unsplash.com', favicon: '📸' },
    { title: 'Figma', url: 'figma.com', favicon: '🎨' },
  ];

  const readingList = [
    { title: 'The Future of Web Design', url: 'medium.com', time: '5 min read' },
    { title: 'CSS Grid Complete Guide', url: 'css-tricks.com', time: '12 min read' },
    { title: 'React Best Practices', url: 'react.dev', time: '8 min read' },
  ];

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Tab Bar */}
      <div className="flex items-center bg-gray-100 border-b border-gray-200 px-4 py-2">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg cursor-pointer transition-colors ${
              activeTab === index 
                ? 'bg-white border-t border-l border-r border-gray-200' 
                : 'hover:bg-gray-200'
            }`}
            onClick={() => setActiveTab(index)}
          >
            <span className="text-sm">{tab.favicon}</span>
            <span className="text-sm font-medium text-gray-700">{tab.title}</span>
            <button className="p-1 hover:bg-gray-300 rounded">
              <X className="w-3 h-3 text-gray-500" />
            </button>
          </div>
        ))}
        <button className="p-2 hover:bg-gray-200 rounded-lg ml-2">
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-200 rounded-lg">
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-lg">
            <ArrowRight className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-lg">
            <RotateCcw className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        <div className="flex-1 max-w-2xl mx-4">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2">
            <Lock className="w-4 h-4 text-green-500 mr-2" />
            <span className="text-sm text-gray-700 flex-1">apple.com</span>
            <button className="p-1 hover:bg-gray-100 rounded">
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-200 rounded-lg">
            <Share className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-lg">
            <BookmarkPlus className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded-lg">
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className={`w-64 bg-gray-50 border-r border-gray-200 transition-all duration-300 ${bookmarks ? 'block' : 'hidden'}`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Bookmarks</h2>
              <button 
                className="p-1 hover:bg-gray-200 rounded"
                onClick={() => setBookmarks(false)}
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-1 mb-6">
              {bookmarksList.map((bookmark, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer"
                >
                  <span className="text-sm">{bookmark.favicon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {bookmark.title}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {bookmark.url}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Reading List</h3>
              <div className="space-y-1">
                {readingList.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-500">
                        {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Page content */}
          <div className="flex-1 bg-white">
            <div className="max-w-4xl mx-auto p-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Apple
                </h1>
                <p className="text-xl text-gray-600">
                  Think different. Think Apple.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">iPhone 15 Pro</h3>
                  <p className="text-gray-600 text-sm">
                    The most advanced iPhone ever with titanium design and A17 Pro chip.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">💻</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">MacBook Pro</h3>
                  <p className="text-gray-600 text-sm">
                    Supercharged for pros with M3 Pro and M3 Max chips.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">⌚</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Apple Watch</h3>
                  <p className="text-gray-600 text-sm">
                    The most advanced Apple Watch with health monitoring features.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white text-center">
                <h2 className="text-2xl font-bold mb-4">Experience Innovation</h2>
                <p className="text-lg mb-6">
                  Discover products that push the boundaries of what's possible.
                </p>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          {/* Bottom toolbar */}
          <div className="flex items-center justify-between p-3 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-4">
              <button 
                className="flex items-center space-x-2 px-3 py-1 hover:bg-gray-200 rounded-lg"
                onClick={() => setBookmarks(true)}
              >
                <Star className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">Bookmarks</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-1 hover:bg-gray-200 rounded-lg">
                <Download className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">Downloads</span>
              </button>
              <button className="flex items-center space-x-2 px-3 py-1 hover:bg-gray-200 rounded-lg">
                <Printer className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">Print</span>
              </button>
            </div>
            
            <div className="text-xs text-gray-500">
              Private Browsing • No tracking
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafariApp;