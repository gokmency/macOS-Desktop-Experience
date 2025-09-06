import React from 'react';
import FinderApp from '@/components/apps/FinderApp';
import SafariApp from '@/components/apps/SafariApp';
import MailApp from '@/components/apps/MailApp';
import NotesApp from '@/components/apps/NotesApp';
import PhotosApp from '@/components/apps/PhotosApp';
import MusicApp from '@/components/apps/MusicApp';
import CalendarApp from '@/components/apps/CalendarApp';
import CalculatorApp from '@/components/apps/CalculatorApp';
import TerminalApp from '@/components/apps/TerminalApp';
import WeatherApp from '@/components/apps/WeatherApp';

export interface AppConfig {
  id: string;
  name: string;
  icon: string;
  component: React.ComponentType;
  defaultSize: {
    width: number;
    height: number;
  };
}

export const APP_REGISTRY: Record<string, AppConfig> = {
  finder: {
    id: 'finder',
    name: 'Finder',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/finder-2021-09-10.png?rf=1024',
    component: FinderApp,
    defaultSize: { width: 800, height: 600 },
  },
  safari: {
    id: 'safari',
    name: 'Safari',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/safari-2021-06-02.png?rf=1024',
    component: SafariApp,
    defaultSize: { width: 1000, height: 700 },
  },
  mail: {
    id: 'mail',
    name: 'Mail',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/mail-2021-05-25.png?rf=1024',
    component: MailApp,
    defaultSize: { width: 900, height: 650 },
  },
  notes: {
    id: 'notes',
    name: 'Notes',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/notes-2021-05-25.png?rf=1024',
    component: NotesApp,
    defaultSize: { width: 600, height: 500 },
  },
  photos: {
    id: 'photos',
    name: 'Photos',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/photos-2021-05-28.png?rf=1024',
    component: PhotosApp,
    defaultSize: { width: 1000, height: 700 },
  },
  music: {
    id: 'music',
    name: 'Music',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/music-2021-05-25.png?rf=1024',
    component: MusicApp,
    defaultSize: { width: 900, height: 700 },
  },
  calendar: {
    id: 'calendar',
    name: 'Calendar',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/calendar-2021-04-29.png?rf=1024',
    component: CalendarApp,
    defaultSize: { width: 800, height: 600 },
  },
  calculator: {
    id: 'calculator',
    name: 'Calculator',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/calculator-2021-04-29.png?rf=1024',
    component: CalculatorApp,
    defaultSize: { width: 300, height: 400 },
  },
  terminal: {
    id: 'terminal',
    name: 'Terminal',
    icon: 'https://cdn.jim-nielsen.com/macos/1024/terminal-2021-06-03.png?rf=1024',
    component: TerminalApp,
    defaultSize: { width: 700, height: 500 },
  },
  weather: {
    id: 'weather',
    name: 'Hava Durumu',
    icon: '/havadurumulogo.png',
    component: WeatherApp,
    defaultSize: { width: 800, height: 600 },
  },
};

export const DOCK_APPS = Object.values(APP_REGISTRY);