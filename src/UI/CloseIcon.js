import React from "react";

const CloseIcon = ({ onClick, style, className, fillColor = "#fff" }) => {
  return (
    <span
      className={`inline md:hidden absolute  z-20 rounded-md hover:bg-gray-600 hover:bg-opacity-25 ${className}`}
      style={style}
      onClick={onClick}
    >
      <svg
        fill={fillColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="2.3rem"
        color={fillColor}
      >
        <path d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </span>
  );
};

export default CloseIcon;
