'use client';

import FutureProjectsList from "@/components/2077/projects/FutureProjectsList";
import { JSX, useContext } from "react";
import { DisplayContext } from "../../../contexts/DisplayContext";
import { IFolder, IList} from "@/utils/types";
import FutureSetting from "@/components/2077/settings/FutureSettings";
import FutureSideBar from "@/components/2077/sideBar/FutureSideBar";
import FutureWindowLayout from "@/components/2077/window/FutureWindowLayout";
import FutureTime from "@/components/2077/date&time/FutureTime";
import FutureMedia from "@/components/2077/media/FutureMedia";
import { getValue } from "@/utils/functions";
import { useTranslation } from "react-i18next";
import FutureAboutMeCard from "@/components/2077/aboutMe/FutureAboutMeCard";

export default function FutureWindow() {
  const { t } = useTranslation();
  const { openWindow, openFolders, windowActive } = useContext(DisplayContext);
  
  const canResize = (name: string) => ![t('systemcore'), t('shutFuture'), t('contactFuture'), t('about')].includes(name);

  const handleClickSideBar = (icon : IFolder | IList, isFuture: boolean) => {
    openWindow(icon, isFuture);
  };

  return (
    <>
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
            {windowActive === t('shutFuture') && (
                <div className="fixed inset-0 z-[40] bg-black/10" />
            )}
        </div>
        {openFolders.length > 0 && openFolders.map((folder: IFolder | IList) =>{ 
            const name = getValue(folder.name, true) as string;
            const isSpecial = name === t('shutFuture') ;
            const isResize = canResize(name);

            return (
            <FutureWindowLayout 
                projectName={getValue(folder.name, true) as string} 
                key={`window-${name}`}
                minimize={!isSpecial}
                resize={isResize}
            >
                {folder.component ? (getValue(folder.component, true) as JSX.Element) : null}
            </FutureWindowLayout>
            );
        })}
    </>
  );
}