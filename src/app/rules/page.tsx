"use client";

import React from "react";

interface Section {
    title: string;
    content: string;
    subsections?: Section[];
}

const sections: Section[] = [
    {
        title: "Introduction",
        content: `<br /> 
        This section provides a comprehensive overview of the rules governing chess gameplay. Beginners will find clear explanations of piece movements, capturing mechanics, and special maneuvers like castling. Experienced players can revisit the fundamentals or delve deeper into nuanced strategic concepts.  Ultimately, this guide equips you with the knowledge to confidently navigate the chessboard and pursue victory.
        `,
    },
    {
        title: "Board Set Up",
        content: `<br /> Describe board set up idiot`,
    },
    {
        title: "Pieces",
        content: `<h3>This section will give you a basic description of how each piece moves, captures, and is used.</h3>`,
        subsections: [
            {
                title: "Pawn",
                content: `<p>Pawns are the most basic and abundant piece in a chess player's arsenal. Each player starts with 8 pawns, starting just in front of their other pieces. Despite their apparent weakness, pawns serve as the backbone of a skill player's strategy and allow one to control the flow of the game.</p>
                <p><br /> Pawns are by far the weakest piece in terms of movement, typically only being able to advance a single square straight forward each turn. However, this is not always true. If a pawn has not yet moved in a given game, it is given the option to instead move two square directly forward. Now, you may notice that these rules do not allow a pawn to move backwards in any way, meaning you hae to be cautious when pushing pawns down the board.</p>
                <p><br /> Pawns, unlike other pieces, capture differently from how they move. A pawn can capture an enemy piece located on either of the two squares diagonally in front of the pawn.<\p>
                <p><br /> As you might be able to tell, judging by these rules laid out, a pawn may seem completely useless once it reaches the end of the board, as there would be no more spaces for it to move to or capture on. This is where a special mechanic exclusive to pawns comes into play, promotion. When a pawn reaches the end of the board, it is promoted to a piece of the player's choice. This interaction is most commonly seen in endgames, after most other pieces have already been removed from play.</p>
                <p><br /> @@@@@@@ EN PASSANT THING HERE</p>`,
            },
            {
                title: "Rook",
                content: `<p>Rook info</p>`,
            },
            {
                title: "Bishop",
                content: `<p>Bishop info</p>`,
            },
            {
                title: "Queen",
                content: `<p>Queen info</p>`,
            },
            {
                title: "Knight",
                content: `<p>Knight info</p>`,
            },
            {
                title: "King",
                content: `<p>King info</p>`,
            },
        ],
    },
    {
        title: "Playing the Game",
        content: `<br /> Describe board set up idiot`,
        subsections: [
            {
                title: "Starting",
                content: `<p>hi</p>`,
            },
            {
                title: "Check",
                content: `<br /> AAAAA`,
            },
            {
                title: "Checkmate",
                content: `<br /> chemated idiot`,
            },
            {
                title: "Stalemate",
                content: `<br /> staly`,
            },
        ],
    },
    {
        title: "Conclusion",
        content: "Thank you for visiting!",
    },
];

const Rules = () => {
    const [activeSection, setActiveSection] = React.useState<string | null>(
        "Introduction"
    );

    const handleSectionClick = (sectionTitle: string) => {
        setActiveSection(sectionTitle);
    };

    const getSectionElement = (sectionTitle: string) => {
        return document.getElementById(sectionTitle);
    };

    const scrollToSection = (sectionTitle: string) => {
        const element = getSectionElement(sectionTitle);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const renderSection = (section: Section, level: number = 1) => (
        <div
            key={section.title}
            id={section.title}
            className={`px-4 py-2 mb-4  rounded`}
        >
            {level === 1 && (
                <h1 className="font-bold text-2xl">{section.title}</h1>
            )}
            {level === 2 && (
                <h2 className="font-semibold text-xl">{section.title}</h2>
            )}
            {level === 3 && (
                <h3 className="font-semibold text-lg">{section.title}</h3>
            )}
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
            {section.subsections?.map((subsection) =>
                renderSection(subsection, level + 1)
            )}
        </div>
    );

    const renderSidebar = () => (
        <div className="fixed h-screen overflow-y-auto bg-render_gray w-64 shadow">
            {sections.map((section) => (
                <>
                    <button
                        key={section.title}
                        className={`text-left block w-full py-2 px-4 hover:bg-logo_gray ${
                            activeSection === section.title
                                ? "bg-dcyan font-bold hover:bg-dcyan"
                                : ""
                        }`}
                        onClick={() => {
                            handleSectionClick(section.title);
                            scrollToSection(section.title);
                        }}
                    >
                        {section.title}
                    </button>
                    {section.subsections?.map((subsection) => (
                        <button
                            key={subsection.title}
                            className={`text-left block w-full py-2 pl-8 px-4 hover:bg-gray-200 ${
                                activeSection === subsection.title
                                    ? "bg-gray-300 font-bold"
                                    : ""
                            }`}
                            onClick={() => {
                                handleSectionClick(section.title); // Update active section
                                scrollToSection(subsection.title); // Scroll to the parent section
                            }}
                        >
                            - {subsection.title}
                        </button>
                    ))}
                </>
            ))}
        </div>
    );

    const renderContent = () => (
        <div className="ml-64 px-4 py-4 bg-white">
            {sections.map((section) =>
                activeSection === section.title ? renderSection(section) : null
            )}
        </div>
    );

    return (
        <div className="flex">
            {renderSidebar()}
            {renderContent()}
        </div>
    );
};

export default Rules;
