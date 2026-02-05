'use client';

import { useContext} from "react";
import { DisplayContext } from "../../../contexts/DisplayContext";
import { IFolder } from "../../utils/types";
import { useTranslation } from 'react-i18next';
import { projects } from '@/utils/datas';
import { IProject } from '@/utils/types';
import { useRouter } from 'next/navigation';
import { hideWindow, closeWindow } from "@/utils/functions";

interface IFutureProjectProps {
  projectName: string;
}


export default function FutureProject({projectName}: IFutureProjectProps) {
    const { t } = useTranslation();
    const generateId = () => crypto.randomUUID();
    const router = useRouter();
    const { openFolders, updateOpenFolders, updateHiddenFolders, pastWindowActive, updatePastWindowActive, hiddenFolders } = useContext(DisplayContext);

    const project = projects(t).find((project: IProject) => project.name === projectName) as IProject;

    const handleHidden = () => hideWindow(project.name, pastWindowActive, updatePastWindowActive, updateHiddenFolders);
    const handleClose = () => closeWindow(project.name, pastWindowActive, openFolders as IFolder[], updateOpenFolders, updatePastWindowActive);

    const handleClick = () => {
        router.push(project.link);
    };

    return (
        <div 
            key={generateId()}
            className={`absolute inset-0 bg-slate-800 ${hiddenFolders.includes(project.name) ? "hidden" : ""}`}
            style={{
                clipPath: "polygon(13% 3%, 87% 3%, 97% 13%, 97% 87%, 87% 97%, 13% 97%, 3% 87%, 3% 13%)"
            }}
        >
            <svg 
                className="absolute inset-0 w-full h-full pointer-events-none" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none"
                style={{ overflow: 'visible' }}
            >
                <path 
                d="M 13,3 L 87,3 L 97,13 L 97,87 L 87,97 L 13,97 L 3,87 L 3,13 Z"
                fill="rgba(29, 41, 61, 0.9)"
                />
                <path 
                d="M 13,3 L 87,3 L 97,13 L 97,87 L 87,97 L 13,97 L 3,87 L 3,13 Z"
                fill="none" 
                stroke="#22d3ee" 
                strokeWidth="2" 
                vectorEffect="non-scaling-stroke"
                />
                <line x1="30" y1="3" x2="70" y2="3" stroke="#22d3ee" strokeWidth="10" vectorEffect="non-scaling-stroke" />
                <line x1="30" y1="97" x2="70" y2="97" stroke="#22d3ee" strokeWidth="10" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="relative w-full h-full p-[10%] flex flex-col items-center justify-center">
                <div 
                className="absolute inset-0 opacity-10 pointer-events-none flex" 
                style={{ 
                    backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)', 
                    backgroundSize: '30px 30px' 
                }}
                />
                
                <button 
                onClick={handleClose}
                className="absolute top-[10%] right-[10%] text-cyan-400 border border-cyan-400 px-4 py-1 hover:bg-cyan-400/20"
                >
                CLOSE [X]
                </button>
                <button 
                onClick={handleHidden}
                className="absolute top-[20%] right-[10%] text-cyan-400 border border-cyan-400 px-4 py-1 hover:bg-cyan-400/20"
                >
                MINIMIZE [_]
                </button>

                <h2 className="text-4xl text-cyan-400 mb-4 tracking-widest">PROJECT_DATA</h2>
                <p className="text-white">{project.name}</p>
            </div>
        </div>
  );
}