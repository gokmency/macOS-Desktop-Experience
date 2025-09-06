import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Heart } from 'lucide-react';

const MusicApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);

  const playlists = [
    { name: 'Songs I Skip After 10 Seconds', count: 247 },
    { name: 'Music to Procrastinate To', count: 89 },
    { name: 'Shower Concert Hits', count: 34 },
    { name: 'Songs I Pretend to Like at Parties', count: 67 },
    { name: 'Emotional Damage (Breakup Playlist)', count: 156 },
    { name: 'Coding Background Noise', count: 203 },
  ];

  const songs = [
    { title: 'I Should Be Working', artist: 'Procrastination Symphony', album: 'Greatest Hits', duration: '3:42' },
    { title: 'Five More Minutes', artist: 'The Snooze Button', album: 'Morning Struggles', duration: '4:15' },
    { title: 'WiFi Password Blues', artist: 'Connection Lost', album: 'Technical Difficulties', duration: '2:58' },
    { title: 'Coffee Withdrawal Syndrome', artist: 'Caffeine Dependency', album: 'Addiction Studies', duration: '3:23' },
    { title: 'Meeting That Could Have Been an Email', artist: 'Corporate Wasteland', album: 'Office Space Soundtrack', duration: '5:47' },
    { title: 'Charging Cable Tango', artist: 'Low Battery Panic', album: '1% Life', duration: '2:12' },
    { title: 'Social Anxiety Waltz', artist: 'Awkward Interactions', album: 'Small Talk Nightmares', duration: '4:01' },
    { title: 'Laundry Day Lament', artist: 'Clean Clothes Crisis', album: 'Adult Responsibilities', duration: '3:34' },
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-purple-900/20 to-background">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h1 className="text-2xl font-bold">Music</h1>
        <div className="text-sm text-muted-foreground">Your soundtrack to avoiding responsibility</div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-muted/50 border-r border-border p-3">
          <div className="space-y-2 mb-6">
            <div className="p-2 bg-primary text-primary-foreground rounded text-sm font-medium">
              Listen Now
            </div>
            <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Browse</div>
            <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Radio</div>
            <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Search</div>
          </div>

          <div className="text-xs font-medium text-muted-foreground mb-2">LIBRARY</div>
          <div className="space-y-1 mb-6">
            <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Recently Added</div>
            <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Artists</div>
            <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Albums</div>
            <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Songs</div>
          </div>

          <div className="text-xs font-medium text-muted-foreground mb-2">PLAYLISTS</div>
          <div className="space-y-1 max-h-48 overflow-auto">
            {playlists.map((playlist, index) => (
              <div key={index} className="p-2 hover:bg-accent rounded cursor-pointer">
                <div className="text-sm truncate">{playlist.name}</div>
                <div className="text-xs text-muted-foreground">{playlist.count} songs</div>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Now Playing / Song List */}
          <div className="flex-1 overflow-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Songs I Skip After 10 Seconds</h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-accent rounded">
                  <Shuffle className="w-4 h-4" />
                </button>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90">
                  Play
                </button>
              </div>
            </div>

            <div className="space-y-1">
              {songs.map((song, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentSong(index)}
                  className={`flex items-center space-x-3 p-2 hover:bg-accent rounded cursor-pointer ${
                    currentSong === index ? 'bg-accent' : ''
                  }`}
                >
                  <div className="w-8 text-center text-sm text-muted-foreground">
                    {currentSong === index && isPlaying ? (
                      <div className="w-4 h-4 mx-auto bg-primary animate-pulse rounded-sm" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{song.title}</div>
                    <div className="text-xs text-muted-foreground truncate">{song.artist}</div>
                  </div>
                  <div className="text-xs text-muted-foreground">{song.album}</div>
                  <button className="p-1 hover:bg-accent rounded opacity-0 group-hover:opacity-100">
                    <Heart className="w-4 h-4" />
                  </button>
                  <div className="text-xs text-muted-foreground w-12 text-right">{song.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="border-t border-border p-4 bg-muted/30">
        <div className="flex items-center justify-between">
          {/* Currently playing */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center">
              <Play className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">{songs[currentSong]?.title}</div>
              <div className="text-xs text-muted-foreground truncate">{songs[currentSong]?.artist}</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <button className="p-1 hover:bg-accent rounded">
              <Shuffle className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-accent rounded">
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button className="p-1 hover:bg-accent rounded">
              <SkipForward className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-accent rounded">
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center space-x-2 flex-1 justify-end">
            <Volume2 className="w-4 h-4" />
            <div className="w-20 h-1 bg-muted rounded overflow-hidden">
              <div className="w-3/4 h-full bg-primary rounded" />
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center space-x-2 mt-2">
          <div className="text-xs text-muted-foreground">1:23</div>
          <div className="flex-1 h-1 bg-muted rounded overflow-hidden">
            <div className="w-1/3 h-full bg-primary rounded" />
          </div>
          <div className="text-xs text-muted-foreground">3:42</div>
        </div>
      </div>
    </div>
  );
};

export default MusicApp;