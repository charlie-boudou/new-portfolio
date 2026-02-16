'use client';

import { JSX } from "react";

interface IFutureMediaIconProps {
  icon: JSX.Element;
  onClick: () => void;
}

export default function FutureMediaIcon({icon, onClick}: IFutureMediaIconProps) {  
    return (
        <div 
            className="relative w-[9rem] h-[9rem] flex items-center justify-center cursor-pointer transition-all duration-300 ease-in-out delay-150 hover:-translate-y-1 hover:scale-110"
            onClick={onClick}
        >
            <svg 
                className="absolute inset-0" 
                viewBox="0 0 100 100" 
                width="100%" 
                height="100%"
            >
                <circle
                    cx="50" cy="50" r="38"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="3"
                    strokeDasharray="60 300"
                    strokeLinecap="round"
                    transform="rotate(-120 50 50)"
                />
                <circle
                    cx="50" cy="50" r="38"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="3"
                    strokeDasharray="90 200"
                    transform="rotate(60 50 50)"
                />
                <circle
                    cx="50"
                    cy="50"
                    r="31.5" 
                    fill="none"
                    stroke="#CF5CCD"
                    strokeWidth="3" 
                    strokeDasharray="1 2"
                    opacity="0.8"
                />
                <circle
                    cx="50" cy="50" r="33"
                    fill="none"
                    stroke="#CF5CCD"
                    strokeWidth="0.5"
                />
                <circle
                    cx="50" cy="50" r="30"
                    fill="none"
                    stroke="#CF5CCD"
                    strokeWidth="0.5"
                />
                <circle
                    cx="50" 
                    cy="50" 
                    r="24"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2"
                    strokeDasharray="90 9 5 5 5 5 5 5 5 9"
                    strokeLinecap="round"
                    className="origin-center -rotate-90"
                />
            </svg>
            {icon}
        </div>
    );
}