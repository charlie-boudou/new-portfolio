'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typewriter } from '../TypeWriter';

const HEX_CODES = ['BD', 'E9', '55', '1C', '7A'];

type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

interface GameSettings {
    gridSize: number;
    sequenceLength: number;
    bufferSize: number;
}

const SETTINGS: Record<Difficulty, GameSettings> = {
    EASY: { gridSize: 4, sequenceLength: 2, bufferSize: 6 },
    MEDIUM: { gridSize: 5, sequenceLength: 3, bufferSize: 5 },
    HARD: { gridSize: 6, sequenceLength: 4, bufferSize: 4 },
};

export default function BreachProtocol() {
    const [difficulty, setDifficulty] = useState<Difficulty>('MEDIUM');
    const [grid, setGrid] = useState<string[][]>([]);
    const [targetSequence, setTargetSequence] = useState<string[]>([]);
    const [buffer, setBuffer] = useState<string[]>([]);
    const [activeRow, setActiveRow] = useState<number | null>(0);
    const [activeCol, setActiveCol] = useState<number | null>(null);
    const [isVertical, setIsVertical] = useState(false);
    const [gameState, setGameState] = useState<'PLAYING' | 'WON' | 'LOST'>('PLAYING');

    const initGame = useCallback((diff: Difficulty) => {
        const { gridSize, sequenceLength } = SETTINGS[diff];
        
        const newGrid = Array.from({ length: gridSize }, () =>
            Array.from({ length: gridSize }, () => HEX_CODES[Math.floor(Math.random() * HEX_CODES.length)])
        );

        const target = Array.from({ length: sequenceLength }, () => HEX_CODES[Math.floor(Math.random() * HEX_CODES.length)]);

        setGrid(newGrid);
        setTargetSequence(target);
        setBuffer([]);
        setActiveRow(0);
        setActiveCol(null);
        setIsVertical(false);
        setGameState('PLAYING');
    }, []);

    useEffect(() => {
        initGame(difficulty);
    }, [difficulty, initGame]);

    const handleCellClick = (r: number, c: number, value: string) => {
        if (gameState !== 'PLAYING') return;
        
        if (isVertical && c !== activeCol) return;
        if (!isVertical && r !== activeRow) return;

        const newBuffer = [...buffer, value];
        setBuffer(newBuffer);

        if (isVertical) {
            setActiveRow(r);
            setActiveCol(null);
        } else {
            setActiveCol(c);
            setActiveRow(null);
        }
        setIsVertical(!isVertical);

        if (newBuffer.join('').includes(targetSequence.join(''))) {
            setGameState('WON');
            return;
        }
        if (newBuffer.length >= SETTINGS[difficulty].bufferSize) {
            setGameState('LOST');
        }
    };

    return (
        <div className="w-[90%] mx-auto p-[1.5rem] bg-slate-900/90 border border-cyan-400/30 text-cyan-400 shadow-2xl backdrop-blur-md">
            <div className="flex-1 flex flex-wrap items-center justify-between gap-4 mb-[2rem] border-b border-cyan-400/20 pb-[1rem]">
                <div className="flex space-x-[.5rem]">
                    {(['EASY', 'MEDIUM', 'HARD'] as Difficulty[]).map((d) => (
                        <button
                            key={d}
                            onClick={() => setDifficulty(d)}
                            className={`px-3 py-1 text-[0.7rem] border transition-all ${
                                difficulty === d 
                                ? 'bg-cyan-400 text-black border-cyan-400 font-bold' 
                                : 'border-cyan-400/30 hover:border-cyan-400'
                            }`}
                        >
                            {d}
                        </button>
                    ))}
                </div>
                
                <button 
                    onClick={() => initGame(difficulty)}
                    className="text-[0.7rem] uppercase border border-[#CF5CCD] text-[#CF5CCD] px-4 py-1 hover:bg-[#CF5CCD] hover:text-white transition-colors"
                >
                    [ RESTART_SYSTEM ]
                </button>
            </div>

            <div className="flex flex-col md:flex-row flex-1 space-y-[.5rem] justify-between mb-[2rem]">
                <div className="md:text-[1.2rem] truncate tracking-tighter uppercase italic font-bold">
                    <Typewriter text={`BREACH_PROTOCOL_v2.0_${difficulty}`} speed={0.05} />
                </div>
                <div className={`animate-pulse font-bold ${gameState === 'WON' ? 'text-green-400' : gameState === 'LOST' ? 'text-red-500' : 'text-[#CF5CCD]'}`}>
                    {gameState === 'WON' ? "ACCESS_GRANTED" : gameState === 'LOST' ? "CONNECTION_TERMINATED" : "UPLINK_STABLE"}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col">
                    <p className="text-[0.7rem] text-[#CF5CCD] uppercase mb-[.5rem] tracking-[0.3em]">Code Matrix</p>
                    <div 
                        className="grid gap-2 bg-cyan-950/20 p-[1rem] border border-cyan-400/10"
                        style={{ gridTemplateColumns: `repeat(${SETTINGS[difficulty].gridSize}, minmax(0, 1fr))` }}
                    >
                        {grid.map((row, r) => row.map((cell, c) => {
                            const isSelectable = isVertical ? c === activeCol : r === activeRow;
                            return (
                                <motion.div
                                    key={`${r}-${c}`}
                                    whileHover={isSelectable && gameState === 'PLAYING' ? { scale: 1.1, backgroundColor: 'rgba(34, 211, 238, 0.2)' } : {}}
                                    onClick={() => handleCellClick(r, c, cell)}
                                    className={`
                                        h-[2.5rem] w-[2.5rem] flex items-center justify-center cursor-pointer border transition-all font-bold
                                        ${isSelectable ? 'border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]' : 'border-transparent text-cyan-900'}
                                        ${gameState === 'WON' ? 'border-green-400 text-green-400' : ''}
                                        ${gameState === 'LOST' ? 'border-red-500 text-red-900' : ''}
                                    `}
                                >
                                    {cell}
                                </motion.div>
                            );
                        }))}
                    </div>
                </div>
                <div className="space-y-[2rem]">
                    <div>
                        <p className="text-[0.7rem] text-[#CF5CCD] uppercase mb-[.5rem] tracking-[0.3em]">Required Sequence</p>
                        <div className="flex space-x-[1rem] p-[1rem] bg-cyan-900/10 border border-cyan-400/20">
                            {targetSequence.map((s, i) => (
                                <span key={i} className={`text-xl font-black ${buffer.includes(s) ? 'text-[#CF5CCD]' : 'text-cyan-800'}`}>
                                    {s}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-end mb-[.5rem]">
                            <p className="text-[0.7rem] text-[#CF5CCD] uppercase tracking-[0.3em]">Buffer</p>
                            <span className="text-[0.6rem] text-cyan-600">
                                {buffer.length} / {SETTINGS[difficulty].bufferSize}
                            </span>
                        </div>
                        <div className="flex space-x-[.5rem] min-h-[3.5rem] p-[.5rem] border border-dashed border-cyan-400/30">
                            <AnimatePresence>
                                {buffer.map((b, i) => (
                                    <motion.span 
                                        key={`${b}-${i}`}
                                        initial={{ x: -10, opacity: 0 }} 
                                        animate={{ x: 0, opacity: 1 }} 
                                        className="bg-cyan-400/20 border border-cyan-400 px-[.6rem] py-[.3rem] text-cyan-400 font-bold flex items-center justify-center"
                                    >
                                        {b}
                                    </motion.span>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                    <AnimatePresence>
                        {gameState !== 'PLAYING' && (
                            <motion.div 
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex items-center flex-col space-y-[1rem]"
                            >
                                <div className={`p-[1rem] ${gameState === 'WON' ? 'bg-[#CF5CCD] shadow-[0_0_20px_#CF5CCD]' : 'bg-red-600 shadow-[0_0_20px_red-600]'} bg-[#CF5CCD] text-white text-center font-black tracking-widest uppercase`}>
                                    {gameState === 'WON' ? "Data Extracted Successfully" : "Neural Link Severed"}
                                </div>
                                
                                <button 
                                    onClick={() => initGame(difficulty)}
                                    className="w-full py-[.8rem] bg-white text-black font-black uppercase tracking-[.2em] hover:bg-cyan-400 transition-colors"
                                >
                                    [ PLAY_AGAIN ]
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}