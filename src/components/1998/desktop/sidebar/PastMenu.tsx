'use client';

import { folders } from "@/utils/datas";
import { IFolder } from "@/utils/types";
import arrow from "@/assets/arrow.svg";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect, useContext } from "react";
import SubMenu from "./PastSubMenu";
import { DisplayContext } from "../../../../contexts/DisplayContext";


export default function PastMenu() {
  const { t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);
  const { isPastMenuActive, updateIsPastMenuActive, openFolders, updateOpenFolders, updatePastWindowActive } = useContext(DisplayContext);
  const generateId = () => crypto.randomUUID();

  const [activeMenu, setActiveMenu] = useState<string>("");

  const handleClick = (folder: IFolder) => {
    const isAlreadyOpen = openFolders.some(f => f.name === folder.name);

    if (folder.list && folder.list.length > 0 && folder.name !== t('shut')) { return; }

    if (!isAlreadyOpen) {
      updateOpenFolders(prev => [...prev, folder]);
    }

    updateIsPastMenuActive(!isPastMenuActive);
    updatePastWindowActive(folder.name);
  };


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        updateIsPastMenuActive(false);
        setActiveMenu("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [updateIsPastMenuActive]);

  return (
    <div
      ref={menuRef}
      className="
        absolute bottom-[3rem] left-[.3rem] z-5000
        w-fit
        bg-[#BCBEBC] text-black
        border-2 border-gray-300 border-b-[#424242] border-r-[#424242]
        shadow-[1px_1px_0_0_black,-1px_-1px_0_0_white]
        flex
      "
    >
      <div 
      className="
        w-[2rem] 
        bg-gradient-to-t from-[#030171] to-[#1084d0]
        flex items-end justify-center 
        pb-[.5rem]
      "
    >
      <p 
        className="
          text-white font-bold text-xl tracking-wider
          [writing-mode:vertical-lr] rotate-180
          select-none
        "
      >
        <span className="font-black">{`${"</>Charlie"}`}</span>
      </p>
    </div>
      <div>
        {folders(t).map((folder: IFolder) => {
          const isActive = activeMenu === folder.name;
          const isShutdown = folder.name === t("shut");

          return (
            <div key={generateId()} className="relative">
              {isShutdown && (
                <div className="my-[.3rem] border-t-2 border-b-2 border-t-[#7C7A7C] border-b-white px-[.2rem]" />
              )}

              <div
                className={`
                  flex items-center space-x-[.5rem]
                  p-[.5rem]
                  hover:bg-[#030171] hover:text-white
                  ${isActive ? "bg-[#030171] text-white" : ""}
                `}
                onMouseEnter={() => setActiveMenu(folder.name)}
                onMouseLeave={() => setActiveMenu("")}
                onClick={() => handleClick(folder)}
              >
                <div className="w-[2.5rem] h-[2.5rem] flex items-center justify-center">
                  {folder.icon}
                </div>

                <p>{folder.name}</p>

                {folder.list && (
                  <>
                    <div className="ml-auto pl-[3rem]">
                      <Image
                        src={arrow}
                        alt="arrow"
                        className={`w-[.5rem] h-[.5rem] ${isActive ? "invert" : ""}`}
                      />
                    </div>
                    <div className="relative">
                      <SubMenu folder={folder} activeMenu={activeMenu} />
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
