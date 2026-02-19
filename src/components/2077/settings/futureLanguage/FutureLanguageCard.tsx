'use client';

import { ILanguage } from '@/utils/types';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { DisplayContext } from '../../../../contexts/DisplayContext';

interface IFutureLanguageCardProps {
  item: ILanguage | null;
  index: number;
}
export default function LanguageCard({ item, index }: IFutureLanguageCardProps) {
    const { i18n } = useTranslation();
    const { updateSelectedLanguage } = useContext(DisplayContext);

    const handleClick = (title: string | undefined) => {
        if (title) {
            updateSelectedLanguage(title.toLowerCase());
            i18n.changeLanguage(title.toLowerCase());
        }
    };

    return (
        <div 
            className="group relative w-full cursor-pointer h-full min-h-[5rem]"
            onClick={() => handleClick(item?.icon)}
        >
            <div 
                className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 to-[#CF5CCD] opacity-60 group-hover:opacity-100 transition-opacity" 
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%)" }} 
            />           
            
            <div 
                className="relative bg-slate-800/90 p-[1rem] flex items-center justify-between gap-4 h-full"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%)" }}
            > 
                <div className="flex flex-col justify-center h-full flex-1 min-w-0">
                    <p className="text-[0.6rem] text-cyan-400 opacity-50 mb-[.2rem] tracking-widest uppercase truncate">
                        {index === 0 ? "Primary_Link" : "Secondary_Link"}
                    </p>
                    <p className="text-white font-bold text-[.8rem] xl:text-[1rem] tracking-tight truncate">
                        {item?.language}
                    </p>
                    <p className="text-[0.6rem] text-zinc-500 mt-[.2rem] italic truncate max-w-full">
                        {item?.layout}
                    </p>
                </div>

                <div className="flex items-center shrink-0">
                    <div className="w-[2.5rem] h-[2.5rem] border border-cyan-400/30 rounded-full flex items-center justify-center text-[0.7rem] text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all">
                        {item?.icon}
                    </div>
                </div>
            </div>
        </div>
    );
}