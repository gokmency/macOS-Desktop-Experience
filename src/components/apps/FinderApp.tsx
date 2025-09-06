import React, { useState } from 'react';
import { 
  Folder, 
  FileText, 
  Image, 
  Music, 
  Video, 
  Search, 
  Grid3X3, 
  List, 
  ChevronRight,
  Star,
  Clock,
  HardDrive,
  Home,
  Download,
  Trash2,
  Plus,
  MoreHorizontal
} from 'lucide-react';

const FinderApp: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const folders = [
    { name: 'Desktop', items: 47, icon: '🖥️' },
    { name: 'Documents', items: 128, icon: '📄' },
    { name: 'Downloads', items: 2847, icon: '⬇️' },
    { name: 'Applications', items: 89, icon: '🚀' },
    { name: 'Pictures', items: 156, icon: '🖼️' },
    { name: 'Music', items: 234, icon: '🎵' },
    { name: 'Movies', items: 12, icon: '🎬' },
  ];

  const recentFiles = [
    { name: 'Project Proposal.pdf', type: 'pdf', size: '2.3 MB', modified: 'Today' },
    { name: 'Meeting Notes.docx', type: 'doc', size: '847 KB', modified: 'Yesterday' },
    { name: 'Screenshot 2024.png', type: 'image', size: '1.2 MB', modified: '2 days ago' },
    { name: 'Budget Q4.xlsx', type: 'excel', size: '156 KB', modified: '3 days ago' },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'doc': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'excel': return <FileText className="w-5 h-5 text-green-500" />;
      case 'image': return <Image className="w-5 h-5 text-purple-500" />;
      case 'music': return <Music className="w-5 h-5 text-pink-500" />;
      case 'video': return <Video className="w-5 h-5 text-orange-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const toggleSelection = (itemName: string) => {
    setSelectedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <button className="p-1 hover:bg-gray-200 rounded">
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
          <div className="flex items-center space-x-1">
            <button 
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4 text-gray-600" />
            </button>
            <button 
              className={`p-1 rounded ${viewMode === 'list' ? 'bg-gray-300' : 'hover:bg-gray-200'}`}
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-white border border-gray-300 rounded-lg px-3 py-1">
            <Search className="w-4 h-4 text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search" 
              className="outline-none text-sm"
            />
          </div>
          <button className="p-1 hover:bg-gray-200 rounded">
            <Plus className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-3">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Favorites
            </div>
            {folders.slice(0, 4).map((folder) => (
              <div
                key={folder.name}
                className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer group"
              >
                <span className="text-lg">{folder.icon}</span>
                <span className="text-sm font-medium text-gray-700">{folder.name}</span>
                <span className="text-xs text-gray-500 ml-auto">{folder.items}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Locations
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                <HardDrive className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">Macintosh HD</span>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                <Home className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">Home</span>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Tags
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Important</span>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Work</span>
              </div>
              <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Personal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
              <p className="text-sm text-gray-500">12 items</p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreHorizontal className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-4 gap-4">
              {recentFiles.map((file, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    selectedItems.includes(file.name)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleSelection(file.name)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                      {getFileIcon(file.type)}
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1 truncate w-full">
                      {file.name}
                    </h3>
                    <p className="text-xs text-gray-500">{file.size}</p>
                    <p className="text-xs text-gray-400 mt-1">{file.modified}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {recentFiles.map((file, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedItems.includes(file.name)
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => toggleSelection(file.name)}
                >
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    {getFileIcon(file.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </h3>
                    <p className="text-xs text-gray-500">{file.size} • {file.modified}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 hover:bg-gray-200 rounded">
                      <Star className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Recent section */}
          <div className="mt-8">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-4 h-4 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">Recent</h2>
            </div>
            <div className="grid grid-cols-6 gap-3">
              {folders.slice(0, 6).map((folder, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-2xl">{folder.icon}</span>
                  </div>
                  <span className="text-xs text-gray-700 text-center truncate w-full">
                    {folder.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinderApp;