import type Konva from "konva";
import { useMemo, useState } from "react";
import { Circle, Layer, Line, Rect, Stage } from "react-konva";
import type { Tool } from "../types";
import ShapesBar from "./ShapesBar";

type Shape =
    | { id: string; type: "square"; x: number; y: number; size: number }
    | { id: string; type: "circle"; x: number; y: number; radius: number }
    | { id: string; type: "triangle"; x: number; y: number; size: number }
    | { id: string; type: "line"; x1: number; y1: number; x2: number; y2: number };

function uid() {
    return Math.random().toString(36).slice(2, 10);
}

export default function CanvasPage() {
    const [tool, setTool] = useState<Tool>("square");
    const [shapes, setShapes] = useState<Shape[]>([]);

    // leave room for the toolbar at the bottom
    const stageWidth = window.innerWidth;
    const stageHeight = window.innerHeight;

    const defaults = useMemo(
        () => ({
            squareSize: 80,
            circleRadius: 40,
            triSize: 100,
            lineLength: 140,
        }),
        []
    );

    const handleStageMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
        // If later you add "select" mode, you can early-return here.
        if (tool === "select") return;

        const stage = e.target.getStage();
        if (!stage) return;

        if (e.target !== stage) return;

        const pos = stage.getPointerPosition();
        if (!pos) return;

        const id = uid();
        const { x, y } = pos;

        setShapes((prev) => {
            switch (tool) {
                case "square":
                    return [
                        ...prev,
                        {
                            id,
                            type: "square",
                            x: x - defaults.squareSize / 2,
                            y: y - defaults.squareSize / 2,
                            size: defaults.squareSize,
                        },
                    ];

                case "circle":
                    return [
                        ...prev,
                        {
                            id,
                            type: "circle",
                            x,
                            y,
                            radius: defaults.circleRadius,
                        },
                    ];

                case "triangle":
                    return [
                        ...prev,
                        {
                            id,
                            type: "triangle",
                            x,
                            y,
                            size: defaults.triSize,
                        },
                    ];

                case "line": {
                    const half = defaults.lineLength / 2;
                    return [
                        ...prev,
                        {
                            id,
                            type: "line",
                            x1: x - half,
                            y1: y,
                            x2: x + half,
                            y2: y,
                        },
                    ];
                }

                default:
                    return prev;
            }
        });
    };

    return (
        <div className="h-screen w-screen bg-gray-50">
            <Stage width={stageWidth} height={stageHeight} onMouseDown={handleStageMouseDown}>
                <Layer>
                    {shapes.map((s) => {
                        if (s.type === "square") {
                            return (
                                <Rect
                                    key={s.id}
                                    x={s.x}
                                    y={s.y}
                                    width={s.size}
                                    height={s.size}
                                    fill="white"
                                    stroke="black"
                                    strokeWidth={2}
                                    draggable
                                />
                            );
                        }

                        if (s.type === "circle") {
                            return (
                                <Circle
                                    key={s.id}
                                    x={s.x}
                                    y={s.y}
                                    radius={s.radius}
                                    fill="white"
                                    stroke="black"
                                    strokeWidth={2}
                                    draggable
                                />
                            );
                        }

                        if (s.type === "triangle") {
                            // Equilateral triangle centered around (x, y)
                            const half = s.size / 2;
                            const height = (Math.sqrt(3) / 2) * s.size;

                            return (
                                <Line
                                    key={s.id}
                                    x={s.x}
                                    y={s.y}
                                    points={[
                                        0, -height / 2,
                                        -half, height / 2,
                                        half, height / 2,
                                    ]}
                                    closed
                                    fill="white"
                                    stroke="black"
                                    strokeWidth={2}
                                    draggable
                                />
                            );
                        }

                        // line
                        return (
                            <Line
                                key={s.id}
                                points={[s.x1, s.y1, s.x2, s.y2]}
                                stroke="black"
                                strokeWidth={2}
                                lineCap="round"
                                draggable
                            />
                        );
                    })}
                </Layer>
            </Stage>

            <ShapesBar tool={tool} setTool={setTool} />
        </div>
    );
}
