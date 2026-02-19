'use client';

import PastStartButton from "./PastStartButton";
import PastMenu from "./PastMenu";
import { DisplayContext } from '../../../../contexts/DisplayContext';
import { useContext } from 'react';
import PastTime from "./PastTime";
import PastTabsBar from "./PastTabsBar";

export default function PastSideBar() {
    const { isMenuActive } = useContext(DisplayContext);

    const style = 'z-60 fixed flex items-center space-x-[.5rem] w-full pt-[.3rem] px-[.3rem] pb-[.2rem] bottom-0 bg-[#BCBEBC] shadow-[1px_1px_0_0_black,-1px_-1px_0_0_white] border-2 border-[#DCDEDC]';

    return (
      <div className="w-full">
        {isMenuActive && <PastMenu />}
        <div className={`${style}`}>
          <div className="flex-shrink-0">
            <PastStartButton />
          </div>
          <div className="flex items-center justify-between space-x-[.5rem] w-full min-w-0">
            <PastTabsBar />
            <div className="flex-shrink-0">
                <PastTime />
            </div>
          </div>
        </div>
      </div>
    )
}