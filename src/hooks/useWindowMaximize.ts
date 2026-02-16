import { useState, useCallback } from 'react';
import { Position } from './useWindowDrag';
import { LAYOUT } from '@/constants/styles';

interface Size {
  width: number;
  height: number;
}

interface UseWindowMaximizeProps {
  windowRef: React.RefObject<HTMLDivElement | null>;
  pos: Position;
  setPos: (p: Position) => void;
}

/* ==> Custom hook for window maximize/restore functionality <== */

export function useWindowMaximize({ windowRef, pos, setPos }: UseWindowMaximizeProps) {
  const [prevPos, setPrevPos] = useState<Position | null>(null);
  const [prevSize, setPrevSize] = useState<Size | null>(null);

  const isMaximized = prevPos !== null;

  const toggleMaximize = useCallback(() => {
    if (windowRef && !windowRef.current) return;

    if (!isMaximized) {
      const rect = windowRef && windowRef.current && windowRef.current.getBoundingClientRect();
      setPrevPos({ ...pos });
      setPrevSize({ width: rect?.width || 0, height: rect?.height || 0 });
      setPos({ x: 0, y: 0 });
    } else {
      if (prevPos) {
        setPos(prevPos);
      }
      setPrevPos(null);
      setPrevSize(null);
    }
  }, [windowRef, pos, setPos, isMaximized, prevPos]);

  return { isMaximized, toggleMaximize, prevSize };
}
