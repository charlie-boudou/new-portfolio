'use client';

import { IFolder, IList } from '@/utils/types';
import { useTranslation } from "react-i18next";
import { folders } from '@/utils/datas';
import { getValue } from '@/utils/functions';
import Link from "next/link";
import { JSX } from 'react';

export default function FutureContact() {
    const { t } = useTranslation();

    const contact = folders(t).find((folder: IFolder) => 
        getValue(folder.name, true) === getValue({past: t('contact'), future: t('contactFuture')}, true)
    );

    if (!contact) return null;

    return (
        <div className="relative w-full h-full flex items-center justify-center p-4">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <div className="absolute w-[30rem] h-[30rem] border border-cyan-400/40 rounded-full" />
                <div className="absolute w-[20rem] h-[20rem] border border-cyan-400/20 rounded-full" />
                <div className="absolute w-[15rem] h-[1px] bg-gradient-to-r from-cyan-400/70 to-transparent origin-left animate-[spin_4s_linear_infinite] left-1/2" />
            </div>
            <div className="relative z-10 w-full max-w-4xl">
                <div className="mb-12 flex flex-col items-center">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="h-[2px] w-[3rem] bg-[#CF5CCD]/30" />
                        <p className="md:text-[1.5rem] text-cyan-400 tracking-[0.5em] uppercase">
                            {getValue(contact.name, true) as string}
                        </p>
                        <div className="h-[2px] w-[3rem] bg-[#CF5CCD]/30" />
                    </div>
                    <span className="text-[.4rem] md:text-[0.6rem] text-[#CF5CCD] tracking-[0.8em] animate-pulse">
                        {t('secureUplink')}
                    </span>
                </div>
                <div className="relative z-10 flex flex-wrap justify-center gap-8 max-w-2xl">
                    {contact.list?.map((item: IList, index: number) => {
                        const iconValue = getValue(item.icon, true) as JSX.Element;
                        const iconSrc = iconValue?.props?.src?.src || iconValue?.props?.src || "";

                        return (
                            <Link 
                                key={index}
                                href={item.href || "#"}
                                target="_blank"
                                className="group relative flex flex-col items-center"
                            >
                                <div className="relative w-[5rem] h-[5rem] flex items-center justify-center rounded-full border border-[#CF5CCD]/40 bg-zinc-900/50 backdrop-blur-sm transition-all duration-700 group-hover:border-[#CF5CCD]/70 group-hover:-translate-y-2">
                                    <div className="relative group-hover:w-[3rem] group-hover:h-[3rem] flex items-center justify-center">
                                        <div className="group-hover:opacity-0 transition-opacity duration-300 invert">
                                            {iconValue}
                                        </div>
                                        <div 
                                            className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            style={{
                                                WebkitMaskImage: `url(${iconSrc})`,
                                                maskImage: `url(${iconSrc})`,
                                                maskSize: 'contain',
                                                maskRepeat: 'no-repeat',
                                                maskPosition: 'center',
                                            }}
                                        />
                                    </div>
                                    <div className={`absolute ${index === 0 && '-top-1 -left-1'} ${index === (contact.list?.length || 0) - 1 && '-top-1 -right-1'} -top-7 w-[.7rem] h-[.7rem] bg-[#CF5CCD] scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full shadow-[0_0_15px_#CF5CCD]`} />
                                </div>
                                <div className="mt-[1rem] relative h-[1rem] w-full flex justify-center overflow-hidden">
                                    <span className="block text-[.6rem] tracking-[0.3em] uppercase text-zinc-500 transition-transform duration-500 translate-y-0 group-hover:-translate-y-full">
                                        {getValue(item.name, true) as string}
                                    </span>
                                    <span className="block text-[.6rem] tracking-[0.3em] uppercase text-[#CF5CCD] absolute transition-transform duration-500 translate-y-full group-hover:-translate-y-0">
                                        connect
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}