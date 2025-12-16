"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";

function GlitchText({ text, speed = 30 }: { text: string; speed?: number }) {
    const [displayText, setDisplayText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isHovered) {
            interval = setInterval(() => {
                setDisplayText(
                    text
                        .split("")
                        .map((char, index) => {
                            if (char === " ") return " ";
                            return CHARS[Math.floor(Math.random() * CHARS.length)];
                        })
                        .join("")
                );
            }, speed);
        } else {
            setDisplayText(text);
        }

        return () => clearInterval(interval);
    }, [isHovered, text, speed]);

    return (
        <span
            className="cursor-pointer hover:text-industrial-gold transition-colors duration-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {displayText}
        </span>
    );
}

export function BusinessSolutionsHUD() {
    const services = ["PROCESS EVOLUTION", "CREATIVE ENGINEERING", "DISRUPTIVE STRATEGY", "SYSTEM ARCHITECTURE"];

    return (
        <div className="absolute top-0 right-0 w-80 h-full p-8 flex flex-col justify-center pointer-events-none z-10 font-mono text-sm">
            <div className="pointer-events-auto bg-void-blue/80 backdrop-blur-md border-l-2 border-industrial-gold p-6 rounded-sm shadow-lg shadow-industrial-gold/20">
                <h3 className="text-industrial-gold mb-4 text-xs tracking-[0.2em] border-b border-white/10 pb-2">
                    SYSTEM_MODULES // V 2.0.4
                </h3>
                <ul className="space-y-4">
                    {services.map((service) => (
                        <li key={service} className="tracking-widest opacity-80 hover:opacity-100">
                            <span className="text-industrial-gold mr-2">{">"}</span>
                            <GlitchText text={service} />
                        </li>
                    ))}
                </ul>

                <div className="mt-8 text-[10px] text-white/40 leading-relaxed">
                    RUNNING DIAGNOSTICS...
                    <br />
                    OPTIMIZING NEURAL PATHWAYS...
                    <br />
                    ESTABLISHING SECURE CONNECTION...
                </div>
            </div>
        </div>
    );
}
