'use client';

import { useContext, useState } from 'react';
import { settings } from '@/utils/datas';
import { useTranslation } from 'react-i18next';
import PastGeneralSetting from './PastGeneralSetting';
import PastLanguageSetting from './PastLanguageSetting';
import { ISetting, IFolder } from '@/utils/types';
import PastButton from '../../PastButton';
import { closeWindow, getValue } from "@/utils/functions";
import { DisplayContext } from '../../../../contexts/DisplayContext';

export default function PastSettings() {
    const { t, i18n } = useTranslation();
    const { openFolders, updateOpenFolders, windowActive, updateWindowActive, selectedLanguage, updateSelectedLanguage } = useContext(DisplayContext);

    const [selected, setSelected] = useState(selectedLanguage);
    const [tabActive, setTabActive] = useState<string>(t('general'));
    const activeSetting = settings(t).find((setting: ISetting) => getValue(setting.name, false) as string === tabActive) as ISetting;

    const handleClick = (title: string) => {
        if(title === 'ok') {
            updateSelectedLanguage(selected);
            i18n.changeLanguage(selected);
        }
        closeWindow(t('settings'), windowActive, openFolders as IFolder[], updateOpenFolders, updateWindowActive, false);
    };

    return (
        <div className='w-full h-full flex flex-col p-[.3rem] overflow-hidden'>
            <div className='flex items-center w-full flex-wrap'>
                {settings(t).map((setting: ISetting, index: number) => {
                    const settingName = getValue(setting.name, false) as string;
                    const isActive = tabActive === settingName;
                    return (
                        <div 
                            key={`setting-${settingName}`}
                            onClick={() => setTabActive(settingName)}
                            className={`
                                text-black border-t-[1.5px] border-l-[1.5px] border-b-[#BCBEBC]
                                rounded-tl-[.3rem] rounded-tr-[.1rem]
                                -mb-[1.5px] px-[.5rem] py-[2px]
                                border-r-[#878A8E] border-r-2 border-white
                                ${isActive ? 'z-[20] bg-[#BCBEBC] border-b-[1.5px] border-l-white border-t-white' : 'z-[10] border-b-0'}
                                ${!isActive && index !== 0 ? '-ml-[5px]' : ''}
                                ${isActive ? 'border-l-white' : (index !== 0 ? 'border-l-[#BCBEBC]' : 'border-l-white')}
                                ${index === 0 && !isActive ? 'shadow-none' : 'shadow-[1.5px_0_0_0_#424242]'}
                            `}
                        >
                            {settingName}
                        </div>
                    );
                })}
            </div>
            <div 
                className={`
                    flex flex-col
                    w-full 
                    bg-[#BCBEBC] 
                    border-[1.5px] 
                    text-black 
                    border-t-white border-l-white 
                    border-r-[#424242] border-b-[#424242]
                    flex-1 min-h-0
                    overflow-auto
                    ${activeSetting && getValue(activeSetting.name, false) as string === t('general') 
                        ? 'p-[1rem] md:p-[2rem]' 
                        : 'p-[.5rem] md:p-[1rem]'}
                `}
            >
                {activeSetting && getValue(activeSetting.name, false) as string === t('general') ? (
                    <PastGeneralSetting activeSetting={activeSetting}/>
                ) : (
                    <PastLanguageSetting activeSetting={activeSetting} selected={selected} setSelected={setSelected} />
                )}
            </div>
            <div className='w-full flex items-center justify-end space-x-2 mt-[.7rem] shrink-0'>
                <PastButton main title="OK" handleClick={() => handleClick('ok')} />
                <PastButton title="Cancel" handleClick={() => handleClick('cancel')} />
            </div>
        </div>
    );
}