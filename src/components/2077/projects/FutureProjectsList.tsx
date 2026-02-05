'use client';

import { useContext } from "react";
import { DisplayContext } from "../../../contexts/DisplayContext";
import { folders } from '@/utils/datas';
import { IFolder, IList } from "@/utils/types";
import { useTranslation } from "react-i18next";
import FutureProjectIcon from "./FutureProjectIcon";

export default function FutureProjectList() {
    const { t } = useTranslation();
    const generateId = () => crypto.randomUUID();
    const { openFolders, updateOpenFolders, hiddenFolders, updateHiddenFolders, updatePastWindowActive, updateSelectedIconOffice } = useContext(DisplayContext);

    const projects: IFolder = folders(t).find((folder: IFolder) => folder.name === t('projects')) as IFolder;
    
    const handleClick = (project: IList) => {
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
        <div className="relative w-full h-full flex items-center justify-center p-[.5rem] rounded-full bg-gradient-to-b from-cyan-400 to-[#CF5CCD] shadow-[0_0_20px_rgba(34,211,238,0.5)]">
            <div className="w-full h-full bg-slate-800 rounded-full p-[.8rem] flex items-center justify-center">
                <div className="w-full h-full bg-cyan-400 rounded-full p-[.2rem] flex items-center justify-center">
                    <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center">
                        <svg 
                            className="absolute inset-0 w-full h-full pointer-events-none" 
                            viewBox="0 0 100 100" 
                            preserveAspectRatio="xMidYMid meet"
                            style={{ overflow: 'visible' }}
                        >
                            <g className="hud-center">
                                <circle 
                                    cx="50" 
                                    cy="50" 
                                    r="43" 
                                    fill="none" 
                                    stroke="#CF5CCD" 
                                    strokeWidth="3" 
                                    pathLength="105" 
                                    strokeDasharray="25 5" 
                                    vectorEffect="non-scaling-stroke"
                                    opacity="0.8"
                                    className="animate-spin origin-center"
                                    style={{ 
                                        animationDuration: '10s',
                                        transformBox: 'fill-box',
                                        transform: 'rotate(-90deg)'
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
                            className="absolute flex items-center justify-center w-[8rem] h-[9rem]"
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
                                    <p className="text-[2.5rem] font-bold leading-tight text-white uppercase tracking-tighter">
                                        {`${"</>"}`}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {projects?.list?.map((project: IList, i: number) => (
                            <FutureProjectIcon key={generateId()} project={project} i={i} handleClick={handleClick} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}