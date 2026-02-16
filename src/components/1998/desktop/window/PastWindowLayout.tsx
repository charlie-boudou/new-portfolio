'use client';

import { useContext, useCallback, useMemo } from 'react';
import Image from 'next/image';
import cross from '@/assets/cross.svg';
import { DisplayContext } from '../../../../contexts/DisplayContext';
import { IFolder } from '@/utils/types';
import { getValue } from '@/utils/functions';
import { useWindowDrag } from '@/hooks/useWindowDrag';
import { useWindowResize } from '@/hooks/useWindowResize';
import { useWindowMaximize } from '@/hooks/useWindowMaximize';
import { WIN98_COLORS, BORDER_STYLES } from '@/constants/styles';
import PastWindowButton from './PastWindowButton';
import { IList } from '../../../../utils/types';

interface IPastWindowLayoutProps {
  folder: IFolder;
  children: React.ReactNode;
  minimize?: boolean;
  initialPos?: { x: number; y: number };
  resize?: boolean;
  windowSize: string;
  draggable: boolean;
}

export default function PastWindowLayout({
  children,
  folder,
  minimize = true,
  initialPos,
  resize = true,
  windowSize,
  draggable,
}: IPastWindowLayoutProps) {
  const {
    openFolders,
    updateOpenFolders,
    hiddenFolders,
    updateHiddenFolders,
    pastWindowActive,
    updatePastWindowActive,
  } = useContext(DisplayContext);

  const folderName = useMemo(() => getValue(folder.name, false) as string, [folder.name]);

  const { pos, setPos, startDrag, windowRef } = useWindowDrag({
    initialPos,
    enabled: draggable,
    onDragStart: () => updatePastWindowActive(folderName),
  });

  const { isMaximized, toggleMaximize } = useWindowMaximize({
    windowRef,
    pos,
    setPos,
  });

  const { startResize } = useWindowResize({ windowRef });

  const handleMinimize = useCallback(() => {
    if (pastWindowActive === folderName) updatePastWindowActive('');
    updateHiddenFolders((prev: string[]) => [...prev, folderName]);
  }, [folderName, pastWindowActive, updatePastWindowActive, updateHiddenFolders]);

  const handleClose = useCallback(() => {
    updateOpenFolders(openFolders.filter((folder: IFolder | IList) => getValue(folder.name, false) !== folderName));
    if (pastWindowActive === folderName) updatePastWindowActive('');
  }, [folderName, openFolders, pastWindowActive, updateOpenFolders, updatePastWindowActive]);

  const isActive = pastWindowActive === folderName;
  const isHidden = hiddenFolders.includes(folderName);

  const windowClasses = useMemo(() => `
    absolute flex flex-col
    ${BORDER_STYLES.window}
    ${BORDER_STYLES.shadow}
    p-[.1rem]
    bg-[#BCBEBC]
    ${isHidden ? 'hidden' : ''}
    ${!isMaximized ? windowSize : ''} 
    `.trim(),
    [isHidden, isMaximized, windowSize]
  );

  const windowStyle = useMemo(() => {
    if (isMaximized) {
      return {
        left: 0,
        top: 0,
        width: '100vw',
        height: 'calc(100vh - 50px)',
        maxWidth: 'none',
        zIndex: isActive ? 100 : 50,
      };
    }
    return {
      left: pos.x,
      top: pos.y,
      zIndex: isActive ? 100 : 50,
    };
  }, [pos.x, pos.y, isMaximized, isActive]);

  return (
    <div ref={windowRef} style={windowStyle} className={windowClasses}>
      <div
        className={`bg-[${WIN98_COLORS.titleBar}] p-[.3rem] text-white flex justify-between items-center shrink-0 cursor-move`}
        onMouseDown={draggable ? startDrag : undefined}
      >
        <p className="select-none">{folderName}</p>
        
        <div className="flex items-center space-x-[.5rem]">
          {minimize && (
            <PastWindowButton
              icon={<div className="w-[.6rem] border-1 bg-black" />}
              handleClick={handleMinimize}
            />
          )}
          {resize && (
            <PastWindowButton
              icon={<div className="border-black border-t-3 border-1 w-[.8rem] h-[.8rem] m-auto" />}
              handleClick={toggleMaximize}
            />
          )}
          <PastWindowButton
            icon={<Image src={cross} alt="close" className="w-[.8rem] h-[.8rem]" />}
            handleClick={handleClose}
          />
        </div>
      </div>
      <div className="flex-1 min-h-0 w-full p-[.3rem] flex flex-col">
        {children}
      </div>
      {resize && (
        <div
          className="absolute bottom-0 right-0 w-[1rem] h-[1rem] cursor-se-resize bg-transparent"
          onMouseDown={startResize}
        />
      )}
    </div>
  );
}
