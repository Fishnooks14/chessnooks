"use client";

import React, { useState, useRef, useEffect } from "react";
import { Chess, Square } from "chess.js";
import { ChessBot } from "@/utils/ChessBot";

interface Arrow {
  start: { x: number; y: number }
  end: { x: number; y: number }
}

const BotChessComponent: React.FC = () => {
  const chessRef = useRef(new Chess());
  const botRef = useRef(new ChessBot());

  let selectedSquare: string | null = null;
  const [sneakySelected, setSneakySelected] = useState<string | null>(null);
  let moveableSquares: string[] = [];
  let promotionPiece: string | undefined = undefined;
  const [showPromo, setShowPromo] = useState<boolean>(false);
  const [lastMove, setLastMove] = useState<string | null>(null);

  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [startPosition, setStartPosition] = useState<{ x: number; y: number } | null>(null);
  const [endPosition, setEndPosition] = useState<{ x: number; y: number } | null>(null);

  const [gameActive, setGameActive] = useState<boolean>(true);
  const [outcome, setOutCome] = useState<string | null>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setStartPosition({ x: event.clientX, y: event.clientY })
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (startPosition) {
      setEndPosition({ x: event.clientX, y: event.clientY })
    }
  };

  const resetArrows = () => {
    setArrows([])
  }

  const handleMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.button == 0) {resetArrows()}
    if (startPosition && endPosition && event.button == 2) {
      const newArrow = { start: startPosition, end: endPosition }
      setArrows([...arrows, newArrow])
    }
    setStartPosition(null)
    setEndPosition(null)
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [startPosition, arrows])

  const doNextBotMove = () => {
    botRef.current.makeBestMove(chessRef.current, 3, true);
    resetArrows()
    updateBoard();
  };

  const updateOutcome = () => {
    if (chessRef.current.isCheckmate()) {
      setOutCome(chessRef.current.turn() === "b" ? "white" : "black");
    } else if (
      chessRef.current.isStalemate() ||
      chessRef.current.isThreefoldRepetition() ||
      chessRef.current.isInsufficientMaterial()
    ) {
      setOutCome("draw");
    }
  };

  const moveHandler = (initial: string, final: string) => {
    const chess = chessRef.current;
    let moveOptions = {
      from: initial,
      to: final,
      promotion: promotionPiece,
    };

    const move = chess.move(moveOptions);

    selectedSquare = null;
    setSneakySelected(null);
    moveableSquares = [];
    promotionPiece = undefined;
    setLastMove(null);

    updateOutcome();
    updateBoard();

    setTimeout(() => {
      doNextBotMove();
      updateOutcome();
      updateBoard();
    }, 0);
  };

  const promotionHandler = (piece: string) => {
    promotionPiece = piece;
    moveHandler(sneakySelected!, lastMove!);
    setShowPromo(false);
  };

  const squareHandler = (move: string) => {
    if (!gameActive || chessRef.current.turn() != "w") {
      return;
    }
    if (moveableSquares.includes(move)) {
      if (selectedSquare != null) {
        const isPromotion = requiresPromotion(move);
        if (isPromotion) {
          setLastMove(move);
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

  const handleRefresh = () => {
    window.location.reload();
  };

  const generateWinnerMessage = () => {
    if (outcome === null || outcome === "") {
      return <></>;
    } else if (outcome === "black") {
      return (
        <div className="flex flex-col items-center">
          <p className="text-center font-bold">Black wins by checkmate.</p>
          <button
            className="px-4 py-2 bg-render_gray text-white font-bold rounded shadow-sm hover:bg-dcyan"
            onClick={handleRefresh}
          >
            Play Again
          </button>
        </div>
      );
    } else if (outcome === "white") {
      return (
        <div className="flex flex-col items-center">
          <p className="text-center font-bold">White wins by checkmate.</p>
          <button
            className="px-4 py-2 bg-render_gray text-white font-bold rounded shadow-sm hover:bg-dcyan"
            onClick={handleRefresh}
          >
            Play Again
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center">
          <p className="text-center font-bold">Game is a draw.</p>
          <button
            className="px-4 py-2 bg-render_gray text-white font-bold rounded shadow-sm hover:bg-dcyan"
            onClick={handleRefresh}
          >
            Play Again
          </button>
        </div>
      );
    }
  };

  return (
    <div onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}
    onContextMenu={(e) => e.preventDefault()} className="flex flex-col">
      {squares.map((row) => (
        <div key={row[0].key} style={{ display: "flex" }}>
          {row}
        </div>
      ))}
      {arrows.map((arrow, index) => (
        <svg
          key={index}
          style={{
            position: 'absolute',
            top: 0,left: 0,width: '100%',height: '100%',
            pointerEvents: 'none',
          }}
        >
          <defs>
            <marker
              id={`arrow-head-${index}`}
              viewBox="0 0 10 10"refX="5"refY="5"markerWidth="11"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#000" />
            </marker>
          </defs>
          <line
            x1={arrow.start.x}
            y1={arrow.start.y}
            x2={arrow.end.x}
            y2={arrow.end.y}
            style={{
              stroke: 'orange',
              strokeWidth: 7,
              markerEnd: `url(#arrow-head-${index})`,
            }}
          />
        </svg>
      ))}
      {generateWinnerMessage()}
      {showPromotionMenu()}
    </div>
  );
};

export default BotChessComponent;
