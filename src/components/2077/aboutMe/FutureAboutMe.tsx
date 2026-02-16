'use client';

import { aboutMe } from "@/utils/datas";
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { IDescription } from "@/utils/types";

export default function FutureAboutMe() {
    const { t } = useTranslation();
    const mainBio = aboutMe(t).description[0].content[0];
    const journey = aboutMe(t).description[1];
    const techSkills = aboutMe(t).skills[0].list;
    const values = aboutMe(t).skills[1].list;

    return (
        <div className="w-full h-full text-white overflow-y-auto scrollbar-none">
            <div className="flex flex-col md:flex-row gap-8 mb-[3rem] border-b border-cyan-500/20 pb-[2rem]">
                <div className="relative group w-fit h-fit">
                    <div className="absolute -inset-1 bg-cyan-400 opacity-20 blur group-hover:opacity-40 transition" />
                    <div 
                        className="relative h-[22rem] w-[18rem] overflow-hidden" 
                        style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)' }}
                    >
                        <Image 
                        src={aboutMe(t).photo} 
                        alt="Profile" 
                        fill 
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                        />
                    </div>
                    <div className="absolute bottom-[-10px] right-[-10px] text-[.6rem] bg-cyan-400 text-black px-[.5rem] font-bold">
                        SCAN_COMPLETE
                    </div>
                </div>
                <div className="flex-1 space-y-[1rem]">
                    <div>
                        <label className="block text-[.8rem] text-cyan-500 tracking-[0.3em] font-bold uppercase mb-[.2rem]">
                            {t('userId')}
                        </label>
                        <p className="text-[2rem] uppercase tracking-tighter text-[#CF5CCD]">
                            {`</>`} <span className="text-cyan-400">Charlie</span>
                        </p>
                    </div>
                    <div>
                        <label className="block text-[.8rem] text-cyan-500 tracking-[0.3em] font-bold uppercase mb-[.2rem]">
                            [{t('accessLevel')}]
                        </label>
                        <p className="text-[1.5rem] font-bold text-slate-300">Front_End_Developer</p>
                    </div>
                    <div className="relative px-[1rem] pt-[2rem] pb-[1rem] bg-cyan-400/5 border-l-2 border-[#CF5CCD]">
                        <label className="absolute top-2 left-2 bg-[#1e293b] px-[.5rem] text-[.8rem] text-cyan-400/70 tracking-widest uppercase">
                            {t('bioLoaded')}
                        </label>
                        <p className="italic text-justify leading-relaxed text-slate-300">
                            {`"${mainBio}"`}
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-[2rem]">
                    <section>
                        <p className="text-cyan-400 text-[.8rem] font-bold uppercase tracking-[0.2em] mb-[1rem] flex items-center">
                            <span className="h-[1px] w-[2rem] bg-[#CF5CCD] mr-[.8rem]" /> {journey.title.replace(/\s+/g, '_')}
                        </p>
                        <div className="space-y-[.8rem] text-justify text-slate-300 leading-relaxed border-l border-slate-800 pl-[1rem] ml-[.2rem]">
                            {journey.content.map((text: string, i: number) => (
                                <p key={i}>{text}</p>
                            ))}
                        </div>
                    </section>
                    <section>
                        <p className="text-[#CF5CCD] text-[.8rem] font-bold uppercase tracking-[0.2em] mb-[1rem] flex items-center">
                            <span className="h-[1px] w-[2rem] bg-cyan-400 mr-[.8rem]" /> {t('coreValues')}
                        </p>
                        <div className="grid grid-cols-1 gap-3">
                            {values.map((val: IDescription, i: number) => (
                                <div key={i} className="cursor-pointer bg-white/5 p-[.8rem] rounded-[.5rem] border-2 border-white/5 hover:border-[#CF5CCD]/30 transition-colors">
                                    <span className="block text-[.8rem] font-bold text-[#CF5CCD] mb-[.2rem]">{val.title}</span>
                                    <p className="text-slate-300">{val.content[0]}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <div>
                    <div className="bg-slate-800/80 p-[1.5rem] border-2 border-white/5 rounded-[.5rem] h-fit">
                        <p className="text-cyan-400 text-[.8rem] font-bold uppercase tracking-[0.2em] mb-[1.5rem] flex items-center">
                            <span className="h-[1px] w-[2rem] bg-[#CF5CCD] mr-[.8rem]"></span> {t('techManifest')}
                        </p>
                        <div className="space-y-[1.5rem]">
                            {techSkills.map((skill: IDescription, i: number) => (
                                <div key={i} className="relative">
                                    <span className="text-[.8rem] text-slate-300 uppercase font-bold tracking-widest block mb-[1rem]">
                                        {skill.title}
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {skill.content.map((skill: string, i: number) => (
                                            <span key={i} className="cursor-pointer px-[.5rem] py-[.2rem] bg-cyan-500/10 border border-cyan-500/20 text-[.8rem] text-cyan-300 font-bold hover:bg-cyan-500 hover:text-black transition-all cursor-default">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-slate-800/80 p-[1.5rem] border-2 border-white/5 rounded-[.5rem] h-fit mt-[2rem] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-[6rem] h-[6rem] bg-[#CF5CCD]/5 blur-3xl group-hover:bg-[#CF5CCD]/10 transition-colors" />  
                        <p className="text-[#CF5CCD] text-[.8rem] font-bold uppercase tracking-[0.2em] mb-[1.5rem] flex items-center">
                            <span className="h-[1px] w-[2rem] bg-cyan-400 mr-[.8rem]" /> 
                            {aboutMe(t).description[2].title}
                        </p> 
                        <div className="relative z-10">
                            <label className="block text-[.8rem] tracking-[0.3em] font-bold text-cyan-500 uppercase mb-[.8rem]">
                                [{t('extraData')}]
                            </label>
                            <div className="space-y-[.8rem] text-slate-300 leading-relaxed text-justify">
                                {aboutMe(t).description[2].content.map((text: string, i: number) => (
                                    <p key={i} className="border-l-2 border-[#CF5CCD]/50 pl-[1rem]">
                                        {`> ${text}`}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}