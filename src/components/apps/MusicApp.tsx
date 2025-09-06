import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Heart, Plus, Music, Clock } from 'lucide-react';
import { useMusicLibrary } from '@/hooks/use-music-library';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MusicApp: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { musicFiles, playlists, isLoading, addMusicFile } = useMusicLibrary();

  const formatDuration = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddMusic = () => {
    // Müzik dosyalarını yeniden tarayalım
    const refreshMusic = async () => {
      try {
        // Basit bir dosya taraması simülasyonu
        const newMusicFiles = [
          {
            id: Date.now().toString(),
            name: 'Yeni Eklenen Şarkı',
            artist: 'Yeni Sanatçı',
            album: 'Yeni Albüm',
            duration: 200,
            url: '/music/new-song.mp3',
            genre: 'Pop',
            year: 2024
          }
        ];
        
        newMusicFiles.forEach(file => addMusicFile(file));
      } catch (error) {
        console.error('Müzik ekleme hatası:', error);
      }
    };
    
    refreshMusic();
  };

  // Audio player fonksiyonları
  const initializeAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
      
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      });
      
      audioRef.current.addEventListener('loadedmetadata', () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      });
      
      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        // Sonraki şarkıya geç
        if (currentSong < currentSongs.length - 1) {
          setCurrentSong(currentSong + 1);
        }
      });

      audioRef.current.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        // Hata durumunda simülasyon yap
        const song = currentSongs[currentSong];
        if (song) {
          setDuration(song.duration);
          setIsPlaying(true);
        }
      });
    }
  };

  const playMusic = () => {
    if (currentSongs.length === 0) return;
    
    initializeAudio();
    
    if (audioRef.current) {
      const song = currentSongs[currentSong];
      audioRef.current.src = song.url;
      audioRef.current.load(); // Dosyayı yeniden yükle
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        console.log('Müzik oynatılıyor:', song.name);
      }).catch((error) => {
        console.error('Müzik oynatma hatası:', error);
        // Gerçek dosya yoksa simülasyon yap
        setIsPlaying(true);
        setDuration(song.duration);
        console.log('Simülasyon modunda oynatılıyor:', song.name);
      });
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  const playSong = (index: number) => {
    setCurrentSong(index);
    setIsPlaying(false);
    // Şarkı değiştiğinde otomatik oynat
    setTimeout(() => {
      playMusic();
    }, 100);
  };

  // İleri sarma fonksiyonu
  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Progress bar tıklama fonksiyonu
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (duration > 0 && audioRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = clickX / rect.width;
      const newTime = percentage * duration;
      seekTo(newTime);
    }
  };

  // Önceki/Sonraki şarkı fonksiyonları
  const playPreviousSong = () => {
    if (currentSong > 0) {
      playSong(currentSong - 1);
    }
  };

  const playNextSong = () => {
    if (currentSong < currentSongs.length - 1) {
      playSong(currentSong + 1);
    }
  };

  const currentSongs = selectedPlaylist 
    ? playlists.find(p => p.id === selectedPlaylist)?.songs || musicFiles
    : musicFiles;

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Music className="w-12 h-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
          <p className="text-muted-foreground">Müzik kütüphanesi yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-purple-900/20 to-background" style={{ maxHeight: 'calc(100vh - 120px)' }}>
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

          <div className="text-xs font-medium text-muted-foreground mb-2">KÜTÜPHANE</div>
          <div className="space-y-1 mb-6">
            <div 
              className={`p-2 hover:bg-accent rounded cursor-pointer text-sm ${!selectedPlaylist ? 'bg-accent' : ''}`}
              onClick={() => setSelectedPlaylist(null)}
            >
              Tüm Şarkılar
            </div>
            <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Sanatçılar</div>
            <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Albümler</div>
            <div className="p-2 hover:bg-accent rounded cursor-pointer text-sm">Türler</div>
          </div>

          <div className="text-xs font-medium text-muted-foreground mb-2">ÇALMA LİSTELERİ</div>
          <div className="space-y-1 max-h-48 overflow-auto">
            {playlists.map((playlist) => (
              <div 
                key={playlist.id} 
                className={`p-2 hover:bg-accent rounded cursor-pointer ${selectedPlaylist === playlist.id ? 'bg-accent' : ''}`}
                onClick={() => setSelectedPlaylist(playlist.id)}
              >
                <div className="text-sm truncate font-medium">{playlist.name}</div>
                <div className="text-xs text-muted-foreground">{playlist.songs.length} şarkı</div>
              </div>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start text-muted-foreground hover:text-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Yeni Çalma Listesi
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Now Playing / Song List */}
          <div className="flex-1 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                {selectedPlaylist 
                  ? playlists.find(p => p.id === selectedPlaylist)?.name || 'Çalma Listesi'
                  : 'Tüm Şarkılar'
                }
              </h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-accent rounded">
                  <Shuffle className="w-4 h-4" />
                </button>
                <Button 
                  onClick={togglePlayPause}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-primary/90"
                >
                  {isPlaying ? 'Duraklat' : 'Çal'}
                </Button>
              </div>
            </div>

            {currentSongs.length === 0 ? (
              <Card className="p-8 text-center">
                <CardContent>
                  <Music className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">Henüz müzik yok</h3>
                  <p className="text-muted-foreground mb-4">
                    Müzik dosyalarınızı <code className="bg-muted px-2 py-1 rounded">public/music/</code> klasörüne ekleyin
                  </p>
                  <Button variant="outline" onClick={handleAddMusic}>
                    <Plus className="w-4 h-4 mr-2" />
                    Müzik Ekle
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-1">
                {currentSongs.map((song, index) => (
                  <div
                    key={song.id}
                    onClick={() => playSong(index)}
                    className={`flex items-center space-x-3 p-2 hover:bg-accent rounded cursor-pointer group ${
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
                      <div className="text-sm font-medium truncate">{song.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{song.artist}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">{song.album}</div>
                    {song.genre && (
                      <Badge variant="secondary" className="text-xs">
                        {song.genre}
                      </Badge>
                    )}
                    <button className="p-1 hover:bg-accent rounded opacity-0 group-hover:opacity-100">
                      <Heart className="w-4 h-4" />
                    </button>
                    <div className="text-xs text-muted-foreground w-12 text-right flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDuration(song.duration)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="border-t border-border p-4 bg-muted/30">
        <div className="flex items-center justify-between">
          {/* Currently playing */}
          <div className="flex items-center space-x-3 flex-1">
            <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center">
              <Music className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">
                {currentSongs[currentSong]?.name || 'Şarkı seçilmedi'}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                {currentSongs[currentSong]?.artist || 'Sanatçı'}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            <button className="p-1 hover:bg-accent rounded">
              <Shuffle className="w-4 h-4" />
            </button>
            <button 
              onClick={playPreviousSong}
              className="p-1 hover:bg-accent rounded"
              disabled={currentSong === 0}
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={togglePlayPause}
              className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button 
              onClick={playNextSong}
              className="p-1 hover:bg-accent rounded"
              disabled={currentSong === currentSongs.length - 1}
            >
              <SkipForward className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-accent rounded">
              <Repeat className="w-4 h-4" />
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center space-x-2 flex-1 justify-end">
            <Volume2 className="w-4 h-4" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => {
                const newVolume = parseFloat(e.target.value);
                setVolume(newVolume);
                if (audioRef.current) {
                  audioRef.current.volume = newVolume;
                }
              }}
              className="w-20"
            />
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center space-x-2 mt-2">
          <div className="text-xs text-muted-foreground">{formatDuration(currentTime)}</div>
          <div 
            className="flex-1 h-1 bg-muted rounded overflow-hidden cursor-pointer"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-primary rounded transition-all duration-100"
              style={{ 
                width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%' 
              }}
            />
          </div>
          <div className="text-xs text-muted-foreground">{formatDuration(duration)}</div>
        </div>
      </div>
    </div>
  );
};

export default MusicApp;