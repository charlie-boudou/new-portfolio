'use client';

import { useEffect, useState } from "react";

export default function FutureTime() {
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
        const now = new Date();
        
        const datePart = now.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric"
        });

        const timePart = now.toLocaleTimeString("en-US", {
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

        setDate(datePart)
        setTime(timePart);
    };

        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer); 
    }, []);

    return (
        <div className="bg-slate-800 border border-[#CF5CCD] rounded-[.2rem] text-cyan-400 w-full h-full flex flex-col space-y-[.8rem] items-center justify-center text-[1.5rem] py-[.5rem]">
            <p>{date}</p>
            <p>{time}</p>
        </div>
    );
}