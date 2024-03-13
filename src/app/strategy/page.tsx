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
        dis da strats part
        `,
    },
    {
        title: "The London System",
        content: `<br /> AAAA`,
    },
    {
        title: "The Colle System",
        content: `<br /> AAAA`,
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

export default Strategy;
