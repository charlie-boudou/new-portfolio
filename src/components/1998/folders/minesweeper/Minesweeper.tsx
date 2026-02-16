'use client';

import React, { useState, useCallback, useMemo, memo } from 'react';
import { ICell } from '@/utils/types';
import { createNewGrid } from '@/utils/functions';
import { BORDER_STYLES, WIN98_COLORS, MINESWEEPER_COLORS } from '@/constants/styles';

const GAME_CONFIG = {
  rows: 10,
  cols: 10,
  minesCount: 12,
} as const;

interface IMinesweeperCellProps {
  cell: ICell;
  rowIndex: number;
  colIndex: number;
  onReveal: (r: number, c: number) => void;
  onFlag: (e: React.MouseEvent, r: number, c: number) => void;
}

const MinesweeperCell = memo(function MinesweeperCell({
  cell,
  rowIndex,
  colIndex,
  onReveal,
  onFlag,
}: IMinesweeperCellProps) {
  const cellClasses = useMemo(
    () => `
      w-[1.5rem] h-[1.5rem] flex items-center justify-center text-sm font-black
      ${cell.isRevealed
        ? 'bg-[#BCBEBC] border-[0.5px] border-[#808080]'
        : `${BORDER_STYLES.outset} cursor-pointer active:border-none bg-[#BCBEBC]`
      }
    `.trim(),
    [cell.isRevealed]
  );

  const numberColor = useMemo(
    () => cell.neighborCount > 0 ? MINESWEEPER_COLORS[cell.neighborCount] : '',
    [cell.neighborCount]
  );

  const handleClick = useCallback(() => {
    onReveal(rowIndex, colIndex);
  }, [rowIndex, colIndex, onReveal]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    onFlag(e, rowIndex, colIndex);
  }, [rowIndex, colIndex, onFlag]);

  return (
    <div
      className={cellClasses}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
    >
      {cell.isRevealed && !cell.isMine && cell.neighborCount > 0 && (
        <span className={numberColor}>{cell.neighborCount}</span>
      )}
      {cell.isRevealed && cell.isMine && '💣'}
      {!cell.isRevealed && (
        <>
          {cell.isFlagged && '🚩'}
          {cell.isQuestion && '?'}
        </>
      )}
    </div>
  );
});

const MineDisplay = memo(function MineDisplay({ count }: { count: number }) {
  return (
    <div className={`bg-black text-[${WIN98_COLORS.red}] font-mono text-3xl px-1 border border-[#808080] min-w-[3rem] text-center`}>
      {count.toString().padStart(3, '0')}
    </div>
  );
});

export default function PastMinesweeper() {
  const { rows, cols, minesCount } = GAME_CONFIG;

  const [grid, setGrid] = useState<ICell[][]>(() => createNewGrid(rows, cols, minesCount));
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  const initGame = useCallback(() => {
    setGrid(createNewGrid(rows, cols, minesCount));
    setGameOver(false);
    setWin(false);
  }, [rows, cols, minesCount]);

  const revealCell = useCallback(
    (r: number, c: number) => {
      if (grid[r][c].isRevealed || grid[r][c].isFlagged || gameOver || win) return;

      const newGrid: ICell[][] = grid.map(row => [...row]);

      if (newGrid[r][c].isMine) {
        setGameOver(true);
        newGrid.forEach(row =>
          row.forEach(cell => {
            if (cell.isMine) cell.isRevealed = true;
          })
        );
        setGrid(newGrid);
        return;
      }

      const floodFill = (row: number, col: number) => {
        if (
          row < 0 ||
          row >= rows ||
          col < 0 ||
          col >= cols ||
          newGrid[row][col].isRevealed ||
          newGrid[row][col].isFlagged
        )
          return;

        newGrid[row][col].isRevealed = true;

        if (newGrid[row][col].neighborCount === 0) {
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              floodFill(row + i, col + j);
            }
          }
        }
      };

      floodFill(r, c);
      setGrid(newGrid);

      const hasWon = newGrid.every(row => row.every(cell => cell.isMine || cell.isRevealed));
      if (hasWon) setWin(true);
    },
    [grid, gameOver, win, rows, cols]
  );

  const toggleFlag = useCallback(
    (e: React.MouseEvent, r: number, c: number) => {
      e.preventDefault();

      if (gameOver || win || grid[r][c].isRevealed) return;

      const newGrid = grid.map(row => [...row]);
      const cell = newGrid[r][c];

      if (cell.isFlagged) {
        cell.isFlagged = false;
        cell.isQuestion = true;
      } else if (cell.isQuestion) {
        cell.isQuestion = false;
      } else {
        cell.isFlagged = true;
      }

      setGrid(newGrid);
    },
    [grid, gameOver, win]
  );

  const statusEmoji = useMemo(() => {
    if (win) return '😎';
    if (gameOver) return '😵';
    return '🙂';
  }, [win, gameOver]);

  return (
    <div className={`bg-[${WIN98_COLORS.background}] pt-[.3rem] flex flex-col items-center select-none w-fit mx-auto`}>
      <div className={`${BORDER_STYLES.outset} p-[.5rem] bg-[${WIN98_COLORS.background}]`}>
        <div className={`${BORDER_STYLES.inset} mb-[.8rem] p-[.5rem] flex justify-between items-center bg-[${WIN98_COLORS.background}]`}>
          <MineDisplay count={minesCount} />
          <button
            onClick={initGame}
            className={`${BORDER_STYLES.outset} w-[2.5rem] h-[2.5rem] flex items-center justify-center text-2xl active:border-none active:pt-[.25rem] active:pl-[.25rem] bg-[${WIN98_COLORS.background}] outline-none`}
            aria-label="Reset game"
          >
            {statusEmoji}
          </button>
          <MineDisplay count={0} />
        </div>

        <div className={`${BORDER_STYLES.inset} bg-[#808080]`}>
          <div className="grid grid-cols-10 gap-0">
            {grid.map((row, r) =>
              row.map((cell, c) => (
                <MinesweeperCell
                  key={`${r}-${c}`}
                  cell={cell}
                  rowIndex={r}
                  colIndex={c}
                  onReveal={revealCell}
                  onFlag={toggleFlag}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
