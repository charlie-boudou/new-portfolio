'use client';

import { DisplayContext } from '../../../contexts/DisplayContext';
import { useContext } from 'react';
import { shutDown } from '@/utils/datas';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

export default function ShutDownMenu() {
    const { t } = useTranslation();
    const router = useRouter();
    const { updateOpenFolders, updateWindowActive, updateIsShutDown } = useContext(DisplayContext);

    const handleClick = async (action: string) => {
        const path = action === t('goFuture') ? '/1998' : '/';
        
        if (action === t('restart')) {
            window.location.reload();
            return;
        }
        updateIsShutDown(true);
        performFallbackRedirect(path);
    };
    
    const performFallbackRedirect = (path: string) => {
        updateOpenFolders([]);
        updateWindowActive('');
        setTimeout(() => {
            updateIsShutDown(false);
            router.push(path);
        }, 4000); 
    };

    return (
        <div className="w-full h-full overflow-hidden">
            <div className="w-full group flex flex-col lg:flex-row items-center space-y-[.5rem] lg:space-x-[1rem] px-[2rem]">
                <p className="tracking-[0.3em] text-cyan-400 uppercase">{t('systemAccess')}</p>
                <p className="text-white uppercase">{shutDown(t).title}</p>
            </div>
            <div className="w-full h-full flex flex-col mt-[.5rem] px-[1rem]">
                {shutDown(t).actions.map((action: string, index: number) => (
                    <div
                        key={index}
                        className="group flex flex-col items-start cursor-pointer"
                        onClick={() => handleClick(action)}
                    >
                        <div className="flex items-center space-x-[.5rem]">
                            <div className="h-[1px] w-[3rem] bg-gradient-to-r from-[#CF5CCD] to-transparent group-hover:w-[4.5rem] transition-all duration-300" />
                            
                            <div className="relative">
                                <div className="text-[.7rem] text-cyan-500 mb-1 opacity-0 group-hover:opacity-100 transition-all">
                                    {t('executeCommand')}{index + 1}
                                </div>
                                <div className="font-light text-cyan-100 group-hover:text-[#CF5CCD] transition-colors uppercase tracking-[0.2em]">
                                    {action}
                                </div>
                            </div>
                        </div>
                        <div className="mt-[.5rem] w-0 h-1 bg-cyan-400 group-hover:w-full transition-all duration-500 shadow-[0_0_10px_#22d3ee]" />
                    </div>
                ))}
            </div>
        </div>
    );
};