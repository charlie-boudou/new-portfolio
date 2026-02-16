'use client';

import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Earth from './Earth';
import { settings } from '@/utils/datas';
import { ISetting, ILanguage } from '@/utils/types';
import { getValue } from '@/utils/functions';
import LanguageCard from './FutureLanguageCard';

export default function FutureLanguage() {
  const { t } = useTranslation();

  const languages = settings(t).find((el: ISetting) => getValue(el.name, true) === t('language'));

  return (
    <div className="w-full h-full flex flex-col items-center justify-between overflow-hidden py-[.5rem] px-[.2rem]">
      <div className="w-full mb-[.5rem] self-start shrink-0">
        <div className="flex items-center gap-2">
          <div className="h-[1rem] w-1 bg-[#CF5CCD] shadow-[0_0_8px_#22d3ee]" />
          <p className="text-cyan-400 tracking-[0.2em] uppercase italic font-bold leading-none">
            {languages?.infos[0].title}
          </p>
        </div>
        <div className="w-full h-[1px] bg-cyan-400/30 mt-[.5rem] relative overflow-hidden">
            <div className="absolute inset-0 w-1/4 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-[shimmer_3s_infinite]" />
        </div>
      </div>
      <div className="flex flex-col space-y-[.5rem] lg:flex-row items-center justify-around w-full flex-1 min-h-0 gap-2">
        <div className="w-full lg:w-[30%] order-2 lg:order-1">
            <LanguageCard 
                item={(languages?.infos?.[0]?.content?.[0] as ILanguage) || null} 
                index={1} 
            />
        </div>
        <div className="relative w-[10rem] h-[10rem] md:w-[13rem] md:h-[13rem] order-1 lg:order-2 shrink flex items-center justify-center">
          <div className="absolute inset-0 bg-cyan-400/10 rounded-full blur-[2rem] pointer-events-none" />  
          <div className="w-full h-full">
            <Suspense fallback={null}>
               <Canvas
                  camera={{ position: [0, 0, 2.5] }}
                  dpr={[1, 1.5]}
                >
                  <ambientLight intensity={1} />
                  <Earth />
                  <OrbitControls enableZoom={false} enablePan={false} />
                </Canvas>

            </Suspense>
          </div>
        </div>
        <div className="w-full lg:w-[30%] order-3">
            <LanguageCard 
                item={(languages?.infos?.[0]?.content?.[1] as ILanguage) || null} 
                index={1} 
            />
        </div>
      </div>
    </div>
  );
}