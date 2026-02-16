'use client';

import { JSX } from "react";

interface IFutureSettingIconProps {
  title: string;
  icon: JSX.Element;
  handleClick: () => void;
}

export default function FutureSettingIcon({ title, icon, handleClick }: IFutureSettingIconProps) {
    return (
        <div 
            className="w-[7rem] h-[8rem] flex flex-col items-center justify-center space-y-[.5rem] cursor-pointer transition-all duration-300 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 "
            onClick={handleClick}
        >
            <div className="border-4 border-cyan-500 p-[.5rem] rounded-full w-[6rem] h-[6rem] flex item-center justify-center">
                <div className="border-dashed border-2 border-[#CF5CCD] p-[.3rem] rounded-full w-full h-full flex item-center justify-center">
                <div className="flex items-center justify-center w-full h-full">
                    {icon}
                </div>
                </div>
            </div>
            <p className="text-[.6rem]">{title.toUpperCase()}</p>
        </div>
    );
}