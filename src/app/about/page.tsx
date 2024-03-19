import React from "react";
import logo from "./public/images/logo.jpg";

const About = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-gray-700">
            <p className="mb-4">
              <p>
                ChessNooks is a project built by two Parkland High School
                seniors: Major Zangari and Timothy Prestosh. In order to create
                a platform on which users, who may only know the basics of
                chess, or nothing at all about the game, can learn more about
                strategies, openings, and gambits typical of more competitive
                chess.
              </p>
            </p>
            <p className="mb-4">
              In this project, we utilized React Typescript for our programming
              elements with Tailwind to create our signature style and beautiful
              chess games. We utilized babylon.js to facilitate our 3d
              rendering. All move verification and game state management was
              done through chess.js. Check out our Navbar or our sitemap to
              discover all that our website has to offer!
            </p>
            <p className="mb-4">
              Additionally, special thanks to Christopher Darlington for help
              with QA and compatibility testing.
            </p>
          </div>
          <img
            className="rounded-lg shadow-md mx-auto md:mx-0"
            src="/assets/images/goesHard.png"
            alt="two people standing in hallway"
          />
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center mb-8">Sitemap</h1>
      <div className="flex items-center justify-center">
        <img
          className="rounded-lg shadow-md mx-auto md:mx-0"
          src="/assets/images/sitemap.png"
          alt="map of site, detailing major sections: home, rules, openings and strategies, local play, player vs computer, works cited, and about."
        />
      </div>
    </div>
  );
};

export default About;
