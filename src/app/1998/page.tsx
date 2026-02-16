'use client';

import PastSideBar from "@/components/1998/desktop/sidebar/PastSideBar";
import { JSX, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import PastWindowLayout from "@/components/1998/desktop/window/PastWindowLayout";
import { DisplayContext } from "../../contexts/DisplayContext";
import { IFolder, IList  } from "@/utils/types";
import PastOfficeIcon from "@/components/1998/desktop/PastOfficeIcon";
import { folders } from "@/utils/datas";
import { useTranslation } from "react-i18next";
import { getValue } from '@/utils/functions';

export default function PastHome() {
  const { t } = useTranslation();
  const { openWindow, openFolders, pastWindowActive } = useContext(DisplayContext);
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isMounted, setIsMounted] = useState(false);

  const allFolders = useMemo(() => folders(t), [t]);
  
  const desktopIcons = useMemo(() => 
    allFolders.filter((folder: IFolder) => (getValue(folder.name, false) as string) !== t('shut')),
    [allFolders, t]
  );

  const LAYOUT = {
    ICON_WIDTH: 80,
    ICON_HEIGHT: 90,
    START_X: 32,
    START_Y: 32,
    ICONS_PER_COLUMN: 7
  };

  const canResize = (name: string) => ![t('settings'), t('shut'), t('contact'), t('minesweeper')].includes(name);

  const getCenterPos = useCallback((index: number) => {
    const screenW = isMounted ? window.innerWidth : 1200;
    const screenH = isMounted ? window.innerHeight : 800;
    const winW = 600; 
    const winH = 400;

    return {
      x: (screenW / 2) - (winW / 2) + (index * 2), 
      y: (screenH / 2) - (winH / 2) + (index * 2),
    };
  }, [isMounted]);

  const getInitialPos = useCallback((folder: IFolder, index: number) => {
    if (!isMounted) return { x: 80, y: 50 };

    if (window.innerWidth < 768) {
      return { x: window.innerWidth * 0.05, y: window.innerHeight * 0.1 };
    }

    const isLarge = folder.windowSize?.includes('w-[80%]');
    const offset = index * 20;
    return isLarge 
      ? { x: 20 + (index * 10), y: 20 + (index * 10) }
      : { x: 80 + offset, y: 50 + offset };
  }, [isMounted]);

  useEffect(() => {
    setIsMounted(true);
    const playStartupSound = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
        } catch {
          console.log("Auto-play bloqué");
        }
      }
    };
    playStartupSound();
  }, []);

  return (
    <div className="relative past-font cursor-default w-screen h-screen overflow-hidden bg-[url('/images/pastBackground.jpg')] bg-cover bg-center">
      {desktopIcons.map((folder: IFolder, index: number) => {
        const name = getValue(folder.name, false) as string;
        const column = Math.floor(index / LAYOUT.ICONS_PER_COLUMN);
        const row = index % LAYOUT.ICONS_PER_COLUMN;

        return (
          <PastOfficeIcon
            key={`icon-${name}`}
            initialPos={{
              x: LAYOUT.START_X + column * LAYOUT.ICON_WIDTH,
              y: LAYOUT.START_Y + row * LAYOUT.ICON_HEIGHT,
            }}
            folder={folder}
            absolutePosition
            draggable
            handleDoubleClick={() => openWindow(folder, false)}
          />
        );
      })}

      {pastWindowActive === t('shut') && (
        <div className="fixed inset-0 z-[90] bg-black/10" />
      )}

      {openFolders.map((folder: IFolder | IList, index: number) => {
        const name = getValue(folder.name, false) as string;
        const isSpecial = name === t('shut') || name === t('settings');
        
        return (
          <PastWindowLayout 
            key={`window-${name}`}
            folder={folder as IFolder}
            initialPos={isSpecial ? getCenterPos(index) : getInitialPos(folder as IFolder, index)}
            minimize={!isSpecial}
            resize={canResize(name)}
            windowSize={`max-md:!w-[90%] max-md:!left-[5%] ${folder.windowSize || 'w-[40%] h-[50%]'}`}
            draggable={name !== t('shut')}
          >
            {folder.component ? (getValue(folder.component, false) as JSX.Element) : null}
          </PastWindowLayout>
        );
      })}

      <PastSideBar />
      <audio ref={audioRef} src="/sound/windows-98-startup.mp3" preload="auto" />
    </div>
  );
}
