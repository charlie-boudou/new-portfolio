'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import FutureCodeRain from './FutureCodeRain';
import { useTranslation } from 'react-i18next';

export default function FutureShutDownWindow() {
    const { t } = useTranslation();
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center absolute left-1/2 -translate-x-1/2">
            <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
                <FutureCodeRain />
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-50 bg-[length:100%_2px,3px_100%]" />
                <div className="absolute w-[30rem] h-[30rem] bg-[#CF5CCD]/10 rounded-full blur-[10rem] animate-pulse" />
                <div className="relative z-10 flex flex-col items-center">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mb-[1rem] text-cyan-400 text-[6rem] md:text-[8rem]"
                    >
                        <span className="relative inline-block animate-bounce">
                            ⚠
                            <span className="absolute top-0 left-0 -ml-[2px] text-[#CF5CCD] animate-ping">⚠</span>
                        </span>
                    </motion.div>
                    <h1 className="text-[1.5rem] md:text-[2.5rem] font-black text-white tracking-[0.5em] uppercase mb-[1rem] flex items-center">
                        {t('pastShutWindow').replace(' ', '_')}
                        <span className="text-[#CF5CCD] ml-2 w-[1rem] inline-block">{dots}</span>
                    </h1>
                    <div className="w-[18rem] md:w-[25rem] h-[0.5rem] bg-slate-800 border border-cyan-400/30 relative mb-[1rem]">
                        <motion.div 
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: 3, ease: "easeInOut" }}
                            className="h-full bg-gradient-to-r from-cyan-400 to-[#CF5CCD] shadow-[0_0_15px_#22d3ee]"
                        />
                    </div>
                    <div className="text-[#CF5CCD] uppercase tracking-widest text-center">
                        <p className="animate-pulse">{t('futureDisconnect')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}