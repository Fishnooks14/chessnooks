import Head from "next/head";
import ChessBoard from "@/components/ChessBoard";
import Welcome from "@/components/IntroCard";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Chess Rotation</title>
            </Head>

            <main>
                <div className="absolute">
                    <ChessBoard />
                    <div className="absolute inset-0 bg-gray-300 bg-opacity-20">
                        <Welcome /> 
                    </div>
                </div>
            </main>
        </div>
    );
}
