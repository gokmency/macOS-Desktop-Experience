import React, { useEffect } from 'react';
import { useDesktopStore } from '@/store/desktop-store';
import { APP_REGISTRY, DOCK_APPS } from '@/lib/app-registry';
import MacOSDock from './mac-os-dock';
import MenuBar from './menu-bar';
import Window from './window';

const Desktop: React.FC = () => {
  const {
    windows,
    openWindow,
    isAppOpen,
    getVisibleWindows,
  } = useDesktopStore();

  const handleAppClick = (appId: string) => {
    const appConfig = APP_REGISTRY[appId];
    if (!appConfig) return;

    // Animate dock icon bounce
    const iconElement = document.querySelector(`[title="${appConfig.name}"]`);
    if (iconElement) {
      iconElement.classList.add('animate-dock-bounce');
      setTimeout(() => {
        iconElement.classList.remove('animate-dock-bounce');
      }, 600);
    }

    openWindow(appId, {
      title: appConfig.name,
      width: appConfig.defaultSize.width,
      height: appConfig.defaultSize.height,
    });
  };

  const openApps = DOCK_APPS
    .map(app => app.id)
    .filter(appId => isAppOpen(appId));

  const visibleWindows = getVisibleWindows();

  // Add keyboard shortcut handlers
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Focus dock with Tab
      if (e.key === 'Tab' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const dockElement = document.querySelector('[data-dock]');
        if (dockElement) {
          e.preventDefault();
          (dockElement as HTMLElement).focus();
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      {/* Wallpaper Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/wallpapers/macos-mountains.jpg)',
        }}
      />
      
      {/* Menu Bar */}
      <MenuBar currentApp="Finder" />

      {/* Desktop Content Area */}
      <div className="relative h-full pt-7 pb-20">
        {/* Windows */}
        {visibleWindows.map((windowState) => {
          const AppComponent = APP_REGISTRY[windowState.appId]?.component;
          if (!AppComponent) return null;

          return (
            <Window key={windowState.id} windowId={windowState.id}>
              <AppComponent />
            </Window>
          );
        })}

        {/* Desktop Icons (optional - could be added later) */}
        <div className="absolute top-4 left-4 space-y-4">
          {/* Could add desktop shortcuts here */}
        </div>
      </div>

      {/* Dock */}
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2 z-40">
        <MacOSDock
          apps={DOCK_APPS}
          onAppClick={handleAppClick}
          openApps={openApps}
        />
      </div>

      {/* Hidden preload for better UX */}
      <div className="sr-only">
        {DOCK_APPS.map(app => (
          <img key={app.id} src={app.icon} alt={app.name} />
        ))}
      </div>
    </div>
  );
};

export default Desktop;