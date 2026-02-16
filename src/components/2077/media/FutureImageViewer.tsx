'use client';

import { useRef, useState } from 'react';
import { projects } from '@/utils/datas';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { IProject } from '@/utils/types';
import FutureSideBar from '../sideBar/FutureSideBar';

export default function FutureImageViewer() {
    const { t } = useTranslation();
    const scrollRef = useRef<HTMLDivElement>(null);
    
    const [allImages] = useState<string[]>(() => {
        const allProjects: IProject[] = projects(t);
        return Array.from(new Set(allProjects.flatMap(project => project.pictures)));
    });
    const [selectedImage, setSelectedImage] = useState(allImages[0]);

    return (
        <div className="relative flex flex-col h-full w-full text-white">
            <div className='flex xl:flex-row flex-col space-y-[.5rem] justify-between items-center w-[85%] m-auto px-[1.5rem] py-[1rem] bg-cyan-950/40 backdrop-blur-md z-10 '>
                <div className="flex items-center gap-3">
                    <div className="w-[.5rem] h-[.5rem] bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
                    <span className="text-[.8rem] tracking-[0.3em] uppercase font-light text-cyan-400">
                        {t('visualArchive')}
                    </span>
                </div>
                <div className="text-[.7rem] tracking-widest">
                    {t('totalFiles')} {allImages.length}
                </div>
            </div>
            <div className="flex flex-1 flex-col relative">
                <div className="flex-1 flex flex-col p-[1rem] relative overflow-hidden bg-gradient-to-br from-transparent to-cyan-900/10">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" />
                    <div className="flex-1 relative">
                       <div className="absolute -inset-2 border-2 border-cyan-500/50 pointer-events-none transition-all duration-1000 group-hover:border-cyan-500/50" />
                        <div className="absolute top-0 right-0 w-[4rem] h-[2px] bg-cyan-400 shadow-[0_0_15px_#22d3ee]" />
                        <div className="absolute bottom-0 left-0 w-[.4rem] h-[4rem] bg-[#CF5CCD] shadow-[0_0_15px_#CF5CCD]" />
                        <div className="w-full h-full z-10 flex-1 md:flex md:flex-col md:items-center md:p-[1rem]">
                            <div className="relative w-full h-[52vh]">
                                <Image 
                                    src={selectedImage}
                                    alt="Preview"
                                    fill
                                    className="object-contain"
                                    sizes="80vw"
                                    priority
                                />
                            </div>
                            <div className="w-full flex flex-col space-y-[.3rem] items-end shrink-0 pt-4 border-t border-cyan-500/10">
                                <p className="text-[1.2rem] tracking-[.3em] text-white uppercase">
                                    {selectedImage.split('/').pop()?.split('.')[0] || "Unknown_Source"}
                                </p>
                                <div className="gap-2 items-center hidden md:flex">
                                    <span className="text-[.8rem] text-cyan-400/60">{t('fileType')} : RAW_DATA</span>
                                    <div className="h-[1px] w-[2rem] bg-zinc-800" />
                                    <span className="text-[.8rem] text-[#CF5CCD]/60">{t('encoding')} : NEURAL_PNG</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative h-[6rem] w-[80%] mx-auto overflow-hidden relative flex items-center justify-center">
                    <FutureSideBar icons={allImages} selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
                </div>
            </div>
        </div>
    );
}