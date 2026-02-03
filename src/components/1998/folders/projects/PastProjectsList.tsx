'use client';

import PastOfficeIcon from '../../desktop/PastOfficeIcon';
import { folders } from '@/utils/datas';
import { useTranslation } from 'react-i18next';
import { IFolder, IList } from '@/utils/types';
import { useContext, useRef } from 'react';
import PastScrollBar from '../../PastScrollBar';
import { DisplayContext } from '../../../../contexts/DisplayContext';
export default function PastProjectsList() {
    const { t } = useTranslation();
    const generateId = () => crypto.randomUUID();
    const { openFolders, updateOpenFolders, hiddenFolders, updateHiddenFolders, updatePastWindowActive, updateSelectedIconOffice } = useContext(DisplayContext);
    const scrollRef = useRef<HTMLDivElement>(null);

    const projects: IFolder = folders(t).find((folder: IFolder) => folder.name === t('projects')) as IFolder;

    const handleDoubleClick = (project: IList) => {
        const isAlreadyOpen = openFolders.some(el => el.name === project.name);
        if (!isAlreadyOpen) {
            const arr = hiddenFolders.filter(el => el !== project.name);
    
            updateOpenFolders(prev => [...prev, project]);
            updateHiddenFolders(arr);
        }
            updatePastWindowActive(project.name);
            updateSelectedIconOffice('');
    };

    return (
        <div className='w-full h-full flex flex-col'>
            <div className='text-black w-full px-[.3rem] py-[.1rem] border-2 border-gray-300 border-b-[#424242] border-r-[#424242] shadow-[1px_1px_0_0_black,-1px_-1px_0_0_white] shrink-0'>
                Files
            </div>
            <div className="flex h-full w-full overflow-y-auto scrollbar-none bg-white border-b-2 border-r-2 border-white shadow-[-1px_-1px_0_0_#808080]">
                <div ref={scrollRef}  className="flex-1 overflow-y-auto scrollbar-none">
                    <div className="grid grid-rows-4 grid-flow-col gap-4 w-max px-[.5rem]">
                        {projects?.list?.map((project: IList) => (
                            <PastOfficeIcon
                                key={generateId()}
                                folder={project}
                                absolutePosition={false}
                                handleDoubleClick={handleDoubleClick}
                            />
                        ))}
                    </div>
                </div>
                <PastScrollBar scrollRef={scrollRef} projects={projects}/>
            </div>
            <div className="shrink-0 mt-[.3rem] flex items-center h-[2rem] bg-[#BCBEBC] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white">
                <div className="flex-1 px-[.3rem] text-[.8rem] text-black truncate">
                    {projects && projects.list && (
                        <>{projects.list.length - 1} {t('file')}</>
                    )}
                </div>
                <div className="w-[7rem] h-full border-l-2 border-l-[#808080] shadow-[1px_0_0_0_white_inset]" />
            </div>    
        </div>
    );
}