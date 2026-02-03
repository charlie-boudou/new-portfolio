'use client';

import { JSX, useContext } from 'react';
import { DisplayContext } from '../../../../contexts/DisplayContext';

interface IPastTabButtonProps {
    title: string;
    icon: JSX.Element;
    isActive?: boolean;
}

export default function PastTabButton({title, icon, isActive}: IPastTabButtonProps) {
    const { hiddenFolders, updateHiddenFolders, updatePastWindowActive, pastWindowActive } = useContext(DisplayContext);

    const handleClick = (title: string) => {
        if(pastWindowActive !== title) {
            const arr = hiddenFolders.filter((name) => name !== title);
            updateHiddenFolders(arr);

            updatePastWindowActive(title)
        } else {
            updatePastWindowActive('')
            updateHiddenFolders(prev => [...prev, title]);
        } 
    }

    return (
        <div 
            className={`
                max-w-[10rem]
                flex-[1_1_0px] 
                min-w-0
                px-[.3rem]
                py-[.2rem]
                text-black
                flex
                items-center
                space-x-[.3rem]
                border-2 
                border-gray-300
                selection-none
                ${isActive ? 'shadow-[-1px_-1px_0_0_black] border-t-[#424242] border-l-[#424242]' : 'border-b-[#424242] border-r-[#424242] shadow-[1px_1px_0_0_black,-1px_-1px_0_0_white]'}
            `}
            onClick={() => handleClick(title)}
        >            
            <div className="h-[1.5rem] w-[1.5rem] flex items-center">
                {icon}
            </div>
            <p className='truncate overflow-y-auto scrollbar-none text-ellipsis whitespace-nowrap'>{title}</p>
        </div>
    )
}