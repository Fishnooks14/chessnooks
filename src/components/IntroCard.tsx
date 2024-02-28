"use client";

import React, { useRef } from "react";
import { LazyMotion, domAnimation, useInView } from "framer-motion";
import Image from "next/image";

const Welcome = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <LazyMotion features={domAnimation}>
            <div className="pt-10 pb-16 flex gap-1 items-center flex-start">
                <div
                    tabIndex={0}
                    ref={ref}
                    className="text-xl font-light leading-relaxed mx-auto"
                    style={{
                        transform: isInView ? "none" : "translateX(-200px)",
                        opacity: isInView ? 1 : 0,
                        transition:
                            "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
                    }}
                >
                    <p className="flex-grow text-6xl font-bold text-white text-right pr-4">
                        ChessNooks
                    </p>
                </div>
            </div>
        </LazyMotion>
    );
};

export default Welcome;
