'use client';

import { IFolder, IList } from "@/utils/types";
import Link from "next/link";
import { JSX, useContext } from "react";
import { DisplayContext } from "../../../../contexts/DisplayContext";
import { getValue } from "@/utils/functions";

interface IPastSubMenuProps {
    folder: IFolder;
    activeMenu: string;
}

export default function PastSubMenu({ folder, activeMenu }: IPastSubMenuProps) {
  const { openWindow } = useContext(DisplayContext);
  const folderName = getValue(folder.name, false) as string;

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
        ${activeMenu === folderName ? "block" : "hidden"}
      `}
    >
      {folder.list?.map((sub: IList) => {
        const subName = getValue(sub.name, false) as string;
        const subIcon = getValue(sub.icon, false) as JSX.Element;

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
              {subIcon}
            </div>
            <p className="pr-[2rem]">{subName}</p>
          </>
        );

        if (sub.href) {
          return (
            <Link
              key={`link-${subName}`}
              href={sub.href}
              className={commonClasses}
            >
              {content}
            </Link>
          );
        }

        return (
          <div
            key={`link-${subName}`}
            onClick={() => openWindow(sub, false)}
            className={commonClasses}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
