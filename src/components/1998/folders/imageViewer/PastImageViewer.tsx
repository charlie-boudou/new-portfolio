'use client';

import { useRef, useState } from 'react';
import { projects } from '@/utils/datas';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { IProject } from '@/utils/types';
import PastScrollBar from '../../PastScrollBar';

export default function PastImageViewer() {
    const { t } = useTranslation();
    const scrollRef = useRef<HTMLDivElement>(null);
    
    const [allImages] = useState<string[]>(() => {
        const allProjects: IProject[] = projects(t);
        const allPictures = allProjects.flatMap(project => project.pictures);
        return Array.from(new Set(allPictures));
    });
    const [selectedImage, setSelectedImage] = useState(allImages[0]);

    const borderOutset = "border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080]";
    const borderInset = "border-2 border-b-white border-r-white border-t-[#808080] border-l-[#808080]";

    return (
        <div className="flex flex-col h-full bg-[#BCBEBC] p-[.3rem]">
            <div className='text-black w-full px-[.3rem] py-[.1rem] border-2 border-gray-300 border-b-[#424242] border-r-[#424242] shadow-[1px_1px_0_0_black,-1px_-1px_0_0_white] shrink-0'>
                Images
            </div>
            <div className="flex flex-1 min-h-0 gap-1">
                <div className={`${borderInset} bg-white w-[8rem] shrink-0 flex relative`}>
                    <div 
                        ref={scrollRef} 
                        className="flex-1 overflow-y-auto scrollbar-none no-scrollbar scroll-smooth"
                    >
                        <div className="flex flex-col gap-4 p-[.5rem]">
                            {allImages.map((img: string, index: number) => (
                                <div 
                                    key={index}
                                    onClick={() => setSelectedImage(img)}
                                    className={`flex flex-col items-center p-[.3rem] ${selectedImage === img ? 'bg-[#000080] text-white' : 'text-black'}`}
                                >
                                    <div className={`relative w-[5rem] h-[4rem] bg-white flex items-center justify-center border ${selectedImage === img ? 'border-white' : 'border-gray-400'}`}>
                                        <Image 
                                            src={img} 
                                            alt={`thumb-${index}`} 
                                            className="max-w-[90%] max-h-[90%] object-contain"
                                            width={400}
                                            height={400}
                                        />
                                    </div>
                                    <p className="text-[.6rem] mt-[.3rem] break-all text-center leading-tight">
                                        image_{index + 1}.png
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <PastScrollBar scrollRef={scrollRef} projects={allImages}/>
                </div>
                <div className={`${borderInset} bg-[#BCBEBC] flex-1 flex flex-col p-[1rem] w-full min-w-0`}>
                    <div className="flex-1 relative bg-white border border-[#808080] shadow-[inset_1px_1px_0_0_black]">
                        <Image 
                            src={selectedImage} 
                            alt="Preview" 
                            fill
                            className="object-contain p-[.5rem]"
                            sizes="(max-width: 768px) 100vw, 50vw" 
                            priority
                        />
                    </div>
                    <div className="mt-4 shrink-0">
                        <p className="text-sm font-bold truncate">{selectedImage.split('/').pop()}</p>
                        <p className="text-[10px] text-gray-600 uppercase">Type : Image PNG</p>
                    </div>
                </div>
            </div>
            <div className="shrink-0 mt-[.3rem] flex items-center h-[2rem] bg-[#BCBEBC] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white">
                <div className="flex-1 px-[.3rem] text-[.8rem] text-black truncate">
                    {`${allImages.length} ${t('objetSelected')}`}
                </div>
                <div className="w-[7rem] h-full border-l-2 border-l-[#808080] shadow-[1px_0_0_0_white_inset]" />
            </div>  
        </div>
    );
}