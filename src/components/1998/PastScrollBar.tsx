'use client';

import { IFolder, IList, IAboutMe } from '@/utils/types';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';

interface IPastScrollBarProps {
    scrollRef: RefObject<HTMLDivElement | null>;
    projects: IFolder | IList | IAboutMe | string[]
}

export default function PastScrollBar({scrollRef, projects}: IPastScrollBarProps) {
    const trackRef = useRef<HTMLDivElement>(null);

    const [thumbStyle, setThumbStyle] = useState({ height: '100%', top: '0%' });
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [startScrollTop, setStartScrollTop] = useState(0);

    const updateThumb = useCallback(() => {
        const el = scrollRef.current;
        if (!el || isDragging) return;

        const scrollRange = el.scrollHeight;
        const visibleRange = el.clientHeight;
        const scrollPos = el.scrollTop;

        if (scrollRange <= visibleRange) {
            setThumbStyle({ height: '100%', top: '0%' });
        } else {
            const heightRatio = Math.max((visibleRange / scrollRange) * 100, 10);
            const topRatio = (scrollPos / (scrollRange - visibleRange)) * (100 - heightRatio);
            setThumbStyle({ height: `${heightRatio}%`, top: `${topRatio}%` });
        }
    }, [isDragging, scrollRef]);

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartY(e.clientY);
        setStartScrollTop(scrollRef.current?.scrollTop || 0);
        document.body.style.userSelect = 'none'; 
    };

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging || !scrollRef.current || !trackRef.current) return;

        const deltaY = e.clientY - startY;
        const el = scrollRef.current;
        const trackHeight = trackRef.current.clientHeight;
        
        const scrollRange = el.scrollHeight - el.clientHeight;
        const thumbHeight = (parseFloat(thumbStyle.height) / 100) * trackHeight;
        const availableTrackSpace = trackHeight - thumbHeight;

        const scrollDelta = (deltaY / availableTrackSpace) * scrollRange;
        el.scrollTop = startScrollTop + scrollDelta;

        const topRatio = (el.scrollTop / scrollRange) * (100 - parseFloat(thumbStyle.height));
        setThumbStyle(prev => ({ ...prev, top: `${topRatio}%` }));
    }, [isDragging, startY, startScrollTop, thumbStyle.height, scrollRef]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
        document.body.style.userSelect = '';
    }, []);

    const handleScrollClick = (direction: 'up' | 'down') => {
        if (scrollRef.current) {
            const scrollAmount = 100;
            scrollRef.current.scrollBy({
                top: direction === 'up' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    useEffect(() => {
        const el = scrollRef.current;

        if (!el) return;

        requestAnimationFrame(updateThumb);
        el.addEventListener('scroll', updateThumb);
        const ro = new ResizeObserver(updateThumb);
        ro.observe(el);

        return () => {
            el.removeEventListener('scroll', updateThumb);
            ro.disconnect();
        };
    }, [updateThumb, projects, scrollRef]);
    
    return (
        <div className="w-[1.2rem] bg-[#BCBEBC] flex flex-col border-l border-[#808080] shrink-0">
            <button 
                onClick={() => handleScrollClick('up')}
                className={`h-[1.2rem] w-full flex items-center justify-center border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:border-b-white active:border-r-white active:border-t-[#808080] active:border-l-[#808080] bg-[#BCBEBC] outline-none`}
            >
                <div className="w-0 h-0 border-l-[.3rem] border-l-transparent border-r-[.3rem] border-r-transparent border-b-[.3rem] border-b-black" />
            </button>
            <div ref={trackRef} className="flex-1 relative bg-[#dfdfdf]" style={{ backgroundImage: 'linear-gradient(45deg, #bcbebc 25%, transparent 25%, transparent 75%, #bcbebc 75%, #bcbebc), linear-gradient(45deg, #bcbebc 25%, transparent 25%, transparent 75%, #bcbebc 75%, #bcbebc)', backgroundSize: '2px 2px' }}>
                <div 
                    onMouseDown={handleMouseDown}
                    className={`absolute w-full bg-[#BCBEBC] border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] cursor-default ${isDragging ? '' : 'transition-[top] duration-75'}`}
                    style={{ height: thumbStyle.height, top: thumbStyle.top }}
                />
            </div>
            <button 
                onClick={() => handleScrollClick('down')}
                className={`h-[1.2rem] w-full flex items-center justify-center border-2 border-t-white border-l-white border-b-[#808080] border-r-[#808080] active:border-b-white active:border-r-white active:border-t-[#808080] active:border-l-[#808080] bg-[#BCBEBC] outline-none`}
            >
                <div className="w-0 h-0 border-l-[.3rem] border-l-transparent border-r-[.3rem] border-r-transparent border-t-[.3rem] border-t-black" />
            </button>
        </div>  
    );
}