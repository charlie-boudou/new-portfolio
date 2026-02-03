'use client';

import { DisplayContext } from './DisplayContext';
import { IFolder, IList } from '@/utils/types';
import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';

export function DisplayProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  const [mounted, setMounted] = useState(false);
  const [isPast, setIsPast] = useState<boolean>(true);
  const [isPastMenuActive, setIsPastMenuActive] = useState<boolean>(false);
  const [openFolders, setOpenFolders] = useState<IFolder[] | IList[]>([]);
  const [pastWindowActive, setPastWindowActive] = useState<string>('');
  const [hiddenFolders, setHiddenFolders] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [selectedIconOffice, setSelectedIconOffice] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const changeLanguage: Dispatch<SetStateAction<string>> = useCallback((value) => {
    const nextLang = typeof value === 'function' ? value(i18n.language) : value;
    
    i18n.changeLanguage(nextLang);
    setSelectedLanguage(nextLang);
  }, [i18n]);

  if (!mounted) {
    return null; 
  }

  return (
    <DisplayContext.Provider
      value={{
        isPast,
        updateIsPast: setIsPast,
        isPastMenuActive,
        updateIsPastMenuActive: setIsPastMenuActive,
        openFolders,
        updateOpenFolders: setOpenFolders,
        pastWindowActive,
        updatePastWindowActive: setPastWindowActive, 
        hiddenFolders,
        updateHiddenFolders: setHiddenFolders,
        selectedLanguage, 
        updateSelectedLanguage: changeLanguage,
        selectedIconOffice,
        updateSelectedIconOffice: setSelectedIconOffice
      }}
    >
      {children}
    </DisplayContext.Provider>
  );
}
