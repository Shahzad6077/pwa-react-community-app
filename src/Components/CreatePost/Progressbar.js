import React, { useEffect } from "react";
import useStorage from "./../../Hooks/useStorage";
import { motion } from "framer-motion";

const ProgressBar = ({ file, setFile, setUrl }) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setUrl(url);
      setFile(null);
    }
    console.log(url);
  }, [url, setFile]);

  return (
    <div className="px-2 bg-gray-300 my-4">
      <motion.div
        className="progress-bar my-auto"
        initial={{ width: 0 }}
        animate={{ width: progress + "%" }}
      ></motion.div>
    </div>
  );
};

export default ProgressBar;
