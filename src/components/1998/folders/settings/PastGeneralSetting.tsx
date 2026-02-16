'use client';

import { IInfos, ISetting, ILanguage } from '@/utils/types';
import { JSX } from 'react';
import { getValue } from '@/utils/functions';

interface IPastGeneralSettingProps {
    activeSetting: ISetting;
}

export default function GeneralSetting({activeSetting}: IPastGeneralSettingProps) {
    return (
        <div className='w-full h-full flex space-x-[.5rem] lg:space-x-[2rem] justify-center items-start'>
            <div className='flex-shrink-0 justify-center mt-[1.5rem] pr-[.5rem] md:pr-[3rem]'>
                {activeSetting.icon && getValue(activeSetting.icon, false) as JSX.Element}
            </div>
            <div className='flex flex-col'>
                {activeSetting.infos.map((info: IInfos, index: number) => (
                    <div className='pb-[.5rem] md:pb-[1.5rem]' key={`infos-${index}`}>
                        <p className='pb-[.5rem]'>{`${info.title}:`}</p>
                        <div className='pl-[1rem]'>
                            {info.content.map((str: string | ILanguage, index: number) => {
                                if (typeof str === 'string') {
                                    return (
                                        <p key={`str-${index}`}>{str}</p>
                                    );
                                }
                                return;
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}