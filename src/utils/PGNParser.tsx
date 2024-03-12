import { Chess, DEFAULT_POSITION, PAWN, WHITE } from "chess.js";
import { gameList } from "../../public/games/gamelist";

export interface BoardCoord {
    x: number;
    y: number;
}

export interface Move {
    initialPos: BoardCoord;
    finalPos: BoardCoord;
    promotion?: string;
    capture?: BoardCoord;
}

export interface Castle {
    long: boolean;
    white: boolean;
}

export class PGNGame {
    private file: string;
    private gameState: Chess;
    private moveData: string[];

    constructor() {
        this.gameState = new Chess(DEFAULT_POSITION);

        const gameIndex = Math.floor(Math.random() * gameList.length);
        // this.file = "/games/" + gameList[gameIndex];
        this.file = "/games/" + "game_4.pgn";
        console.log("file: " + this.file);
        this.moveData = [];
    }

    // constructor(file: string) {
    //     this.gameState = new Chess(DEFAULT_POSITION);

    //     this.file = file;
    //     this.moveData = this.parseFileData(file);
    // }

    public newGame() {
        this.gameState = new Chess(DEFAULT_POSITION);

        const gameIndex = Math.floor(Math.random() * gameList.length);
        this.file = "/games/" + gameList[gameIndex];
        console.log("file: " + this.file);
        this.moveData = [];
    }

    async init() {
        try {
            const response = await fetch(this.file);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const fileContent = await response.text();
            this.moveData = this.parseFileData(fileContent);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    private parseFileData(fileContent: string): string[] {
        // split file content into individual lines, regex used to account for windows and posix style new lines
        const lines = fileContent.split(/\r?\n/);

        // remove all data lines and blank lines, and recombine into full string
        const moveSet = lines
            .filter((line) => !line.startsWith("[") && line.trim() != "")
            .join(" ");

        // remove all comments in braces, remove all semicolon-formatted comments, and remove all move number indicators
        const cleanedSet = moveSet
            .replace(/\{.*?\}/g, "")
            .replace(/;.*$/, "")
            .replace(/\d+\.+/g, "")
            .trim();

        return cleanedSet.split(/\s+/).slice(0, -1);
    }

    public nextMove(): Move | Castle | null {
        const nextMove = this.moveData.shift();
        if (nextMove === undefined) {
            return null;
        }

        const move = this.gameState.move(nextMove);

        if (nextMove === "O-O") {
            return { long: false, white: this.gameState.turn() !== WHITE };
        } else if (nextMove === "O-O-O") {
            return { long: true, white: this.gameState.turn() !== WHITE };
        }

        let capturedPiece = move.captured
            ? this.stringToCoord(move.to)
            : undefined;

        if (move.flags.includes("e")) {
            const capturedRank = this.gameState.turn() === WHITE ? 4 : 5;
            const capturedFile = this.stringToCoord(move.to).x;
            capturedPiece = { x: capturedRank, y: capturedFile };
        }

        return {
            initialPos: this.stringToCoord(move.from),
            finalPos: this.stringToCoord(move.to),
            promotion: move.promotion,
            capture: capturedPiece,
        };
    }

    // Converts from algebraic notation to coordinates
    private stringToCoord(square: string): BoardCoord {
        const file = "abcdefgh".indexOf(square[0]);
        const rank = parseInt(square[1]) - 1;
        return { x: file, y: rank };
    }

    // public static isMove(value: unknown): value is Move {
    //     return typeof value === "object" &&
    //         value !== null && typeof (value as Move).finalPos === ""
    // }
}
