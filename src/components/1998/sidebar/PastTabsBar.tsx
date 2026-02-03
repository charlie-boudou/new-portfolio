'use client';

import { DisplayContext } from '../../../contexts/DisplayContext';
import { useContext } from 'react';
import { IFolder } from '@/utils/types';
import PastTabButton from "./PastTabButton";

export default function PastTabsBar() {
    const { openFolders, pastWindowActive } = useContext(DisplayContext);

    return (
        <div className="flex items-center space-x-[.3rem] flex-1 overflow-y-auto scrollbar-none h-full">
            <div className="border-l-2 border-r-2 border-l-[#7C7A7C] border-r-white h-[2rem] mr-1"/>
            <div className="flex items-center space-x-[.2rem] flex-1 overflow-y-auto scrollbar-none">
                {openFolders.map((folder: IFolder) => (
                    <PastTabButton 
                        title={folder.name} 
                        icon={folder.icon} 
                        key={folder.name}
                        isActive={pastWindowActive === folder.name} 
                    />
                ))}
            </div>
        </div>
    )
}