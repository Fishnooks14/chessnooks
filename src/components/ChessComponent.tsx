"use client";

import React, { useState, useRef, useEffect } from "react";
import { Chess, Square } from "chess.js";

const ChessComponent: React.FC = () => {
  const chessRef = useRef(new Chess());
  let selectedSquare: string | null = null;
  const [sneakySelected, setSneakySelected] = useState<string | null>(null);
  let moveableSquares: string[] = [];
  let promotionPiece: string | undefined = undefined;
  const [showPromo, setShowPromo] = useState<boolean>(false);
  const [lastMove, setLastMove] = useState<string | null>(null);

  const moveHandler = (initial: string, final: string) => {
    const chess = chessRef.current;
    let moveOptions = {
      from: initial,
      to: final,
      promotion: promotionPiece,
    };

    //If the move is valid, it will return the all relevant information and execute move. If not, it will be null.
    const move = chess.move(moveOptions);
    console.log(move);

    selectedSquare = null;
    setSneakySelected(null);
    moveableSquares = [];
    promotionPiece = undefined;
    setLastMove(null);

    /* update board */
    updateBoard();
  };

  const promotionHandler = (piece: string) => {
    promotionPiece = piece;
    moveHandler(sneakySelected!, lastMove!);
    setShowPromo(false);
  };

  const squareHandler = (move: string) => {
    if (moveableSquares.includes(move)) {
      if (selectedSquare != null) {
        const isPromotion = requiresPromotion(move);
        if (isPromotion) {
          setLastMove(move);
          console.log("lm: " + lastMove);
          setShowPromo(true);
        } else {
          moveHandler(selectedSquare, move);
        }
      }
    } else if (move === selectedSquare) {
      selectedSquare = null;
      setSneakySelected(null);
      setShowPromo(false);
      moveableSquares = [];
      updateBoard();
    } else {
      const squareData = chessRef.current.get(move as Square);
      if (squareData != null) {
        if (squareData.color === chessRef.current.turn()) {
          selectedSquare = move;
          setShowPromo(false);
          setSneakySelected(move);
          const moves = chessRef.current
            .moves({
              square: move as Square,
              verbose: true,
            })
            .map((move) => move.to);
          moveableSquares = moves;
          console.log(moveableSquares);
          updateBoard();
        }
      }
    }
  };

  const requiresPromotion = (move: string) => {
    const rank = move.charAt(1);
    const isPawn = chessRef.current.get(selectedSquare as Square).type === "p";
    const isPromotionRank = rank === "1" || rank === "8";
    return isPawn && isPromotionRank;
  };

  const showPromotionMenu = () => {
    if (!showPromo) {
      return <></>;
    }
    const promotionPieces = ["q", "r", "b", "n"]; // Array of promotion piece types (Queen, Rook, Bishop, Knight)

    // Function to handle promotion button click
    const handlePromotionClick = (piece: string) => {
      promotionHandler(piece);
    };

    return (
      <div>
        <h2 className="justify-center text-center">Promote Pawn To:</h2>
        <div className="flex items-center justify-center">
          {promotionPieces.map((piece) => (
            <button
              key={piece}
              className="bg-gray-200 hover:bg-gray-400 rounded-xl w-12 h-12"
              onClick={() => handlePromotionClick(piece)}
            >
              {piece.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const [squares, setSquares] = useState<React.ReactElement[][]>([]);

  const generateBoard = (): React.ReactElement[][] => {
    const board = [];
    for (let rank = 8; rank >= 1; rank--) {
      const row = [];
      for (let fileVal = 0; fileVal < 8; fileVal++) {
        const file = String.fromCharCode(97 + fileVal);
        const piece = chessRef.current.get((file + rank) as Square);
        const image = piece
          ? `assets/images/${piece.type}${piece.color}.png`
          : "assets/images/blank.png";
        const inCheck =
          chessRef.current.inCheck() &&
          piece.type == "k" &&
          piece.color == chessRef.current.turn();

        const square = (
          <button
            key={`${file}${rank}`}
            className="flex items-center justify-center hover:bg-gray-400 rounded-xl"
            style={{
              background: inCheck
                ? "red"
                : moveableSquares.includes(`${file}${rank}`)
                ? "orange"
                : (rank + file.charCodeAt(0)) % 2 === 0
                ? "lightgray"
                : "darkgray",
            }}
            onClick={() => squareHandler(file + rank)}
          >
            <img src={image} className="w-full h-full object-cover" />
          </button>
        );
        row.push(square);
      }
      board.push(row);
    }
    return board;
  };

  useEffect(() => {
    const newSquares = generateBoard();
    setSquares(newSquares);
  }, []);

  const updateBoard = () => {
    const newSquares = generateBoard();
    setSquares(newSquares);
  };

  return (
    <div className="flex flex-col">
      {squares.map((row) => (
        <div key={row[0].key} style={{ display: "flex" }}>
          {row}
        </div>
      ))}
      {showPromotionMenu()}
    </div>
  );
};

export default ChessComponent;
