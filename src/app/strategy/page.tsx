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
        content: `<br /> In chess, strategy is everything. This begins from the very first move in every game so the opening you choose matters. Ultimately, this choice should be made after a lot of practice/research, and pick the one with which you are most confident and comfortable. Generally, the goal of an opening should be to take control of the center as quickly as possible.
<br /><br />Strategy is not just a one-way street because you have an opponent who is actively trying to beat you. You must always consider their moves in order to create a proper winning strategy.`,
    },
    {
        title: "Trading Pieces",
        content: `<br /> Oftentimes, in games, the opportunity arises to trade a piece of equal material and it seems like there is no harm in doing so but that may not always be the case. While simplification of the board can be helpful, removing one of your pieces still is risky. A telltale sign of when you should trade is when one piece is in a significantly better position than the other or one person already has a good advantage. Be sure to keep this in mind. 
        <img src="assets/images/trade.png" alt="chess board containing only two kings. The bottom text reads Game is a draw" />`,
    },
    {
        title: "Open/ Closed Game",
        content: `<br /> In chess, depending on your style of play and especially based on the opening you choose, the game can quickly become either open or closed. A closed game means one in which most of the pawns are blocking one another and movement is very restricted whereas an open game offers a lot of movement. A closed game is a much more deliberate and slow game so choose according to your style!
        <img src="assets/images/closedGame.png" alt="Closed game of chess. Pieces are unable to move very much.">Closed Game</img>
        <img src="assets/images/openGame.png" alt="Open game of chess. Pieces are free to move.">Open Game</img>
        `,
    },
    {
        title: "The London System",
        content: `<br /> The London system is a sequence of opening moves for the white pieces that are done in the same order regardless of what the opponent moves. The sequence is as follows:
<br /><br />
<i>d4, Nf3, Bf4, e3, Bd3, Nbd2, c3</i>
<br /><br />
The point of this system is to consistently create a very similar overall board setup and have it be a closed system. If the opponent is familiar with this system, utilizing the London may hurt more than help but overall it is a useful structure for games.
<img src="assets/images/londonSystem.png" alt="Example of a completed London system">Example of a completed London system</img>
`,
    },
    {
        title: "The Colle System",
        content: `<p><br />The Colle system is a sequence of opening moves for the white pieces that are done in the same order regardless of what the opponent moves. The sequence is as follows:</p>
        <p><br /><i>d4, Nf3, e3, Bd3, c3, Nbd2</i></p>
        <p><br />The point of the system is to create a strong center early in the game that creates a closed game. This system is fairly similar to the London system but is more concerned with creating a solid pawn structure while the London is a little more flexible.</p>
        <img src="assets/images/colleSystem.png" alt="Example of a completed Colle system">Example of a completed Colle system</img>`,
    },
    {
        title: "Evans Gambit",
        content: `<p><br />Another strategy for opening a game that avoids the convention that systems provide and adds much greater risk is called a gambit. This is when you begin an opening with a move that sacrifices a piece without any way to recapture it immediately. Usually, this is done to eventually gain a positional advantage like dominating the center. </p>
    <p><br />This particular gambit is called the Evans Gambit where it plays off of the Giuoco Piano opening shown (if you ignore the pawn). The idea behind this move is that in the moves following, attacking the bishop will activate your pieces in the center, and black will lose momentum early on. </p>
        <img src="assets/images/evansGambit.png" alt="Example of a board state after Evans gambit">Example of a board state after Evans gambit</img>`,
    },
    {
        title: "End Games",
        content: `<br />When the number of pieces on the board becomes very few, you have reached the end game. There are millions of ways the board could be set up during this stage but usually, they follow similar patterns. Make sure to practice ways to checkmate the opponent with rooks, queens, and even knights, bishops, and pawns. The most paramount thing to keep in mind is to prevent a stalemate where you restrict all of their moves AND they are not in check. If you have pawns in the end game, use their potential promotion of them as a threat.
        <img src="assets/images/endGame.png" alt="End game board of chess in which both sides have 3 pawns, black has a rook and a bishop, and white has two rooks.">Example of an end game</img>`,
    },
];

const Strategy = () => {
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

    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderSidebar = () => (
        <div
            className={`fixed h-screen overflow-y-auto bg-render_gray_light w-64 transition duration-300 ease-in-out ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
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
        <div
            className={`min-h-screen px-4 py-4 bg-white transition duration-300 ease-in-out ${
                isSidebarOpen ? "ml-64" : ""
            }`}
        >
            {sections.map((section) =>
                activeSection === section.title ? renderSection(section) : null
            )}
        </div>
    );

    return (
        <div className="flex h-screen">
            <button
                className="fixed bottom-1 left-1 p-4 focus:outline-none z-50 bg-dcyan rounded-md hover:bg-logo_gray"
                onClick={toggleSidebar}
            >
                Toggle Sidebar
            </button>
            <div
                className={`fixed h-screen overflow-y-auto bg-render_gray_light w-64 transition duration-300 ease-in-out ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {renderSidebar()}
            </div>
            <div className="flex-grow">{renderContent()}</div>
        </div>
    );
};

export default Strategy;
