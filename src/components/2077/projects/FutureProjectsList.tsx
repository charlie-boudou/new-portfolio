'use client';

import { useContext, useEffect, useRef, useState } from "react";
import { DisplayContext } from "../../../contexts/DisplayContext";
import { folders } from '@/utils/datas';
import { useTranslation } from "react-i18next";
import FutureProjectIcon from "../FutureProjectIcon";
import { IFolder, IList } from "@/utils/types";

export default function FutureProjectList() {
    const { t } = useTranslation();
    const { openWindow } = useContext(DisplayContext);
    const containerRef = useRef<HTMLDivElement>(null);
    
    const [radius, setRadius] = useState(150);

    const projects: IFolder = folders(t).find((folder: IFolder) => folder.name === t('projects')) as IFolder;

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { width } = containerRef.current.getBoundingClientRect();
                setRadius((width / 2) * 0.7); 
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        const observer = new ResizeObserver(handleResize);
        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
        };
    }, []);

    if (!projects?.list) return null;

    return (
        <div className="relative w-full max-h-full flex-1 aspect-square flex items-center justify-center p-[.5rem] rounded-full bg-gradient-to-b from-cyan-400 to-[#CF5CCD] shadow-[0_0_20px_rgba(34,211,238,0.5)]">
            <div className="w-full h-full bg-slate-800 rounded-full p-[.8rem] flex items-center justify-center">
                <div className="w-full h-full bg-cyan-400 rounded-full p-[.2rem] flex items-center justify-center">
                    <div ref={containerRef} className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center relative">
                        <svg 
                            className="absolute inset-0 w-full h-full pointer-events-none" 
                            viewBox="0 0 100 100" 
                            preserveAspectRatio="xMidYMid meet"
                        >
                            <g className="hud-center">
                                <circle 
                                    cx="50" 
                                    cy="50" 
                                    r="45" 
                                    fill="none" 
                                    stroke="#CF5CCD" 
                                    strokeWidth="3" 
                                    pathLength="120" 
                                    strokeDasharray="20 15" 
                                    vectorEffect="non-scaling-stroke"
                                    opacity="0.8"
                                    className="animate-spin origin-center"
                                    style={{ 
                                        animationDuration: '10s',
                                        transformBox: 'fill-box',
                                    }}
                                />
                                <circle 
                                    cx="50" cy="50" r="32" 
                                    fill="none" 
                                    stroke="#CF5CCD" 
                                    strokeWidth="1.5" 
                                    strokeDasharray="2 4"
                                    vectorEffect="non-scaling-stroke"
                                    opacity="0.6"
                                />
                            </g>
                        </svg>
                        <div 
                            className="absolute flex items-center justify-center w-[25%] h-[30%]"
                        >
                            <div 
                                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-[#CF5CCD] shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                                style={{
                                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                                }}
                            />
                            <div 
                                className="absolute inset-[3px] bg-slate-800 flex flex-col items-center justify-center text-center"
                                style={{
                                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                                }}
                            >
                                <div 
                                    className="absolute inset-[7px] bg-gradient-to-r from-cyan-400 to-[#CF5CCD] flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                                    style={{
                                        clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                                    }}
                                >
                                    <p className="md:text-[2.5rem] font-bold leading-tight text-white uppercase tracking-tighter">
                                        {`${"</>"}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {projects?.list?.map((project: IList, index: number) => (
                            <FutureProjectIcon 
                                key={`project-icon-${index}`}
                                project={project} 
                                i={index} 
                                total={projects?.list?.length || 0}
                                handleClick={() => openWindow(project, true)}
                                radius={radius}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}