import React, { useState, useMemo, useEffect } from 'react';
import { NONOGRAM_PUZZLES } from '../constants';
import { GridCellState, PracticeProps } from '../types';
import { CheckCircleIcon, BookOpenIcon } from './Icons';
import ExplainableText from './ExplainableText';

const NonogramGame: React.FC<PracticeProps> = ({ markDayAsPracticed }) => {
  const [selectedPuzzleIndex, setSelectedPuzzleIndex] = useState(0);
  const puzzle = useMemo(() => NONOGRAM_PUZZLES[selectedPuzzleIndex], [selectedPuzzleIndex]);
  
  const size = puzzle.solution.length;

  const [grid, setGrid] = useState<GridCellState[][]>([]);
  const [isComplete, setIsComplete] = useState(false);
  
  const generateClues = (solution: boolean[][]) => {
    const rowClues: number[][] = [];
    const colClues: number[][] = [];
    const size = solution.length;

    for (let i = 0; i < size; i++) {
      let rowCount = 0;
      const currentRowClues: number[] = [];
      for (let j = 0; j < size; j++) {
        if (solution[i][j]) {
          rowCount++;
        } else if (rowCount > 0) {
          currentRowClues.push(rowCount);
          rowCount = 0;
        }
      }
      if (rowCount > 0) currentRowClues.push(rowCount);
      rowClues.push(currentRowClues.length > 0 ? currentRowClues : [0]);
    }
    
    for (let j = 0; j < size; j++) {
      let colCount = 0;
      const currentColClues: number[] = [];
      for (let i = 0; i < size; i++) {
        if (solution[i][j]) {
          colCount++;
        } else if (colCount > 0) {
          currentColClues.push(colCount);
          colCount = 0;
        }
      }
      if (colCount > 0) currentColClues.push(colCount);
      colClues.push(currentColClues.length > 0 ? currentColClues : [0]);
    }
    return { rowClues, colClues };
  };
  
  const { rowClues, colClues } = useMemo(() => generateClues(puzzle.solution), [puzzle.solution]);

  useEffect(() => {
    setGrid(Array(size).fill(null).map(() => Array(size).fill('empty')));
    setIsComplete(false);
  }, [puzzle, size]);

  const handleCellClick = (r: number, c: number) => {
    if(isComplete) return;
    const newGrid = grid.map(row => [...row]);
    if (newGrid[r][c] === 'empty') newGrid[r][c] = 'filled';
    else if (newGrid[r][c] === 'filled') newGrid[r][c] = 'crossed';
    else newGrid[r][c] = 'empty';
    setGrid(newGrid);
  };
  
  useEffect(() => {
    if (grid.length === 0 || isComplete) return;
    const isSolved = grid.every((row, r) =>
      row.every((cell, c) => (cell === 'filled') === puzzle.solution[r][c])
    );
    if (isSolved) {
      setIsComplete(true);
      markDayAsPracticed();
    }
  }, [grid, puzzle.solution, isComplete, markDayAsPracticed]);

  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <div className="w-full bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-3xl font-bold font-display text-blue-900 mb-2">Puzzle Reef</h2>
        <ExplainableText 
            text="Solve the puzzle to find the hidden picture!"
            className="text-gray-600 mb-4"
        />
        <div className="flex items-center gap-2 sm:gap-4 mb-4">
            {NONOGRAM_PUZZLES.map((p, index) => (
                <button key={p.name} onClick={() => setSelectedPuzzleIndex(index)} className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm sm:text-base ${selectedPuzzleIndex === index ? 'bg-blue-800 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}>
                    <p.icon className="w-5 h-5"/>
                    <span>{p.name}</span>
                </button>
            ))}
        </div>
        
        <div className="relative max-w-md mx-auto">
          <div className="grid" style={{gridTemplateColumns: `auto 1fr`}}>
            <div className="w-12 sm:w-16"></div>
            <div className="flex">
              {colClues.map((clue, c) => <div key={c} className="flex-1 flex flex-col items-center justify-end p-1 text-xs sm:text-sm font-semibold text-gray-700">{clue.map((n, i) => <div key={i}>{n}</div>)}</div>)}
            </div>
            {rowClues.map((clue, r) => (
              <React.Fragment key={r}>
                <div className="flex items-center justify-end p-1 pr-2 text-xs sm:text-sm font-semibold text-gray-700">{clue.join(' ')}</div>
                <div className="grid" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                  {Array.from({ length: size }).map((_, c) => (
                    <button key={c}
                      onClick={() => handleCellClick(r, c)}
                      aria-label={`Grid cell row ${r+1}, column ${c+1}, state ${grid[r]?.[c]}`}
                      className={`aspect-square border border-gray-300 transition-colors ${
                        grid[r]?.[c] === 'filled' ? 'bg-blue-900' : 
                        grid[r]?.[c] === 'crossed' ? 'bg-gray-200' : 'bg-white hover:bg-blue-100'
                      }`}
                    >
                      {grid[r]?.[c] === 'crossed' && <span className="text-gray-500 font-bold">X</span>}
                    </button>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
           {isComplete && (
            <div className="absolute inset-0 bg-green-500/90 flex flex-col items-center justify-center text-white rounded-lg p-4 text-center">
                <CheckCircleIcon className="w-16 h-16"/>
                <h3 className="text-3xl font-bold mt-4 font-display">Puzzle Solved!</h3>
            </div>
          )}
        </div>
        {isComplete && (
          <div className="mt-8 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
            <h3 className="text-xl font-bold font-display text-blue-900 mb-3 flex items-center"><BookOpenIcon className="w-6 h-6 mr-2"/>Vocabulary Unlocked!</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {puzzle.vocabulary.map((item, index) => (
                <li key={index} className="flex justify-between border-b py-1">
                  <span className="font-semibold text-gray-800">{item.english}</span>
                  <span className="text-gray-600">{item.turkish}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default NonogramGame;