'use client';

import FutureProjectsList from "@/components/2077/projects/FutureProjectsList";
import { JSX, useContext, useEffect, useRef, useState} from "react";
import { DisplayContext } from "../../contexts/DisplayContext";
import { IFolder, IList} from "@/utils/types";
import FutureSetting from "@/components/2077/settings/FutureSettings";
import FutureSideBar from "@/components/2077/sideBar/FutureSideBar";
import FutureWindowLayout from "@/components/2077/window/FutureWindowLayout";
import FutureTime from "@/components/2077/date&time/FutureTime";
import FutureMedia from "@/components/2077/media/FutureMedia";
import { getValue } from "@/utils/functions";
import { useTranslation } from "react-i18next";
import FutureAboutMeCard from "@/components/2077/aboutMe/FutureAboutMeCard";

export default function FutureHome() {
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement>(null);
  const { openWindow, openFolders, pastWindowActive } = useContext(DisplayContext);
  
  const canResize = (name: string) => ![t('systemcore'), t('shutFuture'), t('contactFuture'), t('language'), t('about')].includes(name);

  const handleClickSideBar = (icon : IFolder | IList, isFuture: boolean) => {
    openWindow(icon, isFuture);
  };

  useEffect(() => {
    const playStartupSound = async () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.load();
        try {
          await audioRef.current.play();
        } catch (err) {
          console.warn("Le son n'a pas pu démarrer car l'utilisateur n'a pas encore interagi avec la page.");
        }
      }
    };
    
    playStartupSound();
  }, [audioRef]);

  return (
    <div className="w-full h-screen p-[1rem] future-font bg-[url('/images/futureBackground.jpg')] bg-cover bg-center bg-no-repeat overflow-auto">
      <div 
        className="bg-slate-800/80 relative w-full min-h-full flex items-center justify-center" 
        style={{ clipPath: "polygon(13% 3%, 87% 3%, 97% 13%, 97% 87%, 87% 97%, 13% 97%, 3% 87%, 3% 13%)"}}
      >
        <svg 
            className="absolute inset-0 pointer-events-none z-[100]" 
            width="100%" 
            height="100%" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
        >
          <path 
              d="M 13,3 L 87,3 L 97,13 L 97,87 L 87,97 L 13,97 L 3,87 L 3,13 Z"
              fill="none" 
              stroke="#22d3ee" 
              strokeWidth="14" 
              vectorEffect="non-scaling-stroke"
          />
          <path 
              d="M 30,3 L 70,3 L 68,6 L 32,6 Z" 
              fill="#22d3ee"
          />
          <path 
              d="M 32,94 L 68,94 L 70,97 L 30,97 Z" 
              fill="#22d3ee"
          />
          <path 
              d="M 3,30 L 3,70 L 5,68 L 5,32 Z" 
              fill="#22d3ee" 
          />
          <path 
              d="M 97,30 L 97,70 L 95,68 L 95,32 Z" 
              fill="#22d3ee" 
          />
        </svg>
        <div className="flex flex-col overflow-auto p-[2rem] pt-[4rem] pb-[4rem] w-full h-full lg:overflow-visible lg:grid lg:gap-4 absolute lg:top-[9%] lg:left-[3%] lg:w-[94%] lg:h-[82%] lg:grid-rows-12 lg:grid-cols-10 lg:p-[2rem]">
          <div className="order-1 row-span-2 col-span-3 col-start-1 row-start-9 lg:ml-[1rem] lg:order-none mb-8 lg:mb-0">
            <FutureTime />
          </div>
          <div className="order-2 row-span-6 col-span-3 row-start-1 col-start-1 lg:ml-[1rem] lg:mt-[3rem] lg:order-none mb-8 lg:mb-0">
            <FutureSetting />
          </div>
          <div className="order-3 row-span-10 col-span-4 col-start-4 relative flex items-center justify-center lg:order-none mb-8 lg:mb-0">
            <FutureProjectsList />
          </div>
          <div className="order-4 row-span-8 col-span-3 col-start-8 row-start-1 lg:mr-[1rem] lg:order-none mb-8 lg:mb-0">
            <FutureAboutMeCard />
          </div>
          <div className="order-5 row-span-2 col-span-3 col-start-8 row-start-9 lg:order-none mb-8 lg:mb-0">
            <FutureMedia />
          </div>
          <div className="order-6 row-span-2 row-start-11 col-span-10 lg:order-none">
            <FutureSideBar icons={openFolders} handleClick={handleClickSideBar}/>
          </div>
          {pastWindowActive === t('shutFuture') && (
            <div className="fixed inset-0 z-[40] bg-black/10" />
          )}
        </div>
        {openFolders.length > 0 && openFolders.map((folder: IFolder | IList) =>{ 
          const name = getValue(folder.name, true) as string;
          const isSpecial = name === t('shutFuture') ;

          return (
            <FutureWindowLayout 
              projectName={getValue(folder.name, true) as string} 
              key={`window-${name}`}
              minimize={!isSpecial}
              resize={canResize(name)}
            >
              {folder.component ? (getValue(folder.component, true) as JSX.Element) : null}
            </FutureWindowLayout>
          );
        })}
      </div>
      <audio ref={audioRef} src="/sound/2077-Breaching.wav" preload="auto" />
    </div>
  );
}