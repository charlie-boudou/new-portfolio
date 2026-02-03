'use client';

import { IInfos, ISetting, ILanguage } from '@/utils/types';

interface IPastGeneralSettingProps {
    activeSetting: ISetting;
}

export default function GeneralSetting({activeSetting}: IPastGeneralSettingProps) {
    const generateId = () => crypto.randomUUID();

    return (
        <div className='w-full h-full flex space-x-[2rem] justify-center items-start'>
            <div className='flex-shrink-0 justify-center mt-[1.5rem] pr-[3rem]'>
                {activeSetting.icon}
            </div>
            <div className='flex flex-col'>
                {activeSetting.infos.map((info: IInfos) => (
                    <div className='pb-[1.5rem]' key={generateId()}>
                        <p className='pb-[.5rem]'>{`${info.title}:`}</p>
                        <div className='pl-[1rem]'>
                            {info.content.map((str: string | ILanguage) => {
                                if (typeof str === 'string') {
                                    return (
                                        <p key={generateId()}>{str}</p>
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