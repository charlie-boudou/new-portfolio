'use client';

import { useContext, useState } from 'react';
import { settings } from '@/utils/datas';
import { useTranslation } from 'react-i18next';
import PastGeneralSetting from './PastGeneralSetting';
import PastLanguageSetting from './PastLanguageSetting';
import { ISetting } from '@/utils/types';
import PastButton from '../../PastButton';
import { closeWindow } from "@/utils/functions";
import { DisplayContext } from '../../../../contexts/DisplayContext';

export default function PastSettings() {
    const { t, i18n } = useTranslation();
    const generateId = () => crypto.randomUUID();
    const { openFolders, updateOpenFolders, pastWindowActive, updatePastWindowActive, selectedLanguage, updateSelectedLanguage } = useContext(DisplayContext);

    const [selected, setSelected] = useState(selectedLanguage);
    const [tabActive, setTabActive] = useState<string>(t('general'));
    const activeSetting = settings(t).find((setting: ISetting) => setting.name === tabActive);

    const handleClick = (title: string) => {
        if(title === 'ok') {
            updateSelectedLanguage(selected);
            i18n.changeLanguage(selected);
        }
        closeWindow(t('settings'), pastWindowActive, openFolders, updateOpenFolders, updatePastWindowActive);
    };

    return (
        <div className='w-full h-full flex flex-col p-[.3rem]'>
            <div className='flex items-center w-full'>
                {settings(t).map((setting: ISetting, index: number) => {
                    const isActive = tabActive === setting.name;
                    return (
                        <div 
                            key={generateId()}
                            onClick={() => setTabActive(setting.name)}
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
                            {setting.name}
                        </div>
                    );
                })}
            </div>
            <div 
                className={`
                    flex 
                    w-full 
                    bg-[#BCBEBC] 
                    shadow-[1px_1px_0_0_black]
                    h-full
                    border-[1.5px] 
                    text-black 
                    border-t-white 
                    border-l-white 
                    border-r-[#424242] 
                    border-b-[#424242]
                    flex-1
                    ${activeSetting.name === t('general') ? 'p-[.5rem] md:p-[2rem]' : 'p-[.3rem] md:p-[1rem]'}
                `}
            >
                {activeSetting && activeSetting.name === t('general') ? (
                    <PastGeneralSetting activeSetting={activeSetting}/>
                ) : (
                    <PastLanguageSetting activeSetting={activeSetting} selected={selected} setSelected={setSelected} />
                )}
            </div>
            <div className='w-full flex items-center justify-end space-x-[.5rem]' style={{ marginTop: "1rem"}}>
                <PastButton main title="OK" handleClick={() => handleClick('ok')} />
                <PastButton title="Cancel" handleClick={() => handleClick('cancel')} />
            </div>
        </div>
    );
}