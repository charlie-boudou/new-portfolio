'use client';

import { useTranslation } from 'react-i18next';

interface IButtonProps {
    title: string;
    handleClick: (title: string) => void;
}

export default function Button({ title, handleClick }: IButtonProps) {
    const { t } = useTranslation();

    return (
        <div 
            className={`
                relative
                px-[1.5rem] 
                py-[.5rem] 
                outline-none 
                w-[15%] 
                text-[1rem]
                md:text-[1.5rem] 
                text-center 
                cursor-pointer
                past-font
                flex items-center justify-center
                ${title === t('yes') 
                    ? 'bg-[#BCBEBC] text-black border-t-[1.5px] border-t-white border-l-[1.5px] border-l-white border-r-[1.5px] border-r-[#7C7A7C] border-b-[1.5px] border-b-[#7C7A7C] shadow-[1px_1px_0_0_black,inset_-1px_-1px_0_0_#BCBEBC]'
                    : 'text-[#22d3ee]'
                }
            `}
            onClick={() => handleClick(title)}
        >
            {title === t('no') && (
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
            )}
            <p className="relative z-10">{title}</p>
        </div>
    )
}