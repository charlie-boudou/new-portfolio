'use client';

import { useContext, useEffect, useRef, useState } from "react";
import { DisplayContext } from "../../contexts/DisplayContext";
import PastWindow from '@/components/1998/desktop/window/PastWindow';
import PastShutDownWindow from "@/components/1998/desktop/window/PastShutDownWindow";

export default function PastHome() {
  const { isShutDown } = useContext(DisplayContext);
  const audioRefOn = useRef<HTMLAudioElement>(null);
  const audioRefOff = useRef<HTMLAudioElement>(null);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const playStartupSound = async () => {
      if (audioRefOn.current) {
        audioRefOn.current.volume = 0.4;
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
    <>
      <audio ref={audioRefOn} src="/sound/windows-98-startup.mp3" preload="auto" />
      <audio ref={audioRefOff} src="/sound/windows-98-shutdown.mp3" preload="auto" />
      {isShutDown ? (
        <PastShutDownWindow />
      ) : (
        <PastWindow isMounted={isMounted} />
      )}
    </>
  );
}
