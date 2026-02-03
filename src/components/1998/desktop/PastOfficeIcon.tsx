'use client';

import { useRef, useState, useCallback, useEffect, useContext } from "react";
import { startDrag, dragWindow, stopDrag, Position } from "@/utils/functions";
import { IFolder, IList } from "@/utils/types";
import { DisplayContext } from "../../../contexts/DisplayContext";

interface IPastOfficeIconProps {
  initialPos?: Position;
  folder: IFolder | IList;
  absolutePosition: boolean;
  draggable?: boolean;
  handleDoubleClick: (folder: IFolder) => void;
}

export default function PastOfficeIcon({ initialPos, folder, absolutePosition, draggable, handleDoubleClick }: IPastOfficeIconProps) {
  const { selectedIconOffice, updateSelectedIconOffice } = useContext(DisplayContext);
  const iconRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<Position>({ x: 0, y: 0 });

  const [pos, setPos] = useState<Position>(initialPos || { x: 0, y: 0 });
  const [dragging, setDragging] = useState<boolean>(false);

  const handleIconClick = () => {
    updateSelectedIconOffice(folder.name);

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      handleDoubleClick(folder as IFolder);
    }
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) =>
      dragWindow(e, dragging, iconRef as React.RefObject<HTMLDivElement>, dragStart, setPos),
    [dragging]
  );

  const handleMouseUp = useCallback(() => stopDrag(setDragging), []);


  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={iconRef}
      style={absolutePosition ? { left: pos.x, top: pos.y } : undefined}
      onMouseDown={(e) => {
        if (draggable) {
          startDrag(e, pos, dragStart, setDragging, () => {}, "")
        }
        }}
      className={`
        ${absolutePosition ? 'absolute' : 'relative'}
        w-[4.5rem]
        text-black
        select-none
      `}
      onClick={handleIconClick}
      onDoubleClick={() => handleDoubleClick(folder as IFolder)}
    >
      <div className="w-full h-[3rem] flex items-center justify-center" >
        {folder.icon}
      </div>
      <p className={`text-xs text-center w-full truncate ${selectedIconOffice === folder.name ? 'border border-dotted' : ''}`}>{folder.name}</p>
    </div>
  );
}


