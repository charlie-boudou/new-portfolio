'use client';

import { useTranslation } from 'react-i18next';
import { folders } from '@/utils/datas';
import { IFolder  } from '@/utils/types';
import { getValue } from '@/utils/functions';
import FutureMediaIcon from './FutureMediaIcon';
import { JSX, useContext } from 'react';
import { DisplayContext } from '../../../contexts/DisplayContext';

export default function FutureMedia() {  
    const { t } = useTranslation();
    const { openWindow } = useContext(DisplayContext);
    const foldersData = folders(t);
    
    const imagesFolder = foldersData.find((folder: IFolder)=> 
        getValue(folder.name, true) === getValue("Images", true)
    );
    
    const gameFolder = foldersData.find((folder: IFolder)=> 
        getValue(folder.name, true) === getValue(t('minesweeper'), true)
    );

    return (
        <div className="w-full h-full m-auto flex items-center justify-center">
            {imagesFolder && (
                <FutureMediaIcon 
                    icon={getValue(imagesFolder.icon, true) as JSX.Element} 
                    onClick={() => openWindow(imagesFolder, true)} 
                />
            )}
            {gameFolder && (
                <FutureMediaIcon 
                    icon={getValue(gameFolder.icon, true) as JSX.Element} 
                    onClick={() => openWindow(gameFolder, true)} 
                />
            )}
        </div>
    );
}