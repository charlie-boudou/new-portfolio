'use client'

import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import Button from "./Button";

export default function ChoiceCard() {
    const { t } = useTranslation();
    const router = useRouter();

    const handleClick = (title: string) => {
        title === t('yes') ? router.push('/1998') : router.push('/2077');
    }

    return (
        <div className="relative flex w-[95%] md:[60%] lg:w-[40%] h-[50%] m-auto">
            <div
                className={`
                    flex flex-col
                    border-t-2 border-l-2 border-b-2 border-gray-300 border-b-[#424242]
                    shadow-[0_1px_0_0_black,0_-1px_0_0_white]
                    py-[.1rem]
                    pl-[.1rem]
                    bg-[#BCBEBC]/80
                    w-[50%] h-full
                `}
            >
                <div 
                    className="bg-[#030171]/80 past-font p-[.3rem] text-white flex justify-between items-center shrink-0"
                >
                    <p>{`</> Charlie - Portfolio 1.0`}</p>
                </div>
                <div className='w-full h-full flex flex-col'>
                    <div className='text-black w-full px-[.3rem] py-[.1rem] border-t-2 border-l-2 border-b-2 border-gray-300 border-b-[#424242] shadow-[0_1px_0_0_black,0_-1px_0_0_white] shrink-0 border-r-0'>
                        Files
                    </div>
                    <div className="flex h-full w-full overflow-y-auto scrollbar-none bg-white/80 border-b-2 border-r-0 border-white shadow-[0_-1px_0_0_#808080]">
                        <div  className="flex-1 overflow-y-auto scrollbar-none">
                            <div className="grid grid-rows-4 grid-flow-col gap-4 w-max px-[.5rem]" />
                        </div>
                    </div>
                    <div className="shrink-0 mt-[.3rem] flex items-center h-[2rem] bg-[#BCBEBC]/80 border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-0">
                        <div className="flex-1 px-[.3rem] text-[.8rem] text-black truncate">
                            8 Files
                        </div>
                        <div className="w-[4rem] h-full border-l-2 border-l-[#808080]" />
                    </div>   
                </div> 
            </div>
           <div 
                className="w-[50%] relative h-[99%] flex items-center justify-center overflow-visible"
            >
                <svg 
                    className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" 
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none"
                >
                    <path 
                        d="M 0,0 L 100,0 L 100,85 L 85,100 L 0,100"
                        fill="none" 
                        stroke="#22d3ee" 
                        strokeWidth="2" 
                        vectorEffect="non-scaling-stroke"
                    />
                    <path 
                        d="M 80,0 L 100,0 L 100,20"
                        fill="none" 
                        stroke="#22d3ee" 
                        strokeWidth="6" 
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="square"
                    />
                </svg>
                <div 
                    className="absolute inset-0 opacity-10 pointer-events-none w-full h-full z-50" 
                    style={{ 
                        backgroundImage: 'linear-gradient(#4ade80 1px, transparent 1px), linear-gradient(90deg, #4ade80 1px, transparent 1px)', 
                        backgroundSize: '20px 20px',
                        clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)"
                    }}
                />
                <div 
                    className="bg-slate-800/80 w-full h-full border-l-0 backdrop-blur-sm"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)" }}
                >
                    <div 
                        className="py-[.6rem] px-[1rem] text-[#22d3ee] flex justify-end items-center shrink-0 border-b-2 border-b-[#22d3ee]"
                    >
                        <p className="future-font tracking-widest text-[.7rem]">{`</> Charlie - Neural Portfolio v.77`}</p>
                    </div>
                </div>
            </div>
            <div className='absolute inset-0 flex flex-col space-y-[3rem] items-center justify-center'>
                <div className=' text-[1.5rem] md:text-[2rem] future-font bg-gradient-to-r from-black via-cyan-900 to-[#22d3ee] bg-clip-text text-transparent'>
                    {t("goFuture")}
                </div>
                <div className='flex items-center w-full justify-center space-x-[5rem]'>
                    <Button handleClick={handleClick} title={t('yes')} />
                    <Button handleClick={handleClick} title={t('no')} />
                </div>
            </div>
        </div>
    )
}