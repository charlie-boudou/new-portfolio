'use client';

import { useContext, useRef, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PastOfficeIcon from '../../desktop/PastOfficeIcon';
import PastScrollBar from '../../PastScrollBar';
import { folders } from '@/utils/datas';
import { IFolder, IList } from '@/utils/types';
import { DisplayContext } from '../../../../contexts/DisplayContext';
import { getValue } from '@/utils/functions';
import { BORDER_STYLES, WIN98_COLORS } from '@/constants/styles';

export default function PastProjectsList() {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const { openWindow } = useContext(DisplayContext);

  const projects: IFolder | undefined = useMemo(
    () => folders(t).find((folder: IFolder) => getValue(folder.name, false) === t('projects')),
    [t]
  );

  const fileCount = useMemo(
    () => (projects?.list ? projects.list.length - 1 : 0),
    [projects]
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div className={`text-black w-full px-[.3rem] py-[.1rem] ${BORDER_STYLES.window} ${BORDER_STYLES.shadow} shrink-0`}>
        Files
      </div>
      <div className="flex h-full w-full overflow-y-auto scrollbar-none bg-white border-b-2 border-r-2 border-white shadow-[-1px_-1px_0_0_#808080]">
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-none">
          <div className="grid grid-rows-4 grid-flow-col gap-4 w-max px-[.5rem]">
            {projects?.list?.map((project: IList, index: number) => (
              <PastOfficeIcon
                key={`project-${index}-${getValue(project.name, false)}`}
                folder={project}
                absolutePosition={false}
                handleDoubleClick={() => openWindow(project, false)}
              />
            ))}
          </div>
        </div>
        <PastScrollBar scrollRef={scrollRef} projects={projects as IList} />
      </div>
      <div className={`shrink-0 mt-[.3rem] flex items-center h-[2rem] bg-[${WIN98_COLORS.background}] border-2 border-t-[#808080] border-l-[#808080] border-b-white border-r-white`}>
        <div className="flex-1 px-[.3rem] text-[.8rem] text-black truncate">
          {fileCount} {t('file')}
        </div>
        <div className="w-[7rem] h-full border-l-2 border-l-[#808080] shadow-[1px_0_0_0_white_inset]" />
      </div>
    </div>
  );
}
