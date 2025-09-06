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
    <div className="h-full flex">
      {/* Sidebar */}
      <div className="w-64 bg-muted border-r border-border p-3">
        <div className="mb-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2 top-2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search photos..."
              className="w-full pl-8 pr-3 py-1 text-sm bg-background border border-border rounded"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="p-2 bg-primary text-primary-foreground rounded text-sm font-medium">
            All Photos
            <span className="float-right">{photos.length}</span>
          </div>
          <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Favorites</div>
          <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Recently Added</div>
          <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Screenshots</div>
        </div>

        <div className="mt-6 text-xs font-medium text-muted-foreground mb-2">ALBUMS</div>
        <div className="space-y-1">
          {albums.map((album, index) => (
            <div key={index} className="p-2 hover:bg-accent rounded cursor-pointer">
              <div className="text-sm">{album.name}</div>
              <div className="text-xs text-muted-foreground">{album.count} photos</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold">Pretending I'm on Vacation</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-accent' : 'hover:bg-accent'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded ${viewMode === 'list' ? 'bg-accent' : 'hover:bg-accent'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative bg-muted rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-2">
                    <div className="text-xs font-medium truncate">{photo.title}</div>
                    <div className="text-xs text-muted-foreground">{photo.date}</div>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                    <button className="p-1 bg-white/20 rounded hover:bg-white/30">
                      <Heart className="w-4 h-4 text-white" />
                    </button>
                    <button className="p-1 bg-white/20 rounded hover:bg-white/30">
                      <Share className="w-4 h-4 text-white" />
                    </button>
                    <button className="p-1 bg-white/20 rounded hover:bg-white/30">
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
                  className="flex items-center space-x-3 p-2 hover:bg-accent rounded cursor-pointer"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{photo.title}</div>
                    <div className="text-xs text-muted-foreground">{photo.date}</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <button className="p-1 hover:bg-accent rounded">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-accent rounded">
                      <Share className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 p-6 bg-muted/50 rounded-lg text-center">
            <div className="text-sm text-muted-foreground">
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