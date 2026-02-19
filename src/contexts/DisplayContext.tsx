import React, { Dispatch, SetStateAction } from 'react';
import { IFolder, IList } from '../utils/types';

interface Display {
  isMenuActive: boolean;
  updateIsMenuActive: Dispatch<SetStateAction<boolean>>;
  openFolders: IFolder[] | IList[];
  updateOpenFolders: Dispatch<SetStateAction<IFolder[] | IList[]>>;
  windowActive: string;
  updateWindowActive: Dispatch<SetStateAction<string>>;
  hiddenFolders: string[];
  updateHiddenFolders: Dispatch<SetStateAction<string[]>>;
  selectedLanguage: string;
  updateSelectedLanguage: Dispatch<SetStateAction<string>>;
  selectedIconOffice: string;
  updateSelectedIconOffice: Dispatch<SetStateAction<string>>;
  openWindow: (item: IFolder | IList, isFuture: boolean) => void;
  isShutDown: boolean;
  updateIsShutDown: Dispatch<SetStateAction<boolean>>;
}

export const DisplayContext = React.createContext(
  {} as Display
);

