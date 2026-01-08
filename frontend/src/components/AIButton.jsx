import React from "react";

function AIButton({ darkMode, onClick }) {
  return (
    <>
      <style>
        {`
          .btn-ai {
            font-size: 9px;
            padding: 4px 6px;
            border: none;
            background: transparent;
            transition: background 0.15s ease, color 0.15s ease;
            cursor: pointer;
            border-radius: 4px;
            user-select: none;
          }

          .btn-ai.light {
            color: black;
          }

          .btn-ai.dark {
            color: white;
          }

          .btn-ai.light:hover {
            background: #165bc1;
            color: white;
          }

          .btn-ai.dark:hover {
            background: #2a2a2a;
            color: white;
          }
        `}
      </style>

      <button
        className={`btn-ai ${darkMode ? "dark" : "light"}`}
        onClick={(e) => {
          e.stopPropagation();
          onClick && onClick(e);
        }}
      >
        ✨ AI Summary
      </button>
    </>
  );
}

export default AIButton;
