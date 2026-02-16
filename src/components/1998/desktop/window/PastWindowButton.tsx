import React from "react";

interface IPastWindowButtonProps {
  icon: React.ReactElement;
  handleClick: () => void;
  isFuture?: boolean;
}

export default function PastWindowButton({ icon, handleClick, isFuture }: IPastWindowButtonProps) {
  const style = isFuture 
  ? "text-white cursor-pointer items-center group font-bold"
  : "cursor-default bg-[#BCBEBC] w-[1.3rem] h-[1.1rem] pb-[.2rem] items-end text-black justify-center border-1 border-gray-300 border-b-[#424242] border-r-[#424242] shadow-[1px_1px_0_0_black,-1px_-1px_0_0_white]"
  
  return (
    <div
        onClick={handleClick}
        className={`${style} flex`}
    >
      {isFuture && (
        <p className="pr-[.2rem] group-hover:text-[#CF5CCD] text-[1.5rem]">{`[`}</p>
      )}
        {icon}
      {isFuture && (
        <p className="pl-[.2rem] group-hover:text-[#CF5CCD] text-[1.5rem]">{`]`}</p>
      )}
    </div>       
  );
}