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
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

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
        
        const newWidth = Math.max(300, resizeStart.width + deltaX);
        const newHeight = Math.max(200, resizeStart.height + deltaY);
        
        resizeWindow(windowId, newWidth, newHeight);
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
      className="absolute macos-glass-window macos-window-shadow animate-window-appear macos-window-transition rounded-xl overflow-hidden"
      style={windowStyle}
      onClick={() => focusWindow(windowId)}
    >
      {/* Enhanced Title Bar */}
      <div
        className="flex items-center justify-between h-8 bg-gradient-to-r from-macos-titlebar/95 to-macos-titlebar/90 px-4 cursor-move select-none backdrop-blur-sm border-b border-white/5"
        onMouseDown={handleMouseDown}
      >
        {/* Enhanced Traffic Lights */}
        <div className="flex items-center space-x-2">
          <button
            className="traffic-light traffic-light-red macos-focus"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(windowId);
            }}
            title="Close (⌘W)"
            aria-label="Close window"
          />
          <button
            className="traffic-light traffic-light-yellow macos-focus"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(windowId);
            }}
            title="Minimize (⌘M)"
            aria-label="Minimize window"
          />
          <button
            className="traffic-light traffic-light-green macos-focus"
            onClick={(e) => {
              e.stopPropagation();
              maximizeWindow(windowId);
            }}
            title="Maximize (⌘↑)"
            aria-label="Maximize window"
          />
        </div>

        {/* Enhanced Window Title */}
        <div className="text-sm text-foreground/90 font-medium pointer-events-none tracking-tight">
          {title}
        </div>

        <div className="w-[66px]" /> {/* Spacer for centering */}
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-hidden bg-card">
        {children}
      </div>

      {/* Resize Handles */}
      {!isMaximized && (
        <>
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
          {/* Corner resize handle */}
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
            onMouseDown={(e) => handleResizeStart(e, 'corner')}
          />
        </>
      )}
    </div>
  );
};

export default Window;