import React from "react";
import logo from "./public/images/logo.jpg";

const About = () => {
    return (
        <div className="bg-gray-100">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-center mb-8">
                    About Us
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="text-gray-700">
                        <p className="mb-4">
                            <p>
                                ChessNooks is a project built by two Parkland
                                High School seniors: Major Zangari and Timothy
                                Prestosh. In order to create a more @@@@ some
                                shit about godo resource for ppls @@@@
                            </p>
                        </p>
                        <p className="mb-4">
                            In this project, we utilized React Typescript for
                            our programming elements with Tailwind to create our
                            signature style and beautiful chess games. The
                            library we used to make the 3D rendering possible
                            was babylon.js. All move verification and gamestate
                            management is done through chess.js. The project
                            incorporated many difficult algorithms and
                            challenges because of the complexity of building a
                            chess program but through all of these tools we were
                            able to accomplish this. Check our Navbar or our
                            sitemap to discover all that our website has to
                            offer!
                        </p>
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
