'use client';

import { IFolder, IList } from "@/utils/types";
import Link from "next/link";
import { useContext } from "react";
import { DisplayContext } from "../../../contexts/DisplayContext";

interface IPastSubMenuProps {
    folder: IFolder;
    activeMenu: string;
}

export default function PastSubMenu({ folder, activeMenu }: IPastSubMenuProps) {
  const generateId = () => crypto.randomUUID();
  const { hiddenFolders, updateHiddenFolders, updateSelectedIconOffice, openFolders, updateOpenFolders, updatePastWindowActive } = useContext(DisplayContext);

  const handleClick = (sub: IList) => {
      const isAlreadyOpen = openFolders.some(el => el.name === sub.name);
      if (!isAlreadyOpen) {
        const arr = hiddenFolders.filter(el => el !== sub.name);
  
        updateOpenFolders(prev => [...prev, sub]);
        updateHiddenFolders(arr);
      }
      updatePastWindowActive(sub.name);
      updateSelectedIconOffice('');
  };

  return (
    <div
      className={`
        absolute
        left-full
        ml-[2px]
        top-[-1.5rem]
        bg-[#BCBEBC]
        text-black
        border-2
        border-gray-300
        border-b-[#424242]
        border-r-[#424242]
        shadow-[1px_1px_0_0_black,-1px_-1px_0_0_white]
        z-5000
        w-fit
        ${activeMenu === folder.name ? "block" : "hidden"}
      `}
    >
      {folder.list?.map((sub: IList) => {
        const commonClasses = `
          flex items-center space-x-[.5rem]
          p-[.3rem]
          hover:bg-[#030171]
          hover:text-white
          whitespace-nowrap
          cursor-default
          group
        `;

        const content = (
          <>
            <div className="w-[2rem] h-[2rem] flex items-center justify-center">
              {sub.icon}
            </div>
            <p className="pr-[2rem]">{sub.name}</p>
          </>
        );

        if (sub.href) {
          return (
            <Link
              key={generateId()}
              href={sub.href}
              className={commonClasses}
            >
              {content}
            </Link>
          );
        }

        return (
          <div
            key={generateId()}
            onClick={() => handleClick(sub)}
            className={commonClasses}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
