import FutureProjectsList from "@/components/2077/FutureProjectsList";
import Image from "next/image";

export default function FutureHome() {
  return (
    <div className="w-full h-screen p-[1rem] future-font bg-[url('/images/futureBackground.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="w-full h-full">
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          style={{ overflow: 'visible' }}
        >
            <path 
              d="M 13,3 L 87,3 L 97,13 L 97,87 L 87,97 L 13,97 L 3,87 L 3,13 Z"
              fill="rgba(29, 41, 61, 0.9)"
            />
            <path 
              d="M 13,3 L 87,3 L 97,13 L 97,87 L 87,97 L 13,97 L 3,87 L 3,13 Z"
              fill="none" 
              stroke="#22d3ee" 
              strokeWidth="2" 
              vectorEffect="non-scaling-stroke"
            />
            <line x1="30" y1="3" x2="70" y2="3" stroke="#22d3ee" strokeWidth="10" vectorEffect="non-scaling-stroke" />
            <line x1="30" y1="97" x2="70" y2="97" stroke="#22d3ee" strokeWidth="10" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="relative w-full flex items-center justify-end">
          {/*<div className="relative w-[30%] top-[5rem] right-[5rem] flex items-center justify-center p-[2px] rounded-[1rem] bg-cyan-400">
            <div className="bg-slate-800 w-full h-full rounded-[1rem] p-[1rem] text-white flex flex-col items-center justify-center space-y-[.5rem]">
              <p>about me</p>
              <Image src="/images/me.png" alt="picture" width={400} height={400} className="w-[6rem] h-[8rem]" />
            </div>
          </div>*/}
        </div>
        <div className="w-full h-full relative flex items-center justify-center text-white">
          UNDER CONSTRUCTION
          {/*<div className="relative w-[90%] md:w-[28%] h-[38%] md:h-[48%] flex items-center justify-center p-[2px] rounded-full bg-gradient-to-b from-cyan-400 to-[#CF5CCD] shadow-[0_0_20px_rgba(34,211,238,0.5)]">
            <div className="bg-slate-800 w-full h-full rounded-full p-[1rem] text-white flex items-center justify-center">
              <FutureProjectsList /> 
            </div>
          </div>*/}
        </div>
      </div>
    </div>
  );
}