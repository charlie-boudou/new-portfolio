import { useState, useCallback, useRef, useEffect } from 'react';
import { LAYOUT } from '@/constants/styles';

interface Size {
  width: number;
  height: number;
}

interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

interface UseWindowResizeProps {
  windowRef: React.RefObject<HTMLDivElement | null>;
  minWidth?: number;
  minHeight?: number;
  isFuture?: boolean;
  bounds?: Bounds;
}

export function useWindowResize({
  windowRef,
  minWidth = LAYOUT.defaultWindowSize.minWidth,
  minHeight = LAYOUT.defaultWindowSize.minHeight,
  isFuture = false,
  bounds,
}: UseWindowResizeProps) {
  const [isResizing, setIsResizing] = useState(false);
  const resizeStart = useRef({ x: 0, y: 0 });
  const startSize = useRef<Size>({ width: 0, height: 0 });

  const startResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!windowRef.current) return;

    setIsResizing(true);
    resizeStart.current = { x: e.clientX, y: e.clientY };
    const rect = windowRef.current.getBoundingClientRect();
    startSize.current = { width: rect.width, height: rect.height };
  }, [windowRef]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !windowRef.current) return;

    requestAnimationFrame(() => {
      if (!isResizing || !windowRef.current) return;

      const dx = e.clientX - resizeStart.current.x;
      const dy = e.clientY - resizeStart.current.y;

      let newWidth = Math.max(minWidth, startSize.current.width + dx);
      let newHeight = Math.max(minHeight, startSize.current.height + dy);

      if (isFuture && bounds) {
        const rect = windowRef.current.getBoundingClientRect();

        const maxWidthAvailable = bounds.maxX - rect.left;
        const maxHeightAvailable = bounds.maxY - rect.top;

        newWidth = Math.min(newWidth, maxWidthAvailable);
        newHeight = Math.min(newHeight, maxHeightAvailable);
      }

      windowRef.current.style.width = `${newWidth}px`;
      windowRef.current.style.height = `${newHeight}px`;
    });
  }, [isResizing, windowRef, minWidth, minHeight, isFuture, bounds]);

  const handleMouseUp = useCallback(() => setIsResizing(false), []);

  useEffect(() => {
    if (!isResizing) return;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return { isResizing, startResize };
}