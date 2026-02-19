'use client';

import { DisplayContext } from './DisplayContext';
import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { IOpenableItem, IFolder, IList } from '@/utils/types';
import { getValue } from '@/utils/functions';

export function DisplayProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  const [mounted, setMounted] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const [openFolders, setOpenFolders] = useState<IOpenableItem[]>([]);
  const [windowActive, setWindowActive] = useState<string>('');
  const [hiddenFolders, setHiddenFolders] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [selectedIconOffice, setSelectedIconOffice] = useState<string>('');
  const [isShutDown, setIsShutDown] = useState<boolean>(false);

  const openWindow = useCallback((item: IFolder | IList, isFuture: boolean) => {
    const name = getValue(item.name, isFuture) as string;

    const isAlreadyOpen = openFolders.some(
      (folder) => getValue(folder.name, isFuture) === name
    );

    setHiddenFolders((prev) => prev.filter((hidden) => hidden !== name));
    
    if (!isAlreadyOpen) {
      setOpenFolders((prev) => [...prev, item]);
    }

    setWindowActive(name);
    setSelectedIconOffice('');
  }, [openFolders]);

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
        isMenuActive,
        updateIsMenuActive: setIsMenuActive,
        openFolders,
        updateOpenFolders: setOpenFolders,
        windowActive,
        updateWindowActive: setWindowActive, 
        hiddenFolders,
        updateHiddenFolders: setHiddenFolders,
        selectedLanguage, 
        updateSelectedLanguage: changeLanguage,
        selectedIconOffice,
        updateSelectedIconOffice: setSelectedIconOffice,
        openWindow,
        isShutDown,
        updateIsShutDown: setIsShutDown
      }}
    >
      {children}
    </DisplayContext.Provider>
  );
}
