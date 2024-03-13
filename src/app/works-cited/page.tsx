import React from "react";
import logo from "./public/images/logo.jpg";

const About = () => {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-center mb-8">Works Cited</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="text-gray-700">
            <p className="mb-4">
              <p>Citation nerd</p>
            </p>
            <p className="mb-4">Citation nerd</p>
          </div>
          <img
            className="rounded-lg shadow-md mx-auto md:mx-0"
            src="/assets/images/logo.jpg"
            alt="Company Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
