'use client';

import Link from "next/link";
export default function FutureFrame() {
  return (
    <div className="w-full h-full relative flex flex-col items-center justify-center text-white">
      UNDER CONSTRUCTION
      <Link 
        className={`
          relative
          px-[1.5rem] 
          py-[.5rem] 
          outline-none 
          w-fit 
          text-[1rem]
          md:text-[1.5rem] 
          text-center 
          cursor-pointer
          past-font
          flex items-center justify-center
          text-[#22d3ee]
          mt-[.5rem]
        `}
        href="/"
      >
        <svg 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            style={{ overflow: 'visible' }}
        >
            <path 
                d="M 10,0 L 90,0 L 100,10 L 100,90 L 90,100 L 10,100 L 0,90 L 0,10 Z" 
                fill="rgba(15, 23, 42, 0.4)" 
            />
            <path 
                d="M 10,0 L 90,0 L 100,10 L 100,90 L 90,100 L 10,100 L 0,90 L 0,10 Z" 
                fill="none" 
                stroke="#22d3ee" 
                strokeWidth="2" 
                vectorEffect="non-scaling-stroke"
            />
            <line x1="30" y1="0" x2="70" y2="0" stroke="#22d3ee" strokeWidth="6" vectorEffect="non-scaling-stroke" />
            <line x1="30" y1="100" x2="70" y2="100" stroke="#22d3ee" strokeWidth="6" vectorEffect="non-scaling-stroke" />
        </svg>
        <p className="relative z-10">Home</p>
      </Link>
    </div>
  );
}