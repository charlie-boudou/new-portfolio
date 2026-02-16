'use client';

import { useTranslation } from 'react-i18next';
import { settings, folders } from '@/utils/datas';
import FutureSettingIcon from "./FutureSettingIcon";
import { IFolder } from '@/utils/types';
import { getValue } from '@/utils/functions';
import { ISetting } from '@/utils/types';
import { JSX, useContext } from 'react';
import { DisplayContext } from '../../../contexts/DisplayContext';

export default function FutureSetting() {
    const { t } = useTranslation();
    const { openWindow } = useContext(DisplayContext);

    const foldersData = folders(t);

    const contactFolder = foldersData.find((folder: IFolder)=> 
        getValue(folder.name, true) === getValue({past: t('contact'), future: t('contactFuture')}, true)
    );
    
    const shutDownFolder = foldersData.find((folder: IFolder)=> 
        getValue(folder.name, true) === getValue({past: t('shut'), future: t('shutFuture')}, true)
    );

    return (
        <div className='w-full h-full flex flex-col items-center justify-center space-y-[1rem]'>
            <div className='w-full flex items-center justify-center space-x-[1.5rem]'>
                {settings(t).map((item: ISetting, index: number) => (
                    <FutureSettingIcon 
                        key={`setting-${index}`}
                        title={getValue(item.name, true) as string} 
                        icon={getValue(item.icon, true) as JSX.Element}
                        handleClick={() => openWindow(item, true)}
                    />
                ))}
            </div>
            <div className='w-full flex items-center justify-center space-x-[1.5rem]'>
                {contactFolder && (
                    <FutureSettingIcon
                        title={getValue(contactFolder.name, true) as string} 
                        icon={getValue(contactFolder.icon, true) as JSX.Element}
                        handleClick={() => openWindow(contactFolder, true)}
                    />
                )}
                {shutDownFolder && (
                    <FutureSettingIcon
                        title={getValue(shutDownFolder.name, true) as string} 
                        icon={getValue(shutDownFolder.icon, true) as JSX.Element}
                        handleClick={() => openWindow(shutDownFolder, true)}
                    />
                )}
            </div>
        </div>
    );
}