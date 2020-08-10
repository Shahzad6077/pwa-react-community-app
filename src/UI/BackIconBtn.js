import React from "react";

const CloseIcon = ({ onClick, style, className, fillColor = "#fff" }) => {
  return (
    <span
      className={` absolute  z-20 rounded-md hover:bg-gray-600 hover:bg-opacity-25 ${className}`}
      style={style}
      onClick={onClick}
    >
      <svg
        fill="none"
        width="2.3rem"
        color={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M15 19l-7-7 7-7"></path>
      </svg>
    </span>
  );
};

export default CloseIcon;
