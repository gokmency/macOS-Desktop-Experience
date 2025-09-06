import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WindowState {
  id: string;
  appId: string;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  isOpen: boolean;
}

interface DesktopStore {
  windows: Record<string, WindowState>;
  highestZIndex: number;
  
  // Window management
  openWindow: (appId: string, config?: Partial<WindowState>) => string;
  closeWindow: (windowId: string) => void;
  closeAllWindows: () => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  restoreWindow: (windowId: string) => void;
  focusWindow: (windowId: string) => void;
  moveWindow: (windowId: string, x: number, y: number) => void;
  resizeWindow: (windowId: string, width: number, height: number) => void;
  
  // Helpers
  getOpenWindowsForApp: (appId: string) => WindowState[];
  isAppOpen: (appId: string) => boolean;
  getVisibleWindows: () => WindowState[];
}

const DEFAULT_WINDOW_CONFIG = {
  width: 800,
  height: 600,
  x: 100,
  y: 100,
  isMinimized: false,
  isMaximized: false,
  isOpen: true,
};

export const useDesktopStore = create<DesktopStore>()(
  persist(
    (set, get) => ({
      windows: {},
      highestZIndex: 1,

      openWindow: (appId, config = {}) => {
        const windowId = `${appId}-${Date.now()}`;
        const state = get();
        
        // If app is already open and minimized, restore it instead
        const existingWindow = Object.values(state.windows).find(
          w => w.appId === appId && w.isOpen && w.isMinimized
        );
        
        if (existingWindow) {
          get().restoreWindow(existingWindow.id);
          get().focusWindow(existingWindow.id);
          return existingWindow.id;
        }
        
        // If app is already open, focus it
        const openWindow = Object.values(state.windows).find(
          w => w.appId === appId && w.isOpen && !w.isMinimized
        );
        
        if (openWindow) {
          get().focusWindow(openWindow.id);
          return openWindow.id;
        }

        const newWindow: WindowState = {
          id: windowId,
          appId,
          title: config.title || appId,
          ...DEFAULT_WINDOW_CONFIG,
          ...config,
          zIndex: state.highestZIndex + 1,
          x: config.x ?? (100 + (Object.keys(state.windows).length * 30)),
          y: config.y ?? (150 + (Object.keys(state.windows).length * 30)),
        };

        set({
          windows: { ...state.windows, [windowId]: newWindow },
          highestZIndex: state.highestZIndex + 1,
        });

        return windowId;
      },

      closeWindow: (windowId) => {
        const state = get();
        const window = state.windows[windowId];
        console.log('Closing window:', windowId, window);
        const { [windowId]: removed, ...remainingWindows } = state.windows;
        set({ windows: remainingWindows });
      },

      closeAllWindows: () => {
        console.log('Closing all windows');
        set({ windows: {} });
      },

      minimizeWindow: (windowId) => {
        const state = get();
        const window = state.windows[windowId];
        if (!window) return;

        set({
          windows: {
            ...state.windows,
            [windowId]: { ...window, isMinimized: true },
          },
        });
      },

      maximizeWindow: (windowId) => {
        const state = get();
        const window = state.windows[windowId];
        if (!window) return;

        set({
          windows: {
            ...state.windows,
            [windowId]: { 
              ...window, 
              isMaximized: !window.isMaximized,
              isMinimized: false,
            },
          },
        });
      },

      restoreWindow: (windowId) => {
        const state = get();
        const window = state.windows[windowId];
        if (!window) return;

        set({
          windows: {
            ...state.windows,
            [windowId]: { 
              ...window, 
              isMinimized: false, 
              isMaximized: false 
            },
          },
        });
      },

      focusWindow: (windowId) => {
        const state = get();
        const window = state.windows[windowId];
        if (!window) return;

        set({
          windows: {
            ...state.windows,
            [windowId]: { ...window, zIndex: state.highestZIndex + 1 },
          },
          highestZIndex: state.highestZIndex + 1,
        });
      },

      moveWindow: (windowId, x, y) => {
        const state = get();
        const window = state.windows[windowId];
        if (!window) return;

        set({
          windows: {
            ...state.windows,
            [windowId]: { ...window, x, y },
          },
        });
      },

      resizeWindow: (windowId, width, height) => {
        const state = get();
        const window = state.windows[windowId];
        if (!window) return;

        set({
          windows: {
            ...state.windows,
            [windowId]: { ...window, width, height },
          },
        });
      },

      getOpenWindowsForApp: (appId) => {
        const state = get();
        return Object.values(state.windows).filter(
          w => w.appId === appId && w.isOpen
        );
      },

      isAppOpen: (appId) => {
        const state = get();
        return Object.values(state.windows).some(
          w => w.appId === appId && w.isOpen && !w.isMinimized
        );
      },

      getVisibleWindows: () => {
        const state = get();
        return Object.values(state.windows)
          .filter(w => w.isOpen && !w.isMinimized)
          .sort((a, b) => a.zIndex - b.zIndex);
      },
    }),
    {
      name: 'macos-desktop-storage',
      partialize: (state) => ({ windows: state.windows }),
    }
  )
);