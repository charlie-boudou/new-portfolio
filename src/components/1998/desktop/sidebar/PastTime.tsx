'use client';

import { useEffect, useState } from "react";

export default function PastTime() {
    const [time, setTime] = useState<string>("");

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

    return (
        <div className="w-fit text-black px-[.3rem] py-[.2rem] border-2 border-gray-300 shadow-[-1px_-1px_0_0_black] border-t-[#424242] border-l-[#424242]">
            {time}
        </div>
    );
}


