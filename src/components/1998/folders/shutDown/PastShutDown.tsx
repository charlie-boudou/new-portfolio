'use client';

import { DisplayContext } from '../../../../contexts/DisplayContext';
import { useContext, useRef, useState } from 'react';
import { shutDown } from '@/utils/datas';
import { useTranslation } from 'react-i18next';
import PastButton from '../../PastButton';
import { closeWindow } from "@/utils/functions";
import { useRouter } from 'next/navigation';
import { IFolder } from '@/utils/types';

export default function PastShutDown() {
    const { t } = useTranslation();
    const router = useRouter();
    const generateId = () => crypto.randomUUID();
    const audioRef = useRef<HTMLAudioElement>(null);
    
    const { openFolders, updateOpenFolders, pastWindowActive, updatePastWindowActive } = useContext(DisplayContext);

    const [selectedAction, setSelectedAction] = useState('Shut Down');

    const handleClick = (title: string) => {
        if (title === 'ok') {
            if (selectedAction === t('restart')) {
                window.location.reload();
                return;
            }

            audioRef.current?.play().catch(err => console.error("Erreur audio:", err));

            updateOpenFolders([]);
            updatePastWindowActive('');

            const targetPath = selectedAction === t('goFuture') ? '/2077' : '/';

            setTimeout(() => {
                router.push(targetPath);
            }, 2000);
            return;
        }
        closeWindow(t('shut'), pastWindowActive, openFolders as IFolder[], updateOpenFolders, updatePastWindowActive);
    };

  return (
    <div className="bg-[#BCBEBC] px-[1rem] py-[1.5rem] w-full h-full text-black select-none">     
        <div className="flex space-x-[1.2rem] items-start">
            <div>
                {shutDown(t).icon}
            </div>
            <div className="flex flex-col flex-1">
                <p className="mb-[1rem]">{shutDown(t).title}</p>
                <div className="flex flex-col space-y-2">
                    {shutDown(t).actions.map((action: string) => (
                        <label 
                            key={generateId()} 
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
                            <div className={selectedAction === action ? "border border-dotted border-black px-[.3px] -mx-[.3px]" : "px-[.3px]"}>
                                {action}
                            </div>
                        </label>
                    ))}
                </div>
            </div>
        </div>
        <div className='w-full flex items-center justify-end space-x-[.5rem]' style={{ marginTop: "1rem"}}>
            <PastButton main title="OK" handleClick={() => handleClick('ok')} />
            <PastButton title="Cancel" handleClick={() => handleClick('cancel')} />
        </div>
        <audio ref={audioRef} src="/sound/windows-98-sound.mp3" preload="auto" />
    </div>
  );
}
