'use client';

import { useEffect, useState, useRef } from "react";

export default function PastTime() {
    const [time, setTime] = useState<string>("");
    const [volume, setVolume] = useState<number>(50);
    const [showVolumeControl, setShowVolumeControl] = useState<boolean>(false);
    const volumeControlRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formatted = now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            });
            setTime(formatted);
        };

        updateTime();
        const timer = setInterval(updateTime, 60000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (volumeControlRef.current && !volumeControlRef.current.contains(event.target as Node)) {
                setShowVolumeControl(false);
            }
        };

        if (showVolumeControl) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showVolumeControl]);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.target.value));
    };

    return (
        <div className="relative w-fit text-black px-[0.3rem] py-[0.2rem] border-2 border-gray-300 shadow-[-0.0625rem_-0.0625rem_0_0_black] border-t-[#424242] border-l-[#424242]">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setShowVolumeControl(!showVolumeControl)}
                    className="focus:outline-none hover:bg-gray-200 px-[0.0625rem]"
                >
                    {/* Icône speaker style Windows 95 */}
                    <svg
                        width="1rem"
                        height="1rem"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M7 4L4 7H1V9H4L7 12V4Z"
                            fill="black"
                        />
                        {volume > 0 && (
                            <>
                                <path d="M9 6C9.5 6.5 9.5 7.5 9.5 8C9.5 8.5 9.5 9.5 9 10" stroke="black" strokeWidth="1"/>
                                {volume > 33 && (
                                    <path d="M11 5C11.5 5.5 12 6.5 12 8C12 9.5 11.5 10.5 11 11" stroke="black" strokeWidth="1"/>
                                )}
                                {volume > 66 && (
                                    <path d="M13 4C13.5 5 14 6 14 8C14 10 13.5 11 13 12" stroke="black" strokeWidth="1"/>
                                )}
                            </>
                        )}
                        {volume === 0 && (
                            <>
                                <line x1="9" y1="6" x2="12" y2="10" stroke="red" strokeWidth="1.5"/>
                                <line x1="12" y1="6" x2="9" y2="10" stroke="red" strokeWidth="1.5"/>
                            </>
                        )}
                    </svg>
                </button>
                <span>{time}</span>
            </div>

            {/* Contrôle de volume */}
            {showVolumeControl && (
                <div
                    ref={volumeControlRef}
                    className="absolute bottom-full mb-[0.0625rem] left-0 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#424242] border-b-[#424242] p-[0.5rem] shadow-lg min-w-[2.5rem]"
                >
                    <div className="flex flex-col items-center gap-[0.5rem] py-[0.5rem]">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={handleVolumeChange}
                            className="volume-slider h-[6.25rem] w-[1.25rem]"
                            style={{
                                writingMode: 'vertical-lr',
                                direction: 'rtl',
                            }}
                        />
                        <span className="text-xs font-bold">{volume}%</span>
                    </div>
                </div>
            )}

            <style jsx>{`
                .volume-slider {
                    -webkit-appearance: none;
                    appearance: none;
                    background: transparent;
                }
                
                .volume-slider::-webkit-slider-track {
                    background: #c0c0c0;
                    border: 0.125rem solid;
                    border-color: #424242 #ffffff #ffffff #424242;
                    width: 0.375rem;
                }
                
                .volume-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 1rem;
                    height: 0.5rem;
                    background: #c0c0c0;
                    border: 0.125rem solid;
                    border-color: #ffffff #424242 #424242 #ffffff;
                    cursor: pointer;
                }
                
                .volume-slider::-moz-range-track {
                    background: #c0c0c0;
                    border: 0.125rem solid;
                    border-color: #424242 #ffffff #ffffff #424242;
                    width: 0.375rem;
                }
                
                .volume-slider::-moz-range-thumb {
                    width: 1rem;
                    height: 0.5rem;
                    background: #c0c0c0;
                    border: 0.125rem solid;
                    border-color: #ffffff #424242 #424242 #ffffff;
                    cursor: pointer;
                    border-radius: 0;
                }
            `}</style>
        </div>
    );
}


