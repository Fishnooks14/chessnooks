"use client";

import React, { useEffect, useRef } from "react";
import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders/OBJ";

const ChessBoard: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current) {
            const engine = new BABYLON.Engine(canvasRef.current, true);
            const scene = new BABYLON.Scene(engine);

            const camera = new BABYLON.ArcRotateCamera(
                "camera",
                0,
                Math.PI / 3.5,
                80,
                BABYLON.Vector3.Zero(),
                scene
            );

            const light = new BABYLON.HemisphericLight(
                "light",
                new BABYLON.Vector3(0, 1, 0),
                scene
            );

            BABYLON.SceneLoader.ImportMesh(
                "",
                "assets/models/board/",
                "10586_Chess Board_v2_Iterations-2.obj",
                scene,
                (meshes) => {
                    meshes[0].rotation.y = Math.PI / 2;
                    meshes[0].rotation.x = -Math.PI / 2;
                    meshes[0].position = BABYLON.Vector3.Zero();
                }
            );

            scene.registerBeforeRender(() => {
                camera.alpha += 0.005; // Adjust the speed as desired
            });

            engine.runRenderLoop(() => {
                scene.render();
            });
        }
    }, []);

    return (
        <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh" }} />
    );
};

export default ChessBoard;
