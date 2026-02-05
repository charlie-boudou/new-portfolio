'use client';

import { IFolder, IList } from "@/utils/types";

interface IFutureProjectIconProps {
  project: IFolder | IList;
  handleClick: (folder: IFolder) => void;
  i: number;
}

export default function FutureProjectIcon({project, handleClick, i}: IFutureProjectIconProps) {
    return (
        <div 
            className="absolute flex items-center justify-center group cursor-pointer transition-all duration-300 w-[6rem] h-[6.5rem]"
            style={{
                transform: `rotate(${i * 60}deg) translate(150px) rotate(-${i * 60}deg)`,
            }}
            onClick={() => handleClick(project as IFolder)}
        >
            <div 
                className="absolute inset-0 bg-cyan-400 group-hover:bg-[#CF5CCD] transition-colors duration-300 shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                style={{
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                }}
            />
            <div 
                className="absolute inset-[2px] bg-slate-900 flex flex-col items-center justify-center p-[.5rem] text-center"
                style={{
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
                }}
            >
                <div className="w-[1.5rem] h-[1.5rem] rounded-full border border-cyan-400/50 mb-[.2rem] flex items-center justify-center text-[.5rem] text-cyan-400">
                    CP
                </div>
                <p className="text-[.6rem] font-bold leading-tight text-white uppercase tracking-tighter">
                    {project.name}
                </p>
            </div>
        </div>
    );
}