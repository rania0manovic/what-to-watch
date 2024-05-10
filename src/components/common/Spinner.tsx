import React from "react";

export default function Spinner() {
  return (
    <div
      data-testid="spinner"
      className="d-flex h-80vh flex-row align-items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="200"
        height="200"
        style={{
          shapeRendering: "auto",
          display: "block",
          background: "rgba(255, 255, 255, 0)",
        }}
      >
        <g>
          <circle
            strokeWidth="2"
            stroke="#40296c"
            fill="none"
            r="0"
            cy="50"
            cx="50"
          >
            <animate
              begin="0s"
              calcMode="spline"
              keySplines="0 0.2 0.8 1"
              keyTimes="0;1"
              values="0;40"
              dur="1s"
              repeatCount="indefinite"
              attributeName="r"
            />
            <animate
              begin="0s"
              calcMode="spline"
              keySplines="0.2 0 0.8 1"
              keyTimes="0;1"
              values="1;0"
              dur="1s"
              repeatCount="indefinite"
              attributeName="opacity"
            />
          </circle>
          <circle
            strokeWidth="2"
            stroke="#764ba2"
            fill="none"
            r="0"
            cy="50"
            cx="50"
          >
            <animate
              begin="-0.5s"
              calcMode="spline"
              keySplines="0 0.2 0.8 1"
              keyTimes="0;1"
              values="0;40"
              dur="1s"
              repeatCount="indefinite"
              attributeName="r"
            />
            <animate
              begin="-0.5s"
              calcMode="spline"
              keySplines="0.2 0 0.8 1"
              keyTimes="0;1"
              values="1;0"
              dur="1s"
              repeatCount="indefinite"
              attributeName="opacity"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
}
