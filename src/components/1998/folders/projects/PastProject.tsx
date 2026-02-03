'use client';

import { useTranslation } from 'react-i18next';
import PastScrollBar from '../../PastScrollBar';
import Image from "next/image";
import PastButton from '../../PastButton';
import { useRouter } from 'next/navigation';
import { projects } from '@/utils/datas';
import { IProject } from '@/utils/types';
import { useRef } from 'react';

interface IPastProjectProps {
  projectName: string;
}
export default function PastProject({projectName}: IPastProjectProps) {
    const { t } = useTranslation();
    const generateId = () => crypto.randomUUID();
    const scrollRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const project: IProject = projects(t).find((project: IProject) => project.name === projectName);
    
    const handleClick = () => {
        router.push(project.link);
    };
    
    return (
        <div className='w-full h-full flex'>
            <div className='p-[1rem] w-full h-full bg-[#7F7F7F] overflow-y-auto scrollbar-none border-2 border-white border-t-[#424242] border-l-[#424242] shadow-[-1px_-1px_0_0_#808080]'>
                <div ref={scrollRef} className='border bg-white text-black m-auto w-[90%] h-full overflow-y-auto scrollbar-none scrollbar-none p-[1.5rem]'>
                    <div className="flex flex-col items-center overflow-y-auto scrollbar-none">
                        <Image src={project.title} alt={project.name} width={200} height={200} className="w-[25rem] h-[10rem]" />
                        <div className='w-full flex md:flex-row flex-col md:space-x-[1rem] items-center'>
                            <div className='text-justify md:w-[50%] w-full indent-8'>{project?.description}</div>
                            <div className='md:w-[50%] w-full flex items-center justify-center'>
                                {project.pictures && (
                                    <Image src={project.pictures[0]} alt="picture" width={500} height={500} className="w-full h-[20rem]" />
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row items-center space-x-[1rem] w-full pt-[.5rem] md:pt-0'>
                            <div className='grid md:grid-cols-2 gap-4 w-full md:w-[50%] md:h-[20rem]'>
                                {project.pictures && (
                                    <>
                                        {project.pictures.map((picture: string, index: number) => {
                                            if (index === 0) { return; }
                                            return (
                                                <Image key={generateId()} src={picture} alt="picture" width={500} height={500} className="w-[15rem] h-[10rem]" />
                                            );
                                        })}
                                    </>
                                )}
                            </div>
                            <div className='w-full md:w-[50%] max-w-[50%] flex flex-col text-black items-center space-y-[1rem]'>
                                <Image src="/images/stacks.png" alt="stacks" width={500} height={500} className="w-[15rem] h-[5rem]" />
                                <div className='grid md:grid-cols-2 gap-4'>
                                    {project?.stacks && (
                                        <>
                                            {project.stacks.map((stack: string) => (
                                                <PastButton key={generateId()} title={stack} />
                                            ))}
                                        </>
                                    )}
                                </div>
                                {project.link && (
                                    <div className='pt-[1.5rem]'>
                                        <PastButton main title={t('goTo')} handleClick={handleClick} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PastScrollBar scrollRef={scrollRef} projects={project}/>
        </div>
    );
}