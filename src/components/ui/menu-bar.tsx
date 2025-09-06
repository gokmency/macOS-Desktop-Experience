import React from 'react';
import { Apple, Wifi, Battery, Clock } from 'lucide-react';

interface MenuBarProps {
  currentApp?: string;
}

const MenuBar: React.FC<MenuBarProps> = ({ currentApp = 'Finder' }) => {
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
    <div className="fixed top-0 left-0 right-0 h-7 macos-glass-menubar macos-menubar-shadow z-50 flex items-center justify-between px-4 text-sm text-foreground/90 font-medium">
      {/* Left side - Apple menu and app menus */}
      <div className="flex items-center space-x-1">
        <div className="macos-hover px-2 py-0.5 rounded-sm cursor-pointer flex items-center">
          <Apple className="w-4 h-4" />
        </div>
        <div className="macos-hover px-2 py-0.5 rounded-sm cursor-pointer">
          <span className="font-semibold text-foreground">{currentApp}</span>
        </div>
        <div className="macos-hover px-2 py-0.5 rounded-sm cursor-pointer">
          <span>File</span>
        </div>
        <div className="macos-hover px-2 py-0.5 rounded-sm cursor-pointer">
          <span>Edit</span>
        </div>
        <div className="macos-hover px-2 py-0.5 rounded-sm cursor-pointer">
          <span>View</span>
        </div>
        <div className="macos-hover px-2 py-0.5 rounded-sm cursor-pointer">
          <span>Window</span>
        </div>
        <div className="macos-hover px-2 py-0.5 rounded-sm cursor-pointer">
          <span>Help</span>
        </div>
      </div>

      {/* Right side - System status */}
      <div className="flex items-center space-x-1">
        <div className="macos-hover px-2 py-0.5 rounded-sm cursor-pointer flex items-center space-x-1.5">
          <Battery className="w-4 h-4 text-green-400" />
          <span className="text-xs font-medium">87%</span>
        </div>
        <div className="macos-hover px-2 py-0.5 rounded-sm cursor-pointer">
          <Wifi className="w-4 h-4" />
        </div>
        <div className="macos-hover px-2 py-0.5 rounded-sm cursor-pointer flex items-center space-x-1.5">
          <Clock className="w-4 h-4" />
          <span className="text-xs font-medium tabular-nums">{currentTime}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;