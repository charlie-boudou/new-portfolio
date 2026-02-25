'use client';

import { DisplayContext } from '../../../../contexts/DisplayContext';
import { useContext, useState } from 'react';
import { shutDown } from '@/utils/datas';
import { useTranslation } from 'react-i18next';
import PastButton from '../../PastButton';
import { closeWindow } from "@/utils/functions";
import { useRouter } from 'next/navigation';
import { IFolder } from '@/utils/types';

export default function PastShutDown() {
    const { t } = useTranslation();
    const router = useRouter();
    
    const { openFolders, updateOpenFolders, windowActive, updateWindowActive, updateIsShutDown } = useContext(DisplayContext);

    const [selectedAction, setSelectedAction] = useState(t('shut'));

    const handleClick = async (title: string) => {
        if (title === 'cancel') {
            closeWindow(t('shut'), windowActive, openFolders as IFolder[], updateOpenFolders, updateWindowActive, false);
            return;
        }
        
        if (title === 'ok') {
            if (selectedAction === t('restart')) {
                window.location.reload();
                return;
            }

            const targetPath = selectedAction === t('goFuture') ? '/2077' : '/';
            
            updateIsShutDown(true);
            performFallbackRedirect(targetPath);
        }
    };

    const performFallbackRedirect = (path: string) => {
        updateOpenFolders([]);
        updateWindowActive('');
        setTimeout(() => {
            updateIsShutDown(false);
            router.push(path);
        }, 4500); 
    };

  return (
    <div className="bg-[#BCBEBC] p-[.5rem] md:p-[1rem] w-full h-full text-black select-none flex flex-col justify-between overflow-hidden">     
        <div className="flex space-x-[1rem] items-start shrink-0">
            <div className="block">
                {shutDown(t).icon}
            </div>
            <div className="flex flex-col flex-1 min-w-0">
                <p className="mb-[1rem] text-sm md:text-base leading-tight">{shutDown(t).title}</p>
                <div className="flex flex-col space-y-1 md:space-y-2">
                    {shutDown(t).actions.map((action: string) => (
                        <label 
                            key={`shut-${action}`} 
                            className="flex items-center group"
                            onClick={() => setSelectedAction(action)}
                        >
                            <div className={`
                                relative w-[.8rem] h-[.8rem] rounded-full bg-white flex items-center justify-center mr-[.5rem]
                                border-t-[#424242] border-l-[#424242] border-r-white border-b-white border
                                shadow-[inset_1px_1px_0_0_black]
                            `}>
                                {selectedAction === action && (
                                    <div className="w-[.4rem] h-[.4rem] bg-black rounded-full m-auto" />
                                )}
                            </div>
                            <div className={`${selectedAction === action ? "border border-dotted border-black px-[.3px] -mx-[.3px]" : "px-[.3px]"} text-sm md:text-base`}>
                                {action}
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </div>
        <div className='w-full flex items-center justify-end space-x-2 mt-4 shrink-0'>
          <PastButton main title="OK" handleClick={() => handleClick('ok')} />
          <PastButton title="Cancel" handleClick={() => handleClick('cancel')} />
        </div>
    </div>
  );
}
