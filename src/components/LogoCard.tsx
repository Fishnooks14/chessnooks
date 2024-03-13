"use client";

import React, { useRef } from "react";
import { LazyMotion, domAnimation, useInView } from "framer-motion";

const LogoCard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <LazyMotion features={domAnimation}>
      {" "}
      {/* New parent element */}
      <div className="pt-10 pb-16 flex gap-1 items-center flex-start">
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
          <p className="text-9xl font-bold text-logo_gray text-center">
            ChessNooks
          </p>
          <div className="bg-dcyan bg-opacity-40 rounded-lg shadow-md px-8 py-10 overflow-hidden">
            <p className="text-xl text-logo_gray mx-auto font-semibold text-center max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className="flex justify-center items-center pt-12">
              <a
                href="/rules"
                className="flex-grow-0 text-white text-xl text-center bg-blue-500 hover:bg-white hover:text-black rounded-lg p-2"
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
