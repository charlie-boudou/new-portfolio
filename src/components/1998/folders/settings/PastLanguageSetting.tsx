'use client';

import { IInfos, ISetting } from '@/utils/types';
import { Dispatch, SetStateAction } from 'react';
import { ILanguage } from '@/utils/types';

interface IPastLanguageSettingProps {
    activeSetting: ISetting;
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
}

export default function LanguageSetting({activeSetting, selected, setSelected}: IPastLanguageSettingProps) {
    const generateId = () => crypto.randomUUID();

  return (
    <div className='w-full bg-[#BCBEBC] text-black mt-[1rem]'>
        {activeSetting.infos.map((info: IInfos) => (
            <div 
                key={generateId()}
                className='relative border border-white shadow-[-1px_-1px_0_0_#808080] pt-[1.5rem] pb-[2rem] px-[0.6rem]'
            >
                <p className='absolute bg-[#BCBEBC] top-[-0.75rem] left-[0.625rem] py-[.3rem]'>
                    {info.title}
                </p>

                <div className="flex items-center justify-between">
                    {info.subtitles.map((str: string) => (
                        <p key={generateId()}>{`${str}:`}</p>
                    ))}
                </div>

                <div className="border-2 border-l-[#424242] border-t-[#424242] border-r-white border-b-white bg-white h-[8rem] overflow-y-auto">
                    {info.content.map((value: ILanguage) => (
                        <div 
                            key={generateId()}
                            onClick={() => setSelected(value.icon.toLowerCase())}
                            className={`
                                flex 
                                items-center 
                                justify-between
                                px-[.2rem]
                                py-[.3rem]
                                ${selected === value.icon.toLowerCase() ? 'bg-[#030171] text-white border border-dotted' : 'text-black'}
                            `}
                        >
                            <div className='flex items-center space-x-[.5rem]'>
                                <p 
                                    className={`
                                        font-bold 
                                        border
                                        w-[1.5rem]
                                        h-[1.5rem]
                                        flex
                                        items-center
                                        justify-center
                                        p-[.15rem]
                                        ${selected === value.icon.toLowerCase() ? 'bg-white text-black' : 'bg-[#030171] text-white'}
                                    `}
                                >
                                    {value.icon}
                                </p>
                                <p>{value.language}</p>
                            </div>
                            <p>{value.layout}</p>
                        </div>
                    ))}
                </div>
            </div>
        ))}
    </div>
  );
}