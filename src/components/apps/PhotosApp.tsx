import React, { useState } from 'react';
import { Grid, List, Heart, Share, Download, Search } from 'lucide-react';

const PhotosApp: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const photos = [
    { 
      id: 1, 
      title: 'Definitely My Vacation (Not Stock Photo)',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      date: 'Last Summer'
    },
    { 
      id: 2, 
      title: 'Me Looking Productive at Coffee Shop',
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop',
      date: '3 months ago'
    },
    { 
      id: 3, 
      title: 'Food I Made (Instant Noodles)',
      url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=200&fit=crop',
      date: 'Yesterday'
    },
    { 
      id: 4, 
      title: 'Sunset I Pretend I Woke Up For',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
      date: 'Last week'
    },
    { 
      id: 5, 
      title: 'My Workspace (Cleaned Just for Photo)',
      url: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop',
      date: '2 weeks ago'
    },
    { 
      id: 6, 
      title: 'Cat Being Judgmental (As Usual)',
      url: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=200&fit=crop',
      date: 'Every day'
    },
  ];

  const albums = [
    { name: 'Screenshots of Tweets I\'ll Never Share', count: 247 },
    { name: 'Blurry Photos of Moving Objects', count: 89 },
    { name: 'Food I Was Too Hungry to Wait to Photograph', count: 156 },
    { name: 'Memes I Saved to Send Later But Never Did', count: 423 },
    { name: 'Evidence I Leave the House Sometimes', count: 12 },
  ];

  return (
    <div className="h-full flex bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
        <div className="mb-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search photos..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="space-y-1 mb-6">
          <div className="flex items-center space-x-3 p-2 bg-blue-100 text-blue-700 rounded-lg">
            <div className="w-4 h-4 bg-blue-600 rounded"></div>
            <span className="text-sm font-medium">All Photos</span>
            <span className="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded-full ml-auto">
              {photos.length}
            </span>
          </div>
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
            <Heart className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-700">Favorites</span>
          </div>
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-700">Recently Added</span>
          </div>
          <div className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm text-gray-700">Screenshots</span>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Albums
          </div>
          <div className="space-y-1">
            {albums.map((album, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer">
                <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-xs">📷</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{album.name}</div>
                  <div className="text-xs text-gray-500">{album.count} photos</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">All Photos</h2>
            <div className="text-sm text-gray-500">{photos.length} photos</div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              <Grid className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            >
              <List className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex-1 p-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative bg-gray-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-200"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3">
                    <div className="text-sm font-medium text-gray-900 truncate">{photo.title}</div>
                    <div className="text-xs text-gray-500">{photo.date}</div>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                      <Share className="w-4 h-4 text-white" />
                    </button>
                    <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                      <Download className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{photo.title}</div>
                    <div className="text-xs text-gray-500">{photo.date}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-200 rounded-lg">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-lg">
                      <Share className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl text-center">
            <div className="text-sm text-gray-600">
              "A picture is worth a thousand words, but I still can't remember where I took this." 
              <br />
              - Modern Photography Wisdom
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotosApp;