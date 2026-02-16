'use client';

import { DisplayContext } from '../../../../contexts/DisplayContext';
import { JSX, useContext } from 'react';
import { IFolder, IList } from '@/utils/types';
import PastTabButton from "./PastTabButton";
import { getValue } from '@/utils/functions';

export default function PastTabsBar() {
    const { openFolders, pastWindowActive } = useContext(DisplayContext);

    return (
        <div className="flex items-center space-x-[.3rem] flex-1 overflow-y-auto scrollbar-none h-full">
            <div className="border-l-2 border-r-2 border-l-[#7C7A7C] border-r-white h-[2rem] mr-1"/>
            <div className="flex items-center space-x-[.2rem] flex-1 overflow-y-auto scrollbar-none">
                {openFolders.map((folder: IFolder | IList) => { 
                    const folderName = getValue(folder.name, false) as string;
                    const folderIcon = getValue(folder.icon, false) as JSX.Element;

                    return (
                        <PastTabButton 
                            title={folderName} 
                            icon={folderIcon} 
                            key={`tabs-${folderName}`}
                            isActive={pastWindowActive === folderName} 
                        />
                )})}
            </div>
        </div>
    )
}