import React from "react";
import logo from "./public/images/logo.jpg";

const WorksCited = () => {
    return (
        <div className="bg-gray-100">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-3xl font-bold text-center mb-8">
                    Works Cited
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="text-gray-700">
                        <p className="mb-4">
                            <p>
                                Chess Scene Pieces / Blender by moyicat -
                                sketchfab.com/3d-models/chess-pieces-blender-218776bed6144332ab41417badd5df6b
                                - CC Attribution
                            </p>
                        </p>
                        <p className="mb-4">
                            Chess Board V2 by printable_models -
                            https://free3d.com/3d-model/-chess-board-v2--539169.html
                            - Personal Use License
                        </p>
                        <p className="mb-4">
                            PNG chess pieces/Standard transparent -
                            https://commons.wikimedia.org/wiki/Category:PNG_chess_pieces/Standard_transparent
                            - Creative Commons CC0 License
                        </p>
                        <p className="mb-4">
                            “Chess Openings.” The Chess Website,
                            www.thechesswebsite.com/chess-openings/. Accessed 7
                            Mar. 2024.
                        </p>
                        <p className="mb-4">
                            Team, Chess.com. “The Best Chess Games of All Time.”
                            Chess.Com, Chess.com, 14 Dec. 2022,
                            www.chess.com/article/view/the-best-chess-games-of-all-time.
                        </p>
                        <p className="mb-4">
                            “Simplified Evaluation Function.” Simplified
                            Evaluation Function - Chessprogramming Wiki, 16 May
                            2018,
                            www.chessprogramming.org/Simplified_Evaluation_Function.
                        </p>
                    </div>
                    <img
                        className="rounded-lg shadow-md mx-auto md:mx-0"
                        src="/assets/images/studying.png"
                        alt="Man reading a book, pondering"
                    />
                </div>
            </div>
        </div>
    );
};

export default WorksCited;
