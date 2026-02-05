'use client';

import FutureProjectsList from "@/components/2077/projects/FutureProjectsList";
import { useContext} from "react";
import { DisplayContext } from "../../contexts/DisplayContext";
import { IFolder, IList } from "../../utils/types";
import FutureProject from "../../components/2077/projects/FutureProject";
import FutureProjectIcon from '../../components/2077/projects/FutureProjectIcon';
import { useRouter } from 'next/navigation';


export default function FutureHome() {
  const router = useRouter();
  const generateId = () => crypto.randomUUID();
  const { openFolders, updateOpenFolders, hiddenFolders, updateHiddenFolders, updatePastWindowActive, updateSelectedIconOffice } = useContext(DisplayContext);

  const handleClick = (project: IList) => {
          const isAlreadyOpen = openFolders.some(el => el.name === project.name);
          if (!isAlreadyOpen) {
              const arr = hiddenFolders.filter(el => el !== project.name);
      
              updateOpenFolders(prev => [...prev, project]);
              updateHiddenFolders(arr);
          }
              updatePastWindowActive(project.name);
              updateSelectedIconOffice('');
  };

  return (
    <div className="w-full h-screen p-[1rem] future-font bg-[url('/images/futureBackground.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="relative w-full h-full flex items-center justify-center">
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          style={{ overflow: 'visible' }}
        >
            <path 
              d="M 13,3 L 87,3 L 97,13 L 97,87 L 87,97 L 13,97 L 3,87 L 3,13 Z"
              fill="rgba(29, 41, 61, 0.9)"
            />
            <path 
              d="M 13,3 L 87,3 L 97,13 L 97,87 L 87,97 L 13,97 L 3,87 L 3,13 Z"
              fill="none" 
              stroke="#22d3ee" 
              strokeWidth="2" 
              vectorEffect="non-scaling-stroke"
            />
            <line x1="30" y1="3" x2="70" y2="3" stroke="#22d3ee" strokeWidth="10" vectorEffect="non-scaling-stroke" />
            <line x1="30" y1="97" x2="70" y2="97" stroke="#22d3ee" strokeWidth="10" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="text-white z-50 flex flex-col space-y-[1rem] items-center">
          UNDER CONSTRUCTION
          <div 
            className={`
                relative
                px-[1.5rem] 
                py-[.5rem] 
                outline-none 
                w-fit 
                text-[1rem]
                md:text-[1.5rem] 
                text-center 
                cursor-pointer
                past-font
                flex items-center justify-center
                text-[#22d3ee]
                mt-[1rem]
            `}
            onClick={() => router.push('/')}
          >
              <svg 
                  className="absolute inset-0 w-full h-full pointer-events-none" 
                  viewBox="0 0 100 100" 
                  preserveAspectRatio="none"
                  style={{ overflow: 'visible' }}
              >
                  <path 
                      d="M 10,0 L 90,0 L 100,10 L 100,90 L 90,100 L 10,100 L 0,90 L 0,10 Z" 
                      fill="rgba(15, 23, 42, 0.4)" 
                  />
                  <path 
                      d="M 10,0 L 90,0 L 100,10 L 100,90 L 90,100 L 10,100 L 0,90 L 0,10 Z" 
                      fill="none" 
                      stroke="#22d3ee" 
                      strokeWidth="2" 
                      vectorEffect="non-scaling-stroke"
                  />
                  <line x1="30" y1="0" x2="70" y2="0" stroke="#22d3ee" strokeWidth="6" vectorEffect="non-scaling-stroke" />
                  <line x1="30" y1="100" x2="70" y2="100" stroke="#22d3ee" strokeWidth="6" vectorEffect="non-scaling-stroke" />
              </svg>
              <p className="relative z-10">Home</p>
            </div>
        </div>
        {/*
        <div className="grid gap-4 absolute top-[9%] left-[3%] w-[94%] h-[82%] grid-rows-10 grid-cols-10 p-[2rem]">
          <div className="border row-span-4 col-span-3">1</div>
          <div className="border row-span-4 col-span-3 col-start-1 row-start-5">5</div>
          <div className="row-span-8 col-span-4 col-start-4 relative flex items-center justify-center">
            <FutureProjectsList />
          </div>
          <div className="border row-span-3 col-span-3 col-start-8">3</div>
          <div className="border row-span-3 col-span-3 col-start-8 row-start-6">4</div>
          <div className="row-span-2 row-start-9 col-span-10 mt-[5rem] border">
            <div className="w-full h-full flex items-center">
              {openFolders.map((folder: IFolder | IList, i:number) => (
                <FutureProjectIcon
                  key={generateId()}
                  project={folder}
                  i={i}
                  handleClick={handleClick}
                />
              ))}
            </div>
          </div>
        </div>
        {openFolders.length > 0 && openFolders.map((folder: IFolder | IList) => (
          <FutureProject projectName={folder.name} key={generateId()} />
        ))}
          */}
      </div>
    </div>
  );
}