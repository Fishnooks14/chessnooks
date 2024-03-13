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
    content: `<br />This section provides a comprehensive overview of the rules governing chess gameplay. Beginners will find clear explanations of piece movements, capturing mechanics, and special maneuvers like castling. Experienced players can revisit the fundamentals or delve deeper into nuanced strategic concepts.  Ultimately, this guide equips you with the knowledge to confidently navigate the chessboard and pursue victory. Click on a section on the left bar to move on.`,
  },
  {
    title: "Board Set Up",
    content: `<p><br />Before you can dive into the the actual gameplay of chess, we need to do some setup. A chess board consists of 64 squares arranged in and 8 by 8 grid. You may notice labels around the perimeter of the board, labeling the rows and columns with numbers and letters respectively. These markings can make setup and clarification of squares easier, but if you're board lacks them, that's fine too.</p>
    <p><br />Start by placing a white rook on the A1 space. If you're board does not have labels, just choose a corner to place it in. </p>`,
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
                <p><br /> Pawns also have another unusual feature called an “En passant.” It is in the scenario when an opponent advances their pawn two spaces and your pawn is directly adjacent. In this case, you can capture the adjacent pawn diagonally even if there is no piece there. This rule was introduced fairly late in order to make the game faster and <i>more entertaining.</i> </p>`,
      },
      {
        title: "Rook",
        content: `<p>There are two rooks on a chess board and are constrained to moving only vertically (up/down) or horizontally (left/right). Like a bishop, it can move as far as possible given that there is not another piece in the way.</p>
                <p><br />The rook is significant in another way as well because along with the king, it can perform the move known as “castling.” This is when, given that the other pieces are out of the way and neither the rook nor king has moved yet, the king and rook can shift in one move. </p>
                <p><br />A “long” castle, or a castle that takes place on the Queen side, shifts the king two spaces to the left and the rook three spaces to the right.</p>
                <p><br />A “short” castle, or a castle on the King side, shifts the king two spaces to the right and the rook two spaces to the left</p>
                `,
      },
      {
        title: "Bishop",
        content: `<p>Bishops are the pieces in chess that can only move diagonally. You will notice that the bishop that begins on the light squares will always remain there and the same is true for the bishop on the dark square. Bishops are not constricted to only moving a certain number of spaces. In fact, they can move as far as they can without being obstructed by another chess piece or the end of the board.</p>`,
      },
      {
        title: "Queen",
        content: `<p>The queen is by far the most powerful piece in chess, being considered nine material points commonly. It has the powers of the rook combined with the powers of the bishop meaning that it can move horizontally, vertically, and diagonally for as far as possible. </p>`,
      },
      {
        title: "Knight",
        content: `<p>The knight is the chess piece that a beginner might have the most trouble with initially. This is because they move pretty irregularly compared to the other pieces. A good way to describe this is that the knight makes an “L” shape because it moves as follows: </p>

                <p><br />Two spaces up or down and one space left or right.</p>
                <p>Or</p>
                <p>Two spaces left or right and one space up or down</p>
                `,
      },
      {
        title: "King",
        content: `<p><br />The king is the most important piece in chess because placing it in checkmate wins you the game but it is at the same time the most immobile piece. It can only move one square in any direction</p>
                <p><br />Also, the king along with the rook can perform a “castle.” (see rook section for more information)</p>
                `,
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
      {level === 1 && <h1 className="font-bold text-2xl">{section.title}</h1>}
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
      className={`fixed h-screen overflow-y-auto bg-render_gray w-64 transition duration-300 ease-in-out ${
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
        //className="flex-grow-0 text-white text-xl text-center bg-blue-500 hover:bg-white hover:text-black rounded-lg p-2 sm:text-base"

        onClick={toggleSidebar}
      >
        Toggle Sidebar
      </button>
      <div
        className={`fixed h-screen overflow-y-auto bg-render_gray w-64 transition duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {renderSidebar()}
      </div>
      {/* Main Content */}
      <div className="flex-grow">{renderContent()}</div>
    </div>
  );
};

export default Rules;
