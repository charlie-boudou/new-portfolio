import { ICell, IFolder } from "./types";

const TASKBAR_HEIGHT = 50;
const SNAP = 15;

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

/* ==> DRAG <== */

export const startDrag = (
  e: React.MouseEvent,
  pos: Position,
  dragStart: React.RefObject<Position>,
  setDragging: (v: boolean) => void,
  setActiveWindow: (name: string) => void,
  windowName: string
) => {
  setActiveWindow(windowName);
  setDragging(true);

  dragStart.current = {
    x: e.clientX - pos.x,
    y: e.clientY - pos.y,
  };
};

export const dragWindow = (
    e: MouseEvent,
    dragging: boolean,
    windowRef: React.RefObject<HTMLDivElement>,
    dragStart: React.RefObject<Position>,
    setPos: (p: Position) => void
) => {
    if (!dragging || !windowRef.current) return;

    const rect = windowRef.current.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight - TASKBAR_HEIGHT;

    let nextX = e.clientX - dragStart.current.x;
    let nextY = e.clientY - dragStart.current.y;

    if (Math.abs(nextX) < SNAP) nextX = 0;
    if (Math.abs(nextX + rect.width - screenWidth) < SNAP) {
        nextX = screenWidth - rect.width;
    }

    if (Math.abs(nextY) < SNAP) nextY = 0;

    const maxY = screenHeight - rect.height;
    if (nextY > maxY) nextY = maxY;

    nextX = Math.max(0, Math.min(nextX, screenWidth - rect.width));
    nextY = Math.max(0, Math.min(nextY, maxY));

    setPos({ x: nextX, y: nextY });
};

export const stopDrag = (setDragging: (v: boolean) => void) => {
  setDragging(false);
};

/* ==> WINDOW ACTIONS <== */

export const hideWindow = (
  name: string,
  activeWindow: string,
  setActiveWindow: (v: string) => void,
  setHidden: React.Dispatch<React.SetStateAction<string[]>>
) => {
  if (activeWindow === name) setActiveWindow("");
  setHidden(prev => [...prev, name]);
};

export const closeWindow = (
  name: string,
  activeWindow: string,
  openFolders: IFolder[],
  setOpenFolders: (v: IFolder[]) => void,
  setActiveWindow: (v: string) => void,
) => {
  setOpenFolders(openFolders.filter(folder => folder.name !== name));
  if (activeWindow === name) setActiveWindow("");
};

export const toggleMaximizeWindow = (
  windowRef: React.RefObject<HTMLDivElement> | null,
  pos: Position,
  setPos: (p: Position) => void,
  prevPos: Position | null,
  setPrevPos: (p: Position | null) => void,
  prevSize: { width: number; height: number } | null,
  setPrevSize: (s: { width: number; height: number } | null) => void
) => {
  if (!windowRef?.current) return;

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight - TASKBAR_HEIGHT;

  const rect = windowRef.current.getBoundingClientRect();

  if (!prevPos || !prevSize) {
    setPrevPos(pos);
    setPrevSize({ width: rect.width, height: rect.height });

    setPos({ x: 0, y: 0 });
    windowRef.current.style.width = `${screenWidth}px`;
    windowRef.current.style.height = `${screenHeight}px`;
  } else {
    setPos(prevPos);
    windowRef.current.style.width = `${prevSize.width}px`;
    windowRef.current.style.height = `${prevSize.height}px`;

    setPrevPos(null);
    setPrevSize(null);
  }
};

export const startResize = (
    e: React.MouseEvent,
    resizeStart: React.RefObject<{ x: number; y: number }>,
    startSize: React.RefObject<Size>,
    windowRef: React.RefObject<HTMLDivElement>,
    setResizing: (v: boolean) => void
) => {
    e.stopPropagation();
    setResizing(true);

    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
    };

    if (windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      startSize.current = {
        width: rect.width,
        height: rect.height,
      };
    }
};

export const resizeWindow = (
    e: MouseEvent,
    resizing: boolean,
    resizeStart: React.RefObject<{ x: number; y: number }>,
    startSize: React.RefObject<Size>,
    windowRef: React.RefObject<HTMLDivElement>,
    minWidth = 400,
    minHeight = 300
) => {
    if (!resizing || !windowRef.current) return;

    const dx = e.clientX - resizeStart.current.x;
    const dy = e.clientY - resizeStart.current.y;

    const screenHeight = window.innerHeight;

    const maxHeight = screenHeight - TASKBAR_HEIGHT;
    const newWidth = Math.max(minWidth, startSize.current.width + dx);
    const newHeight = Math.min(Math.max(minHeight, startSize.current.height + dy), maxHeight);

    windowRef.current.style.width = `${newWidth}px`;
    windowRef.current.style.height = `${newHeight}px`;
};

export const stopResize = (
  setResizing: (v: boolean) => void
) => {
  setResizing(false);
};

/* ==> MINESWEEPER <== */

export const createNewGrid = (rows: number, cols: number, minesCount: number): ICell[][] => {
    const newGrid: ICell[][] = Array(rows).fill(null).map(() =>
        Array(cols).fill(null).map(() => ({
        isMine: false, isRevealed: false, isFlagged: false, neighborCount: 0
        }))
    );

    const allPositions: [number, number][] = [];

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) allPositions.push([r, c]);
    }

    for (let i = allPositions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allPositions[i], allPositions[j]] = [allPositions[j], allPositions[i]];
    }

    allPositions.slice(0, minesCount).forEach(([r, c]) => {
        newGrid[r][c].isMine = true;
    });

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
        if (!newGrid[r][c].isMine) {
            let count = 0;
            for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (newGrid[r + i]?.[c + j]?.isMine) count++;
            }
            }
            newGrid[r][c].neighborCount = count;
        }
        }
    }
    
    return newGrid;
};
