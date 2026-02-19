'use client';

import { useTranslation } from 'react-i18next';
import  logoWindows from '../../../../../public/images/logoWindows.png';
import Image from 'next/image';
import { DisplayContext } from '../../../../contexts/DisplayContext';
import { useContext } from 'react';

export default function PastStartButton() {
    const { t } = useTranslation();
    const { isMenuActive, updateIsMenuActive } = useContext(DisplayContext);

    return (
        <div 
            onClick={() => updateIsMenuActive(!isMenuActive)}
            className={`
                w-fit
                px-[.3rem]
                py-[.2rem]
                border-2 
                border-gray-300
                ${isMenuActive ? 'shadow-[-1px_-1px_0_0_black] border-t-[#424242] border-l-[#424242]' : 'border-b-[#424242] border-r-[#424242] shadow-[1px_1px_0_0_black,-1px_-1px_0_0_white]'}
            `}
        >
            <div className={`flex items-center justify-center space-x-[.3rem] ${isMenuActive ? 'border border-dotted border-black' : ''}`}>
                <Image src={logoWindows} alt="logo"  className="w-[1.5rem] h-[1.5rem]"/>
                <p className="text-black">{t('start')}</p>
            </div>
        </div>
    )
}