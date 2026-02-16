'use client';

import { getValue } from "@/utils/functions";
import { IList, IFolder, ISetting, IAboutMe } from "@/utils/types";
import { JSX } from "react";

interface IFutureProjectIconProps {
  project: IFolder | IList | ISetting | IAboutMe;
  handleClick?: () => void;
  i: number;
  total?: number;
  isSideBar?: boolean;
  isSetting?: boolean;
  radius?: number
}

export default function FutureProjectIcon({project, handleClick, i, total, isSideBar, isSetting, radius }: IFutureProjectIconProps) {
    const angle = total && i * (360 / total);
    const polygon = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";
    const octogone= "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%";

    const iconValue = getValue(project.icon, true);
    const projectName = (project as IFolder).name

    const isFile = (
        typeof iconValue === 'object' && iconValue !== null && 'props' in iconValue
        ? String(iconValue.props?.src?.src || iconValue.props?.src || "").includes('file')
        : false
    );

    return (
        <div 
            className={`
                ${isSideBar 
                ? `relative text-[.5rem] ${isSetting ? 'w-[6rem] h-[6rem]' : 'min-w-[4.5rem] min-h-[4.5rem]'}` 
                : 'absolute xl:w-[5.5rem] xl:h-[6.5rem] lg:w-[3.5rem] lg:h-[4.5rem] md:w-[8.5rem] md:h-[9.5rem] w-[4.5rem] h-[5.5rem] group'}
                flex items-center justify-center  
                ${!isSetting && 'transition-all duration-300 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 cursor-pointer'}
            `}
            style={{
                transform: `${isSideBar ? '' : `${`rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`}`}`,
                transformStyle: "preserve-3d",
            }}
            onClick={handleClick}
        >
            <div 
                className={`
                    ${isSideBar ? 'bg-gradient-to-r from-cyan-400 to-[#CF5CCD]' : 'bg-cyan-400 group-hover:bg-[#CF5CCD] transition-colors duration-300'}
                    absolute inset-0 
                    shadow-[0_0_15px_rgba(34,211,238,0.4)]
                `}
                style={{
                    clipPath: isSideBar ? octogone : polygon,
                    WebkitClipPath: isSideBar ? octogone : polygon,
                }}
            />
            <div 
                className="absolute inset-[2px] bg-slate-800 flex flex-col items-center justify-center p-[.5rem] text-center"
                style={{ clipPath: isSideBar ? octogone : polygon }}
            >
                {isSideBar ? (
                    isFile ? (
                        <p className="text-[.6rem] font-bold leading-tight text-white uppercase tracking-tighter">
                            {projectName && (getValue(projectName, true) as string)}
                        </p>
                    ) : (
                        <div className="text-white scale-125">
                            {getValue(project.icon, true) as JSX.Element}
                        </div>
                    )
                ) : (
                    <>
                        <div className="xl:block hidden">
                            {getValue(project.icon, true) as JSX.Element}
                        </div>
                        <p className={`text-[.6rem] font-bold leading-tight text-white uppercase tracking-tighter xl:mt-1`}>
                            {projectName && (getValue(projectName, true) as string)}
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}