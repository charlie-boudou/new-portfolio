'use client';

import { useEffect, useState, useRef } from "react";
import { Sndvol32303, Sndvol32304 } from "@react95/icons";


export default function PastTime() {
    const [time, setTime] = useState<string>("");
    const [volume, setVolume] = useState<number>(30);
    const [showVolumeControl, setShowVolumeControl] = useState<boolean>(false);
    const volumeControlRef = useRef<HTMLDivElement>(null);

    const applyGlobalVolume = (value: number) => {
        const volumeRatio = value / 100;
        const allMedia = document.querySelectorAll("audio, video");
        allMedia.forEach((media) => {
            (media as HTMLMediaElement).volume = volumeRatio;
        });
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value);
        setVolume(newVolume);
        applyGlobalVolume(newVolume);
        localStorage.setItem("globalVolume", newVolume.toString());
    };

    useEffect(() => {
        const savedVolume = localStorage.getItem("globalVolume");
        if (savedVolume) {
            const vol = Number(savedVolume);
            setVolume(vol);
            applyGlobalVolume(vol);
        }
    }, []);

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
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showVolumeControl]);

    return (         
        <div className="relative w-fit text-black px-[0.3rem] py-[0.2rem] border-2 border-gray-300 shadow-[-0.0625rem_-0.0625rem_0_0_black] border-t-[#424242] border-l-[#424242]">
            <div className="flex items-center gap-2">
                <button
                    onClick={() => setShowVolumeControl(!showVolumeControl)}
                    className="focus:outline-none px-[.1rem] flex items-center"
                >
                    {volume > 0 ? (
                        <Sndvol32304 className="w-[1.5rem] h-[1.5rem]"/>
                    ) : (
                        <Sndvol32303 className="w-[1.5rem] h-[1.5rem]"/>
                    )}
                </button>
                <span className="select-none min-w-[4.5rem] text-right font-mono text-[.9rem]">{time}</span>
            </div>

            {showVolumeControl && (
                <div
                    ref={volumeControlRef}
                    className="absolute bottom-full w-[3rem] mb-[0.2rem] left-0 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-[#424242] border-b-[#424242] p-[0.5rem] shadow-lg z-[9999]"
                >
                    <div className="flex flex-col items-center gap-[0.5rem] py-[0.5rem]">
                        <div className="relative h-[6rem] w-[.1rem] bg-[#808080] border-l-2 border-l-black border-r-2 border-r-[#dfdfdf] flex justify-center">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="volume-slider absolute appearance-none bg-transparent cursor-pointer h-full w-full outline-none"
                                style={{
                                    WebkitAppearance: 'slider-vertical',
                                }}
                            />
                            <div 
                                className="absolute pointer-events-none w-[1.5rem] h-[.9rem] bg-[#c0c0c0] border-2 border-t-white border-l-white border-b-[#424242] border-r-[#424242] shadow-[1px_1px_0_0_black]"
                                style={{
                                    bottom: `calc(${volume}% - 6px)`,
                                    left: '50%',
                                    transform: 'translateX(-50%)'
                                }}
                            />
                        </div>
                        <p className="text-[.7rem] font-bold mt-1 select-none">{volume}%</p>
                    </div>
                </div>
            )}
        </div>
    );
}