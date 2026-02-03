'use client';

import { useTranslation } from 'react-i18next';
import { useContext, useRef } from 'react';
import { DisplayContext } from '../../../../contexts/DisplayContext';
import PastScrollBar from '../../PastScrollBar';
import Image from "next/image";
import { aboutMe } from '@/utils/datas';
import { IDescription, ISkills } from '@/utils/types';

export default function PastAboutMe() {
    const { t } = useTranslation();
    const generateId = () => crypto.randomUUID();
    const scrollRef = useRef<HTMLDivElement>(null);
    const { selectedLanguage } = useContext(DisplayContext);
    
    return (
        <div className='w-full h-full flex past-doc-font'>
            <div className='md:p-[1rem] w-full h-full bg-[#7F7F7F] overflow-y-auto scrollbar-none border-2 border-white border-t-[#424242] border-l-[#424242] shadow-[-1px_-1px_0_0_#808080]'>
                <div ref={scrollRef} className='border bg-white text-black m-auto w-full md:w-[90%] h-full overflow-y-auto scrollbar-none scrollbar-none p-[.5rem] md:p-[1.5rem]'>
                    <div className="flex flex-col items-center overflow-y-auto scrollbar-none pt-[1rem]">
                        <Image src={aboutMe(t).icon} alt={aboutMe(t).title} width={200} height={200} className="w-[50vw] md:h-[20vh]" />
                        <div className='w-full flex flex-col md:flex-row items-start space-x-[1rem] pt-[2rem]'>
                            <div className='w-full md:w-[40%] flex items-center justify-center'>
                                    <Image src={aboutMe(t).photo} alt="picture" width={400} height={400} className="w-[2Ovw] h-[45vh]" />
                            </div>
                            < div className='w-full md:w-[60%] flex flex-col space-y-[1.5rem]'>
                                {aboutMe(t).description.map((desc: IDescription, index: number) => {
                                    if (index === aboutMe(t).description.length - 1) { return ;}
                                    return (
                                        <div key={generateId()} className='flex flex-col space-y-[1rem]'>
                                            <ul className="list-disc pl-[.5rem] list-inside"> 
                                                <li key={generateId()} className='text-justify text-red-500 font-extrabold text-[1.5rem]'>{desc.title}</li>
                                            </ul>
                                            {desc.content.map((value: string) => (
                                                <p key={generateId()} className='indent-8 text-justify'>{value}</p>
                                            ))}
                                        </div>  
                                    );
                                })}
                            </div>
                        </div>
                        <div className='w-full flex flex-col space-y-[1rem] pt-[1.5rem]'>
                            <ul className="list-disc list-inside">
                                <li className='text-justify text-red-500 font-extrabold text-[1.5rem]'>{aboutMe(t).description[aboutMe(t).description.length - 1].title}</li>
                            </ul>
                            <div className='w-full'>
                                {aboutMe(t).description[aboutMe(t).description.length - 1].content.map((value: string) => (
                                    <p key={generateId()} className='indent-8 text-justify'>{value}</p>
                                ))}
                            </div>
                        </div>
                        <div className='w-full flex flex-col space-y-[1.5rem] pt-[3rem]'>
                            <div className='flex items-center m-auto'>
                                {selectedLanguage === 'fr' ? (
                                    <Image src="/images/MySkillsFR.png" alt={t('skills')} width={200} height={200} className="w-[50vw] md:w-[30vw] h-[10vh]" />
                                ): (
                                    <Image src="/images/MySkillsEN.png" alt={t('skills')} width={200} height={200} className="w-[50vw] md:w-[30vw] h-[10vh]" />
                                )}
                            </div>
                            <div className='w-full md:w-[90%] md:m-auto md:p-[1.5rem] flex flex-col space-y-[1.5rem]'>
                                {aboutMe(t).skills.map((skill: ISkills) => (
                                    <div key={generateId()} className='w-full flex flex-col space-y-[1rem] md:p-[1rem]'>
                                        <div className='w-full bg-[#030171] font-bold text-white text-[1.5rem] p-[.3rem]'>{skill.title}</div>
                                        <div className='grid md:grid-cols-2 gap-4 w-[90%] m-auto'>
                                            {skill.list.map((value: IDescription) => (
                                                <div key={generateId()} className='flex flex-col space-y-[1rem] border-2 p-[1rem]'>
                                                    <p className='text-center text-red-500 font-extrabold text-[1.2rem]'>{value.title}</p>
                                                    <ul className='text-justify list-disc list-inside'>
                                                        {value.content.map((el: string) => (
                                                            <li key={generateId()} >{el}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PastScrollBar scrollRef={scrollRef} projects={aboutMe}/>
        </div>
    );
}