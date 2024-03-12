"use client";

import React, { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import { Castle, Move, PGNGame } from "@/utils/PGNParser";
import "@babylonjs/loaders/OBJ";

function cordsToVector(x: number, y: number): BABYLON.Vector3 {
    return new BABYLON.Vector3(3.5 - y, 0.5, x - 3.5);
}

const ChessBoard: React.FC = () => {
    const canvasRef = useRef(null);
    const gameRef = useRef(new PGNGame());
    const meshPos = useRef(new Map());
    gameRef.current.init();
    console.log(Math.random());

    useEffect(() => {
        // create necessities to use babylon
        const engine = new BABYLON.Engine(canvasRef.current, true);
        const scene = new BABYLON.Scene(engine);

        // create a camera and light to view the models
        const camera = new BABYLON.ArcRotateCamera(
            "camera",
            0,
            Math.PI / 3.5,
            15,
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
        // const board = BABYLON.MeshBuilder.CreatePlane(
        //     "board",
        //     { size: 8 },
        //     scene
        // );
        // board.material = boardMaterial;
        // board.position.y = 0.1;
        // board.rotation.x = Math.PI / 2;
        BABYLON.SceneLoader.ImportMesh(
            "",
            "assets/models/board/",
            "10586_Chess Board_v2_Iterations-2.obj",
            scene,
            (meshes) => {
                meshes[0].rotation.y = Math.PI / 2;
                meshes[0].rotation.x = -Math.PI / 2;
                meshes[0].scaling = new BABYLON.Vector3(0.217, 0.217, 0.217);
            }
        );

        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 2; y++) {
                const pawnMesh = BABYLON.MeshBuilder.CreateBox(
                    `piece-${x}-${y}`,
                    { size: 0.5 },
                    scene
                );
                pawnMesh.material = whiteMaterial;
                pawnMesh.position = cordsToVector(x, y);
                meshPos.current.set(x + "-" + y, pawnMesh);
            }
        }

        for (let x = 0; x < 8; x++) {
            for (let y = 6; y < 8; y++) {
                const pawnMesh = BABYLON.MeshBuilder.CreateBox(
                    `piece-${x}-${y}`,
                    { size: 0.5 },
                    scene
                );
                pawnMesh.material = blackMaterial;
                pawnMesh.position = cordsToVector(x, y);
                meshPos.current.set(x + "-" + y, pawnMesh);
            }
        }

        const movePiece = (
            fromX: number,
            fromY: number,
            toX: number,
            toY: number
        ) => {
            if (scene) {
                const piece = meshPos.current.get(fromX + "-" + fromY);
                if (piece) {
                    const currentPos = piece.position;
                    const targetPos = cordsToVector(toX, toY);
                    console.log("dest: " + targetPos);
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
                    meshPos.current.delete(fromX + "-" + fromY);
                    meshPos.current.set(toX + "-" + toY, piece);
                }
            }
        };

        const deletePiece = (x: number, y: number) => {
            if (scene) {
                console.log("thing happened");
                const piece = meshPos.current.get(x + "-" + y);
                if (piece) {
                    const currentPos = piece.position;
                    const targetPos = new BABYLON.Vector3(
                        piece.position.x,
                        -1,
                        piece.position.z
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
                    keyFrames.push({ frame: 30, value: targetPos });

                    animation.setKeys(keyFrames);
                    piece.animations.push(animation);
                    scene.beginAnimation(piece, 0, 90, false);
                    meshPos.current.delete(x + "-" + y);
                    piece.dispose();
                }
            }
        };

        // Create loop to play moves
        setInterval(() => {
            const nextMove = gameRef.current.nextMove();
            console.log(nextMove);
            if (nextMove == null) {
                console.log("null move");
            } else if ("initialPos" in nextMove) {
                console.log("regular move");
                if (nextMove.capture) {
                    deletePiece(nextMove.capture.x, nextMove.capture.y);
                }
                movePiece(
                    nextMove.initialPos.x,
                    nextMove.initialPos.y,
                    nextMove.finalPos.x,
                    nextMove.finalPos.y
                );
            } else if ("long" in nextMove) {
                if (nextMove.long) {
                    if (nextMove.white) {
                        movePiece(4, 0, 2, 0);
                        movePiece(0, 0, 3, 0);
                    } else {
                        movePiece(4, 7, 2, 7);
                        movePiece(0, 7, 3, 7);
                    }
                } else {
                    if (nextMove.white) {
                        movePiece(4, 0, 6, 0);
                        movePiece(7, 0, 5, 0);
                    } else {
                        movePiece(4, 7, 6, 7);
                        movePiece(7, 7, 5, 7);
                    }
                }
            }
        }, 2000);

        scene.registerBeforeRender(() => {
            camera.alpha += 0.005; // Adjust the speed as desired
        });

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
