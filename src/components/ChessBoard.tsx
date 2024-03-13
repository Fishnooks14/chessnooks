"use client";

import React, { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import { Castle, Move, PGNGame } from "@/utils/PGNParser";
import "@babylonjs/loaders/OBJ";

function cordsToVector(x: number, y: number): BABYLON.Vector3 {
    return new BABYLON.Vector3(3.5 - y, 0.5, x - 3.5);
}

function addOrAppend(
    map: Map<string, BABYLON.AbstractMesh[]>,
    key: string,
    value: BABYLON.AbstractMesh
) {
    const existingValues = map.get(key);
    if (!existingValues) {
        map.set(key, [value]);
    } else {
        existingValues.push(value);
    }
}

const ChessBoard: React.FC = () => {
    const canvasRef = useRef(null);
    const gameRef = useRef(new PGNGame());
    const meshPos: React.MutableRefObject<Map<string, BABYLON.AbstractMesh[]>> =
        useRef(new Map());
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
            15,
            BABYLON.Vector3.Zero(),
            scene
        );

        const light = new BABYLON.HemisphericLight(
            "light",
            new BABYLON.Vector3(0, 1, 0),
            scene
        );
        light.intensity = 0.6;

        const light2 = new BABYLON.HemisphericLight(
            "light",
            new BABYLON.Vector3(0, 1, 1),
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
        whiteMaterial.diffuseColor = new BABYLON.Color3(0.7, 0.7, 0.7);
        whiteMaterial.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);

        const blackMaterial = new BABYLON.StandardMaterial(
            "blackMaterial",
            scene
        );
        blackMaterial.diffuseColor = new BABYLON.Color3(0.2, 0.2, 0.2);

        const pieceScaling = new BABYLON.Vector3(0.17, 0.17, 0.17);

        // create board and pieces
        BABYLON.SceneLoader.ImportMesh(
            "",
            "assets/models/board/",
            "10586_Chess Board_v2_Iterations-2.obj",
            scene,
            (meshes) => {
                meshes[0].rotation.y = Math.PI / 2;
                meshes[0].rotation.x = -Math.PI / 2;
                meshes[0].scaling = new BABYLON.Vector3(-0.217, 0.217, 0.217);
            }
        );

        const setupBoard = () => {
            for (let x = 0; x < 8; x++) {
                BABYLON.SceneLoader.ImportMesh(
                    "",
                    "assets/models/pawn/",
                    "pawn.obj",
                    scene,
                    (meshes) => {
                        meshes[0].material = whiteMaterial;
                        meshes[0].position.y = 1;
                        meshes[0].position = cordsToVector(x, 1);
                        meshPos.current.set(x + "-" + 1, [meshes[0]]);
                        meshes[0].scaling = pieceScaling;
                    }
                );
            }

            for (let x = 0; x < 8; x++) {
                BABYLON.SceneLoader.ImportMesh(
                    "",
                    "assets/models/pawn/",
                    "pawn.obj",
                    scene,
                    (meshes) => {
                        meshes[0].material = blackMaterial;
                        meshes[0].position.y = 1;
                        meshes[0].position = cordsToVector(x, 6);
                        meshPos.current.set(x + "-" + 6, [meshes[0]]);
                        meshes[0].scaling = pieceScaling;
                    }
                );
            }

            for (let i = 0; i < 2; i++) {
                let row = i === 1 ? 0 : 7;
                let material = i === 1 ? whiteMaterial : blackMaterial;
                BABYLON.SceneLoader.ImportMesh(
                    "",
                    "assets/models/rook/",
                    "rook.obj",
                    scene,
                    (meshes) => {
                        meshes[0].material = material;
                        meshes[0].position.y = 1;
                        meshes[0].position = cordsToVector(0, row);
                        meshPos.current.set(0 + "-" + row, [meshes[0]]);
                        meshes[0].scaling = pieceScaling;
                    }
                );

                BABYLON.SceneLoader.ImportMesh(
                    "",
                    "assets/models/knight/",
                    "knight.obj",
                    scene,
                    (meshes) => {
                        meshes.forEach((mesh) => {
                            mesh.material = material;
                            mesh.position.y = 1;
                            mesh.position = cordsToVector(1, row);
                            addOrAppend(meshPos.current, 1 + "-" + row, mesh);
                            mesh.scaling = pieceScaling;
                        });
                    }
                );

                BABYLON.SceneLoader.ImportMesh(
                    "",
                    "assets/models/bishop/",
                    "bishop.obj",
                    scene,
                    (meshes) => {
                        meshes.forEach((mesh) => {
                            mesh.material = material;
                            mesh.position.y = 1;
                            mesh.position = cordsToVector(2, row);
                            addOrAppend(meshPos.current, 2 + "-" + row, mesh);
                            mesh.scaling = pieceScaling;
                        });
                    }
                );

                BABYLON.SceneLoader.ImportMesh(
                    "",
                    "assets/models/queen/",
                    "queen.obj",
                    scene,
                    (meshes) => {
                        meshes.forEach((mesh) => {
                            mesh.material = material;
                            mesh.position.y = 1;
                            mesh.position = cordsToVector(3, row);
                            addOrAppend(meshPos.current, 3 + "-" + row, mesh);
                            mesh.scaling = pieceScaling;
                        });
                    }
                );

                BABYLON.SceneLoader.ImportMesh(
                    "",
                    "assets/models/king/",
                    "king.obj",
                    scene,
                    (meshes) => {
                        meshes.forEach((mesh) => {
                            mesh.material = material;
                            mesh.position.y = 1;
                            mesh.position = cordsToVector(4, row);
                            addOrAppend(meshPos.current, 4 + "-" + row, mesh);
                            mesh.scaling = pieceScaling;
                        });
                    }
                );

                BABYLON.SceneLoader.ImportMesh(
                    "",
                    "assets/models/bishop/",
                    "bishop.obj",
                    scene,
                    (meshes) => {
                        meshes.forEach((mesh) => {
                            mesh.material = material;
                            mesh.position.y = 1;
                            mesh.position = cordsToVector(5, row);
                            addOrAppend(meshPos.current, 5 + "-" + row, mesh);
                            mesh.scaling = pieceScaling;
                        });
                    }
                );

                BABYLON.SceneLoader.ImportMesh(
                    "",
                    "assets/models/knight/",
                    "knight.obj",
                    scene,
                    (meshes) => {
                        meshes.forEach((mesh) => {
                            mesh.material = material;
                            mesh.position.y = 1;
                            mesh.position = cordsToVector(6, row);
                            addOrAppend(meshPos.current, 6 + "-" + row, mesh);
                            mesh.scaling = pieceScaling;
                        });
                    }
                );

                BABYLON.SceneLoader.ImportMesh(
                    "",
                    "assets/models/rook/",
                    "rook.obj",
                    scene,
                    (meshes) => {
                        meshes[0].material = material;
                        meshes[0].position.y = 1;
                        meshes[0].position = cordsToVector(7, row);
                        meshPos.current.set(7 + "-" + row, [meshes[0]]);
                        meshes[0].scaling = pieceScaling;
                    }
                );
            }
        };

        setupBoard();

        const movePiece = (
            fromX: number,
            fromY: number,
            toX: number,
            toY: number
        ) => {
            if (scene) {
                const pieces = meshPos.current.get(fromX + "-" + fromY);
                if (!pieces) {
                    return;
                }
                pieces.forEach((piece: BABYLON.AbstractMesh) => {
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
                    meshPos.current.delete(fromX + "-" + fromY);
                    addOrAppend(meshPos.current, toX + "-" + toY, piece);
                });
            }
        };

        const deletePiece = (x: number, y: number) => {
            if (scene) {
                const pieces = meshPos.current.get(x + "-" + y);
                if (!pieces) {
                    return;
                }
                pieces.forEach((piece: BABYLON.AbstractMesh) => {
                    const currentPos = piece.position;
                    const targetPos = new BABYLON.Vector3(
                        piece.position.x,
                        -10,
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
                    scene.beginAnimation(piece, 0, 30, false);
                    meshPos.current.delete(x + "-" + y);
                    piece.dispose();
                });
            }
        };

        // Create loop to play moves
        setInterval(() => {
            const nextMove = gameRef.current.nextMove();
            if (nextMove == null) {
                meshPos.current.forEach((meshes, meshName) => {
                    meshes.forEach((mesh) => {
                        mesh.dispose();
                    });
                });
                meshPos.current.clear();
                setupBoard();
                gameRef.current.newGame();
                gameRef.current.init();
            } else if ("initialPos" in nextMove) {
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
