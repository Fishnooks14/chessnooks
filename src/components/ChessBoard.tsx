"use client";

import React, { useEffect, useRef, useState } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/OBJ";
import { int } from "babylonjs";

const defaultBoard = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  [" ", " ", " ", " ", " ", " ", " ", " "],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

const ChessBoard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scene, setScene] = useState<BABYLON.Scene | null>(null);

  useEffect(() => {
    const engine = new BABYLON.Engine(canvasRef.current, true);

    const createScene = () => {
      const scene = new BABYLON.Scene(engine);
      // scene.clearColor = new BABYLON.Color4(0.8, 0.8, 0.8, 1);

      const boardMaterial = new BABYLON.StandardMaterial(
        "boardMaterial",
        scene
      );
      boardMaterial.diffuseColor = new BABYLON.Color3(0.5, 0.3, 0.1);

      const whiteMaterial = new BABYLON.StandardMaterial(
        "whiteMaterial",
        scene
      );
      whiteMaterial.diffuseColor = new BABYLON.Color3(1, 1, 1);

      const blackMaterial = new BABYLON.StandardMaterial(
        "blackMaterial",
        scene
      );
      blackMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);

      const board = BABYLON.MeshBuilder.CreatePlane(
        "board",
        { size: 8 },
        scene
      );
      board.material = boardMaterial;
      board.position.y = 0.1;
      board.rotation.x = Math.PI / 2;

      const pawnMesh = BABYLON.MeshBuilder.CreateBox(
        "pawn",
        { size: 0.5 },
        scene
      );
      const whitePawn = pawnMesh.clone("piece-0-0");
      whitePawn.material = whiteMaterial;
      whitePawn.position = new BABYLON.Vector3(0.5, 0.5, 0.2);

      const camera = new BABYLON.ArcRotateCamera(
        "camera",
        0,
        Math.PI / 3.5,
        10,
        BABYLON.Vector3.Zero(),
        scene
      );

      const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
      );

      scene.registerBeforeRender(() => {
        camera.alpha += 0.005; // Adjust the speed as desired
      });

      engine.runRenderLoop(() => {
        scene.render();
      });

      setScene(scene);
    };

    createScene();

    return () => {
      engine.dispose();
    };
  }, []);

  const movePiece = (fromX: int, fromY: int, toX: int, toY: int) => {
    if (scene) {
      const piece = scene.getMeshByName(`piece-${fromX}-${fromY}`);
      if (piece) {
        const currentPos = piece.position;
        const targetPos = new BABYLON.Vector3(
          toX * 1 + 0.5,
          0.5,
          fromY * -1 + 0.5
        );
        const animation = new BABYLON.Animation(
          "moveAnimation",
          "position",
          30,
          BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
          BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
        );

        const keyFrames = [];
        keyFrames.push({ frame: 0, value: currentPos });
        keyFrames.push({ frame: 90, value: targetPos });

        animation.setKeys(keyFrames);
        piece.animations.push(animation);
        scene.beginAnimation(piece, 0, 90, false);
      } else {
        console.log("no piece");
      }
    } else {
      console.log("no scene");
    }
  };

  return (
    <>
      <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh" }} />
      <button
        onClick={() => {
          movePiece(0, 0, 10, 10);
          console.log("hi");
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Do Thing
      </button>
    </>
  );
};

export default ChessBoard;
