import FutureProjectsList from "@/components/2077/FutureProjectsList";
import Image from "next/image";


export default function FutureHome() {
  return (
    <div className="w-full h-screen p-[1rem] future-font bg-[url('/images/futureBackground.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="relative w-full h-full flex items-center justify-center">
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
        <div className="grid gap-4 absolute top-[9%] left-[3%] w-[94%] h-full grid-rows-6 grid-cols-10 p-[2rem]">
          <div className="border row-span-3 col-span-3">1</div>
          <div className="border row-span-5 col-span-4 relative flex items-center justify-center">
            <div className="relative w-[90%] h-[70%] flex items-center justify-center p-[.5rem] rounded-full bg-gradient-to-b from-cyan-400 to-[#CF5CCD] shadow-[0_0_20px_rgba(34,211,238,0.5)]">
              <div className="w-full h-full bg-slate-800 rounded-full p-[.8rem] flex items-center justify-center">
                <div className="w-full h-full bg-cyan-400 rounded-full p-[.2rem] flex items-center justify-center">
                  <div className="w-full h-full bg-slate-800 rounded-full p-[.2rem] flex items-center justify-center">
<svg 
  className="absolute inset-0 w-full h-full pointer-events-none" 
  viewBox="0 0 100 100" 
  preserveAspectRatio="xMidYMid meet" // Important pour que le HUD reste rond
  style={{ overflow: 'visible' }}
>

  {/* --- 2. LE HUD CIRCULAIRE --- */}
  <g className="hud-center">
    
    {/* Anneau principal segmenté (épais) */}
    <circle 
      cx="50" cy="50" r="38" 
      fill="none" 
      stroke="#22d3ee" 
      strokeWidth="3" 
      strokeDasharray="32 0 32 0 32 0" // Crée les segments irréguliers
      vectorEffect="non-scaling-stroke"
      opacity="0.8"
    />

    {/* Anneau interne avec encoches (segments plus courts) */}
    <circle 
      cx="50" cy="50" r="32" 
      fill="none" 
      stroke="#22d3ee" 
      strokeWidth="1.5" 
      strokeDasharray="2 4" // Petits pointillés techniques
      vectorEffect="non-scaling-stroke"
      opacity="0.6"
    />
  </g>

</svg>
                  </div>
                </div>
              </div>
            </div>
            {/*<div className="relative w-[90%] h-[70%] flex items-center justify-center p-[2px] rounded-full bg-gradient-to-b from-cyan-400 to-[#CF5CCD] shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                <div className="bg-slate-800 w-full h-full rounded-full p-[1rem] text-white flex items-center justify-center">
                  <FutureProjectsList />
                </div>
            </div>*/}
          </div>
          <div className="border row-span-2 col-span-3 flex items-center justify-center">
            3
          </div>
          <div className="border row-span-3 col-span-3">4</div>
          <div className="border row-span-2 col-span-3 col-start-1">5</div>
        </div>
      </div>
    </div>
  );
}