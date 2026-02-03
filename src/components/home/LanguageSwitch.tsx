'use client';

import { useTranslation } from 'react-i18next';
import  france  from '@/assets/france.svg';
import uk from '@/assets/uk.svg';
import Image from 'next/image';
import { useContext } from 'react';
import { DisplayContext } from '../../contexts/DisplayContext';

export default function LanguageSwitch() {
    const { i18n } = useTranslation();
    const { updateSelectedLanguage } = useContext(DisplayContext);

    const changeLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        updateSelectedLanguage(lang);
    };

    return (
        <div
            className="w-fit flex items-center space-x-[.5rem] border border py-[.3rem] px-[.5rem] rounded-[.5rem]"
        >
            <Image src={france} alt="FR" onClick={() => changeLanguage('fr')} className="w-[2rem] h-[2rem] cursor-pointer"/>
            <Image src={uk} alt="EN" onClick={() => changeLanguage('en')} className="w-[2rem] h-[2rem] cursor-pointer" />
        </div>
    );
}