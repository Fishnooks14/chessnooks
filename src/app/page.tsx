import Head from "next/head";
import ChessBoard from "@/components/Chessboard";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Chess Rotation</title>
            </Head>

            <main>
                <ChessBoard />
            </main>
        </div>
    );
}
