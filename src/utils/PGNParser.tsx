import { readFileSync } from "fs";

class PGNGame {
  public file: string;
  private moveData: string[];
  private currMove: number;
  private boardState: string[][];
  private whiteTurn: boolean;

  public static readonly defaultBoard = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ];

  constructor(file: string) {
    this.file = file;
    const fileContent = readFileSync(file, "utf-8");

    this.boardState = [];
    for (const row of PGNGame.defaultBoard) {
      this.boardState.push(row.slice());
    }

    this.whiteTurn = true;

    // split file content into individual lines
    const lines = fileContent.split(/\r?\n/);

    // remove all data lines and blank lines
    const filteredLines = lines.filter((line) => {
      const cleanedLine = line
        .replace(/\{.*?\}/g, "")
        .replace(/;.*$/, "")
        .replace(/\d+\.+/, "");

      return !line.startsWith("[") && line.trim() != "";
    });

    this.moveData = filteredLines.flatMap((str) => str.split(/\s+/));
    this.currMove = 0;
  }

  getNextmove() {}
}
