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
        content: `Add intro para here`,
    },
    {
        title: "Pieces",
        content: `Add intro to pieces para here`,
        subsections: [
            {
                title: "Pawn",
                content: `Pawn info`,
            },
            {
                title: "How does it work?",
                content: `<h2>How does it work?</h2>
                    <p>Click on a section or subsection in the sidebar to jump to that section.</p>`,
            },
        ],
    },
    { title: "Main Content", content: "This is the main content area." },
    {
        title: "Conclusion",
        content: "Thank you for visiting!",
    },
];

const Rules = () => {
    const [activeSection, setActiveSection] = React.useState<string | null>(
        null
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
            id={section.title} // Add unique ID for each section
            className={`px-4 py-2 mb-4 border rounded ${
                level > 1 ? "border-dashed" : ""
            }`}
        >
            {/* Use conditional rendering for heading tag */}
            {level === 1 && <h1>{section.title}</h1>}
            {level === 2 && <h2>{section.title}</h2>}
            {level === 3 && <h3>{section.title}</h3>}
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
            {section.subsections?.map((subsection) =>
                renderSection(subsection, level + 1)
            )}
        </div>
    );

    const renderSidebar = () => (
        <div className="fixed h-screen overflow-y-auto bg-gray-100 w-64 border-r border-gray-200 shadow">
            {sections.map((section) => (
                <>
                    <button
                        key={section.title}
                        className={`text-left block w-full py-2 px-4 hover:bg-gray-200 ${
                            activeSection === section.title
                                ? "bg-gray-300 font-bold"
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
                                scrollToSection(section.title); // Scroll to the parent section
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
        <div className="ml-64 px-4 py-4">
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
