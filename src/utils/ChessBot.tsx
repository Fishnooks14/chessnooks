import { Chess, Square } from "chess.js";

export class ChessBot {
  private psts: Map<string, number[]>;
  private pieceValues: Map<string, number>;
  constructor() {
    this.psts = new Map();
    this.psts.set("k", ChessBot.king);
    this.psts.set("q", ChessBot.queen);
    this.psts.set("r", ChessBot.rook);
    this.psts.set("b", ChessBot.bishop);
    this.psts.set("n", ChessBot.knight);
    this.psts.set("p", ChessBot.pawn);

    this.pieceValues = new Map();
    this.pieceValues.set("p", 100);
    this.pieceValues.set("n", 320);
    this.pieceValues.set("b", 330);
    this.pieceValues.set("r", 500);
    this.pieceValues.set("q", 900);
    this.pieceValues.set("k", 20000);
  }

  public makeBestMove(
    game: Chess,
    depth: number,
    maximizingPlayer: boolean
  ): void {
    let moves = game.moves();
    let bestMoveValue = -999999;
    let bestMoveFound = null;

    moves.forEach((move) => {
      game.move(move);
      let value = this.minimax(game, depth - 1, !maximizingPlayer);
      game.undo();
      if (value >= bestMoveValue) {
        bestMoveValue = value;
        bestMoveFound = move;
      }
    });
    if (bestMoveFound == null) {
      return;
    }
    game.move(bestMoveFound);
  }

  private minimax(
    game: Chess,
    depth: number,
    maximizingPlayer: boolean
  ): number {
    if (depth === 0) {
      return this.evaluateBoard(game);
    }
    if (maximizingPlayer) {
      let value = -999999;
      game.moves().forEach((move) => {
        game.move(move);
        let newValue = this.minimax(game, depth - 1, !maximizingPlayer);
        value = Math.max(value, newValue);
        game.undo();
      });
      return value;
    } else {
      let value = 999999;
      game.moves().forEach((move) => {
        game.move(move);
        let newValue = this.minimax(game, depth - 1, !maximizingPlayer);
        value = Math.min(value, newValue);
        game.undo();
      });
      return value;
    }
  }

  private evaluateBoard(game: Chess): number {
    let whiteEvaluation = 0;
    let blackEvaluation = 0;

    for (let square in game.board()) {
      const piece = game.get(square as Square);

      if (piece) {
        const pieceType = piece.type;
        const pieceColor = piece.color;

        const valueTable = this.psts.get(pieceType);
        if (valueTable == undefined) {
          return -1;
        }

        let rank = this.algebraicToRank(square);
        if (pieceColor === "b") {
          rank = 7 - rank;
        }
        const file = this.algebraicToFile(square);
        const index = rank * 8 + file;

        const nativePieceValue = this.pieceValues.get(pieceType);

        let pieceValue = valueTable[index];
        if (nativePieceValue != undefined) {
          pieceValue += nativePieceValue;
        }

        if (pieceColor === "w") {
          whiteEvaluation += pieceValue;
        } else {
          blackEvaluation += pieceValue;
        }
      }
    }

    return blackEvaluation - whiteEvaluation;
  }

  private algebraicToRank(algebraicNotation: string): number {
    return 8 - parseInt(algebraicNotation[1], 10);
  }

  private algebraicToFile(algebraicNotation: string): number {
    const file = algebraicNotation[0];
    return file.charCodeAt(0) - "a".charCodeAt(0);
  }

  private static king = [
    -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40, -40,
    -30, -30, -40, -40, -50, -50, -40, -40, -30, -30, -40, -40, -50, -50, -40,
    -40, -30, -20, -30, -30, -40, -40, -30, -30, -20, -10, -20, -20, -20, -20,
    -20, -20, -10, 20, 20, 0, 0, 0, 0, 20, 20, 20, 30, 10, 0, 0, 10, 30, 20,
  ];

  private static queen = [
    -20, -10, -10, -5, -5, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0, 5,
    5, 5, 5, 0, -10, -5, 0, 5, 5, 5, 5, 0, -5, 0, 0, 5, 5, 5, 5, 0, -5, -10, 5,
    5, 5, 5, 5, 0, -10, -10, 0, 5, 0, 0, 0, 0, -10, -20, -10, -10, -5, -5, -10,
    -10, -20,
  ];

  private static rook = [
    0, 0, 0, 0, 0, 0, 0, 0, 5, 10, 10, 10, 10, 10, 10, 5, -5, 0, 0, 0, 0, 0, 0,
    -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0, 0, -5, -5, 0, 0, 0, 0, 0,
    0, -5, -5, 0, 0, 0, 0, 0, 0, -5, 0, 0, 0, 5, 5, 0, 0, 0,
  ];

  private static bishop = [
    -20, -10, -10, -10, -10, -10, -10, -20, -10, 0, 0, 0, 0, 0, 0, -10, -10, 0,
    5, 10, 10, 5, 0, -10, -10, 5, 5, 10, 10, 5, 5, -10, -10, 0, 10, 10, 10, 10,
    0, -10, -10, 10, 10, 10, 10, 10, 10, -10, -10, 5, 0, 0, 0, 0, 5, -10, -20,
    -10, -10, -10, -10, -10, -10, -20,
  ];

  private static knight = [
    -50, -40, -30, -30, -30, -30, -40, -50, -40, -20, 0, 0, 0, 0, -20, -40, -30,
    0, 10, 15, 15, 10, 0, -30, -30, 5, 15, 20, 20, 15, 5, -30, -30, 0, 15, 20,
    20, 15, 0, -30, -30, 5, 10, 15, 15, 10, 5, -30, -40, -20, 0, 5, 5, 0, -20,
    -40, -50, -40, -30, -30, -30, -30, -40, -50,
  ];

  private static pawn = [
    0, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 50, 50, 50, 50, 50, 10, 10, 20, 30, 30,
    20, 10, 10, 5, 5, 10, 25, 25, 10, 5, 5, 0, 0, 0, 20, 20, 0, 0, 0, 5, -5,
    -10, 0, 0, -10, -5, 5, 5, 10, 10, -20, -20, 10, 10, 5, 0, 0, 0, 0, 0, 0, 0,
    0,
  ];
}
