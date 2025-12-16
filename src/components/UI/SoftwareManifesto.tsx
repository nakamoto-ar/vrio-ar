"use client";

import { motion } from "framer-motion";

export function SoftwareManifesto() {
    return (
        <div className="absolute bottom-12 left-12 max-w-lg z-10 pointer-events-none mix-blend-difference">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
            >
                <h1 className="text-6xl font-bold tracking-tighter leading-[0.9] mb-4 text-holographic-white">
                    VRIO
                    <span className="text-industrial-gold text-2xl align-top ml-2 tracking-widest font-normal">
                        ESTUDIO
                    </span>
                </h1>

                <div className="bg-white/5 backdrop-blur-sm p-4 border-l-4 border-industrial-gold">
                    <p className="text-lg md:text-xl font-mono text-white/90 leading-relaxed max-w-md">
                        "We treat code as raw material. We forge unexpected solutions for business evolution."
                    </p>
                </div>

                <div className="mt-4 flex gap-2 text-[10px] text-white/50 font-mono tracking-widest uppercase">
                    <span>Lat: 34.6037 S</span>
                    <span>|</span>
                    <span>Lon: 58.3816 W</span>
                    <span>|</span>
                    <span>Status: ONLINE</span>
                </div>
            </motion.div>
        </div>
    );
}
