'use client';

import { aboutMe, folders } from "@/utils/datas";
import { useTranslation } from 'react-i18next';
import Image from "next/image";
import arrowFuture from "@/assets/arrowFuture.svg";
import { useContext } from "react";
import { DisplayContext } from "../../../contexts/DisplayContext";
import { getValue } from "@/utils/functions";
import { IFolder } from "@/utils/types";

export default function FutureAboutMeCard() { 
    const { t } = useTranslation();
    const { openWindow } = useContext(DisplayContext);

    const folderAboutMe = folders(t).find((folder: IFolder) => getValue(folder.name, false) === t('about'));

    return (
        <div 
            className="cursor-pointer rounded-[.2rem] w-[90%] h-[90%] m-auto p-[.1rem] bg-gradient-to-r from-cyan-400 to-[#CF5CCD]"
            onClick={() => folderAboutMe && openWindow(folderAboutMe, true)}
        >
            <div className="p-[1rem] rounded-[.2rem] bg-slate-800 text-cyan-400 w-full h-full flex lg:flex-col items-center overflow-hidden">
                <div className=" w-[30%] h-full lg:w-[90%] lg:h-[50%] flex items-center justify-center border border-[#CF5CCD] p-[.5rem] rounded-[.3rem] flex-shrink-0">
                    <div className="w-[95%] h-[95%] rounded-[.3rem] border border-cyan-400 flex items-center justify-center overflow-hidden relative">
                        <Image 
                            src={aboutMe(t).photo} 
                            alt="me" 
                            fill
                            className="object-cover object-top rounded-[.3rem] sepia" 
                        />
                    </div>
                </div>
                <div className="w-full px-[.5rem] mt-[1rem] flex flex-col flex-1 min-h-0">
                    <p className="uppercase font-bold tracking-widest">{aboutMe(t).title}</p>
                    <div className="w-full h-[1px] my-[.5rem] bg-gradient-to-r from-cyan-400 to-[#CF5CCD]" /> 
                    <div className="flex flex-col space-y-[.4rem] text-[.8rem] w-full overflow-hidden">
                        <p className="flex-shrink-0">{t('name')} : <span className="text-white uppercase">CHARLIE</span></p>
                        <p className="text-justify line-clamp-3 md:line-clamp-none">
                            STACKS : <span className="text-white uppercase leading-6">REACTS JS, REACT NATIVE, NODE.JS, VUEJS, REDUX, TYPESCRIPT</span>
                        </p>
                    </div>
                    <div className="mt-auto flex items-center justify-end pt-[.5rem]">
                        <Image 
                            src={arrowFuture} 
                            alt="read more" 
                            width={32} 
                            height={32} 
                            className="w-[1.8rem] h-[1.8rem] transition-transform group-hover:translate-x-1" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}