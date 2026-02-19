'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

export default function PastShutDownWindow() {
    const { t } = useTranslation();

    const [step, setStep] = useState<'LOADING' | 'READY'>('LOADING');

    useEffect(() => {
        const timer = setTimeout(() => {
            setStep('READY');
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-screen h-screen fixed inset-0 bg-black z-[9999] flex items-center justify-center past-font">
            {step === 'LOADING' ? (
                <div className="flex flex-col items-center">
                    <div className="w-full h-full bg-[#c0c0c0] border-t-white border-l-white border-b-[#808080] border-r-[#808080] border-2 p-[.2rem] shadow-black">
                        <div className="bg-[#000080] px-[.5rem] py-[.2rem] flex items-center">
                            <span className="text-white text-[12px] font-bold">{t('pastShutWindow')}</span>
                        </div>
                        <div className="p-4 flex flex-col items-center justify-center h-full">
                            <p className="text-[.8rem] text-black text-center mb-[1rem]">
                                {t('pastShutWindowDesc')}
                            </p>
                            <div className="w-[80%] h-[1rem] border-b-white border-r-white border-t-[#808080] border-l-[#808080] border shadow-inner overflow-hidden flex p-[1px]">
                                <motion.div 
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 3, ease: "easeInOut" }}
                                    className="h-full bg-[#000080]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center flex flex-col items-center justify-center select-none">
                    <p className="text-[#ff8000] text-[1.5rem] md:text-[2rem] font-bold tracking-tight text-center leading-tight">
                        {t('pastShutWindowTurnOff1')} <br /> 
                        {t('pastShutWindowTurnOff2')}
                    </p>
                </div>
            )}
        </div>
    );
}