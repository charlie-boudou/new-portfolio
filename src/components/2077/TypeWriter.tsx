'use client';

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export function Typewriter({ 
    text, 
    speed = 0.1, 
    delay = 0, 
    forceShow = false 
}: { 
    text: string; 
    speed?: number; 
    delay?: number; 
    forceShow?: boolean; 
}) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

    useEffect(() => {
        if (forceShow) {
            count.stop();
            count.set(text.length);
            return;
        }

        const controls = animate(count, text.length, {
            type: "tween",
            duration: text.length * (speed / 2),
            delay: delay,
            ease: "linear",
        });

        return controls.stop;
    }, [text, delay, speed, count, forceShow]);


    return <motion.span>{forceShow ? text : displayText}</motion.span>;
}