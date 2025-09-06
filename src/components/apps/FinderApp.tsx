import React from 'react';
import { Folder, FileText, Image, Music, Video } from 'lucide-react';

const FinderApp: React.FC = () => {
  const folders = [
    { name: 'Desktop', items: 47 },
    { name: 'Documents', items: 128 },
    { name: 'Downloads', items: 2847 },
    { name: 'Applications', items: 89 },
    { name: 'Important Stuff', items: 0 },
  ];

  const files = [
    { name: 'final_v28_really_final.pdf', type: 'pdf', size: '2.3 MB' },
    { name: 'Coffee Expenses Q3.xlsx', type: 'excel', size: '847 KB' },
    { name: 'Definitely_Not_Cat_Videos', type: 'folder', size: '15.2 GB' },
    { name: 'New Folder (47)', type: 'folder', size: '--' },
    { name: 'Untitled Document 23', type: 'doc', size: '156 KB' },
    { name: 'backup_backup_BACKUP.zip', type: 'zip', size: '4.7 GB' },
    { name: 'meme_collection_professional_use_only', type: 'folder', size: '3.2 GB' },
    { name: 'README_PLEASE_FOR_THE_LOVE_OF.txt', type: 'txt', size: '12 KB' },
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder': return <Folder className="w-5 h-5 text-blue-400" />;
      case 'pdf':
      case 'doc':
      case 'txt': return <FileText className="w-5 h-5 text-red-400" />;
      case 'zip': return <FileText className="w-5 h-5 text-yellow-400" />;
      case 'excel': return <FileText className="w-5 h-5 text-green-400" />;
      default: return <FileText className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-48 bg-muted border-r border-border p-3">
        <div className="text-xs font-medium text-muted-foreground mb-2">FAVORITES</div>
        <div className="space-y-1">
          {folders.map((folder) => (
            <div
              key={folder.name}
              className="flex items-center space-x-2 p-1 hover:bg-accent rounded cursor-pointer"
            >
              <Folder className="w-4 h-4 text-blue-400" />
              <span className="text-sm">{folder.name}</span>
              {folder.items > 0 && (
                <span className="text-xs text-muted-foreground ml-auto">
                  {folder.items}
                </span>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-xs font-medium text-muted-foreground mb-2 mt-6">RECENT</div>
        <div className="space-y-1">
          <div className="flex items-center space-x-2 p-1 hover:bg-accent rounded cursor-pointer">
            <FileText className="w-4 h-4 text-red-400" />
            <span className="text-sm">Procrastination Guide.pdf</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Documents</h2>
          <div className="text-sm text-muted-foreground">{files.length} items</div>
        </div>

        <div className="space-y-1">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center space-x-3 p-2 hover:bg-accent rounded cursor-pointer"
            >
              {getFileIcon(file.type)}
              <div className="flex-1">
                <div className="text-sm">{file.name}</div>
              </div>
              <div className="text-xs text-muted-foreground">{file.size}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <div className="text-sm text-muted-foreground text-center">
            "The real treasure was the files we organized along the way." 
            <br />
            - Ancient Finder Wisdom
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinderApp;