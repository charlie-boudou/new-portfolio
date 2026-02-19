'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Column {
    left: number;
    duration: number;
    delay: number;
    content: string[];
}

export default function FutureCodeRain() {
    const characters = "0123456789</>CHARLIE1A2B3C4D5E6F7G8H9I";

    const [columnsData] = useState<Column[]>(() => {
        return Array.from({ length: 50 }).map((_, i: number) => ({
            left: (i * 2),
            duration: Math.random() * 5 + 3, 
            delay: Math.random() * -10, 
            content: Array.from({ length: 40 }).map(() => 
                characters.charAt(Math.floor(Math.random() * characters.length)) + 
                characters.charAt(Math.floor(Math.random() * characters.length))
            )
        }));
    });

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {columnsData.map((col: Column, i: number) => (
                <motion.div
                    key={i}
                    initial={{ y: "-100%" }}
                    animate={{ y: "100%" }}
                    transition={{
                        duration: col.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: col.delay,
                    }}
                    className="absolute flex flex-col text-cyan-400 text-[0.65rem] leading-[1rem] font-bold"
                    style={{ left: `${col.left}%` }}
                >
                    {col.content.map((char: string, j: number) => (
                        <span 
                            key={j} 
                            className={`${j % 8 === 0 ? 'text-[#CF5CCD] shadow-[0_0_8px_#CF5CCD]' : 'opacity-40'}`}
                        >
                            {char}
                        </span>
                    ))}
                </motion.div>
            ))}
        </div>
    );
};