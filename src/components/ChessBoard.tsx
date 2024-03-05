"use client";

import React, { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import { Castle, Move, PGNGame } from "@/utils/PGNParser";

function cordsToVector(x: number, y: number): BABYLON.Vector3 {
    return new BABYLON.Vector3(3.5 - y, 0.5, x - 3.5);
}

const ChessBoard: React.FC = () => {
    const canvasRef = useRef(null);
    const gameRef = useRef(new PGNGame());
    gameRef.current.init();

    useEffect(() => {
        // create necessities to use babylon
        const engine = new BABYLON.Engine(canvasRef.current, true);
        const scene = new BABYLON.Scene(engine);

        // create a camera and light to view the models
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

        // create materials for white, black, and the board
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

        // create board and pieces
        const board = BABYLON.MeshBuilder.CreatePlane(
            "board",
            { size: 8 },
            scene
        );
        board.material = boardMaterial;
        board.position.y = 0.1;
        board.rotation.x = Math.PI / 2;

        // for (let x = 0; x < 8; x++) {
        //     for (let y = 0; y < 2; y++) {
        //         const pawnMesh = BABYLON.MeshBuilder.CreateBox(
        //             `piece-${x}-${y}`,
        //             { size: 0.5 },
        //             scene
        //         );
        //         pawnMesh.material = whiteMaterial;
        //         pawnMesh.position = cordsToVector(x, y);
        //     }
        // }

        // for (let x = 0; x < 8; x++) {
        //     for (let y = 6; y < 8; y++) {
        //         const pawnMesh = BABYLON.MeshBuilder.CreateBox(
        //             `piece-${x}-${y}`,
        //             { size: 0.5 },
        //             scene
        //         );
        //         pawnMesh.material = blackMaterial;
        //         pawnMesh.position = cordsToVector(x, y);
        //     }
        // }

        const pawnMesh = BABYLON.MeshBuilder.CreateBox(
            `piece-4-1`,
            { size: 0.5 },
            scene
        );
        pawnMesh.material = whiteMaterial;
        pawnMesh.position = cordsToVector(4, 1);

        const movePiece = (
            fromX: number,
            fromY: number,
            toX: number,
            toY: number
        ) => {
            if (scene) {
                console.log(`piece-${fromX}-${fromY}` === `piece-4-1`);
                const piece = scene.getMeshByName(`piece-${fromX}-${fromY}`);
                console.log(piece);
                if (piece) {
                    console.log("bozo spotted");
                    const currentPos = piece.position;
                    const targetPos = cordsToVector(toX, toY);
                    const animation = new BABYLON.Animation(
                        "moveAnimation",
                        "position",
                        30,
                        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
                        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
                    );

                    const keyFrames = [];
                    keyFrames.push({ frame: 0, value: currentPos });
                    keyFrames.push({ frame: 30, value: targetPos });

                    animation.setKeys(keyFrames);
                    piece.animations.push(animation);
                    scene.beginAnimation(piece, 0, 90, false);
                    piece.name = `piece-${toX}-${toY}`;
                } else {
                    console.log("no piece");
                }
            } else {
                console.log("no scene");
            }
        };

        // Create loop to play moves
        setInterval(() => {
            for (const mesh of scene.meshes) {
                if (mesh.name) {
                    console.log(mesh.name);
                } else {
                    console.log("no name");
                }
            }
            const nextMove = gameRef.current.nextMove();
            console.log(nextMove);
            switch (nextMove) {
                case null:
                    console.log("null");
                    break;
                case nextMove as Move:
                    console.log("making a move");
                    movePiece(
                        nextMove.initialPos.x,
                        nextMove.initialPos.y,
                        nextMove.finalPos.y,
                        nextMove.finalPos.y
                    );
                    break;
                case nextMove as Castle:
                    console.log("castle");
                    break;
            }
        }, 3000);

        engine.runRenderLoop(() => {
            scene.render();
        });

        return () => engine.dispose();
    }, []);

    return (
        <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh" }} />
    );
};

export default ChessBoard;
