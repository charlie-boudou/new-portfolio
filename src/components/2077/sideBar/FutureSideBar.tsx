'use client';

import { Dispatch, SetStateAction } from "react";
import { IFolder, IList } from "@/utils/types";
import FutureProjectIcon from '../FutureProjectIcon';
import Image from 'next/image';

interface IFutureSideBarProps {
  icons: IFolder[] | IList[] | string[];
  handleClick?: (icon: IFolder | IList, isFuture: boolean) => void;
  selectedImage?: string;
  setSelectedImage?: Dispatch<SetStateAction<string>>;
}

export default function FutureSideBar({ icons, handleClick, selectedImage, setSelectedImage }: IFutureSideBarProps) {
    return (
        <div className={`w-full h-full ${!selectedImage ? 'flex items-center justify-center' : ''}`}>
            <div className={`flex items-center justify-center ${!selectedImage ? 'relative w-full mb-[2rem] lg:mb-0 lg:w-[70%] h-full mt-[2rem] mx-auto' : 'w-full h-full'}`}>
                <svg 
                    className="absolute inset-0 pointer-events-none z-[10]" 
                    width="100%" 
                    height="100%" 
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none"
                >
                    <path 
                        d="M 4,25 L 4,3 L 96,3 L 96,25" 
                        fill="none" 
                        stroke="#22d3ee" 
                        strokeWidth="2" 
                        vectorEffect="non-scaling-stroke"
                    />
                    <path 
                        d="M 4,75 L 4,97 L 96,97 L 96,75" 
                        fill="none" 
                        stroke="#22d3ee" 
                        strokeWidth="2" 
                        vectorEffect="non-scaling-stroke"
                    />
                    <path d="M 5,25 L 8,50 L 5,75" fill="none" stroke="#22d3ee" strokeWidth="2" />
                    <path d="M 1,25 L 4,50 L 1,75" fill="none" stroke="#22d3ee" strokeWidth="2" opacity="0.4" />
                    <path d="M 95,25 L 92,50 L 95,75" fill="none" stroke="#22d3ee" strokeWidth="2" />
                    <path d="M 99,25 L 96,50 L 99,75" fill="none" stroke="#22d3ee" strokeWidth="2" opacity="0.4" />
                </svg>
                <div className={`max-w-[90%] h-full m-auto overflow-auto flex items-center ${!selectedImage ? 'space-x-[.5rem] p-[.5rem] justify-center' : 'flex-1 no-scrollbar scroll-smooth px-[1.5rem] gap-4'}`}>
                    {icons.map((icon: IFolder | IList | string, index: number) => {
                        if( typeof icon === 'string' && selectedImage && setSelectedImage ) {
                            return (
                                <div 
                                    key={index}
                                    onClick={() => setSelectedImage(icon)}
                                    className="group cursor-pointer relative shrink-0"
                                >
                                    <div className={`
                                        relative w-[6rem] aspect-video overflow-hidden transition-all duration-500
                                        ${selectedImage === icon 
                                            ? 'border-b-2 border-cyan-400 scale-105' 
                                            : 'border-b border-white/10 hover:border-white/40'}
                                    `}>
                                        <Image 
                                            src={icon} 
                                            alt={`thumb-${index}`} 
                                            className={`
                                                w-full h-full object-cover transition-all duration-700
                                                ${selectedImage === icon ? 'blur-[1px] opacity-60' : 'grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-100'}
                                            `}
                                            width={100}
                                            height={100}
                                        />
                                        {selectedImage === icon && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-[1rem] h-[1rem] border border-cyan-400 rotate-45 animate-spin" />
                                            </div>
                                        )}
                                    </div>
                                    <p className={`
                                        text-[.5rem] mt-[.2rem] tracking-tighter text-center transition-colors
                                        ${selectedImage === icon ? 'text-cyan-400 font-bold' : 'text-zinc-600'}
                                    `}>
                                        NODE_{index.toString().padStart(3, '0')}
                                    </p>
                                </div>
                            );
                        }

                        return (
                            <FutureProjectIcon key={`sidebar-icon-${index}`} project={icon as IFolder} handleClick={() => handleClick && handleClick(icon as IFolder, true)} i={index} isSideBar />
                        );
                        
                    })}
                </div>
            </div>
        </div>
    );
}