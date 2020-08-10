import React, { useEffect } from "react";
import { motion, useCycle } from "framer-motion";

const variants = {
  notLiked: {
    fill: "none",
    strokeWidth: 1
  },
  liked: {
    fill: "currentColor",
    strokeWidth: [2, 0.2, 0.8, 1.5, 2, 1, 0.5, 2]
  }
};
const HeartIcon = ({ isLiked = false }) => {
  const [isAnimate, cycleAnimate] = useCycle("notLiked", "liked");
  useEffect(() => {
    if (isLiked) {
      cycleAnimate();
    } else if (isAnimate === "liked") {
      cycleAnimate();
    }
  }, [isLiked]);
  return (
    <motion.svg
      width="30px"
      height="30px"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      viewBox="0 0 24 24"
      stroke="currentColor"
      variants={variants}
      initial="notLiked"
      animate={isAnimate}
    >
      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
    </motion.svg>
  );
};

export default HeartIcon;