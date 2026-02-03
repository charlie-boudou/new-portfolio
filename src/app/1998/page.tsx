'use client';

import PastSideBar from "@/components/1998/sidebar/PastSideBar";
import { useContext } from "react";
import PastWindowLayout from "@/components/1998/desktop/fileWindow/PastWindowLayout";
import { DisplayContext } from "../../contexts/DisplayContext";
import { IFolder } from "@/utils/types";
import PastOfficeIcon from "@/components/1998/desktop/PastOfficeIcon";
import { folders } from "@/utils/datas";
import { useTranslation } from "react-i18next";

export default function PastHome() {
  const { t } = useTranslation();
  const { openFolders, updateOpenFolders, pastWindowActive, updatePastWindowActive, hiddenFolders, updateHiddenFolders, updateSelectedIconOffice } = useContext(DisplayContext);
  const generateId = () => crypto.randomUUID();

  const isResize = (name: string) => {
    return name !== t('settings') && name !== t('shut') && name !== t('contact') && name !== t('minesweeper');
  }

  const ICON_WIDTH = 80;
  const ICON_HEIGHT = 90;
  const START_X = 32;
  const START_Y = 32;
  const ICONS_PER_COLUMN = 7;

  const getCenterPos = (index: number) => {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    const winW = screenW * 0.3; 
    const winH = screenH * 0.3;

    return {
      x: (screenW / 2) - (winW / 2) + (index * 20),
      y: (screenH / 2) - (winH / 2) + (index * 20),
    };
  };

  const getInitialPos = (folder: IFolder, index: number) => {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      const screenW = window.innerWidth;
      const screenH = window.innerHeight;
      const winW = screenW * 0.9; 
      const winH = screenH * 0.6; 

      return {
        x: (screenW - winW) / 2,
        y: (screenH * 0.1), 
      };
    }

    const isLarge = folder.windowSize?.includes('w-[80vw]');
    if (isLarge) {
      return { x: 20 + (index * 10), y: 20 + (index * 10) };
    }
    return { x: 80 + (index * 20), y: 50 + (index * 20) };
  };

  const handleDoubleClick = (folder: IFolder) => {
    const isAlreadyOpen = openFolders.some(el => el.name === folder.name);
    const isHidden = hiddenFolders.includes(folder.name);

    if (isHidden) {
        const newHiddenList = hiddenFolders.filter(name => name !== folder.name);
        updateHiddenFolders(newHiddenList);
    }

    if (!isAlreadyOpen) {
        updateOpenFolders(prev => [...prev, folder]);
        
        const arr = hiddenFolders.filter(el => el !== folder.name);
        updateHiddenFolders(arr);
    }
    
    updatePastWindowActive(folder.name);
    updateSelectedIconOffice('');
  };

  return (
    <div className="relative past-font cursor-default w-screen h-screen max-h-screen bg-[url('/images/pastBackground.jpg')] bg-cover bg-center">
      {folders(t)
        .filter((folder: IFolder) => folder.name !== t('shut'))
        .map((folder: IFolder, index: number) => {
          const column = Math.floor(index / ICONS_PER_COLUMN);
          const row = index % ICONS_PER_COLUMN;

          return (
            <PastOfficeIcon
              key={generateId()}
              initialPos={{
                x: START_X + column * ICON_WIDTH,
                y: START_Y + row * ICON_HEIGHT,
              }}
              folder={folder}
              absolutePosition={true}
              draggable
              handleDoubleClick={handleDoubleClick}
            />
          );
      })}
      {pastWindowActive === t('shut') && (
        <div className="fixed inset-0 z-[90] bg-black/10" />
      )}
      {openFolders.length > 0 && openFolders.map((folder: IFolder, index: number) => {
        const responsiveSize = `max-md:!w-[90%] max-md:!left-[5%] ${folder.windowSize ? folder.windowSize : 'w-[40%] h-[50%]'}`;

        return (
          <PastWindowLayout 
            folder={folder}
            initialPos={ folder.name === t('shut') 
              ? getCenterPos(index) 
              : getInitialPos(folder, index)
            }
            minimize={folder.name !== t('settings') && folder.name !== t('shut')}
            resize={isResize(folder.name)}
            key={folder.name}
            windowSize={responsiveSize} // Utilisation de la taille responsive
            draggable={folder.name !== t('shut')}
          >
            {folder.component}
          </PastWindowLayout>
        );
      })}
      <PastSideBar />
    </div>
  )
}
