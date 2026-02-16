'use client';

import { useTranslation } from "react-i18next";
import { settings } from "@/utils/datas";
import { getValue } from '@/utils/functions';
import { IInfos, ISetting } from "@/utils/types";
import FutureProjectIcon from "../FutureProjectIcon";

export default function FutureSystemCore() {
  const { t } = useTranslation();

  const systemCore = settings(t).find((el: ISetting) => getValue(el.name, true) === t('systemcore'));

  const stacks = systemCore?.infos.find((el: IInfos) => getValue(el.title, true) === t('stacks'));
  const registered = systemCore?.infos.find((el: IInfos) => getValue(el.title, true) === t('registered'));

  if (!systemCore || !stacks || !registered) return null;

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex flex-col lg:flex-row space-y-[.5rem] items-center justify-between z-10 pr-[2rem]">
            <div className="flex-1 flex items-center justify-end pr-[1rem] relative">
                <div className="absolute right-0 top-1/2 w-[3rem] h-[1px] bg-gradient-to-l from-cyan-400 to-transparent z-0" />   
                <div className="text-right pr-[1.5rem] border-r-2 border-cyan-400/50 relative z-10">
                    <p className="text-[#CF5CCD] text-left text-[.7rem] tracking-[0.4em] uppercase mb-[1rem]">
                        {stacks.title}
                    </p>
                    <div className="space-y-[.7rem]">
                        { (stacks.content as string[]).map((stack: string, i: number) => (
                            <div key={`stack-${i}`} className="group cursor-pointer">
                                <span className="text-[.8rem] group-hover:text-cyan-400 transition-colors uppercase tracking-widest block">
                                    {stack}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="relative flex-shrink-0 flex items-center justify-center w-[12rem] h-[12rem]">
                <div className="absolute inset-0 border border-cyan-400/20 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-4 border-t-2 border-b-2 border-[#CF5CCD]/40 rounded-full animate-[spin_6s_linear_infinite_reverse]" />
                <FutureProjectIcon  project={systemCore} i={0} isSetting isSideBar />
            </div>
            <div className="flex-1 flex items-center justify-start pl-[1rem] relative">
                <div className="absolute left-0 top-1/2 w-[3rem] h-[1px] bg-gradient-to-r from-cyan-400 to-transparent z-0" /> 
                <div className="pl-[1.5rem] border-l-2 border-cyan-400/50 relative z-10 w-full max-w-[15rem]">
                    <p className="text-[#CF5CCD] text-[.7rem] tracking-[0.4em] uppercase mb-[1rem]">
                        {registered.title}
                    </p>
                    <div className="relative group overflow-hidden bg-white/5 p-[1rem] skew-x-[-12deg] border border-white/10 hover:border-[#CF5CCD]/50 transition-all cursor-pointer">
                        <div className="skew-x-[12deg]">
                            <span className="text-[.8rem] text-cyan-400 font-bold tracking-tighter block">
                                {registered.content[0] as string}
                            </span>
                            <div className="text-[.5rem] text-white/60 mt-1 uppercase">{t('accessLevel')} : Admin</div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#CF5CCD]/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-[1.5s]" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}