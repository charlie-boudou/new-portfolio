import { useState, useCallback, useRef, useEffect } from 'react';

export interface Position {
  x: number;
  y: number;
}

interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

interface UseWindowDragProps {
  initialPos?: Position;
  enabled?: boolean;
  onDragStart?: () => void;
  isFuture?: boolean;
  bounds?: Bounds;
}

export function useWindowDrag({
  initialPos = { x: 100, y: 100 },
  enabled = true,
  onDragStart,
  isFuture = false,
  bounds,
}: UseWindowDragProps = {}) {
  const [pos, setPos] = useState<Position>(initialPos);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<Position>({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const startDrag = useCallback(
    (e: React.MouseEvent) => {
      if (!enabled) return;
      
      onDragStart?.();
      setIsDragging(true);
      dragStart.current = {
        x: e.clientX - pos.x,
        y: e.clientY - pos.y,
      };
    },
    [enabled, pos, onDragStart]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !windowRef.current) return;

      requestAnimationFrame(() => {
        if (!windowRef.current) return;
        
        const rect = windowRef.current.getBoundingClientRect();
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        let nextX = e.clientX - dragStart.current.x;
        let nextY = e.clientY - dragStart.current.y;

        if (isFuture && bounds) {
            nextX = Math.max(bounds.minX, Math.min(nextX, bounds.maxX - rect.width));
            nextY = Math.max(bounds.minY, Math.min(nextY, bounds.maxY - rect.height));
        } else if (isFuture) {
          const padding = 48; 
          nextX = Math.max(padding, Math.min(nextX, screenWidth - rect.width - padding));
          nextY = Math.max(padding, Math.min(nextY, screenHeight - rect.height - padding));
        } else {
          const maxY = (window.innerHeight - 50) - rect.height;
          nextX = Math.max(0, Math.min(nextX, screenWidth - rect.width));
          nextY = Math.max(0, Math.min(nextY, maxY));
        }

        setPos({ x: nextX, y: nextY });
      });
    },
    [isDragging, isFuture, bounds]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    pos,
    setPos,
    isDragging,
    startDrag,
    windowRef,
  };
}
