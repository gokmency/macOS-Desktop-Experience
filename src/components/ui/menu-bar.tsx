import React from 'react';
import { Apple, Wifi, Battery, Clock } from 'lucide-react';

interface MenuBarProps {
  currentApp?: string;
  onCloseAllApps?: () => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ currentApp = 'Finder', onCloseAllApps }) => {
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  const [currentTime, setCurrentTime] = React.useState(getCurrentTime());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 h-7 macos-menubar-shadow z-50 flex items-center justify-between px-4 text-sm text-foreground"
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
      }}
    >
      {/* Left side - Apple menu and app menus */}
      <div className="flex items-center space-x-4">
        <Apple className="w-4 h-4" />
        <span className="font-medium">{currentApp}</span>
        <span className="hover:bg-primary/20 px-2 py-1 rounded cursor-pointer">File</span>
        <span className="hover:bg-primary/20 px-2 py-1 rounded cursor-pointer">Edit</span>
        <span className="hover:bg-primary/20 px-2 py-1 rounded cursor-pointer">View</span>
        <span className="hover:bg-primary/20 px-2 py-1 rounded cursor-pointer">Window</span>
        <span className="hover:bg-primary/20 px-2 py-1 rounded cursor-pointer">Help</span>
        {onCloseAllApps && (
          <span 
            className="hover:bg-red-500/20 px-2 py-1 rounded cursor-pointer text-red-400"
            onClick={onCloseAllApps}
            title="Tüm Uygulamaları Kapat"
          >
            Kapat Tümü
          </span>
        )}
      </div>

      {/* Right side - System status */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1">
          <Battery className="w-4 h-4" />
          <span>87%</span>
        </div>
        <Wifi className="w-4 h-4" />
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{currentTime}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;