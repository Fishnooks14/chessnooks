import React from "react";

const NavBar = () => {
  return (
    <div className="bg-logo_gray fixed w-full z-10 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-render_gray">
                <div className="pt-5 w-32 h-24">
                  <img
                    src="/assets/images/logo2.png"
                    alt="logo"
                    className="object-scale-down"
                  />
                </div>
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <a
                href="/"
                className="text-render_gray hover:bg-dcyan hover:text-black rounded-lg p-2"
              >
                Home
              </a>

              <a
                href="/rules"
                className="text-render_gray hover:bg-dcyan hover:text-black rounded-lg p-2"
              >
                Rules
              </a>

              <a
                href="/strategy"
                className="text-render_gray hover:bg-dcyan hover:text-black rounded-lg p-2"
              >
                Openings and Strategies
              </a>

              <a
                href="/local-play"
                className="text-render_gray hover:bg-dcyan hover:text-black rounded-lg p-2"
              >
                Local Play
              </a>

              <a
                href="/vs-computer"
                className="text-render_gray hover:bg-dcyan hover:text-black rounded-lg p-2"
              >
                Player vs. Computer
              </a>

              <a
                href="/works-cited"
                className="text-render_gray hover:bg-dcyan hover:text-black rounded-lg p-2"
              >
                Works Cited
              </a>

              <a
                href="/about"
                className="text-render_gray hover:bg-dcyan hover:text-black rounded-lg p-2"
              >
                About
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
