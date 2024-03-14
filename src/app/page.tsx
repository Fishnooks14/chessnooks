import Head from "next/head";
import ChessBoard from "@/components/ChessBoard";
import LogoCard from "@/components/LogoCard";

export default function Home() {
    return (
        <div>
            <main>
                <div className="relative">
                    <ChessBoard />
                    <div className="absolute inset-0 bg-gray-300 bg-opacity-20">
                        <LogoCard />
                    </div>
                </div>
                <div className="max-w-7xl mx-auto">
                    <div className="flex h-screen bg-gray-900">
                        <div className="flex-grow bg-white px-8 py-16">
                            <div className="grid grid-cols-12 gap-8">
                                <div className="col-span-6">
                                    <h2 className="text-3xl font-bold mb-4">
                                        Header
                                    </h2>
                                    <p className="text-gray-700">
                                        The game of chess, especially
                                        considering its rapidly growing
                                        popularity among internet users, is a
                                        worldwide phenomenon that captivates
                                        millions upon millions of players. Our
                                        purpose with this project is to provide
                                        a platform on which users, who may only
                                        know the basics of chess, or nothing at
                                        all, a resource to dive deeper into the
                                        strategies, openings, and gambits
                                        typical of more competetive chess.
                                    </p>

                                    <p className="text-gray-700 pt-4">
                                        Please keep in mind the current
                                        incarnation of Chessnooks is simply a
                                        minimal viable product created for the
                                        PA Media & Design Competetition 2024. We
                                        plan to continue expanding the website
                                        and its features in the future.
                                    </p>
                                </div>
                                <div className="col-span-6">
                                    <img
                                        src="/assets/images/thinking.png"
                                        alt="Image Description"
                                        className="w-full rounded-lg shadow-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
