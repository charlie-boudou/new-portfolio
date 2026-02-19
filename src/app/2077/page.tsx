'use client';

import { useContext, useEffect, useRef } from "react";
import { DisplayContext } from "../../contexts/DisplayContext";
import FutureWindow from "@/components/2077/window/FutureWindow";
import FutureShutDownWindow from "@/components/2077/window/FutureShutDownWindow";

export default function FutureHome() {
  const audioRefOn = useRef<HTMLAudioElement>(null);
  const audioRefOff = useRef<HTMLAudioElement>(null);
  const { isShutDown } = useContext(DisplayContext);

  useEffect(() => {
    const playStartupSound = async () => {
      if (audioRefOn.current) {
        audioRefOn.current.volume = 0.6;
        audioRefOn.current.load();
        try {
          await audioRefOn.current.play();
        } catch (err) {
          console.warn("Le son n'a pas pu démarrer car l'utilisateur n'a pas encore interagi avec la page.");
        }
      }
    };
    
    playStartupSound();
  }, [audioRefOn]);

  useEffect(() => {
    const playShutDownSound = async () => {
      if (audioRefOff.current && isShutDown) {
        audioRefOff.current.volume = 0.6;
        audioRefOff.current.load();
        try {
          await audioRefOff.current.play();
        } catch (err) {
          console.warn("Le son n'a pas pu démarrer car l'utilisateur n'a pas encore interagi avec la page.");
        }
      }
    };
    
    playShutDownSound();
  }, [isShutDown]);

  return (
    <div className="w-full h-screen p-[1rem] future-font bg-[url('/images/futureBackground.jpg')] bg-cover bg-center bg-no-repeat overflow-auto">
      <audio ref={audioRefOn} src="/sound/2077-Breaching.wav" preload="auto" />
      <audio ref={audioRefOff} src="/sound/2077-Open-Menu.wav" preload="auto" />
      <div 
        className="bg-slate-800/80 relative w-full min-h-full flex items-center justify-center" 
        style={{ clipPath: "polygon(13% 3%, 87% 3%, 97% 13%, 97% 87%, 87% 97%, 13% 97%, 3% 87%, 3% 13%)"}}
      >
        <svg 
            className="absolute inset-0 pointer-events-none z-[100]" 
            width="100%" 
            height="100%" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
        >
          <path 
              d="M 13,3 L 87,3 L 97,13 L 97,87 L 87,97 L 13,97 L 3,87 L 3,13 Z"
              fill="none" 
              stroke="#22d3ee" 
              strokeWidth="14" 
              vectorEffect="non-scaling-stroke"
          />
          <path 
              d="M 30,3 L 70,3 L 68,6 L 32,6 Z" 
              fill="#22d3ee"
          />
          <path 
              d="M 32,94 L 68,94 L 70,97 L 30,97 Z" 
              fill="#22d3ee"
          />
          <path 
              d="M 3,30 L 3,70 L 5,68 L 5,32 Z" 
              fill="#22d3ee" 
          />
          <path 
              d="M 97,30 L 97,70 L 95,68 L 95,32 Z" 
              fill="#22d3ee" 
          />
        </svg>
        {isShutDown ? (
            <FutureShutDownWindow />
        ) : (
            <FutureWindow />
        )}
      </div>
    </div>
  );
}