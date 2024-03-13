"use client";

import React, { useRef } from "react";
import { LazyMotion, domAnimation, useInView } from "framer-motion";

const LogoCard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <LazyMotion features={domAnimation}>
      {/* New parent element */}
      <div className="pt-10 pb-16 flex gap-1 items-center flex-start sm:flex-col sm:justify-center sm:items-center">
        <div
          tabIndex={0}
          ref={ref}
          className="leading-relaxed mx-auto"
          style={{
            transform: isInView ? "none" : "translateX(-200px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
        >
          <p className="font-bold text-logo_gray text-center sm:text-6xl lg:text-9xl">
            ChessNooks
          </p>
          <div className="bg-dcyan bg-opacity-40 rounded-lg shadow-md lg:px-8 lg:py-10 overflow-hidden sm:px-4 sm:py-6 pb-4">
            <p className="lg:text-xl text-logo_gray mx-auto font-semibold text-center max-w-md sm:text-base">
              The hub of everything Chess. With ChessNooks, explore all there is
              to know about chess through our expansive list of rules and
              strategies. Play games against your friends with our responsive
              Chess program and against the computer for even more practice.
            </p>
            <div className="flex justify-center items-center pt-4">
              <a
                href="/rules"
                className="flex-grow-0 text-white text-xl text-center bg-blue-500 hover:bg-white hover:text-black rounded-lg p-2 sm:text-base"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
};

export default LogoCard;
