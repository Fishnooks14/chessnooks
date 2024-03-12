import Head from "next/head";
import ChessBoard from "@/components/ChessBoard";
import LogoCard from "@/components/LogoCard";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Chess Rotation</title>
            </Head>

            <main>
                <div className="relative">
                    <ChessBoard />
                    <div className="absolute inset-0 bg-gray-300 bg-opacity-20">
                        <LogoCard />
                    </div>
                </div>
            </main>
        </div>
    );
}
