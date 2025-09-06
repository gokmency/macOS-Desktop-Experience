import React, { useEffect, useRef, useState } from 'react';
import { useDesktopStore } from '@/store/desktop-store';
import { X, Minus, Square } from 'lucide-react';

interface WindowProps {
  windowId: string;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ windowId, children }) => {
  const windowState = useDesktopStore((state) => state.windows[windowId]);
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    moveWindow,
    resizeWindow,
  } = useDesktopStore();

  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0, direction: '' });

  if (!windowState || !windowState.isOpen || windowState.isMinimized) {
    return null;
  }

  const { x, y, width, height, zIndex, isMaximized, title } = windowState;

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        switch (e.key) {
          case 'w':
            e.preventDefault();
            closeWindow(windowId);
            break;
          case 'm':
            e.preventDefault();
            minimizeWindow(windowId);
            break;
          case 'ArrowUp':
            e.preventDefault();
            maximizeWindow(windowId);
            break;
        }
      } else if (e.key === 'Escape') {
        // Unfocus by focusing another window or none
        const allWindows = useDesktopStore.getState().getVisibleWindows();
        const otherWindows = allWindows.filter(w => w.id !== windowId);
        if (otherWindows.length > 0) {
          focusWindow(otherWindows[otherWindows.length - 1].id);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [windowId, closeWindow, minimizeWindow, maximizeWindow, focusWindow]);

  // Window dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    
    focusWindow(windowId);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - x,
      y: e.clientY - y,
    });
  };

  // Window resizing
  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    if (isMaximized) return;
    
    e.stopPropagation();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width,
      height,
      direction,
    });
  };

  // Mouse move handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = Math.max(0, e.clientX - dragOffset.x);
        const newY = Math.max(0, e.clientY - dragOffset.y);
        moveWindow(windowId, newX, newY);
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x;
        const deltaY = e.clientY - resizeStart.y;
        
        let newWidth = resizeStart.width;
        let newHeight = resizeStart.height;
        let newX = x;
        let newY = y;
        
        // Resize direction logic
        if (resizeStart.direction === 'right' || resizeStart.direction === 'top-right' || resizeStart.direction === 'bottom-right') {
          newWidth = Math.max(300, resizeStart.width + deltaX);
        }
        if (resizeStart.direction === 'left' || resizeStart.direction === 'top-left' || resizeStart.direction === 'bottom-left') {
          newWidth = Math.max(300, resizeStart.width - deltaX);
          newX = x + (resizeStart.width - newWidth);
        }
        if (resizeStart.direction === 'bottom' || resizeStart.direction === 'bottom-left' || resizeStart.direction === 'bottom-right') {
          newHeight = Math.max(200, resizeStart.height + deltaY);
        }
        if (resizeStart.direction === 'top' || resizeStart.direction === 'top-left' || resizeStart.direction === 'top-right') {
          newHeight = Math.max(200, resizeStart.height - deltaY);
          newY = y + (resizeStart.height - newHeight);
        }
        
        resizeWindow(windowId, newWidth, newHeight);
        if (newX !== x || newY !== y) {
          moveWindow(windowId, newX, newY);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, resizeStart, windowId, moveWindow, resizeWindow]);

  const windowStyle = isMaximized
    ? {
        left: 0,
        top: 28, // Account for menu bar
        width: '100vw',
        height: 'calc(100vh - 28px - 80px)', // Account for menu bar and dock
        zIndex,
      }
    : {
        left: x,
        top: y,
        width,
        height,
        zIndex,
      };

  return (
    <div
      ref={windowRef}
      className="absolute macos-window-shadow animate-window-appear"
      style={{
        ...windowStyle,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
      }}
      onClick={() => focusWindow(windowId)}
    >
      {/* Title Bar */}
      <div
        className="flex items-center justify-between h-7 px-3 cursor-move select-none rounded-t-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Traffic Lights */}
        <div className="flex items-center space-x-2">
          <button
            className="traffic-light traffic-light-red hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(windowId);
            }}
            title="Close (⌘W)"
          />
          <button
            className="traffic-light traffic-light-yellow hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(windowId);
            }}
            title="Minimize (⌘M)"
          />
          <button
            className="traffic-light traffic-light-green hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              maximizeWindow(windowId);
            }}
            title="Maximize (⌘↑)"
          />
        </div>

        {/* Window Title */}
        <div className="text-sm text-foreground font-medium pointer-events-none">
          {title}
        </div>

        <div className="w-[54px]" /> {/* Spacer for centering */}
      </div>

      {/* Window Content */}
      <div 
        className="flex-1 overflow-auto rounded-b-xl"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(5px)',
          maxHeight: 'calc(100vh - 120px)' // Ekran yüksekliğinden title bar ve margin çıkar
        }}
      >
        {children}
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
          {/* Top resize handle */}
          <div
            className="absolute top-0 left-0 w-full h-1 cursor-n-resize"
            onMouseDown={(e) => handleResizeStart(e, 'top')}
          />
          {/* Right resize handle */}
          <div
            className="absolute top-0 right-0 w-1 h-full cursor-e-resize"
            onMouseDown={(e) => handleResizeStart(e, 'right')}
          />
          {/* Bottom resize handle */}
          <div
            className="absolute bottom-0 left-0 w-full h-1 cursor-s-resize"
            onMouseDown={(e) => handleResizeStart(e, 'bottom')}
          />
          {/* Left resize handle */}
          <div
            className="absolute top-0 left-0 w-1 h-full cursor-w-resize"
            onMouseDown={(e) => handleResizeStart(e, 'left')}
          />
          
          {/* Corner resize handles */}
          {/* Top-left corner */}
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'top-left')}
          />
          {/* Top-right corner */}
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize"
            onMouseDown={(e) => handleResizeStart(e, 'top-right')}
          />
          {/* Bottom-left corner */}
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize"
            onMouseDown={(e) => handleResizeStart(e, 'bottom-left')}
          />
          {/* Bottom-right corner */}
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
            onMouseDown={(e) => handleResizeStart(e, 'bottom-right')}
          />
        </>
      )}
    </div>
  );
};

export default Window;