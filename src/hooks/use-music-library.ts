import { useState, useEffect } from 'react';

export interface MusicFile {
  id: string;
  name: string;
  artist: string;
  album: string;
  duration: number;
  url: string;
  cover?: string;
  genre?: string;
  year?: number;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  songs: MusicFile[];
  cover?: string;
}

export const useMusicLibrary = () => {
  const [musicFiles, setMusicFiles] = useState<MusicFile[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Örnek müzik dosyaları (gerçek dosyalar eklendiğinde bu kaldırılacak)
  const sampleMusicFiles: MusicFile[] = [
    {
      id: '1',
      name: 'Sample Song 1',
      artist: 'Sample Artist',
      album: 'Sample Album',
      duration: 180, // 3 dakika
      url: '/music/sample1.mp3',
      cover: '/music/covers/sample1.jpg',
      genre: 'Pop',
      year: 2024
    },
    {
      id: '2',
      name: 'Sample Song 2',
      artist: 'Another Artist',
      album: 'Another Album',
      duration: 240, // 4 dakika
      url: '/music/sample2.mp3',
      cover: '/music/covers/sample2.jpg',
      genre: 'Rock',
      year: 2023
    }
  ];

  // Örnek playlist'ler
  const samplePlaylists: Playlist[] = [
    {
      id: '1',
      name: 'Favorilerim',
      description: 'En sevdiğim şarkılar',
      songs: sampleMusicFiles,
      cover: '/music/playlist-covers/favorites.jpg'
    },
    {
      id: '2',
      name: 'Antrenman Müziği',
      description: 'Egzersiz için müzik',
      songs: sampleMusicFiles.slice(0, 1),
      cover: '/music/playlist-covers/workout.jpg'
    }
  ];

  useEffect(() => {
    // Müzik dosyalarını yükle
    const loadMusicFiles = async () => {
      try {
        // Gerçek müzik dosyalarını tarayalım
        const musicFiles = await scanMusicFiles();
        if (musicFiles.length > 0) {
          setMusicFiles(musicFiles);
          // Varsayılan playlist oluştur
          const defaultPlaylist: Playlist = {
            id: 'all-songs',
            name: 'Tüm Şarkılar',
            description: 'Kütüphanenizdeki tüm şarkılar',
            songs: musicFiles
          };
          setPlaylists([defaultPlaylist]);
        } else {
          // Müzik dosyası yoksa örnek verileri göster
          setMusicFiles(sampleMusicFiles);
          setPlaylists(samplePlaylists);
        }
      } catch (error) {
        console.error('Müzik dosyaları yüklenirken hata:', error);
        // Hata durumunda örnek verileri göster
        setMusicFiles(sampleMusicFiles);
        setPlaylists(samplePlaylists);
      } finally {
        setIsLoading(false);
      }
    };

    loadMusicFiles();
  }, []);

  // Müzik dosyalarını tarayan fonksiyon
  const scanMusicFiles = async (): Promise<MusicFile[]> => {
    const musicFiles: MusicFile[] = [];
    
    try {
      // Gerçek müzik dosyalarınızı kullanacağız
      const realMusicFiles = [
        {
          id: 'love-songs-robots',
          name: 'Love Songs For Robots',
          artist: 'Patrick Watson',
          album: 'Love Songs For Robots',
          duration: 240, // 4 dakika tahmin
          url: '/music/Love Songs For Robots - Patrick Watson .mp3',
          genre: 'Indie',
          year: 2024
        },
        {
          id: 'hope',
          name: 'HOPE',
          artist: 'NF',
          album: 'HOPE',
          duration: 240, // 4 dakika tahmin
          url: '/music/NF - HOPE.mp3',
          genre: 'Hip-Hop',
          year: 2023
        },
        {
          id: 'gurbet',
          name: 'Gurbet',
          artist: 'Özdemir Erdoğan',
          album: 'Gurbet',
          duration: 300, // 5 dakika tahmin
          url: '/music/Özdemir Erdoğan - Gurbet.mp3',
          genre: 'Türkçe',
          year: 2024
        },
        {
          id: 'palace',
          name: 'Palace',
          artist: 'Sam Smith',
          album: 'Palace',
          duration: 200, // 3:20 dakika tahmin
          url: '/music/Sam Smith - Palace .mp3',
          genre: 'Pop',
          year: 2024
        }
      ];

      // Gerçek müzik dosyalarını döndür
      return realMusicFiles;
      
    } catch (error) {
      console.error('Dosya tarama hatası:', error);
      return [];
    }
  };

  const addMusicFile = (file: MusicFile) => {
    setMusicFiles(prev => [...prev, file]);
  };

  const removeMusicFile = (id: string) => {
    setMusicFiles(prev => prev.filter(file => file.id !== id));
  };

  const createPlaylist = (playlist: Omit<Playlist, 'id'>) => {
    const newPlaylist: Playlist = {
      ...playlist,
      id: Date.now().toString()
    };
    setPlaylists(prev => [...prev, newPlaylist]);
    return newPlaylist;
  };

  const updatePlaylist = (id: string, updates: Partial<Playlist>) => {
    setPlaylists(prev => 
      prev.map(playlist => 
        playlist.id === id ? { ...playlist, ...updates } : playlist
      )
    );
  };

  const deletePlaylist = (id: string) => {
    setPlaylists(prev => prev.filter(playlist => playlist.id !== id));
  };

  const addSongToPlaylist = (playlistId: string, songId: string) => {
    const song = musicFiles.find(file => file.id === songId);
    if (!song) return;

    setPlaylists(prev => 
      prev.map(playlist => 
        playlist.id === playlistId 
          ? { ...playlist, songs: [...playlist.songs, song] }
          : playlist
      )
    );
  };

  const removeSongFromPlaylist = (playlistId: string, songId: string) => {
    setPlaylists(prev => 
      prev.map(playlist => 
        playlist.id === playlistId 
          ? { ...playlist, songs: playlist.songs.filter(song => song.id !== songId) }
          : playlist
      )
    );
  };

  return {
    musicFiles,
    playlists,
    isLoading,
    addMusicFile,
    removeMusicFile,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    addSongToPlaylist,
    removeSongFromPlaylist
  };
};
