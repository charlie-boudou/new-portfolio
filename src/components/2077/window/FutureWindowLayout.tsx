'use client';

import { useContext, useState, useEffect, useMemo, useCallback } from "react";
import { DisplayContext } from "../../../contexts/DisplayContext";
import { IFolder } from '@/utils/types';
import { closeWindow, hideWindow, getValue } from "@/utils/functions";
import PastWindowButton from "../../1998/desktop/window/PastWindowButton";
import Image from 'next/image';
import cross from '@/assets/cross.svg';
import { useTranslation } from 'react-i18next';
import { useWindowDrag } from '@/hooks/useWindowDrag';
import { useWindowResize } from '@/hooks/useWindowResize';
import { useWindowMaximize } from '@/hooks/useWindowMaximize';

interface IFutureWindowLayoutProps {
  children: React.ReactNode;
  projectName: string;
  minimize?: boolean;
  resize: boolean;
}

export default function FutureWindowLayout({
    children,
    projectName,
    minimize,
    resize
}: IFutureWindowLayoutProps) {
    const { t } = useTranslation();
    const {
        openFolders,
        updateOpenFolders,
        updateHiddenFolders,
        windowActive,
        updateWindowActive,
        hiddenFolders
    } = useContext(DisplayContext);

    const [isMobile, setIsMobile] = useState<boolean>(false);

    const isActive = windowActive === projectName;
    const isHidden = hiddenFolders.includes(projectName);
    const smallClip = "polygon(13% 3%, 100% 3%, 100% 87%, 87% 97%, 0% 97%, 0% 13%)";
    
    const isAboutMe = projectName === getValue(t('about'), true);
    const isLanguage = projectName.toLowerCase().includes('langu');

    const dragBounds = useMemo(() => {
        if (typeof window === 'undefined') return undefined;
        const padding = 54;
        const bottomPadding = 74;
        return {
            minX: padding, minY: padding,
            maxX: window.innerWidth - padding,
            maxY: window.innerHeight - bottomPadding,
        };
    }, []);

    const initialPos = useMemo(() => {
        if (typeof window === 'undefined') return { x: 100, y: 100 };
         
        const width = isLanguage ? window.innerWidth * 0.55 : window.innerWidth * 0.45;
        
        return {
            x: (window.innerWidth - width) / 2,
            y: window.innerHeight * 0.2,
        };
    }, [isLanguage]);

    const { pos, setPos, startDrag, windowRef, isDragging } = useWindowDrag({
        initialPos,
        enabled: !isMobile,
        onDragStart: () => updateWindowActive(projectName),
        isFuture: true,
        bounds: dragBounds,
    });

    const { isMaximized, toggleMaximize } = useWindowMaximize({
        windowRef,
        pos,
        setPos,
    });

    const { isResizing, startResize } = useWindowResize({
        windowRef,
        minWidth: 400,
        minHeight: 300,
        isFuture: true,
        bounds: dragBounds,
    });

    const handleMinimize = useCallback(() => { 
        hideWindow(projectName, windowActive, updateWindowActive, updateHiddenFolders);
    }, [projectName, windowActive, updateWindowActive, updateHiddenFolders]);
    
    const handleClose = () => closeWindow(projectName, windowActive, openFolders as IFolder[], updateOpenFolders, updateWindowActive, true);

    const containerStyle = useMemo(() => {
        const style: React.CSSProperties = {
            zIndex: isActive ? 100 : 50,
            left: (isMobile || isMaximized) ? '0' : pos.x,
            top: (isMobile || isMaximized) ? '0' : pos.y,
            width: (isMobile || isMaximized) ? '100%' : (isLanguage ? '55%' : '45%'),
            height: (isMobile || isMaximized) ? '100%' : (resize && !isLanguage ? '45%' : '40%'),
            transition: (isDragging || isResizing) ? 'none' : 'all 0.5s ease-in-out',
            willChange: 'width, height, top, left',
        };
        return style;
    }, [pos, isMobile, isMaximized, isActive, resize, isDragging, isResizing, isLanguage]);

    const contentClasses = useMemo(() => {
        const base = "relative z-[30] transition-all duration-500 overflow-auto bg-slate-800";
        if (isMaximized || isMobile) {
            return `${base} ${isMaximized ? (projectName === "Images" || projectName === "Breach Protocol"  ? 'w-full h-full' : 'w-full h-full lg:w-[70%] lg:h-[90%] lg:border-2 lg:border-cyan-400 lg:shadow-[0_0_20px_rgba(34,211,238,0.5)]') : 'w-full h-full'}`;
        }
        return `${base} w-full h-full`;
    }, [isMaximized, isMobile, projectName]);

    useEffect(() => {
        if (isAboutMe && !isMaximized) {
            toggleMaximize();
        }
    }, [isAboutMe, toggleMaximize, isMaximized]);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (projectName !== getValue(t('shutFuture'), true) as string) {
            const handleClickOutside = (event: MouseEvent) => {
                if (isHidden) return;
                if (
                    windowRef.current && 
                    !windowRef.current.contains(event.target as Node) && 
                    isActive
                ) {
                    const isTaskbarClick = (event.target as Element).closest('.past-taskbar-item');
                    
                    if (!isTaskbarClick) {
                        handleMinimize();
                    }
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [isActive, isHidden, projectName, handleMinimize, windowRef, t]);

    return (
        <div
            ref={windowRef}
            className={`absolute flex flex-col items-center justify-center overflow-visible ${isHidden ? "hidden" : ""} ${isMaximized ? 'py-[3rem]' : 'py-[1rem]'}`}
            style={containerStyle}
            onMouseDown={() => updateWindowActive(projectName)}
        >
            <div
                className="absolute inset-0 z-0 pointer-events-none transition-all duration-500"
                style={{
                    clipPath: (isMaximized || isMobile) ? 'none' : smallClip,
                    WebkitClipPath: (isMaximized || isMobile) ? 'none' : smallClip,
                }}
            >
                <div className="absolute inset-0 bg-slate-800" />
            </div>
            <div
                className={contentClasses}
                style={{
                    clipPath: (isMaximized || isMobile) ? 'none' : smallClip,
                }}
            >
                <div className="relative w-full h-full">
                    {!isMaximized && !isMobile && (
                        <div
                            className="absolute top-0 left-0 right-0 h-14 cursor-grab active:cursor-grabbing z-[100]"
                            onMouseDown={startDrag}
                        />
                    )}
                    <div className="relative w-full h-full flex flex-col">
                        <div
                            className="absolute inset-0 opacity-10 pointer-events-none z-0"
                            style={{
                                backgroundImage: `linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(90deg, #22d3ee 1px, transparent 1px)`,
                                backgroundSize: '25px 25px',
                            }}
                        />
                        <div className={`relative z-10 flex-1 flex items-center justify-center text-white overflow-auto ${isMaximized ? 'p-[1.5rem] pb-[2.5rem]' : 'px-[2rem] pt-[2.5rem] pb-[2rem]'}`}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            {(!isMaximized && !isMobile) ? (
                <div className="absolute inset-0 z-[200] pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M 13,3 L 100,3 L 100,87 L 87,97 L 0,97 L 0,13 Z" fill="none" stroke="#22d3ee" strokeWidth="18" vectorEffect="non-scaling-stroke" />
                        <path d="M 65,2 L 100,2 L 100,12 L 67,12 Z" fill="#22d3ee" />
                        <path d="M 0,90 L 13,90 L 15,97 L 0,97 Z" fill="#22d3ee" />
                        <path d="M 14,90 L 16,90 L 18,97 L 16,97 Z" fill="#22d3ee" />
                        <path d="M 17,90 L 19,90 L 21,97 L 19,97 Z" fill="#22d3ee" />
                        <path d="M 20,90 L 22,90 L 24,97 L 22,97 Z" fill="#22d3ee" />
                    </svg>
                </div>
            ) : (
                <svg 
                    className="absolute inset-0 pointer-events-none z-[200]" 
                    width="100%" 
                    height="100%" 
                    viewBox="0 0 100 100" 
                    preserveAspectRatio="none"
                >
                    <path 
                        d="M 13,3 L 87,3 L 97,13 L 97,87 L 87,97 L 13,97 L 3,87 L 3,13 Z"
                        fill="none" 
                        stroke="#22d3ee" 
                        strokeWidth="14" 
                        vectorEffect="non-scaling-stroke"
                    />
                    <path 
                        d="M 30,3 L 70,3 L 68,6 L 32,6 Z" 
                        fill="#22d3ee"
                    />
                    <path 
                        d="M 32,94 L 68,94 L 70,97 L 30,97 Z" 
                        fill="#22d3ee"
                    />
                    <path 
                        d="M 3,30 L 3,70 L 5,68 L 5,32 Z" 
                        fill="#22d3ee" 
                    />
                    <path 
                        d="M 97,30 L 97,70 L 95,68 L 95,32 Z" 
                        fill="#22d3ee" 
                    />
                </svg>
            )}
            {resize && !isMaximized && !isMobile && (
                <div
                    className="absolute bottom-0 right-0 w-8 h-8 cursor-se-resize z-[300] hover:bg-cyan-400/20 transition-colors"
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        startResize(e);
                    }}
                >
                    <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-cyan-400" />
                </div>
            )}
            <div
                className={`absolute flex space-x-[1rem] transition-all duration-500 ${
                    (isMaximized || isMobile)
                        ? `${!isMobile ? 'top-5' : 'top-4'} left-1/2 -translate-x-1/2 z-[1000]`
                        : "top-2 right-[3%] z-[400]"
                }`}
            >
                {minimize && (
                    <PastWindowButton
                        icon={<div className="w-[.6rem] border-1 border-white bg-white" />}
                        handleClick={handleMinimize}
                        isFuture
                    />
                )}
                {resize && !isMobile && !isLanguage && (
                    <PastWindowButton
                        icon={<div className="border-white border-t-3 border-1 w-[.8rem] h-[.8rem] m-auto" />}
                        handleClick={toggleMaximize}
                        isFuture
                    />
                )}
                <PastWindowButton
                    icon={<Image src={cross} alt="close" className="w-[.8rem] h-[.8rem] invert" />}
                    handleClick={handleClose}
                    isFuture
                />
            </div>
        </div>
    );
}