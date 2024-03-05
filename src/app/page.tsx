import Head from "next/head";
import ChessBoard from "@/components/ChessBoard";
import { StrictMode } from "react";

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
