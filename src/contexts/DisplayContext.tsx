import React, { Dispatch, SetStateAction } from 'react';
import { IFolder, IList } from '../utils/types';

interface Display {
  isPast: boolean;
  updateIsPast: Dispatch<SetStateAction<boolean>>;
  isPastMenuActive: boolean;
  updateIsPastMenuActive: Dispatch<SetStateAction<boolean>>;
  openFolders: IFolder[] | IList[];
  updateOpenFolders: Dispatch<SetStateAction<IFolder[] | IList[]>>;
  pastWindowActive: string;
  updatePastWindowActive: Dispatch<SetStateAction<string>>;
  hiddenFolders: string[];
  updateHiddenFolders: Dispatch<SetStateAction<string[]>>;
  selectedLanguage: string;
  updateSelectedLanguage: Dispatch<SetStateAction<string>>;
  selectedIconOffice: string;
  updateSelectedIconOffice: Dispatch<SetStateAction<string>>;
}

export const DisplayContext = React.createContext(
  {} as Display
);

