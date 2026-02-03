'use client';

import React, { useState, useCallback } from 'react';
import { ICell } from "@/utils/types";
import { createNewGrid } from '@/utils/functions';

export default function PastMinesweeper() {
    const rows = 10;
    const cols = 10;
    const minesCount = 12;

    const borderOutset = "border-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080]";
    const borderInset = "border-2 border-b-white border-r-white border-t-[#808080] border-l-[#808080]";

    const [grid, setGrid] = useState<ICell[][]>(() => createNewGrid(rows, cols, minesCount));
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);

    const initGame = useCallback(() => {
        setGrid(createNewGrid(rows, cols, minesCount));
        setGameOver(false);
        setWin(false);
    }, []);

    const revealCell = (r: number, c: number) => {
        if (grid[r][c].isRevealed || grid[r][c].isFlagged) return;

        const newGrid: ICell[][] = [...grid.map(row => [...row])];
    
        if (newGrid[r][c].isMine) {
            setGameOver(true);
            newGrid.forEach(row => row.forEach(cell => { if(cell.isMine) cell.isRevealed = true; }));
            setGrid(newGrid);
            return;
        }

        const floodFill = (row: number, col: number) => {
            if (row < 0 || row >= rows || col < 0 || col >= cols || newGrid[row][col].isRevealed || newGrid[row][col].isFlagged) return;
            
            newGrid[row][col].isRevealed = true;

            if (newGrid[row][col].neighborCount === 0) {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) floodFill(row + i, col + j);
                }
            }
        };

        floodFill(r, c);
        setGrid(newGrid);

        const hasWon = newGrid.every(row => row.every(cell => cell.isMine || cell.isRevealed));
        if (hasWon) setWin(true);
    };

    const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
        e.preventDefault();

        if (gameOver || win || grid[r][c].isRevealed) return;

        const newGrid = [...grid.map(row => [...row])];
        const cell = newGrid[r][c];

        const currentState = cell.isFlagged ? 'FLAGGED' : (cell.isQuestion ? 'QUESTION' : 'NORMAL');

        switch (currentState) {
            case 'NORMAL':
                cell.isFlagged = true;
                cell.isQuestion = false;
                break;
            case 'FLAGGED':
                cell.isFlagged = false;
                cell.isQuestion = true;
                break;
            case 'QUESTION':
                cell.isFlagged = false;
                cell.isQuestion = false;
                break;
        }

        setGrid(newGrid);
    };

    const getNumberColor = (num: number) => {
        const colors = ['', 'text-blue-700', 'text-green-700', 'text-red-700', 'text-blue-900', 'text-red-900', 'text-teal-700', 'text-black', 'text-gray-500'];
        return colors[num] || '';
    };

    return (
        <div className="bg-[#BCBEBC] pt-[.3rem] flex flex-col items-center select-none w-fit mx-auto">
            <div className={`${borderOutset} p-[.5rem] bg-[#BCBEBC]`}>
                <div className={`${borderInset} mb-[.8rem] p-[.5rem] flex justify-between items-center bg-[#BCBEBC]`}>
                    <div className="bg-black text-[#FF0000] font-mono text-3xl px-1 border border-[#808080] min-w-[3rem] text-center">
                        {minesCount.toString().padStart(3, '0')}
                    </div>   
                    <button 
                        onClick={initGame} 
                        className={`${borderOutset} w-[2.5rem] h-[2.5rem] flex items-center justify-center text-2xl active:border-none active:pt-[.25rem] active:pl-[.25rem] bg-[#BCBEBC] outline-none`}
                    >
                        {win ? '😎' : gameOver ? '😵' : '🙂'}
                    </button>
                    <div className="bg-black text-[#FF0000] font-mono text-3xl px-[.25rem] border border-[#808080] min-w-[3rem] text-center">
                        000
                    </div>
                </div>
                <div className={`${borderInset} bg-[#808080]`}>
                    <div className="grid grid-cols-10 gap-0">
                        {grid.map((row, r) => row.map((cell, c) => (
                            <div
                                key={`${r}-${c}`}
                                onClick={() => revealCell(r, c)}
                                onContextMenu={(e) => toggleFlag(e, r, c)}
                                className={`
                                    w-[1.5rem] h-[1.5rem] flex items-center justify-center text-sm font-black
                                    ${cell.isRevealed 
                                        ? 'bg-[#BCBEBC] border-[0.5px] border-[#808080]' 
                                        : `${borderOutset} cursor-default active:border-none bg-[#BCBEBC]`
                                    }
                                `}
                            >
                                {cell.isRevealed && !cell.isMine && cell.neighborCount > 0 && (
                                    <span className={getNumberColor(cell.neighborCount)}>{cell.neighborCount}</span>
                                )}
                                {cell.isRevealed && cell.isMine && '💣'}
                                {!cell.isRevealed && (
                                    <>
                                        {cell.isFlagged && '🚩'}
                                        {cell.isQuestion && '?'}
                                    </>
                                )}
                            </div>
                        )))}
                    </div>
                </div>
            </div>
        </div>
    );
}