'use client';

import { folders } from "@/utils/datas";
import { IFolder } from "@/utils/types";
import arrow from "@/assets/arrow.svg";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect, useContext, JSX } from "react";
import SubMenu from "./PastSubMenu";
import { DisplayContext } from "../../../../contexts/DisplayContext";
import { getValue } from "@/utils/functions";

export default function PastMenu() {
  const { t } = useTranslation();
  const menuRef = useRef<HTMLDivElement>(null);
  const { openWindow, updateIsMenuActive } = useContext(DisplayContext);

  const [activeMenu, setActiveMenu] = useState<string>("");

  const handleClick = (folder: IFolder, folderName: string, isActive: boolean) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

    if (folder.list && !isMobile) {
      setActiveMenu(isActive ? "" : folderName);
    } else {
      openWindow(folder, false);
      updateIsMenuActive(false);
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        updateIsMenuActive(false);
        setActiveMenu("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [updateIsMenuActive]);

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
          const folderName = getValue(folder.name, false) as string;
          const folderIcon = getValue(folder.icon, false) as JSX.Element;

          const isActive = activeMenu === folderName;
          const isShutdown = folderName === t("shut");

          return (
            <div key={`menu-${folderName}`} className="relative">
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
                onMouseEnter={() => setActiveMenu(folderName)}
                onMouseLeave={() => setActiveMenu("")}
                onClick={() => handleClick(folder, folderName, false)}
              >
                <div className="w-[2.5rem] h-[2.5rem] flex items-center justify-center">
                  {folderIcon}
                </div>

                <p>{folderName}</p>

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
