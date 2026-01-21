import type { ReactNode } from "react";
import type { Tool } from "../types";

type ShapesBarProps = {
    tool: Tool;
    setTool: (t: Tool) => void;
};

export default function ShapesBar({ tool, setTool }: ShapesBarProps) {
    const stroke = 1;

    // Button is stable size; we scale only the icon on hover.
    const btnClass =
        "group relative w-28 h-28 flex items-center justify-center rounded-md bg-white " +
        "hover:z-10";

    const iconClass =
        "w-28 h-28 transition-transform duration-200 ease-out " +
        "group-hover:scale-130 group-hover:-translate-y-10";

    const ToolButton = ({
        t,
        label,
        children,
    }: {
        t: Tool;
        label: string;
        children: ReactNode;
    }) => (
        <button
            type="button"
            aria-label={label}
            onClick={() => setTool(t)}
            className={`${btnClass}`}
        >
            {children}
        </button>
    );

    return (
        <div
            className="
        fixed bottom-4 left-1/2 -translate-x-1/2
        flex items-center justify-center gap-2 border
        rounded-lg bg-white p-2
      "
        >
            <ToolButton t="square" label="Square">
                <svg viewBox="0 0 24 24" className={iconClass}>
                    <rect
                        x="4"
                        y="4"
                        width="16"
                        height="16"
                        fill="white"
                        stroke="black"
                        strokeWidth={stroke}
                    />
                </svg>
            </ToolButton>

            <ToolButton t="circle" label="Circle">
                <svg viewBox="0 0 24 24" className={iconClass}>
                    <circle
                        cx="12"
                        cy="12"
                        r="8"
                        fill="white"
                        stroke="black"
                        strokeWidth={stroke}
                    />
                </svg>
            </ToolButton>

            <ToolButton t="triangle" label="Triangle">
                <svg viewBox="0 0 24 24" className={iconClass}>
                    <polygon
                        points="12,4 20,20 4,20"
                        fill="white"
                        stroke="black"
                        strokeWidth={stroke}
                        strokeLinejoin="round"
                    />
                </svg>
            </ToolButton>

            <ToolButton t="line" label="Line">
                <svg viewBox="0 0 24 24" className={iconClass}>
                    <line
                        x1="4"
                        y1="12"
                        x2="20"
                        y2="12"
                        stroke="black"
                        strokeWidth={stroke}
                        strokeLinecap="round"
                    />
                </svg>
            </ToolButton>
        </div>
    );
}

