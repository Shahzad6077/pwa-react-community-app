import React from "react";
// const loaderVariants = {
//   animationOne: {
//     x: [-10, 10],
//     y: [0, -20],
//     transition: {
//       x: {
//         yoyo: Infinity,
//         duration: 0.5
//       },
//       y: {
//         yoyo: Infinity,
//         duration: 0.25,
//         ease: "easeOut"
//       }
//     }
//   }
// };

const Loader = props => {
  return (
    <>
      <svg
        className="animate-spin mx-auto w-12"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
        {...props}
      >
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
      </svg>
    </>
  );
};

export default Loader;
