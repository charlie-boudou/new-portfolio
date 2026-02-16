'use client';

import { useTranslation } from 'react-i18next';
import { projects } from '@/utils/datas';
import { IProject } from '@/utils/types';
import Image from "next/image";
import arrowCircle from "@/assets/arrowCircle.svg";
import Link from "next/link";
import { Typewriter } from "../TypeWriter";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from 'react';

interface IFutureProjectProps {
  projectName: string;
}


export default function FutureProject({projectName}: IFutureProjectProps) {
    const { t } = useTranslation();
    const [isSkipped, setIsSkipped] = useState(false);
    const controls = useAnimation();

    const project = projects(t).find((project: IProject) => project.name === projectName) as IProject;

    const titleSpeed = 0.1;
    const descSpeed = 0.030;

    const delayTitleLabel = 0.2;
    const delayTitle = delayTitleLabel + (t('projectName').length * (titleSpeed / 2));
    const delayDescLabel = delayTitle + (project.name.length * (titleSpeed / 2)) + 0.3;
    const delayDescription = delayDescLabel + (t('projectData').length * (titleSpeed / 2));
    const durationOfDesc = project.description.length * (descSpeed / 2);
    const delayStacksLabel = delayDescription + durationOfDesc + 0.5;
    const delayPhotos = delayStacksLabel + (project.stacks?.length || 0) * 0.5 + 0.4;
    const delayLink = delayPhotos + (project.pictures?.length || 0) * 0.3 + 0.5;

    const handleSkip = (e: React.MouseEvent) => {
      e.stopPropagation();
      setIsSkipped(true);
    };

    useEffect(() => {
      if (isSkipped) {
        controls.start({
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0 }
        });
      }
    }, [isSkipped, controls]);

    return (
        <div className="w-full h-full p-[1rem]" onClick={handleSkip}>
            <div className="text-cyan-400 mb-[1rem] tracking-widest w-full flex flex-col space-y-[.3rem] md:flex-row md:items-center">
              <span className="pr-[.5rem]">
                <Typewriter text={t('projectName')} speed={0.1} delay={delayTitleLabel} forceShow={isSkipped} />
              </span>
              <span className="text-[2rem] text-[#CF5CCD]">
                <Typewriter text={project.name} speed={0.1} delay={delayTitle} forceShow={isSkipped} />
              </span>
            </div>
            <div className="text-white w-full flex flex-col space-y-[1rem]">
              <p  className="text-cyan-400">
                <Typewriter text={t('projectData')} speed={0.1} delay={delayDescLabel} forceShow={isSkipped} />
              </p>
              <p className="text-justify">
                <Typewriter text={project.description} speed={descSpeed} delay={delayDescription} forceShow={isSkipped} />
              </p>
              <div className="w-full flex flex-col space-y-[.5rem] ">
                <p className="text-cyan-400 pb-[.5rem]">
                  <Typewriter text={t('projectStacks')} speed={0.1} delay={delayStacksLabel} forceShow={isSkipped} />
                </p>
                <div className="flex flex-col space-y-[.5rem]">
                  {project.stacks.map((stack: string, index: number) => {
                    const currentStackDelay = delayStacksLabel + 0.5 + (index * 0.4);

                    return (
                      <div key={`${stack}-${index}`} className="flex items-center space-x-[.5rem]">
                          <motion.div
                              initial={isSkipped ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                              animate={controls}
                              transition={{ delay: isSkipped ? 0 : currentStackDelay }}
                          >
                              <Image 
                                  src={arrowCircle} 
                                  alt="arrow" 
                                  width={24} 
                                  height={24} 
                                  className="w-[1.5rem] h-[1.5rem]" 
                              />
                          </motion.div>
                          <p className="font-mono">
                              <Typewriter 
                                  text={stack} 
                                  speed={0.05} 
                                  delay={currentStackDelay}
                                  forceShow={isSkipped}
                              />
                          </p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="w-full flex flex-col space-y-[1rem]">
                <p className="text-cyan-400">
                    <Typewriter text={t('projectPhotos')} speed={0.1} delay={delayPhotos} forceShow={isSkipped} />
                </p>
                <div className='w-full flex items-center justify-center'>
                    <div className="grid md:grid-cols-2 gap-2">
                    {project.pictures && project.pictures.map((picture: string, index: number) => {
                      if (index === 0) return null;

                      const currentPicDelay = delayPhotos + 0.5 + (index - 1) * 0.3;

                      return (
                        <motion.div
                            key={`image-${index}`}
                            initial={isSkipped ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.95 }}
                            animate={controls}
                            transition={{ delay: isSkipped ? 0 : currentPicDelay }}
                            className="relative overflow-hidden group border border-cyan-400/20 w-[15rem] h-[10rem]"
                        >
                            <div className="w-[15rem] h-[10rem] absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10" /> 
                            <Image 
                                src={picture} 
                                alt="picture" 
                                width={500} 
                                height={500} 
                                className="w-[15rem] h-[10rem] object-cover" 
                            />
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <motion.div 
                className="flex items-center justify-center my-[2rem]"
                initial={isSkipped ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                animate={controls}
                transition={{ delay: isSkipped ? 0 : delayLink }}
              >
                <motion.div 
                    whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0_0_30px_rgba(34,211,238,0.8)",
                        filter: "brightness(1.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center justify-center p-[.5rem] rounded-[.3rem] bg-gradient-to-b from-cyan-400 to-[#CF5CCD] shadow-[0_0_20px_rgba(34,211,238,0.5)] cursor-pointer"
                >
                    <Link
                        href={project.link}
                        className="text-white font-bold tracking-widest px-4 py-1"
                    >
                        <Typewriter text={t('projectLink')} speed={0.1} delay={delayLink + 0.5} forceShow={isSkipped} />
                    </Link>
                </motion.div>
              </motion.div>
            </div>
        </div>
  );
}