'use client';

import { useRef, useState, useCallback, useEffect, useContext } from "react";
import Image from "next/image";
import cross from "@/assets/cross.svg";
import { DisplayContext } from "../../../../contexts/DisplayContext";
import { IFolder } from "@/utils/types";
import { startDrag, dragWindow, stopDrag, hideWindow, closeWindow, Position, toggleMaximizeWindow, resizeWindow, stopResize, startResize } from "@/utils/functions";
import PastWindowButton from './PastWindowButton';

interface IPastWindowLayoutProps {
  folder: IFolder;
  children: React.ReactNode;
  minimize?: boolean;
  initialPos?: Position;
  resize?: boolean;
  windowSize: string;
  draggable: boolean;
}

export default function PastWindowLayout({ children, folder, minimize, initialPos, resize, windowSize, draggable }: IPastWindowLayoutProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<Position>({ x: 0, y: 0 });
  const { openFolders, updateOpenFolders, hiddenFolders, updateHiddenFolders, pastWindowActive, updatePastWindowActive } = useContext(DisplayContext);

  const [pos, setPos] = useState<Position>(initialPos ?? { x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);

  const [prevPos, setPrevPos] = useState<Position | null>(null);
  const [prevSize, setPrevSize] = useState<{ width: number; height: number } | null>(null);

  const resizeStart = useRef({ x: 0, y: 0 });
  const startSize = useRef({ width: 0, height: 0 });
  const [resizing, setResizing] = useState(false);

  const isMaximized = prevPos !== null;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (windowRef.current) {
        dragWindow(e, dragging, windowRef as React.RefObject<HTMLDivElement>, dragStart, setPos);
      }
    },
    [dragging]
  );

  const handleMouseUp = useCallback(() => stopDrag(setDragging), []);

  const handleHidden = () => hideWindow(folder.name, pastWindowActive, updatePastWindowActive, updateHiddenFolders);
  const handleClose = () => closeWindow(folder.name, pastWindowActive, openFolders as IFolder[], updateOpenFolders, updatePastWindowActive);
  const handleMaximize = () => toggleMaximizeWindow(windowRef as React.RefObject<HTMLDivElement>, pos, setPos, prevPos, setPrevPos, prevSize, setPrevSize);  
  
  const handleResizeMove = useCallback((e: MouseEvent) => { 
    resizeWindow(e, resizing, resizeStart, startSize, windowRef as React.RefObject<HTMLDivElement>);
  },[resizing]);
  const handleResizeUp = useCallback(() => { 
    stopResize(setResizing);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  useEffect(() => {
    window.addEventListener("mousemove", handleResizeMove);
    window.addEventListener("mouseup", handleResizeUp);

    return () => {
      window.removeEventListener("mousemove", handleResizeMove);
      window.removeEventListener("mouseup", handleResizeUp);
    };
  }, [handleResizeMove, handleResizeUp]);

  return (
    <div
      ref={windowRef}
      style={{ 
        left: pos.x, 
        top: pos.y,
        ...(isMaximized && { width: '100vw', height: `calc(100vh - 50px)`, maxWidth: 'none' })
      }}
      className={`
        absolute
        flex flex-col
        border-2 border-gray-300 border-b-[#424242] border-r-[#424242]
        shadow-[1px_1px_0_0_black,-1px_-1px_0_0_white]
        p-[.1rem]
        bg-[#BCBEBC]
        ${pastWindowActive === folder.name ? "z-100" : "z-50"}
        ${hiddenFolders.includes(folder.name) ? "hidden" : ""}
        ${!isMaximized ? windowSize : ""}
      `}
    >

      <div 
        className="bg-[#030171] p-[.3rem] text-white flex justify-between items-center shrink-0"
        onMouseDown={(e) => {
          if (draggable) {
            startDrag(e, pos, dragStart, setDragging, updatePastWindowActive, folder.name)}
          }
        }
      >
        <p>{folder.name}</p>
        <div className="flex items-center space-x-[.5rem]">
          {minimize && (
            <PastWindowButton icon={<div className="w-[.6rem] border-1 bg-black"/>} handleClick={handleHidden} />
          )}
          {resize && (
            <PastWindowButton icon={<div className=" border-black border-t-3 border-1 w-[.8rem] h-[.8rem] m-auto"/>} handleClick={handleMaximize} />
          )}
          <PastWindowButton icon={<Image src={cross} alt="close" className="w-[.8rem] h-[.8rem]" />} handleClick={handleClose} />
        </div>
      </div>
      <div className="flex-1 min-h-0 w-full p-[.3rem] flex flex-col">
        {children}
      </div>
      {resize && (
        <div 
          className="absolute bottom-0 right-0 w-[1rem] h-[1rem] cursor-se-resize bg-transparent"
          onMouseDown={(e) => startResize( e, resizeStart, startSize, windowRef as React.RefObject<HTMLDivElement>, setResizing )}
        />
      )}
    </div>
  );
}
