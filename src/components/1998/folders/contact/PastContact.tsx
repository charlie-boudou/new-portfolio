'use client';

import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PastButton from '../../PastButton';
import { closeWindow } from "@/utils/functions";
import { DisplayContext } from '../../../../contexts/DisplayContext';
import { IFolder, IList } from '@/utils/types';
import Link from "next/link";

export default function PastSettings() {
    const { t } = useTranslation();
    const generateId = () => crypto.randomUUID();
    const { openFolders, updateOpenFolders, pastWindowActive, updatePastWindowActive } = useContext(DisplayContext);

    const contacts = openFolders.find((folder: IFolder | IList) => folder.name === t('contact')) as IFolder | undefined;
    const [tabActive, setTabActive] = useState<string>('GitHub');
    const activeContact = contacts?.list?.find((contact: IList) => contact.name === tabActive);

    const handleClick = () => {
        closeWindow(t('contact'), pastWindowActive, openFolders as IFolder[], updateOpenFolders, updatePastWindowActive);
    };

    return (
        <div className='w-full h-full flex flex-col p-[.3rem]'>
            <div className='flex items-center w-full'>
                {contacts && contacts.list && contacts.list.map((contact: IList, index: number) => {
                    const isActive = tabActive === contact.name;
                    return (
                        <div 
                            key={generateId()}
                            onClick={() => setTabActive(contact.name)}
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
                            {contact.name}
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
                    p-[.3rem] md:p-[1rem]
                `}
            >
                <div className='flex items-center space-x-[1rem]'>
                    {activeContact && activeContact.href && (
                        <>
                            {activeContact.icon}
                            <Link
                                key={generateId()}
                                href={activeContact.href}
                                className='underline decoration-solid text-[#030171]'
                            >
                                {activeContact.name === 'GMail' ? `${activeContact.href.replace('mailto:', '')}` : `${activeContact.href}`}
                            </Link>
                        </>
                    )}
                </div>
            </div>
            <div className='w-full flex items-center justify-end space-x-[.5rem]' style={{ marginTop: "1rem"}}>
                <PastButton main title="OK" handleClick={handleClick} />
                <PastButton title="Cancel" handleClick={handleClick} />
            </div>
        </div>
    );
}